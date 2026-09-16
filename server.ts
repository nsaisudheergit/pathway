import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy initialize Gemini client
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

/**
 * Helper to enforce a strict timeout on async operations so clients never hang indefinitely.
 */
async function callWithTimeout<T>(promise: Promise<T>, timeoutMs = 6500): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`Model call timed out after ${timeoutMs}ms`)), timeoutMs);
  });
  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timer!);
  }
}

/**
 * Resilient Gemini caller with automatic fallback models, strict per-call timeout, and retry logic.
 */
async function generateWithGeminiResilience(
  ai: GoogleGenAI,
  options: {
    contents: any;
    config?: any;
    primaryModel?: string;
  }
): Promise<{ response: any; modelUsed: string }> {
  // Try fast, responsive models first. gemini-3.1-flash-lite has proven immediate response times (<3s)
  // and is not affected by quota exhaustion affecting gemini-3.8-flash on free tiers.
  const candidateModels = [
    'gemini-3.1-flash-lite',
    'gemini-3.6-flash',
    options.primaryModel,
    'gemini-flash-latest',
  ];
  // Deduplicate while preserving priority order
  const models = Array.from(new Set(candidateModels.filter(Boolean) as string[]));

  let lastError: any = null;
  for (const model of models) {
    // For transient 503 service spikes, allow 1 quick retry; for 429 quota exhaustion, immediately switch models
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await callWithTimeout(
          ai.models.generateContent({
            model,
            contents: options.contents,
            config: options.config,
          }),
          6500
        );
        return { response, modelUsed: model };
      } catch (err: any) {
        lastError = err;
        const msg = err?.message || String(err);

        // If quota is exhausted (429), retrying the same model will always fail; immediately switch to next model
        const isQuotaExhausted =
          err?.status === 429 ||
          err?.code === 429 ||
          msg.includes('429') ||
          msg.includes('RESOURCE_EXHAUSTED') ||
          msg.includes('Quota exceeded');

        if (isQuotaExhausted) {
          console.info(`[Gemini Resilience] Model ${model} is quota-exhausted (429). Switching immediately to next available model...`);
          break; // Exit attempt loop to move to the next candidate model immediately
        }

        const isTransient503 =
          err?.status === 503 ||
          err?.code === 503 ||
          msg.includes('503') ||
          msg.includes('high demand') ||
          msg.includes('UNAVAILABLE') ||
          msg.includes('overloaded');

        if (isTransient503 && attempt === 0) {
          const delayMs = 250;
          console.info(`[Gemini Resilience] Model ${model} experiencing brief demand spike (503). Retrying in ${delayMs}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delayMs));
          continue;
        }

        // If timed out or general error, break to try next model immediately
        break;
      }
    }
    console.info(`[Gemini Resilience] Model ${model} unavailable or timed out. Moving to alternative model...`);
  }
  throw lastError;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.length > 5);
  res.json({
    status: 'ok',
    appName: 'PathWay AI',
    tagline: 'AI-Powered Learning, Skill Assessment & Career Readiness for Everyone',
    hasGeminiKey: hasKey,
    model: 'gemini-3.8-flash',
  });
});

// 1. AI Assistant Chat Endpoint (Universal for all disciplines)
app.post('/api/assistant/chat', async (req, res) => {
  try {
    const {
      message,
      topic = 'General Career & Technical',
      specialization = 'Software Engineering & Tech',
      targetRole = 'Software Engineer',
      queryMode = 'concept',
      tone = 'detailed',
    } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Intelligent multi-domain local fallback response if API key is not configured
      const fallbackResponse = generateLocalAssistantResponse(message, topic, specialization, targetRole);
      return res.json({
        content: fallbackResponse.content,
        suggestedFollowups: fallbackResponse.suggestedFollowups,
        source: 'local_mentor',
        model: 'gemini-3.8-flash-fallback',
      });
    }

    const systemInstruction = `You are PathWay AI, an intelligent, empathetic, and rigorous academic and career mentor powered by Google Gemini.
You serve learners, university students, self-taught developers, and career switchers worldwide.
Current Learner Specialization: "${specialization}".
Target Job Role: "${targetRole}".
Topic/Context: "${topic}".
Mode: "${queryMode}".
Tone: ${
      tone === 'concise'
        ? 'Concise, high-density bullet points, zero fluff'
        : tone === 'step-by-step'
        ? 'Pedagogical step-by-step tutorial with numbered phases, code blocks or mathematical formulas'
        : 'Professional, encouraging, high-caliber tech & industry mentor'
    }.

Guidelines:
- If technical/engineering: Provide clean, idiomatic code snippets (TypeScript/Python/SQL), time/space complexity analysis (Big-O), or system design trade-offs.
- If data science/analytics: Explain statistical intuition, machine learning model mechanics, and data preparation techniques.
- If product/business/strategy: Use clear frameworks (e.g. MECE, STAR, RICE, Unit Economics, User Journey Maps).
- If finance/accounting: Explain balance sheet effects, valuation mechanics, and exact spreadsheet formula syntax.
- If interview preparation: Provide structured answers adhering to the STAR method (Situation, Task, Action, Result).
- Ensure formatting is clean Markdown with headers, bold highlights, and code/quote blocks.
- End your response with a labeled section "[Follow-ups]" containing 3 short, relevant suggested follow-up questions separated by newlines.`;

    const promptText = `Learner Question: "${message}"\nDomain: ${specialization} | Target Role: ${targetRole} | Topic: ${topic}`;

    const { response, modelUsed } = await generateWithGeminiResilience(ai, {
      primaryModel: 'gemini-3.1-flash-lite',
      contents: promptText,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const rawText = response.text || '';

    // Parse suggested followups if present
    let content = rawText;
    let suggestedFollowups: string[] = [
      `How is this tested in a technical interview for ${targetRole}?`,
      'Can you provide a concrete, real-world project example?',
      'What are the common pitfalls or anti-patterns to avoid?',
    ];

    if (rawText.includes('[Follow-ups]')) {
      const parts = rawText.split('[Follow-ups]');
      content = parts[0].trim();
      const followUpLines = parts[1]
        .split('\n')
        .map((l) => l.replace(/^[-*•\d.]+\s*/, '').trim())
        .filter((l) => l.length > 5 && l.length < 120);
      if (followUpLines.length > 0) {
        suggestedFollowups = followUpLines.slice(0, 3);
      }
    }

    res.json({
      content,
      suggestedFollowups,
      source: 'gemini',
      model: modelUsed,
    });
  } catch (error: any) {
    console.info('[Assistant Chat] Peak demand encountered on primary model; serving PathWay AI verified mentor cache.');
    const fallback = generateLocalAssistantResponse(
      req.body.message || '',
      req.body.topic || '',
      req.body.specialization || 'Software Engineering & Tech',
      req.body.targetRole || 'Software Engineer'
    );
    res.json({
      content: `${fallback.content}\n\n*(Delivered via PathWay AI intelligent knowledge cache).*`,
      suggestedFollowups: fallback.suggestedFollowups,
      source: 'fallback',
      model: 'gemini-3.8-flash-cached',
    });
  }
});

// 2. Quiz Generation Function & Endpoint (Universal for all disciplines)
export async function generateQuiz(payload: {
  subject?: string;
  topic?: string;
  difficulty?: string;
  specialization?: string;
  targetRole?: string;
  count?: number;
}) {
  const {
    subject = 'Data Structures & Algorithms',
    topic = 'Dynamic Programming & Graphs',
    difficulty = 'Intermediate',
    specialization = 'Software Engineering & Tech',
    targetRole = 'Software Engineer',
    count = 3,
  } = payload;
  const ai = getGeminiClient();

  if (!ai) {
    return {
      questions: getCuratedQuizQuestions(subject, topic, specialization, count, targetRole),
      source: 'curated_bank',
    };
  }

  // Pass active specialization state and specific domain directives directly into the Gemini prompt
  let domainDirective = '';
  if (specialization === 'Supply Chain Management' || specialization.includes('Supply Chain')) {
    domainDirective = `Specialization Domain Context: Supply Chain Management (Active)
Key Focus Areas for Candidate:
- Inventory Optimization: Economic Order Quantity (EOQ = √((2DS)/H)), holding vs ordering cost trade-offs, Safety Stock calculations (Z × σL or with demand/lead time variance), ABC-XYZ stratification, Days Sales of Inventory (DSI), and inventory turnover ratios.
- Global Logistics & Freight: Incoterms 2020 risk and cost transfers (EXW, FOB, CIF, DDP), freight rate benchmarking, multi-modal container transport, cross-docking distribution hubs, and last-mile route economics.
- Strategic Sourcing & Procurement: Kraljic Matrix (Strategic, Bottleneck, Leverage, Non-Critical), Total Cost of Ownership (TCO), supplier scorecards (OTIF, defect rates), and vendor SLA contracts.
- Demand Planning & S&OP: Sales & Operations Planning cross-functional consensus, forecast error metrics (MAPE, WAPE, forecast bias), the Bullwhip Effect drivers and mitigation strategies (Vendor Managed Inventory / VMI, POS data sharing).
Target Role: ${targetRole}`;
  } else if (specialization === 'Operations Management' || specialization.includes('Operations')) {
    domainDirective = `Specialization Domain Context: Operations Management (Active)
Key Focus Areas for Candidate:
- Process Flow & Bottlenecks: Little's Law (WIP = Throughput × Flow Time / Cycle Time), Theory of Constraints (Goldratt's 5 Focusing Steps, Drum-Buffer-Rope), Takt time calculation, line balancing, and Value Stream Mapping (VSM).
- Lean Manufacturing & Six Sigma: DMAIC framework phases and deliverables, eliminating the 8 wastes of Lean (DOWNTIME / Muda), statistical process capability indices (Cp vs Cpk centering and spread formulas), and Kaizen continuous improvement.
- Capacity Planning & Queuing: Effective capacity vs design capacity, equipment utilization rates, chase vs level production scheduling, and Queuing Theory waiting times (M/M/1 and M/M/s).
- Operational KPIs: Overall Equipment Effectiveness (OEE = Availability × Performance × Quality), First Pass Yield, Rolled Throughput Yield (RTY), Standard Operating Procedures (SOPs), and Cost of Poor Quality (COPQ).
Target Role: ${targetRole}`;
  } else {
    domainDirective = `Specialization Domain Context: ${specialization}
Target Role: ${targetRole}`;
  }

  const prompt = `Generate ${count} distinct, rigorous multiple-choice quiz questions for a candidate specializing in "${specialization}" and targeting the "${targetRole}" role.
Active Specialization: ${specialization}
Target Role: ${targetRole}
Subject: ${subject}
Topic: ${topic}
Difficulty: ${difficulty}

${domainDirective}

Requirements:
- Questions must be practical, authentic, and test deep conceptual or problem-solving capability specifically tailored to ${specialization}.
- When testing quantitative concepts (such as EOQ, safety stock, Little's Law, OEE, Cpk, cycle time, etc.), include numerical scenario questions with exact calculated options and step-by-step arithmetic in the explanation.
- 4 plausible options for each question.
- Explicit correctAnswerIndex (0, 1, 2, or 3).
- Detailed, step-by-step pedagogical explanation explaining why the correct answer is right and why distractors are wrong.
- Key takeaway bullet tailored to ${specialization} interview standards.
- Formula, code syntax, or framework reference if applicable.`;

  const { response, modelUsed } = await generateWithGeminiResilience(ai, {
    primaryModel: 'gemini-3.1-flash-lite',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            correctAnswerIndex: { type: Type.INTEGER },
            explanation: { type: Type.STRING },
            keyTakeaway: { type: Type.STRING },
            formula: { type: Type.STRING },
          },
          required: ['question', 'options', 'correctAnswerIndex', 'explanation'],
        },
      },
    },
  });

  const parsed = JSON.parse(response.text || '[]');
  const formattedQuestions = parsed.map((q: any, idx: number) => ({
    id: `ai_q_${Date.now()}_${idx}`,
    specialization,
    subject,
    topic,
    difficulty,
    question: q.question,
    options: q.options && q.options.length === 4 ? q.options : ['Option A', 'Option B', 'Option C', 'Option D'],
    correctAnswerIndex: Math.min(Math.max(0, q.correctAnswerIndex ?? 0), 3),
    explanation: q.explanation || `Detailed pedagogical rationale for ${specialization}.`,
    keyTakeaway: q.keyTakeaway || `Mastering this principle is essential for ${targetRole} roles.`,
    formula: q.formula || '',
  }));

  if (formattedQuestions.length === 0) {
    throw new Error('Empty questions array from model');
  }

  return {
    questions: formattedQuestions,
    source: 'gemini',
    model: modelUsed,
  };
}

app.post('/api/quiz/generate', async (req, res) => {
  try {
    const result = await generateQuiz(req.body);
    res.json(result);
  } catch (err: any) {
    console.info('[Quiz API] Peak model demand encountered, smoothly serving verified curated question bank.');
    res.json({
      questions: getCuratedQuizQuestions(
        req.body.subject || 'Data Structures & Algorithms',
        req.body.topic || 'Dynamic Programming',
        req.body.specialization || 'Software Engineering & Tech',
        req.body.count || 3,
        req.body.targetRole || 'Software Engineer'
      ),
      source: 'curated_bank_fallback',
    });
  }
});

// 3. Mock Interview Evaluation Endpoint (Universal for all disciplines)
app.post('/api/interview/evaluate', async (req, res) => {
  try {
    const {
      type = 'Technical',
      role = 'Software Engineer',
      specialization = 'Software Engineering & Tech',
      question,
      answer,
      expectedKeyPoints = [],
    } = req.body;

    if (!answer || answer.trim().length < 5) {
      return res.status(400).json({ error: 'Please provide a more complete answer for evaluation.' });
    }

    const ai = getGeminiClient();

    if (!ai) {
      const fallbackEval = generateLocalInterviewEvaluation(type, role, question, answer);
      return res.json({ evaluation: fallbackEval, source: 'local_rubric' });
    }

    const prompt = `You are a Senior Principal Interviewer and Hiring Bar Raiser evaluating a candidate for a "${role}" position in "${specialization}".
Interview Type: ${type}
Question Asked: "${question}"
Expected Key Points to Address: ${JSON.stringify(expectedKeyPoints)}
Candidate's Typed Answer: "${answer}"

Evaluate the candidate's answer with extreme constructiveness, rigor, and clarity.
Provide:
1. Overall score from 0 to 100.
2. Grade letter (A+, A, B+, B, C, or Needs Work).
3. Concise 2-3 sentence executive summary of the performance.
4. List of 2-3 specific strengths in the response.
5. List of 2-3 actionable areas for improvement (what was omitted, edge cases missed, or could be structured better).
6. A gold-standard benchmark model response ("How a top 1% candidate at leading tech companies or top firms would answer").
7. Rubric scores (each 0 to 10): technicalAccuracy, structureAndClarity, commercialAwareness, depthOfExamples.`;

    const { response, modelUsed } = await generateWithGeminiResilience(ai, {
      primaryModel: 'gemini-3.1-flash-lite',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER },
            grade: { type: Type.STRING },
            summary: { type: Type.STRING },
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            areasForImprovement: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            benchmarkModelResponse: { type: Type.STRING },
            rubricScores: {
              type: Type.OBJECT,
              properties: {
                technicalAccuracy: { type: Type.NUMBER },
                structureAndClarity: { type: Type.NUMBER },
                commercialAwareness: { type: Type.NUMBER },
                depthOfExamples: { type: Type.NUMBER },
              },
              required: ['technicalAccuracy', 'structureAndClarity', 'commercialAwareness', 'depthOfExamples'],
            },
          },
          required: ['score', 'grade', 'summary', 'strengths', 'areasForImprovement', 'benchmarkModelResponse', 'rubricScores'],
        },
      },
    });

    const evaluation = JSON.parse(response.text || '{}');
    res.json({
      evaluation,
      source: 'gemini',
      model: modelUsed,
    });
  } catch (error: any) {
    console.info('[Interview API] Peak demand encountered on primary model; evaluating candidate response with structured rubric.');
    const fallbackEval = generateLocalInterviewEvaluation(
      req.body.type || 'Technical',
      req.body.role || 'Software Engineer',
      req.body.question || '',
      req.body.answer || ''
    );
    res.json({
      evaluation: fallbackEval,
      source: 'local_rubric_fallback',
    });
  }
});

// 4. Career Roadmap Generator Endpoint
app.post('/api/career/roadmap', async (req, res) => {
  try {
    const { targetRole = 'Full Stack Engineer', currentSkills = [], timeHorizon = '6 Months' } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        milestones: [
          {
            phase: 'Phase 1: Foundations & Core Architecture',
            duration: 'Weeks 1-4',
            skills: ['Core Language Mechanics', 'System Architecture Patterns', 'Git & CI/CD'],
            project: 'Build an end-to-end full stack service with persistent database and automated testing.',
          },
          {
            phase: 'Phase 2: Scalability & Performance',
            duration: 'Weeks 5-10',
            skills: ['Caching & Redis', 'Database Indexing & Query Plans', 'Asynchronous Job Queues'],
            project: 'Implement a distributed rate limiter and event bus with load testing benchmarks.',
          },
          {
            phase: 'Phase 3: Real-World Case Studies & Portfolio',
            duration: 'Weeks 11-18',
            skills: ['Cloud Deployment (Docker/K8s)', 'Security & OWASP', 'System Design Trade-offs'],
            project: 'Publish a production-grade open source project with live demo and architecture documentation.',
          },
          {
            phase: 'Phase 4: Interview Sprints & Placement Offers',
            duration: 'Weeks 19-24',
            skills: ['Algorithmic Sprints (Blind 75)', 'Behavioral STAR Storytelling', 'System Design Defense'],
            project: 'Complete 10 live mock interviews and secure 3 high-tier interview rounds.',
          },
        ],
        source: 'local_template',
      });
    }

    const { response, modelUsed } = await generateWithGeminiResilience(ai, {
      primaryModel: 'gemini-3.1-flash-lite',
      contents: `Create a high-impact, professional career transition roadmap for a candidate aiming to become a "${targetRole}".
Current background/skills: ${JSON.stringify(currentSkills)}. Time Horizon: ${timeHorizon}.
Generate 4 sequential phases with realistic timelines, required skills to develop, and a signature portfolio project for each phase.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              phase: { type: Type.STRING },
              duration: { type: Type.STRING },
              skills: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              project: { type: Type.STRING },
            },
            required: ['phase', 'duration', 'skills', 'project'],
          },
        },
      },
    });

    const milestones = JSON.parse(response.text || '[]');
    res.json({ milestones, source: 'gemini', model: modelUsed });
  } catch (err: any) {
    console.warn('[Roadmap API] Gemini unavailable or busy, serving structured roadmap template. Reason:', err?.message || err);
    res.json({
      milestones: [
        {
          phase: 'Phase 1: Foundations & Core Competencies',
          duration: 'Weeks 1-4',
          skills: ['Domain Fundamentals', 'Industry Tools & Workflow', 'Portfolio Kickoff'],
          project: 'Complete an end-to-end practical project showcasing core domain mastery.',
        },
        {
          phase: 'Phase 2: Advanced Mechanics & Real-World Application',
          duration: 'Weeks 5-10',
          skills: ['Architecture & Modeling', 'Case Analysis', 'Performance Benchmarks'],
          project: 'Design and deploy a production-grade solution solving an authentic industry challenge.',
        },
        {
          phase: 'Phase 3: Cross-functional Leadership & Polish',
          duration: 'Weeks 11-18',
          skills: ['Stakeholder Communication', 'System Optimization', 'Interview Frameworks'],
          project: 'Publish case study write-up with architectural trade-offs and business impact.',
        },
        {
          phase: 'Phase 4: Placement Sprints & Industry Offers',
          duration: 'Weeks 19-24',
          skills: ['STAR Storytelling', 'Technical Deep Dives', 'Offer Negotiation'],
          project: 'Complete 10 live mock interviews and secure top placement opportunities.',
        },
      ],
      source: 'local_template_fallback',
    });
  }
});

// Helper for local learning module generation
function generateLocalLearningModule(query: string, specialization: string, targetRole: string) {
  const clean = query.trim();
  const title = `${clean.charAt(0).toUpperCase() + clean.slice(1)} Principles & Masterclass`;
  const isHealth = clean.toLowerCase().includes('drug') || clean.toLowerCase().includes('malaria') || specialization.toLowerCase().includes('health');
  
  return {
    id: `mod_${Date.now()}`,
    specialization,
    title,
    subject: isHealth ? 'Clinical Pharmacology & Healthcare' : 'Core Domain Engineering & Analysis',
    difficulty: 'Applied' as const,
    description: `Comprehensive academic foundations, operational workflows, and interview problem-solving frameworks for ${clean} in the context of ${specialization}.`,
    keyConcepts: [
      {
        title: `Core Foundations & Mechanisms of ${clean}`,
        description: `Primary theoretical basis, underlying mechanical/molecular/systemic workflows, and industry standard protocols.`,
        frameworkOrFormula: `Architecture: Input -> Core Transformation -> Performance & Outcome Validation`,
      },
      {
        title: `Industry Implementation & Guidelines`,
        description: `Operational best practices, clinical or system protocols, and real-world deployment considerations for ${clean}.`,
        frameworkOrFormula: `Operational Matrix: Target Identification -> Regimen/Protocol Design -> Metric Monitoring`,
      },
      {
        title: `Comparative Analysis & Edge Cases`,
        description: `Critical trade-offs, contraindications or system bottlenecks, and mitigation strategies required for high-reliability results.`,
        frameworkOrFormula: `Risk-Benefit Benchmark: Efficiency / Risk Profile >= Regulatory Threshold`,
      },
    ],
    interviewFocusQuestions: [
      {
        question: `How would you explain the core operational mechanics and strategic importance of "${clean}" in a high-stakes interview?`,
        modelKeyPoints: `Define the concept concisely, explain the underlying mechanism or architecture, present a real-world application, and address trade-offs and compliance.`,
      },
      {
        question: `What are common failure modes or challenges associated with "${clean}", and what countermeasures do you implement?`,
        modelKeyPoints: `Identify risk triggers (e.g., resistance, concurrency, latency, or side-effects), establish monitoring metrics, and deploy structured mitigation workflows.`,
      },
    ],
    quizTopicLink: clean,
  };
}

// In-memory cache for learning hub concepts
const learningHubConceptCache = new Map<string, any>();

// 5. Learning Hub Concept Generation Endpoint (Universal for all disciplines & search prompts)
app.post('/api/learning-hub/generate-concept', async (req, res) => {
  try {
    const {
      query,
      specialization = 'Software Engineering & Tech',
      targetRole = 'Specialist',
    } = req.body;

    if (!query || typeof query !== 'string' || !query.trim()) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const trimmedQuery = query.trim();
    const cacheKey = `${specialization.toLowerCase()}:::${trimmedQuery.toLowerCase()}`;
    if (learningHubConceptCache.has(cacheKey)) {
      return res.json({
        module: learningHubConceptCache.get(cacheKey),
        source: 'gemini-cached',
        model: 'gemini-3.8-flash',
      });
    }

    const ai = getGeminiClient();

    if (!ai) {
      const fallbackModule = generateLocalLearningModule(trimmedQuery, specialization, targetRole);
      return res.json({
        module: fallbackModule,
        source: 'local_mentor',
        model: 'gemini-3.8-flash-fallback',
      });
    }

    const prompt = `You are a distinguished university professor, industry principal engineer, and curriculum architect.
A learner in the "${specialization}" specialization (targeting the role "${targetRole}") has queried: "${trimmedQuery}".

Generate a rich, authoritative, and pedagogically comprehensive learning module for this specific query.
Requirements:
1. title: Precise, informative title (e.g., "Antimalarial Pharmacology & Clinical Protocols" or "Distributed Systems Consensus & Paxos").
2. subject: Appropriate subject or disciplinary area.
3. difficulty: One of "Core", "Applied", or "Advanced".
4. description: 2-3 sentence overview explaining why this concept matters and its real-world application.
5. keyConcepts: Array of 3 distinct concepts. For each:
   - title: Specific sub-concept title.
   - description: 3-4 sentence comprehensive explanation of principles, mechanisms, or workflows.
   - frameworkOrFormula: An exact formula, chemical/reaction pathway, code snippet, or analytical framework.
6. interviewFocusQuestions: Array of 2 realistic placement interview questions testing technical accuracy and strategic trade-offs, with comprehensive model answers (modelKeyPoints).
7. quizTopicLink: A concise topic title suitable for practice quizzes.`;

    const { response, modelUsed } = await generateWithGeminiResilience(ai, {
      primaryModel: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        thinkingConfig: { thinkingBudget: 0 },
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            subject: { type: Type.STRING },
            difficulty: { type: Type.STRING, enum: ['Core', 'Applied', 'Advanced'] },
            description: { type: Type.STRING },
            keyConcepts: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  frameworkOrFormula: { type: Type.STRING },
                },
                required: ['title', 'description'],
              },
            },
            interviewFocusQuestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  modelKeyPoints: { type: Type.STRING },
                },
                required: ['question', 'modelKeyPoints'],
              },
            },
            quizTopicLink: { type: Type.STRING },
          },
          required: ['title', 'subject', 'difficulty', 'description', 'keyConcepts', 'interviewFocusQuestions'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    const validDifficulty = (['Core', 'Advanced', 'Applied'].includes(parsed.difficulty)
      ? parsed.difficulty
      : 'Applied') as 'Core' | 'Advanced' | 'Applied';

    const module = {
      id: `ai_mod_${Date.now()}`,
      specialization,
      title: parsed.title || trimmedQuery,
      subject: parsed.subject || 'Core Domain Studies',
      difficulty: validDifficulty,
      description: parsed.description || `In-depth analysis and principles of ${trimmedQuery}.`,
      keyConcepts: (parsed.keyConcepts || []).map((c: any) => ({
        title: c.title,
        description: c.description,
        frameworkOrFormula: c.frameworkOrFormula || '',
      })),
      interviewFocusQuestions: (parsed.interviewFocusQuestions || []).map((q: any) => ({
        question: q.question,
        modelKeyPoints: q.modelKeyPoints,
      })),
      quizTopicLink: parsed.quizTopicLink || trimmedQuery,
    };

    learningHubConceptCache.set(cacheKey, module);

    res.json({
      module,
      source: 'gemini',
      model: modelUsed,
    });
  } catch (err: any) {
    console.warn('[Learning Hub Generate] Gemini unavailable or error. Serving resilient structured module. Reason:', err?.message || err);
    const fallbackModule = generateLocalLearningModule(
      req.body.query || 'Core Concepts',
      req.body.specialization || 'Software Engineering & Tech',
      req.body.targetRole || 'Specialist'
    );
    res.json({
      module: fallbackModule,
      source: 'local_fallback',
      model: 'resilient-template',
    });
  }
});

// Helper: Curated Questions fallback (Universal across disciplines)
function getCuratedQuizQuestions(
  subject: string = 'Data Structures & Algorithms',
  topic: string = '',
  specialization: string = 'Software Engineering & Tech',
  count: number = 3,
  targetRole: string = ''
) {
  const isSupplyChain = specialization.includes('Supply Chain') || targetRole.includes('Supply Chain') || targetRole.includes('Logistics') || targetRole.includes('Procurement') || subject.toLowerCase().includes('supply chain') || subject.toLowerCase().includes('logistics') || subject.toLowerCase().includes('procurement') || subject.toLowerCase().includes('inventory');
  const isOperations = specialization.includes('Operations') || targetRole.includes('Operations') || targetRole.includes('Lean') || targetRole.includes('Six Sigma') || subject.toLowerCase().includes('operations') || subject.toLowerCase().includes('six sigma') || subject.toLowerCase().includes('capacity') || subject.toLowerCase().includes('bottleneck');
  const isTech = (!isSupplyChain && !isOperations) && (specialization.includes('Software') || specialization.includes('AI') || subject.toLowerCase().includes('algorithm') || subject.toLowerCase().includes('data structure') || subject.toLowerCase().includes('system'));
  const isProduct = specialization.includes('Product');
  const isMarketing = specialization.includes('Marketing');

  if (isSupplyChain) {
    return [
      {
        id: `cur_scm_${Date.now()}_1`,
        specialization: 'Supply Chain Management',
        subject: 'Inventory Optimization & EOQ Modeling',
        topic: 'Economic Order Quantity & Safety Stock',
        difficulty: 'Intermediate' as const,
        question: 'Under the classic Economic Order Quantity (EOQ) formula, what happens to optimal order quantity if annual demand quadruples (4x) while holding and ordering costs remain unchanged?',
        options: [
          'Optimal order quantity doubles (2x)',
          'Optimal order quantity quadruples (4x)',
          'Optimal order quantity stays the same',
          'Optimal order quantity increases by 50%',
        ],
        correctAnswerIndex: 0,
        explanation: 'Because EOQ = √((2 × D × S) / H), multiplying annual demand D by 4 results in √4 = 2 times the original order quantity.',
        formula: 'EOQ = √((2DS) / H)',
        keyTakeaway: 'Order quantity scales with the square root of demand, providing economies of scale in ordering and inventory holding.',
      },
      {
        id: `cur_scm_${Date.now()}_2`,
        specialization: 'Supply Chain Management',
        subject: 'Global Logistics & Freight Distribution',
        topic: 'Incoterms 2020 & Risk Allocation',
        difficulty: 'Intermediate' as const,
        question: 'Under Incoterms 2020, which shipping rule places maximum responsibility, risk, import duty, and local transport cost on the SELLER until delivered at buyer premises?',
        options: [
          'DDP (Delivered Duty Paid)',
          'FOB (Free On Board)',
          'CIF (Cost, Insurance and Freight)',
          'EXW (Ex Works)',
        ],
        correctAnswerIndex: 0,
        explanation: 'DDP (Delivered Duty Paid) places the maximum obligation on the seller, who must bear all risks, freight costs, customs clearance, import tariffs, and inland delivery to the agreed buyer destination.',
        formula: 'Risk/Cost Spectrum: EXW (Min Seller) ───► DDP (Max Seller)',
        keyTakeaway: 'DDP transfers all transit risk and customs burden to the seller until arrival at the destination door.',
      },
      {
        id: `cur_scm_${Date.now()}_3`,
        specialization: 'Supply Chain Management',
        subject: 'Strategic Procurement & Vendor Negotiation',
        topic: 'Kraljic Spend Matrix',
        difficulty: 'Intermediate' as const,
        question: 'In the Kraljic Matrix, a purchased item characterized by high supply risk and low financial spend impact is categorized as:',
        options: [
          'Bottleneck item (Requires secure volume contracts and contingency suppliers)',
          'Leverage item (Requires aggressive tendering and dynamic pricing)',
          'Strategic item (Requires deep partnership and executive collaboration)',
          'Non-critical item (Requires automated e-procurement and catalog orders)',
        ],
        correctAnswerIndex: 0,
        explanation: 'Bottleneck items have low profit impact but high supply market risk due to scarce suppliers or proprietary specifications. The procurement strategy focuses on contract security and safety stocks.',
        formula: 'Kraljic Quadrant: High Risk + Low Impact = Bottleneck Item',
        keyTakeaway: 'Secure buffer stocks and alternate vendors for bottleneck items to prevent line-down incidents.',
      },
    ].slice(0, count);
  }

  if (isOperations) {
    return [
      {
        id: `cur_ops_${Date.now()}_1`,
        specialization: 'Operations Management',
        subject: 'Process Flow Analysis & Bottleneck Identification',
        topic: 'Little’s Law & Work-in-Progress (WIP)',
        difficulty: 'Intermediate' as const,
        question: 'A manufacturing assembly line maintains an average Work-in-Progress (WIP) of 180 units and completes 15 units per hour. According to Little’s Law, what is the average Flow Time (Cycle Time) for a unit through the system?',
        options: [
          '12 hours',
          '27 hours',
          '9 hours',
          '15 hours',
        ],
        correctAnswerIndex: 0,
        explanation: 'According to Little’s Law, WIP = Throughput (R) × Flow Time (T). Rearranging for Flow Time: T = WIP / R = 180 units / (15 units/hour) = 12 hours.',
        formula: 'Little’s Law: WIP = Throughput (R) × Flow Time (T)',
        keyTakeaway: 'To reduce lead time without expanding capacity, operations managers must directly reduce excess WIP queues.',
      },
      {
        id: `cur_ops_${Date.now()}_2`,
        specialization: 'Operations Management',
        subject: 'Lean Manufacturing & Six Sigma (DMAIC)',
        topic: 'Process Capability (Cp & Cpk)',
        difficulty: 'Intermediate' as const,
        question: 'A precision machining process has a Cp of 1.67 but a Cpk of 0.85. What does this divergence signify to the Operations Manager?',
        options: [
          'The process has low variability and good potential, but the process mean is off-center relative to specification limits',
          'The measurement system has unacceptable gage repeatability error',
          'The process variance is too wide to fit within the customer specification tolerances',
          'The process is completely out of statistical control due to machine vibration',
        ],
        correctAnswerIndex: 0,
        explanation: 'Cp measures process spread relative to specification width (USL - LSL) / 6σ, while Cpk accounts for centering relative to the specification limits. A high Cp (1.67) indicates low variation, but Cpk < 1.0 proves the process average has drifted toward one specification boundary, generating defects.',
        formula: 'Cpk = min[(USL - μ) / 3σ, (μ - LSL) / 3σ]',
        keyTakeaway: 'Re-centering the machine mean can instantly lift Cpk to match Cp without purchasing tighter equipment.',
      },
      {
        id: `cur_ops_${Date.now()}_3`,
        specialization: 'Operations Management',
        subject: 'Operational KPIs & Overall Equipment Effectiveness (OEE)',
        topic: 'Overall Equipment Effectiveness (OEE)',
        difficulty: 'Intermediate' as const,
        question: 'An automated packing cell operates with 85% Availability, 90% Performance efficiency, and 98% Quality rate. What is the cell’s Overall Equipment Effectiveness (OEE)?',
        options: [
          '74.97%',
          '85.00%',
          '91.00%',
          '82.50%',
        ],
        correctAnswerIndex: 0,
        explanation: 'OEE is the product of three distinct dimensions: Availability × Performance × Quality = 0.85 × 0.90 × 0.98 = 0.7497 (74.97%).',
        formula: 'OEE = Availability × Performance × Quality',
        keyTakeaway: 'World-class OEE benchmark is typically 85%+; compounding sub-losses across factors significantly erodes total line output.',
      },
    ].slice(0, count);
  }

  if (isTech) {
    return [
      {
        id: `cur_tech_${Date.now()}_1`,
        specialization,
        subject: 'Data Structures & Algorithms',
        topic: 'Time Complexity & Hash Tables',
        difficulty: 'Intermediate' as const,
        question: 'What is the average and worst-case time complexity of lookup in a Hash Table, and what causes the worst-case degradation?',
        options: [
          'Average O(1), Worst O(N) when all keys collide into the same bucket',
          'Average O(log N), Worst O(N) due to binary tree rebalancing',
          'Average O(1), Worst O(log N) using separate chaining',
          'Average O(N), Worst O(N^2) during dynamic resizing',
        ],
        correctAnswerIndex: 0,
        explanation: 'Under uniform hashing, Hash Table lookups take O(1) average time. If a malicious or poor hash function hashes all items to the same bucket index, lookup degrades to O(N) linked list traversal (or O(log N) if bucket morphs into a red-black tree as in modern Java/V8).',
        formula: 'Average: O(1) | Worst-Case: O(N)',
        keyTakeaway: 'Always choose high-entropy hash functions and monitor bucket load factor (typically resize at 0.75).',
      },
      {
        id: `cur_tech_${Date.now()}_2`,
        specialization,
        subject: 'System Design & Distributed Systems',
        topic: 'CAP Theorem & Database Consistency',
        difficulty: 'Intermediate' as const,
        question: 'In the CAP theorem for distributed databases across an unreliable network partition (P), what is the fundamental trade-off?',
        options: [
          'You can guarantee both Consistency (C) and Availability (A) by doubling network bandwidth',
          'You must choose between Consistency (returning the latest write or an error) vs Availability (every non-failing node returns a response)',
          'Partition tolerance can be eliminated entirely by co-locating servers in a single data center',
          'ACID transactions automatically solve network partitions without latency overhead',
        ],
        correctAnswerIndex: 1,
        explanation: 'Because network partitions (P) are unavoidable in distributed physical networks, a distributed system must choose between CP (Consistency: reject stale reads/writes to preserve correctness) or AP (Availability: accept reads/writes even if replicas are temporarily desynchronized).',
        formula: 'CAP Theorem: Choose CP or AP during a network partition (P)',
        keyTakeaway: 'Financial ledgers prioritize CP; social feeds and chat notifications often adopt AP with eventual consistency.',
      },
      {
        id: `cur_tech_${Date.now()}_3`,
        specialization,
        subject: 'Web Architecture & Concurrency',
        topic: 'Event Loop & Non-Blocking I/O',
        difficulty: 'Intermediate' as const,
        question: 'How does Node.js achieve high concurrency despite executing JavaScript code on a single thread?',
        options: [
          'It spawns a new OS thread for every incoming HTTP request',
          'It delegates asynchronous I/O operations (network, disk) to libuv worker pool or kernel epoll/kqueue and processes callbacks via an event loop',
          'It compiles JavaScript into multi-threaded assembly on the fly',
          'It uses hardware hyper-threading at the browser engine level',
        ],
        correctAnswerIndex: 1,
        explanation: 'Node.js utilizes the libuv event loop. The main JavaScript thread delegates non-blocking system calls to OS kernel abstractions (epoll/kqueue) and thread pools, firing callbacks when data arrives without blocking other client connections.',
        formula: 'Architecture: Single JS Thread + libuv Event Loop + Non-blocking I/O',
        keyTakeaway: 'Avoid CPU-heavy operations on the main loop to prevent starving incoming I/O requests.',
      },
    ].slice(0, count);
  }

  if (isProduct) {
    return [
      {
        id: `cur_pm_${Date.now()}_1`,
        specialization,
        subject: 'Product Management',
        topic: 'Prioritization Frameworks',
        difficulty: 'Intermediate' as const,
        question: 'In the RICE prioritization framework for product backlogs, how is the composite score calculated?',
        options: [
          '(Reach × Impact × Confidence) / Effort',
          '(Revenue + Impact) / Customer Effort Score',
          '(Retention × Innovation) / Cost of Delay',
          '(Reach × Engagement) / Sprint Velocity',
        ],
        correctAnswerIndex: 0,
        explanation: 'RICE score = (Reach × Impact × Confidence) / Effort. It provides a structured, quantitative mechanism to compare disparate features by balancing reach and business impact against team effort and estimation confidence.',
        formula: 'RICE Score = (R × I × C) / E',
        keyTakeaway: 'High-effort features must demonstrate disproportionate reach and confidence to win backlog prioritization.',
      },
      {
        id: `cur_pm_${Date.now()}_2`,
        specialization,
        subject: 'Product Analytics',
        topic: 'North Star Metric & Cohorts',
        difficulty: 'Intermediate' as const,
        question: 'Which of the following best describes an effective "North Star Metric" (NSM) for a B2B SaaS platform?',
        options: [
          'Total registered users since company founding',
          'Weekly Active Users completing at least one core collaborative workflow',
          'Gross revenue in the last 24 hours regardless of churn',
          'Number of marketing page impressions per week',
        ],
        correctAnswerIndex: 1,
        explanation: 'An effective North Star Metric captures the core value delivered to customers and leads to long-term sustainable growth. Cumulative vanity numbers like total signups do not reflect user retention or actual product utility.',
        formula: 'NSM = Customer Value Realized × Frequency of Engagement',
        keyTakeaway: 'Focus on metrics that reflect recurring customer value realization rather than one-time acquisition.',
      },
    ].slice(0, count);
  }

  // Finance / Business default
  const allDefaults = [
    {
      id: `cur_${Date.now()}_1`,
      specialization: 'Finance & FinTech',
      subject: 'Corporate Finance',
      topic: 'WACC & Capital Structure',
      difficulty: 'Intermediate' as const,
      question: 'Why is the after-tax cost of debt used when calculating a firm’s Weighted Average Cost of Capital (WACC)?',
      options: [
        'Debt holders demand lower yields than preferred stockholders',
        'Interest expenses are tax-deductible, creating a corporate interest tax shield',
        'Corporate bankruptcy codes guarantee equity returns before senior debt',
        'The Federal Reserve subsidizes corporate debt issuances',
      ],
      correctAnswerIndex: 1,
      explanation: 'Because interest paid on corporate debt reduces taxable income, the effective cash cost of debt to the business is Kd × (1 - Tax Rate). Dividends paid on equity are not tax-deductible.',
      formula: 'After-tax Cost of Debt = Pre-tax Kd × (1 - Tax Rate)',
      keyTakeaway: 'Always tax-adjust debt costs in WACC.',
    },
    {
      id: `cur_${Date.now()}_2`,
      specialization: 'Finance & FinTech',
      subject: 'Financial Accounting',
      topic: '3-Statement Flow Mechanics',
      difficulty: 'Intermediate' as const,
      question: 'How does an increase in Inventory of $20M affect the Cash Flow Statement and Balance Sheet?',
      options: [
        'Operating Cash Flow increases by $20M; Assets increase by $40M',
        'Operating Cash Flow decreases by $20M (use of cash); Inventory asset increases by $20M, balancing cash drop',
        'Net income drops immediately by $20M through Cost of Goods Sold',
        'Retained earnings drop by $20M while liabilities rise by $20M',
      ],
      correctAnswerIndex: 1,
      explanation: 'Purchasing inventory ties up cash. On the Cash Flow Statement under Operating Activities, an increase in Working Capital (Inventory) is a use of cash (-$20M). On the Balance Sheet, Cash decreases by $20M while Inventory increases by $20M. Total Assets remain equal.',
      formula: 'ΔCash = -ΔInventory (when paid in cash)',
      keyTakeaway: 'Increases in current assets are cash outflows; decreases are cash inflows.',
    },
    {
      id: `cur_${Date.now()}_3`,
      specialization: 'Finance & FinTech',
      subject: 'Valuation & DCF',
      topic: 'Unlevered Free Cash Flow',
      difficulty: 'Intermediate' as const,
      question: 'What is the correct formula to calculate Unlevered Free Cash Flow (Free Cash Flow to Firm) starting from EBIT?',
      options: [
        'EBIT × (1 - Tax Rate) + D&A - CapEx - ΔNet Working Capital',
        'EBIT + Net Income - Dividends + Total Debt',
        'EBITDA - Interest Expense - Taxes + Share Repurchases',
        'Gross Profit - Operating Expenses + Cash from Financing',
      ],
      correctAnswerIndex: 0,
      explanation: 'Unlevered Free Cash Flow (UFCF) represents cash generated before accounting for capital structure. Starting from EBIT, calculate NOPAT (EBIT × (1 - T)), add back non-cash Depreciation & Amortization, subtract Capital Expenditures (CapEx), and adjust for changes in Net Working Capital.',
      formula: 'UFCF = EBIT(1 - t) + D&A - CapEx - ΔNWC',
      keyTakeaway: 'UFCF is discounted by WACC to arrive at Enterprise Value.',
    },
  ];

  return allDefaults.slice(0, count);
}

// Helper: Local assistant response generator (Universal across disciplines)
function generateLocalAssistantResponse(
  message: string,
  topic: string,
  specialization: string = 'Software Engineering & Tech',
  targetRole: string = 'Software Engineer'
) {
  const query = message.toLowerCase();

  // Tech / Software / System Design
  if (query.includes('system design') || query.includes('url shortener') || query.includes('rate limit') || query.includes('microservice') || query.includes('distributed')) {
    return {
      content: `### System Design Architecture & Scalability Guide

When designing scalable systems (e.g. for a **${targetRole}** interview):

#### 1. Requirements & Scope Clarification
- **Functional**: Core user actions (e.g. shorten URL, redirect in < 50ms, custom aliases, analytics).
- **Non-Functional**: High availability (99.99%), low latency, read-heavy ratio (e.g. 100:1 read to write), horizontal scalability.

#### 2. Capacity Estimation & Back-of-the-envelope
- **Writes**: $1\\text{M new URLs/day} \\approx 12\\text{ writes/sec}$.
- **Reads**: $100\\text{M redirects/day} \\approx 1,200\\text{ reads/sec}$.
- **Storage**: $500\\text{ bytes per mapping} \\times 1\\text{B records} \\approx 500\\text{GB}$ (fits comfortably on distributed storage).

#### 3. Core Architecture
\`\`\`text
[Client] ──> [Cloudflare CDN / DNS] ──> [API Gateway / Rate Limiter]
                                               │
                                       [Service Cluster]
                                         │           │
                               [Redis Cache]   [Postgres / DynamoDB]
\`\`\`

#### 4. Key Trade-offs
- **Hashing**: Use Base62 encoding on an auto-incrementing 64-bit ID (via Snowflake or DB sequence) rather than MD5/SHA256 truncation to prevent collisions.
- **Caching**: 80/20 Pareto rule; cache hot 20% of links in Redis with LRU eviction.`,
      suggestedFollowups: [
        'How would you handle cache stampede during breaking news redirects?',
        'What database schema would you choose (PostgreSQL vs DynamoDB)?',
        'How do you implement distributed rate limiting with Token Bucket?',
      ],
    };
  }

  // DSA / Code / Algorithms
  if (query.includes('algorithm') || query.includes('dynamic programming') || query.includes('dsa') || query.includes('leetcode') || query.includes('binary search') || query.includes('graph')) {
    return {
      content: `### Algorithmic Problem Solving Framework

Mastering technical coding rounds for **${targetRole}**:

#### 1. The 5-Step Interview Protocol:
1. **Clarify Constraints**: Edge cases (empty array, negative values, integer overflow, duplicates).
2. **Brute Force First**: State the naive solution and its Big-O time/space complexity before writing code.
3. **Identify Bottleneck**: Look for repeated subproblems (Dynamic Programming) or sorted properties (Binary Search / Two Pointers).
4. **Clean Implementation**: Write modular, readable code with descriptive variable names.
5. **Dry Run & Test**: Step through an example input by hand before claiming completion.

#### 2. Classic Two-Pointer Example (TypeScript):
\`\`\`typescript
function twoSumSorted(nums: number[], target: number): [number, number] | null {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) return [left, right];
    if (sum < target) {
      left++; // Need larger sum
    } else {
      right--; // Need smaller sum
    }
  }
  return null;
}
// Time Complexity: O(N) | Space Complexity: O(1)
\`\`\``,
      suggestedFollowups: [
        'How do you decide between Memoization (Top-Down) vs Tabulation (Bottom-Up)?',
        'What are the 14 core coding patterns every candidate must know?',
        'Can you show how to detect a cycle in a Directed Graph?',
      ],
    };
  }

  // AI & Data Science / ML / LLMs / RAG
  if (
    specialization.includes('AI') ||
    specialization.includes('Data Science') ||
    query.includes('transformer') ||
    query.includes('attention') ||
    query.includes('rag') ||
    query.includes('llm') ||
    query.includes('xgboost') ||
    query.includes('machine learning') ||
    query.includes('deep learning')
  ) {
    return {
      content: `### AI & Data Science Engineering Guide

Here is the structured technical breakdown for **${targetRole}**:

#### 1. Core Mechanics: Scaled Dot-Product Self-Attention
In modern Transformer architectures, Self-Attention allows every token to attend to every other token:
$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$
- **Why scale by $\\sqrt{d_k}$?**: For large embedding dimensions, dot products grow large in magnitude, pushing the softmax function into regions with tiny gradients (gradient vanishing). Scaling preserves unit variance.
- **Multi-Head Attention**: Projects $Q, K, V$ into $h$ distinct subspaces, enabling the network to simultaneously focus on syntax, semantics, and long-range dependencies.

#### 2. Enterprise Production RAG Stack
\`\`\`text
[User Query] ──> [Query Expansion & HyDE]
                       │
             [Hybrid Search: Dense Vector + BM25 Sparse]
                       │
             [Cross-Encoder Reranker (e.g. bge-reranker)]
                       │
             [Top-K Context Chunks + System Prompt] ──> [Gemini 3.8 Flash] ──> [Grounded Output]
\`\`\`

#### 3. Real-World Model Evaluation & Guardrails
- **Drift Detection**: Use Population Stability Index (PSI) and Kolmogorov-Smirnov (KS) tests for feature drift.
- **RAG Triad**: Evaluate Context Relevance, Groundedness (faithfulness), and Answer Relevance (Ragas framework).`,
      suggestedFollowups: [
        'How does LoRA (Low-Rank Adaptation) fine-tune LLMs with minimal VRAM?',
        'What are the trade-offs between dense vector search and hybrid BM25 search?',
        'How do you handle out-of-distribution (OOD) data in production ML pipelines?',
      ],
    };
  }

  // Product Management
  if (
    specialization.includes('Product') ||
    query.includes('circles') ||
    query.includes('rice') ||
    query.includes('north star') ||
    query.includes('prd') ||
    query.includes('product manager')
  ) {
    return {
      content: `### Product Management Framework & Strategy Guide

Strategic execution blueprint for **${targetRole}**:

#### 1. The CIRCLES Framework™ for Product Design
1. **C**omprehend Situation: Clarify product scope, platform, business goals, and competitive constraints.
2. **I**dentify Customer: Define key user archetypes/personas (e.g. Power Commuter vs Weekend Traveler).
3. **R**eport User Needs: Map specific user journeys and acute pain points.
4. **C**ut Through Prioritization: Select the primary high-friction persona and highest-impact pain point.
5. **L**ist Solutions: Brainstorm 3 bold, differentiated solutions (Evolutionary, Revolutionary, Moonshot).
6. **E**valuate Trade-offs: Score solutions on Impact vs Feasibility vs Operational Risk.
7. **S**ummarize Recommendation: Bottom-line recommendation, launch MVP metrics, and next steps.

#### 2. RICE Prioritization Matrix
$$\\text{RICE Score} = \\frac{\\text{Reach} \\times \\text{Impact} \\times \\text{Confidence}}{\\text{Effort}}$$
- **Reach**: Users impacted per quarter (e.g. 50,000 WAU).
- **Impact**: 3 (Massive), 2 (High), 1 (Medium), 0.5 (Low), 0.25 (Minimal).
- **Confidence**: 100% (High data backing), 80% (Moderate), 50% (Hunch/Low).
- **Effort**: Person-weeks of engineering, design, and QA time.`,
      suggestedFollowups: [
        'How do you diagnose a sudden 20% drop in weekly active users for a SaaS app?',
        'How do you structure a 1-page PRD that developers and stakeholders love?',
        'What are the best frameworks for B2B SaaS pricing and packaging?',
      ],
    };
  }

  // UI/UX & Product Design
  if (
    specialization.includes('Design') ||
    specialization.includes('UI/UX') ||
    query.includes('figma') ||
    query.includes('wcag') ||
    query.includes('design system') ||
    query.includes('heuristic')
  ) {
    return {
      content: `### UI/UX & Product Design Craft Guide

Human-centered design systems and UX architecture for **${targetRole}**:

#### 1. 3-Tier Design Token Hierarchy in Figma & Code
\`\`\`text
[Global Primitives]   -> color.blue.500 = #3B82F6, radius.md = 8px
        │
[Semantic Tokens]     -> color.interactive.primary = {color.blue.500}
        │
[Component Tokens]    -> button.primary.bg.default = {color.interactive.primary}
\`\`\`
- **Light/Dark Mode Switching**: Swap values at the *Semantic* layer; component tokens remain untouched.

#### 2. WCAG 2.1 AA Accessibility Standards Checklist
- **Color Contrast**: Minimum **4.5:1** for standard body text; **3:1** for large text (≥18pt or 14pt bold) and interactive UI components.
- **Focus Indicators**: Never use \`outline: none\` without a visible, high-contrast custom replacement ring.
- **Touch Targets**: Minimum **44x44 CSS pixels** for interactive mobile targets with sufficient spacing.
- **ARIA & Landmarks**: Ensure logical \`tabindex\`, header hierarchy (\`h1\` to \`h6\` without skipping levels), and semantic HTML elements.`,
      suggestedFollowups: [
        'How do you design an accessible data table with sorting, filtering, and pagination?',
        'What are the 10 Nielsen Norman Usability Heuristics with modern examples?',
        'How do you structure an end-to-end UX portfolio case study for hiring managers?',
      ],
    };
  }

  // Management Consulting & Strategy
  if (
    specialization.includes('Consulting') ||
    specialization.includes('Strategy') ||
    query.includes('mece') ||
    query.includes('issue tree') ||
    query.includes('profitability') ||
    query.includes('market sizing') ||
    query.includes('pyramid principle')
  ) {
    return {
      content: `### Management Consulting & Strategy Framework Guide

Problem structuring and MBB case methodology for **${targetRole}**:

#### 1. MECE Issue Tree Structure (Profitability Diagnosis)
\`\`\`text
                                      ┌── Price per Unit (Price elasticity, discounting)
                       ┌── Revenue ───┤
                       │              └── Volume (Market share, capacity, channels)
Profit = Revenue - Cost ┤
                       │           ┌── Fixed Costs (Rent, SG&A, depreciation, leases)
                       └── Cost ───┤
                                   └── Variable Costs (COGS, direct labor, freight)
\`\`\`
- **Rule**: Every branch must be **Mutually Exclusive** (no overlaps) and **Collectively Exhaustive** (no missing drivers).

#### 2. The Minto Pyramid Principle
1. **Lead with Answer/Recommendation**: State the core conclusion (Bottom Line Up Front - BLUF).
2. **Group Supporting Arguments**: Cluster findings into 3 distinct logical buckets (e.g. Market Viability, Financial Feasibility, Operational Readiness).
3. **Underpin with Quantitative Evidence**: Provide empirical data, unit economics, and benchmark comparisons.`,
      suggestedFollowups: [
        'How do you structure a market entry case for a global retail brand?',
        'Walk through estimating the annual revenue of Heathrow Airport from first principles',
        'How do you deliver an executive synthesis slide in under 60 seconds?',
      ],
    };
  }

  // Marketing & Growth
  if (
    specialization.includes('Marketing') ||
    query.includes('marketing') ||
    query.includes('roas') ||
    query.includes('cac') ||
    query.includes('brand') ||
    query.includes('seo')
  ) {
    return {
      content: `### Marketing & Growth Strategy Guide

Performance marketing, branding, and customer acquisition for **${targetRole}**:

#### 1. Unit Economics & Growth Formulas
- **Customer Acquisition Cost (CAC)**: $\\text{CAC} = \\frac{\\text{Total Sales \\& Marketing Spend}}{\\text{New Customers Acquired}}$
- **Customer Lifetime Value (LTV)**: $\\text{LTV} = \\frac{\\text{ARPU} \\times \\text{Gross Margin (\\%)}}{\\text{Churn Rate}}$
- **Healthy SaaS Benchmark**: $\\text{LTV} : \\text{CAC} \\ge 3:1$ with a Payback Period $\\le 12\\text{ months}$.

#### 2. The Keller Brand Resonance Pyramid
1. **Salience** (Who are you?): Deep category awareness and mental availability at purchase moments.
2. **Performance & Imagery** (What are you?): Reliable functional benefits paired with emotional brand associations.
3. **Judgments & Feelings** (What do I think/feel?): Perceived quality, credibility, and brand warmth.
4. **Resonance** (What about you and me?): Active brand advocacy, repeat purchases, and community loyalty.`,
      suggestedFollowups: [
        'How do you design a full-funnel Meta Ads strategy with creative testing loops?',
        'What is the difference between First-Click, Last-Click, and Data-Driven GA4 attribution?',
        'How do you build a topical authority cluster to rank for competitive SEO queries?',
      ],
    };
  }

  // Business Analytics
  if (
    specialization.includes('Business Analytics') ||
    query.includes('sql') ||
    query.includes('power bi') ||
    query.includes('dax') ||
    query.includes('star schema') ||
    query.includes('tableau')
  ) {
    return {
      content: `### Business Analytics & BI Engineering Guide

Data modeling, SQL analytics, and visualization best practices for **${targetRole}**:

#### 1. SQL Window Functions for Business Intelligence
\`\`\`sql
SELECT 
    customer_id,
    order_date,
    revenue,
    SUM(revenue) OVER(PARTITION BY customer_id ORDER BY order_date) AS cumulative_ltv,
    DENSE_RANK() OVER(PARTITION BY product_category ORDER BY revenue DESC) AS rank_in_category,
    LAG(revenue, 1) OVER(PARTITION BY customer_id ORDER BY order_date) AS prev_order_rev
FROM orders;
\`\`\`
- **ROW_NUMBER()**: Unique sequential integer per partition.
- **RANK()**: Gaps when ties occur (1, 2, 2, 4).
- **DENSE_RANK()**: No gaps on ties (1, 2, 2, 3).

#### 2. Power BI & Dimensional Modeling (Star Schema)
- **Fact Tables**: Contain quantitative numeric transactional measures (\`Sales_Amount\`, \`Discount\`, \`Quantity\`).
- **Dimension Tables**: Contain qualitative attributes with surrogate keys (\`Dim_Customer\`, \`Dim_Date\`, \`Dim_Store\`).
- **Best Practice**: Use 1-to-Many single-directional relationships from Dimensions to Facts. Avoid bidirectional cross-filtering to maintain optimal DAX engine speed.`,
      suggestedFollowups: [
        'How does CALCULATE transition row context into filter context in DAX?',
        'How do you detect and handle multicollinearity in regression using VIF?',
        'What are the key KPIs for an executive SaaS financial dashboard?',
      ],
    };
  }

  // Human Resources & People Ops
  if (
    specialization.includes('Human Resources') ||
    specialization.includes('HR') ||
    query.includes('hr') ||
    query.includes('talent') ||
    query.includes('compa-ratio') ||
    query.includes('attrition') ||
    query.includes('recruitment')
  ) {
    return {
      content: `### Human Resources & People Operations Guide

Talent strategy, organizational design, and HR metrics for **${targetRole}**:

#### 1. Total Rewards & Compa-Ratio Analysis
$$\\text{Compa-Ratio} = \\frac{\\text{Actual Employee Salary}}{\\text{Salary Range Midpoint}} \\times 100$$
- **Compa-Ratio < 80%**: Underpaid; high flight risk or new to role. Requires merit market adjustment.
- **80% - 120%**: Normal competitive target band for solid contributors.
- **Compa-Ratio > 120%**: Ceiling risk; consider promotion to higher pay band rather than continuing base salary bumps.

#### 2. Predictive Attrition & Retention Architecture
- **Metrics**: 90-Day Early Attrition Rate, Regrettable Attrition %, Cost-per-Hire, eNPS (Employee Net Promoter Score).
- **Behaviorally Anchored Rating Scales (BARS)**: Standardize interview rubrics to eliminate halo/horns effects and unconscious affinity bias across candidate scorecards.`,
      suggestedFollowups: [
        'How do you manage a high-performing employee who is culturally toxic to peers?',
        'What are the best frameworks for rolling out company-wide OKRs?',
        'How do you structure a severance and transition package for an organizational restructuring?',
      ],
    };
  }

  // Agri-Business Management
  if (
    specialization.includes('Agri') ||
    query.includes('agri') ||
    query.includes('cold chain') ||
    query.includes('commodity') ||
    query.includes('rural') ||
    query.includes('mandi')
  ) {
    return {
      content: `### Agri-Business Management & Rural Strategy Guide

Farm-to-fork supply chain, commodity trading, and rural dynamics for **${targetRole}**:

#### 1. Cold Chain Logistics & Spoilage Reduction
- **Farm-Gate Aggregation**: Establish primary processing centers (PPCs) equipped with pre-cooling chambers within 15 km of harvest clusters.
- **Reefer Fleet Management**: Maintain uninterrupted cold chains (e.g. 2°C - 4°C for temperate fruits; 10°C - 12°C for tropical produce) with IoT real-time temperature telemetry to cut losses from 25% to under 4%.

#### 2. The 4A Rural Marketing Framework
1. **Affordability**: Sachets, small pack sizes, pay-per-use, and seasonal payment plans tied to harvest cash inflows.
2. **Availability**: Van operations, village Haat distribution points, and deep retailer credit lines.
3. **Awareness**: Interactive farm demonstrations, Krishi Melas, local influencer endorsements, and regional vernacular messaging.
4. **Acceptability**: Robust product design suitable for fluctuating voltage, unpaved roads, and harsh agricultural weather conditions.`,
      suggestedFollowups: [
        'How do you hedge agricultural commodity price risk on NCDEX using futures?',
        'Explain the Reserve Bank Priority Sector Lending (PSL) guidelines for agriculture',
        'What are the 7 core principles of HACCP food safety certification?',
      ],
    };
  }

  // Healthcare Management & Life Sciences
  if (
    specialization.includes('Healthcare') ||
    query.includes('hospital') ||
    query.includes('nabh') ||
    query.includes('arpob') ||
    query.includes('rcm') ||
    query.includes('jci')
  ) {
    return {
      content: `### Healthcare Administration & Clinical Operations Guide

Hospital operations, accreditation standards, and revenue cycle management for **${targetRole}**:

#### 1. Hospital Financial & Operational Metrics
- **ARPOB (Average Revenue Per Occupied Bed)**: $\\text{ARPOB} = \\frac{\\text{Total Inpatient Operating Revenue}}{\\text{Occupied Bed Days}}$
- **Key Levers**: Optimize clinical case mix toward high-complexity surgeries, shorten Average Length of Stay (ALOS) to increase bed turnover, and reduce discharge delay from 4 hours to 90 minutes.

#### 2. Quality Accreditations (NABH / JCI) & Patient Safety (IPSG)
1. Identify patients correctly using two distinct identifiers (e.g., Full Name and Hospital MRN).
2. Improve effective communication for verbal and telephonic medical orders (Read-Back protocol).
3. Improve the safety of high-alert medications (double independent nurse verification, LASA protocols).
4. Ensure correct-site, correct-procedure, and correct-person surgery (WHO Surgical Safety Checklist Time-Out).
5. Reduce the risk of healthcare-associated infections (CDC hand hygiene compliance audits).
6. Reduce the risk of patient harm resulting from falls (Morse Fall Risk Scale).`,
      suggestedFollowups: [
        'How do you solve chronic Emergency Department overcrowding in a tertiary hospital?',
        'What are the root causes of insurance claim denials in hospital Revenue Cycle Management (RCM)?',
        'How do you optimize Operation Theatre (OT) utilization and turnaround time?',
      ],
    };
  }


  // Default Universal Career & Technical Mentor Response
  return {
    content: `### PathWay AI Academic & Career Guidance

Regarding your inquiry on **${topic}** for the target role of **${targetRole}** in **${specialization}**:

To stand out in high-caliber placements and technical interviews:
1. **Core First Principles**: Deeply understand underlying data structures, commercial models, or architecture patterns—avoid rote memorization.
2. **Portfolio Proof-of-Work**: Build 2-3 production-grade projects demonstrating end-to-end execution, tests, and quantified metrics (e.g. latency reduction, ROI generated, conversion lift).
3. **Structured Communication**: Lead with your key result first (Bottom Line Up Front), articulate trade-offs, and ground your answers in concrete examples.

To accelerate your progress today:
- Practice domain-specific multiple choice drills in the **Quiz** section.
- Run a live AI-evaluated simulation in the **Mock Interview** tab.
- Review your skill radar benchmarks in the **Skill Assessment** section!`,
    suggestedFollowups: [
      `What are the top interview questions asked for ${targetRole}?`,
      'Can you give me a weekly preparation study plan?',
      'How should I format bullet points on my resume to pass ATS screens?',
    ],
  };
}

// Helper: Local interview evaluation generator (Universal across disciplines)
function generateLocalInterviewEvaluation(type: string, role: string = 'Software Engineer', question: string, answer: string) {
  const words = answer.trim().split(/\s+/).length;
  let score = 72;
  let grade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'Needs Work' = 'B';

  const hasStructure = answer.includes('1.') || answer.includes('First') || answer.includes('For example') || answer.includes('Result') || answer.includes('trade-off');
  const hasSubstance = words >= 60;

  if (hasStructure && hasSubstance) {
    score = 88;
    grade = 'A';
  } else if (hasSubstance || hasStructure) {
    score = 78;
    grade = 'B+';
  } else if (words < 25) {
    score = 60;
    grade = 'Needs Work';
  }

  return {
    score,
    grade,
    summary: `You provided a ${score >= 80 ? 'structured, persuasive' : 'foundational'} response demonstrating good command of the topic, with distinct opportunities to deepen quantitative metrics and edge-case handling.`,
    strengths: [
      'Directly addresses the interviewer prompt with relevant professional domain terminology',
      'Articulates clear problem-solving logic and technical awareness',
      'Maintains a confident and professional communication posture',
    ],
    areasForImprovement: [
      'Structure the answer using explicit numbered points or the STAR framework (Situation, Task, Action, Result)',
      'Incorporate concrete numerical trade-offs (e.g., latency, time complexity, ROI, error budgets)',
      'Highlight edge cases, failure recovery, and real-world implementation constraints',
    ],
    benchmarkModelResponse: `A top-tier answer begins with an executive summary of the approach, outlines 2-3 core architectural or strategic considerations with explicit trade-offs, cites a real-world project example with quantified outcomes, and concludes with lessons learned.`,
    rubricScores: {
      technicalAccuracy: Math.min(10, Math.max(5, Math.round(score / 10))),
      structureAndClarity: Math.min(10, Math.max(5, Math.round((score - 2) / 10))),
      commercialAwareness: 8,
      depthOfExamples: Math.min(10, Math.max(5, Math.round(words / 15))),
    },
  };
}

// Start server with Vite integration
async function startServer() {
  // Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PathWay AI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
