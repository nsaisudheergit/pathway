import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  HelpCircle,
  Play,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Clock,
  Award,
  BookOpen,
  Filter,
  Check,
  TrendingUp,
  MessageSquare,
  BarChart3,
  Sliders,
  Code,
  Cpu,
  Layers,
  Palette,
  Users,
  Stethoscope,
  Sprout,
  Briefcase,
  Database,
  Target,
  Boxes,
  Truck,
  Workflow,
  Gauge,
  Settings,
} from 'lucide-react';
import { QuizSubject, QuizQuestion, QuizResult, StudentProfile, SpecializationType } from '../types';
import { sampleQuizQuestions } from '../data/mockData';
import { sampleQuizQuestionsBySpecialization, SPECIALIZATIONS, learningHubModules } from '../data/specializationData';

interface QuizSectionProps {
  profile: StudentProfile;
  onUpdateProfile: (updater: (prev: StudentProfile) => StudentProfile) => void;
  onAskAIAssistant: (query: string) => void;
  initialSubject?: string;
  initialTopic?: string;
}

const SUBJECT_CONFIG: Record<string, { icon: any; topics: string[]; skillMapped: string }> = {
  'Corporate Finance': {
    icon: TrendingUp,
    topics: ['WACC & Capital Structure', 'Capital Budgeting (NPV vs IRR)', 'Cost of Equity & Debt', 'Corporate Payout Policy'],
    skillMapped: 'Financial Analysis',
  },
  'Financial Accounting': {
    icon: BookOpen,
    topics: ['3-Statement Flow Mechanics', 'Revenue Recognition (ASC 606)', 'Deferred Taxes & Special Items', 'Working Capital Adjustments'],
    skillMapped: 'Accounting',
  },
  'Excel for Finance': {
    icon: Sliders,
    topics: ['Advanced Lookup & Dynamic Formulas', 'Financial Functions (IRR, NPV, XIRR)', 'Sensitivities & Data Tables', 'Speed Shortcuts & Auditing'],
    skillMapped: 'Excel',
  },
  'Valuation & DCF': {
    icon: BarChart3,
    topics: ['Enterprise Value vs Equity Value', 'Gordon Growth Terminal Value', 'Unlevered Free Cash Flow (UFCF)', 'Trading & Transaction Comps'],
    skillMapped: 'Financial Modelling',
  },
  'Financial Statement Analysis': {
    icon: Award,
    topics: ['DuPont Framework', 'Liquidity, Solvency & Coverage Ratios', 'EBITDA vs Free Cash Flow Bridge', 'Margin Quality & Normalization'],
    skillMapped: 'Financial Analysis',
  },
  'Business Analytics': {
    icon: HelpCircle,
    topics: ['Variance Analysis & KPI Tracking', 'Unit Economics & CAC/LTV', 'Sensitivity Modeling', 'Scenario Planning'],
    skillMapped: 'Financial Analysis',
  },
  'Inventory Optimization & EOQ Modeling': {
    icon: Boxes,
    topics: ['EOQ & Holding vs Ordering Costs', 'Safety Stock & Service Levels (Z-score)', 'ABC-XYZ SKU Stratification', 'Days Sales of Inventory (DSI) & Turnover'],
    skillMapped: 'Inventory Optimization & EOQ',
  },
  'Global Logistics & Freight Distribution': {
    icon: Truck,
    topics: ['Freight Rate Benchmarking & Carrier SLAs', 'Hub-and-Spoke Distribution Design', 'Incoterms 2020 (FOB, CIF, DDP) Risk Transfers', 'Cross-Docking & Last-Mile Delivery'],
    skillMapped: 'Logistics & Multi-Modal Freight',
  },
  'Strategic Procurement & Vendor Negotiation': {
    icon: Briefcase,
    topics: ['Total Cost of Ownership (TCO) Calculations', 'Kraljic Matrix Spend Segmentation', 'Supplier Scorecards & On-Time In-Full (OTIF)', 'Contract Negotiation & SLA Clauses'],
    skillMapped: 'Strategic Sourcing & Procurement',
  },
  'Demand Forecasting & S&OP Planning': {
    icon: TrendingUp,
    topics: ['S&OP Cross-Functional Consensus Planning', 'Forecast Error Metrics (MAPE, WAPE, Bias)', 'Bullwhip Effect Analysis & Order Smoothing', 'Vendor Managed Inventory (VMI) Collaboration'],
    skillMapped: 'Demand Planning & S&OP',
  },
  'Process Flow Analysis & Bottleneck Identification': {
    icon: Workflow,
    topics: ['Value Stream Mapping (VSM) & Waste Identification', 'Theory of Constraints & Drum-Buffer-Rope', 'Little’s Law (WIP = Throughput × Flow Time)', 'Line Balancing & Takt Time Synchronization'],
    skillMapped: 'Process Flow & Bottleneck Analysis',
  },
  'Lean Manufacturing & Six Sigma (DMAIC)': {
    icon: Award,
    topics: ['DMAIC Project Structuring & Problem Statements', '8 Wastes of Lean (DOWNTIME / Muda)', 'Process Capability Indices (Cp, Cpk)', 'Kaizen Event Leadership & Gemba Walks'],
    skillMapped: 'Lean & Six Sigma (DMAIC)',
  },
  'Capacity Planning & Queuing Theory': {
    icon: Gauge,
    topics: ['Effective Capacity & Equipment Utilization Rate', 'Chase vs Level Aggregate Planning', 'Queuing Models (M/M/1 & M/M/s Waiting Times)', 'Capacity Cushion & Bottleneck Buffer Design'],
    skillMapped: 'Capacity Planning & Queuing',
  },
  'Operational KPIs & Overall Equipment Effectiveness (OEE)': {
    icon: Target,
    topics: ['OEE Calculation (Availability × Performance × Quality)', 'First Pass Yield & Rolled Throughput Yield (RTY)', 'Standard Operating Procedure (SOP) Deployment', 'Cost of Poor Quality (COPQ)'],
    skillMapped: 'Operational KPIs & OEE',
  },
};

export function getSubjectDetails(
  subject: string,
  specialization: string,
  profileSkills?: Record<string, any>
): { icon: any; topics: string[]; skillMapped: string } {
  if (SUBJECT_CONFIG[subject]) {
    return SUBJECT_CONFIG[subject];
  }

  // Look for topics from learningHubModules
  const matchingModules = learningHubModules.filter(
    (m) =>
      (m.specialization === specialization && (m.subject === subject || subject.includes(m.subject))) ||
      m.subject.toLowerCase() === subject.toLowerCase()
  );

  const topics: string[] = [];
  matchingModules.forEach((m) => {
    if (m.quizTopicLink && !topics.includes(m.quizTopicLink)) {
      topics.push(m.quizTopicLink);
    }
    m.keyConcepts.forEach((c) => {
      if (!topics.includes(c.title)) {
        topics.push(c.title);
      }
    });
  });

  if (topics.length === 0) {
    topics.push(
      'Core Principles & Foundations',
      'System Architecture & Design',
      'Industry Best Practices',
      'Interview Problem Solving'
    );
  }

  // Determine matching skill in student profile
  const skillKeys = Object.keys(profileSkills || {});
  const matchedSkill =
    skillKeys.find(
      (k) =>
        k.toLowerCase() === subject.toLowerCase() ||
        subject.toLowerCase().includes(k.toLowerCase()) ||
        k.toLowerCase().includes(subject.toLowerCase())
    ) ||
    skillKeys[0] ||
    'Core Competency';

  // Contextual icon
  const sLower = subject.toLowerCase();
  let icon = BookOpen;
  if (sLower.includes('algorithm') || sLower.includes('code') || sLower.includes('software') || sLower.includes('system design')) {
    icon = Code;
  } else if (sLower.includes('ai') || sLower.includes('machine learning') || sLower.includes('neural') || sLower.includes('model')) {
    icon = Cpu;
  } else if (sLower.includes('design') || sLower.includes('ui') || sLower.includes('ux') || sLower.includes('wireframe')) {
    icon = Palette;
  } else if (sLower.includes('data') || sLower.includes('database') || sLower.includes('sql') || sLower.includes('nosql')) {
    icon = Database;
  } else if (sLower.includes('analytics') || sLower.includes('metrics')) {
    icon = BarChart3;
  } else if (sLower.includes('strategy') || sLower.includes('consulting') || sLower.includes('product') || sLower.includes('market')) {
    icon = Target;
  } else if (sLower.includes('people') || sLower.includes('hr') || sLower.includes('talent')) {
    icon = Users;
  } else if (sLower.includes('health') || sLower.includes('clinical') || sLower.includes('pharma')) {
    icon = Stethoscope;
  } else if (sLower.includes('agri') || sLower.includes('crop') || sLower.includes('food')) {
    icon = Sprout;
  } else if (sLower.includes('finance') || sLower.includes('accounting') || sLower.includes('valuation') || sLower.includes('banking')) {
    icon = TrendingUp;
  }

  return { icon, topics: topics.slice(0, 6), skillMapped: matchedSkill };
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  profile,
  onUpdateProfile,
  onAskAIAssistant,
  initialSubject,
  initialTopic,
}) => {
  // Selected specialization state
  const [selectedSpecialization, setSelectedSpecialization] = useState<SpecializationType>(() => profile.specialization);

  useEffect(() => {
    setSelectedSpecialization(profile.specialization);
  }, [profile.specialization]);

  // Available subjects for the current student's active specialization
  const specMeta = SPECIALIZATIONS.find((s) => s.id === selectedSpecialization) || SPECIALIZATIONS[0];
  const currentSpecRoles = specMeta?.roles || [];
  const availableSubjects = specMeta?.subjects && specMeta.subjects.length > 0
    ? specMeta.subjects
    : Object.keys(SUBJECT_CONFIG);

  // Target role state
  const [selectedRole, setSelectedRole] = useState<string>(() => {
    return profile.targetRole || currentSpecRoles[0] || 'Supply Chain Analyst';
  });

  // Config state
  const [selectedSubject, setSelectedSubject] = useState<string>(() => {
    if (initialSubject) return initialSubject;
    return availableSubjects[0] || 'Core Subject';
  });
  const [selectedTopic, setSelectedTopic] = useState(initialTopic || 'All Topics');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [questionCount, setQuestionCount] = useState<number>(3);
  const [isGenerating, setIsGenerating] = useState(false);

  const currentSubjectInfo = getSubjectDetails(selectedSubject, selectedSpecialization, profile.skills);
  const availableTopics = currentSubjectInfo.topics;

  useEffect(() => {
    if (initialSubject) {
      setSelectedSubject(initialSubject);
    } else if (!availableSubjects.includes(selectedSubject)) {
      setSelectedSubject(availableSubjects[0] || 'Core Subject');
    }
    if (initialTopic) {
      setSelectedTopic(initialTopic);
    }
  }, [initialSubject, initialTopic, selectedSpecialization, availableSubjects]);

  useEffect(() => {
    if (profile.targetRole && currentSpecRoles.includes(profile.targetRole)) {
      setSelectedRole(profile.targetRole);
    } else if (currentSpecRoles[0]) {
      setSelectedRole(currentSpecRoles[0]);
    }
  }, [selectedSpecialization, profile.targetRole]);

  // Active quiz state
  const [quizMode, setQuizMode] = useState<'config' | 'in-progress' | 'completed'>('config');
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [lastResult, setLastResult] = useState<QuizResult | null>(null);
  const [hasAppliedToSkills, setHasAppliedToSkills] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && quizMode === 'in-progress') {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, quizMode]);

  // Handle start quiz / generate quiz
  const generateQuiz = async () => {
    setIsGenerating(true);
    try {
      const activeTopicName =
        selectedTopic === 'All Topics' ? (availableTopics[0] || 'Core Foundations') : selectedTopic;

      // Determine active specialization directly from state
      let activeSpecialization: SpecializationType = selectedSpecialization;
      if (
        selectedRole.includes('Supply Chain') ||
        selectedRole.includes('Logistics') ||
        selectedRole.includes('Procurement') ||
        selectedSubject.includes('Inventory') ||
        selectedSubject.includes('Logistics') ||
        selectedSubject.includes('Procurement') ||
        selectedSubject.includes('Demand')
      ) {
        activeSpecialization = 'Supply Chain Management';
      } else if (
        selectedRole.includes('Operations') ||
        selectedRole.includes('Lean') ||
        selectedRole.includes('Six Sigma') ||
        selectedRole.includes('Process Improvement') ||
        selectedSubject.includes('Process Flow') ||
        selectedSubject.includes('Lean') ||
        selectedSubject.includes('Capacity') ||
        selectedSubject.includes('Operational KPIs')
      ) {
        activeSpecialization = 'Operations Management';
      }

      const res = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: selectedSubject,
          topic: activeTopicName,
          difficulty,
          count: questionCount,
          specialization: activeSpecialization,
          targetRole: selectedRole,
        }),
      });

      let questions: QuizQuestion[] = [];
      if (res.ok) {
        const data = await res.json();
        if (data.questions && data.questions.length > 0) {
          questions = data.questions;
        }
      }

      // If empty or error, fallback to curated question banks
      if (!questions.length) {
        const specPool = sampleQuizQuestionsBySpecialization[activeSpecialization] || [];
        const fullPool = [...specPool, ...sampleQuizQuestions];
        const filtered = fullPool.filter(
          (q) =>
            q.subject.toLowerCase() === selectedSubject.toLowerCase() ||
            q.specialization === activeSpecialization ||
            selectedTopic === 'All Topics'
        );
        questions = (filtered.length >= questionCount ? filtered : (specPool.length >= questionCount ? specPool : fullPool)).slice(0, questionCount);
      }

      setActiveQuestions(questions);
      setCurrentIndex(0);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setUserAnswers(new Array(questions.length).fill(-1));
      setSecondsElapsed(0);
      setIsTimerRunning(true);
      setHasAppliedToSkills(false);
      setQuizMode('in-progress');
    } catch (err) {
      console.error('Quiz generation error:', err);
      const activeSpec = selectedSpecialization;
      const specPool = sampleQuizQuestionsBySpecialization[activeSpec] || [];
      const fallbackList = (specPool.length >= questionCount ? specPool : sampleQuizQuestions).slice(0, questionCount);
      setActiveQuestions(fallbackList);
      setCurrentIndex(0);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setUserAnswers(new Array(fallbackList.length).fill(-1));
      setSecondsElapsed(0);
      setIsTimerRunning(true);
      setHasAppliedToSkills(false);
      setQuizMode('in-progress');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStartQuiz = generateQuiz;

  const currentQ = activeQuestions[currentIndex];

  const handleCheckAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    const updated = [...userAnswers];
    updated[currentIndex] = selectedOption;
    setUserAnswers(updated);
  };

  const handleNextQuestion = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(userAnswers[currentIndex + 1] !== -1 ? userAnswers[currentIndex + 1] : null);
      setIsAnswerSubmitted(userAnswers[currentIndex + 1] !== -1);
    } else {
      // Finish Quiz
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setIsTimerRunning(false);
    let correctCount = 0;
    const finalAnswers = activeQuestions.map((q, idx) => {
      const selected = userAnswers[idx];
      const isCorrect = selected === q.correctAnswerIndex;
      if (isCorrect) correctCount++;
      return {
        questionId: q.id,
        question: q.question,
        options: q.options,
        userSelected: selected,
        correctAnswer: q.correctAnswerIndex,
        isCorrect,
        explanation: q.explanation,
      };
    });

    const percentage = Math.round((correctCount / activeQuestions.length) * 100);

    const result: QuizResult = {
      id: `res_${Date.now()}`,
      specialization: profile.specialization,
      subject: selectedSubject,
      topic: selectedTopic,
      difficulty,
      score: correctCount,
      totalQuestions: activeQuestions.length,
      percentage,
      date: new Date().toLocaleDateString(),
      answers: finalAnswers,
    };

    setLastResult(result);
    setQuizMode('completed');

    // Trigger celebratory confetti if >= 70%
    if (percentage >= 70) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    // Auto increment student completed quiz count
    onUpdateProfile((prev) => ({
      ...prev,
      completedQuizzesCount: prev.completedQuizzesCount + 1,
    }));
  };

  // Sync quiz score to student's skill assessment
  const handleApplyToSkillAssessment = () => {
    if (!lastResult || hasAppliedToSkills) return;

    const skillInfo = getSubjectDetails(lastResult.subject, profile.specialization, profile.skills);
    const targetSkillName = skillInfo.skillMapped;

    onUpdateProfile((prev) => {
      const currentSkill = prev.skills[targetSkillName] || Object.values(prev.skills)[0];
      if (!currentSkill) return prev;

      // Weighted moving average: (Current Score * 4 + Quiz Percentage) / 5
      const newScore = Math.min(100, Math.max(0, Math.round((currentSkill.score * 4 + lastResult.percentage) / 5)));

      const updatedSkills = {
        ...prev.skills,
        [currentSkill.name]: {
          ...currentSkill,
          score: newScore,
          lastAssessedDate: 'Today',
        },
      };

      const skillValues = Object.values(updatedSkills) as Array<{ score: number }>;
      const avgSkillScore = Math.round(
        skillValues.reduce((sum: number, item) => sum + (item.score || 0), 0) / (skillValues.length || 1)
      );
      const academicScore = prev.academicScore || 82;
      const interviewScore = prev.interviewReadinessScore || 78;
      const placementReadinessScore = Math.round(
        avgSkillScore * 0.45 + academicScore * 0.25 + interviewScore * 0.3
      );

      return {
        ...prev,
        overallSkillScore: avgSkillScore,
        placementReadinessScore,
        skills: updatedSkills,
      };
    });

    setHasAppliedToSkills(true);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* MODE 1: Configuration / Topic Selection */}
      {quizMode === 'config' && (
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Interactive Assessment • {specMeta.title}
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 mt-2">
              Generate Practice Examination
            </h1>
            <p className="text-slate-600 text-sm max-w-xl mx-auto mt-2">
              Select your specialization, target role, and subject to generate authentic interview assessment questions powered by Gemini AI with deep domain constraints.
            </p>
          </div>

          {/* Specialization Discipline Switcher */}
          <div className="mb-6 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Active Specialization Track:
              </span>
              <span className="text-xs font-semibold text-indigo-600">
                Payload Target: {selectedSpecialization}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-1.5">
              {SPECIALIZATIONS.map((spec) => {
                const isSelected = selectedSpecialization === spec.id;
                const isSCM = spec.id === 'Supply Chain Management';
                const isOps = spec.id === 'Operations Management';
                return (
                  <button
                    key={spec.id}
                    type="button"
                    onClick={() => {
                      setSelectedSpecialization(spec.id);
                      const defaultRole = spec.roles?.[0] || 'Specialist';
                      setSelectedRole(defaultRole);
                      if (spec.subjects && spec.subjects.length > 0) {
                        setSelectedSubject(spec.subjects[0]);
                        setSelectedTopic('All Topics');
                      }
                      onUpdateProfile((prev) => ({
                        ...prev,
                        specialization: spec.id,
                        targetRole: defaultRole,
                      }));
                    }}
                    className={`px-2.5 py-2 rounded-xl text-xs font-semibold transition-all text-center flex flex-col items-center justify-center gap-1 cursor-pointer ${
                      isSelected
                        ? isSCM
                          ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-400/30'
                          : isOps
                          ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-400/30'
                          : 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-400/30'
                        : isSCM
                        ? 'bg-emerald-50/60 text-emerald-800 border border-emerald-200 hover:bg-emerald-100/70'
                        : isOps
                        ? 'bg-amber-50/60 text-amber-800 border border-amber-200 hover:bg-amber-100/70'
                        : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span className="truncate w-full text-[11px] leading-tight font-medium">
                      {isSCM ? '📦 Supply Chain' : isOps ? '⚙️ Operations' : spec.title.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Config Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
            
            {/* Target Role Practice Alignment */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Target Role Alignment:
                  </span>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    {selectedRole}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium">
                  Directly passed to Gemini prompt context
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {currentSpecRoles.map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => {
                      setSelectedRole(role);
                      onUpdateProfile((prev) => ({ ...prev, targetRole: role }));
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedRole === role
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    {role}
                  </button>
                ))}
                {selectedSpecialization !== 'Supply Chain Management' && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSpecialization('Supply Chain Management');
                      setSelectedRole('Supply Chain Analyst');
                      setSelectedSubject('Inventory Optimization & EOQ Modeling');
                      setSelectedTopic('All Topics');
                      onUpdateProfile((prev) => ({
                        ...prev,
                        specialization: 'Supply Chain Management',
                        targetRole: 'Supply Chain Analyst',
                      }));
                    }}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-all cursor-pointer"
                  >
                    📦 Supply Chain Analyst
                  </button>
                )}
                {selectedSpecialization !== 'Operations Management' && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSpecialization('Operations Management');
                      setSelectedRole('Operations Manager');
                      setSelectedSubject('Process Flow Analysis & Bottleneck Identification');
                      setSelectedTopic('All Topics');
                      onUpdateProfile((prev) => ({
                        ...prev,
                        specialization: 'Operations Management',
                        targetRole: 'Operations Manager',
                      }));
                    }}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-all cursor-pointer"
                  >
                    ⚙️ Operations Manager
                  </button>
                )}
              </div>
            </div>

            {/* Step 1: Subject Selection Grid */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                1. Select Subject Area ({selectedSpecialization})
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {availableSubjects.map((subject) => {
                  const conf = getSubjectDetails(subject, selectedSpecialization, profile.skills);
                  const Icon = conf.icon;
                  const isSelected = selectedSubject === subject;
                  return (
                    <button
                      key={subject}
                      onClick={() => {
                        setSelectedSubject(subject);
                        setSelectedTopic('All Topics');
                      }}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-50/70 border-indigo-600 ring-2 ring-indigo-600/20 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-medium text-slate-400">
                          {conf.skillMapped}
                        </span>
                      </div>
                      <div className="font-semibold text-sm text-slate-900">{subject}</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {conf.topics.length} core subtopics
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Topic Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                2. Choose Specific Sub-Topic
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTopic('All Topics')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                    selectedTopic === 'All Topics'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  All Topics Combined
                </button>
                {availableTopics.map((top) => (
                  <button
                    key={top}
                    onClick={() => setSelectedTopic(top)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      selectedTopic === top
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {top}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Difficulty & Question Count */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              {/* Difficulty */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  3. Difficulty Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setDifficulty(lvl)}
                      className={`py-2 text-xs font-semibold rounded-lg border text-center transition-colors cursor-pointer ${
                        difficulty === lvl
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question Count */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  4. Question Count
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[3, 5, 8].map((cnt) => (
                    <button
                      key={cnt}
                      onClick={() => setQuestionCount(cnt)}
                      className={`py-2 text-xs font-semibold rounded-lg border text-center transition-colors cursor-pointer ${
                        questionCount === cnt
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {cnt} Questions
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit / Launch Button */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-indigo-600 inline" />
                <span>Target Role Practice: <strong className="text-slate-900 font-semibold">{selectedRole}</strong> ({selectedSpecialization})</span>
              </div>
              <button
                id="start-quiz-button"
                onClick={handleStartQuiz}
                disabled={isGenerating}
                className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md shadow-indigo-100 flex items-center gap-2 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Generating Questions with Gemini AI...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Start Practice Quiz ({questionCount} Qs)</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODE 2: Quiz In Progress */}
      {quizMode === 'in-progress' && currentQ && (
        <div className="max-w-3xl mx-auto">
          
          {/* Top Bar: Progress & Timer */}
          <div className="flex items-center justify-between mb-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-900">
                Question {currentIndex + 1} of {activeQuestions.length}
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                {currentQ.subject}
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600">
                {currentQ.difficulty}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{formatTime(secondsElapsed)}</span>
            </div>
          </div>

          {/* Question Dots Bar */}
          <div className="flex gap-1.5 mb-6">
            {activeQuestions.map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full transition-all ${
                  i === currentIndex
                    ? 'bg-indigo-600'
                    : userAnswers[i] !== -1
                    ? 'bg-indigo-200'
                    : 'bg-slate-200'
                }`}
              />
            ))}
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8">
            
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug mb-6">
              {currentQ.question}
            </h2>

            {/* Options List */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctAnswerIndex;
                let optionStyle = 'border-slate-200 hover:border-indigo-200 hover:bg-slate-50 text-slate-700';

                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    optionStyle = 'border-emerald-500 bg-emerald-50/70 text-emerald-900 font-medium';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'border-rose-500 bg-rose-50/70 text-rose-900 font-medium';
                  } else {
                    optionStyle = 'border-slate-200 opacity-50 text-slate-500';
                  }
                } else if (isSelected) {
                  optionStyle = 'border-indigo-600 bg-indigo-50/60 text-indigo-950 font-medium ring-2 ring-indigo-600/20';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (!isAnswerSubmitted) {
                        setSelectedOption(idx);
                      }
                    }}
                    disabled={isAnswerSubmitted}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${optionStyle}`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                        isSelected || (isAnswerSubmitted && isCorrect)
                          ? isAnswerSubmitted
                            ? isCorrect
                              ? 'bg-emerald-600 text-white'
                              : 'bg-rose-600 text-white'
                            : 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="text-sm leading-relaxed flex-1">{opt}</span>
                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation Card (Appears after answer submitted) */}
            {isAnswerSubmitted && (
              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>Pedagogical Explanation</span>
                </div>
                <p className="text-sm text-slate-800 leading-relaxed">
                  {currentQ.explanation}
                </p>
                {currentQ.formula && (
                  <div className="text-xs bg-white p-2.5 rounded-lg border border-slate-200 font-mono text-indigo-900 mt-2">
                    <strong>Formula:</strong> {currentQ.formula}
                  </div>
                )}
                {currentQ.keyTakeaway && (
                  <div className="text-xs text-slate-600 pt-1">
                    💡 <strong>Key Takeaway:</strong> {currentQ.keyTakeaway}
                  </div>
                )}
              </div>
            )}

            {/* Footer Navigation Buttons */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  if (window.confirm('Quit this quiz session? Progress will be lost.')) {
                    setQuizMode('config');
                  }
                }}
                className="text-xs text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
              >
                Quit Quiz
              </button>

              <div className="flex items-center gap-2">
                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={selectedOption === null}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-semibold rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    Check Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                  >
                    <span>{currentIndex === activeQuestions.length - 1 ? 'View Final Results' : 'Next Question'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MODE 3: Quiz Results & Explanations */}
      {quizMode === 'completed' && lastResult && (
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Results Summary Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
              <Award className="w-8 h-8" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Quiz Completed!
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Subject: <strong>{lastResult.subject}</strong> • Topic: <strong>{lastResult.topic}</strong>
            </p>

            {/* Score Pill & Grade */}
            <div className="my-6 inline-flex flex-col items-center">
              <div className="text-5xl font-extrabold text-slate-900 tracking-tight">
                {lastResult.percentage}%
              </div>
              <div className="text-sm font-semibold text-slate-500 mt-1">
                {lastResult.score} of {lastResult.totalQuestions} Questions Correct
              </div>
              <div className="mt-2">
                {lastResult.percentage >= 80 ? (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    🌟 Placement Ready Performance
                  </span>
                ) : lastResult.percentage >= 60 ? (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
                    👍 Solid Foundation — Minor Gaps
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                    ⚠️ Needs Focused Revision
                  </span>
                )}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={handleApplyToSkillAssessment}
                disabled={hasAppliedToSkills}
                className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  hasAppliedToSkills
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 cursor-default'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs'
                }`}
              >
                {hasAppliedToSkills ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Applied to Skill Assessment</span>
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-4 h-4" />
                    <span>Sync to My Skill Assessment Scores</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setQuizMode('config')}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Take Another Quiz</span>
              </button>
            </div>
          </div>

          {/* Detailed Question Review List */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Detailed Review & Explanations ({lastResult.totalQuestions} Questions)
              </h3>
              <span className="text-xs text-slate-500">
                Review mistakes to strengthen placement readiness
              </span>
            </div>

            <div className="space-y-6">
              {lastResult.answers.map((ans, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-xl border ${
                    ans.isCorrect ? 'border-emerald-200 bg-emerald-50/20' : 'border-rose-200 bg-rose-50/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500">Q{idx + 1}.</span>
                      <h4 className="text-sm font-semibold text-slate-900">{ans.question}</h4>
                    </div>
                    {ans.isCorrect ? (
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 flex-shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800 flex items-center gap-1 flex-shrink-0">
                        <XCircle className="w-3.5 h-3.5" /> Incorrect
                      </span>
                    )}
                  </div>

                  <div className="text-xs space-y-1 mb-3">
                    <div className="text-slate-600">
                      <strong>Your Answer:</strong>{' '}
                      <span className={ans.isCorrect ? 'text-emerald-700 font-medium' : 'text-rose-700 font-medium'}>
                        {ans.userSelected !== -1 ? ans.options[ans.userSelected] : 'No answer'}
                      </span>
                    </div>
                    {!ans.isCorrect && (
                      <div className="text-emerald-700 font-medium">
                        <strong>Correct Answer:</strong> {ans.options[ans.correctAnswer]}
                      </div>
                    )}
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed">
                    <strong>Explanation:</strong> {ans.explanation}
                  </div>

                  {!ans.isCorrect && (
                    <div className="mt-2 text-right">
                      <button
                        onClick={() => onAskAIAssistant(`Can you explain why the correct answer to "${ans.question}" is "${ans.options[ans.correctAnswer]}" and how to remember this in an interview?`)}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1 cursor-pointer"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>Ask AI Assistant for deeper tutoring on this →</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
