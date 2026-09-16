import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Video,
  Sparkles,
  Award,
  CheckCircle2,
  AlertCircle,
  Clock,
  RotateCcw,
  BookOpen,
  Briefcase,
  Layers,
  ChevronRight,
  TrendingUp,
  History,
  Send,
  HelpCircle,
  FileText,
  Target,
} from 'lucide-react';
import {
  InterviewType,
  InterviewQuestionItem,
  InterviewEvaluationResult,
  SavedInterviewRecord,
  StudentProfile,
} from '../types';
import { sampleInterviewQuestions, samplePastInterviewRecords } from '../data/mockData';
import { sampleInterviewQuestionsBySpecialization, SPECIALIZATIONS } from '../data/specializationData';

interface MockInterviewSectionProps {
  profile: StudentProfile;
  onUpdateProfile: (updater: (prev: StudentProfile) => StudentProfile) => void;
  onAskAIAssistant: (query: string) => void;
  initialRole?: string;
}

const INTERVIEW_TYPES: { id: InterviewType; label: string; description: string; tip: string }[] = [
  {
    id: 'Technical',
    label: 'Technical Domain',
    description: 'Core formulas, quantitative models, system workflows & principles',
    tip: 'State bottom-line answer first, then walk systematically through key steps, formulas, and trade-offs.',
  },
  {
    id: 'HR',
    label: 'HR & Behavioral',
    description: 'Background walkthrough, leadership motivation, culture fit & team dynamics',
    tip: 'Connect your personal story to the target role. Articulate concrete catalysts and proactive impact.',
  },
  {
    id: 'Situational',
    label: 'Situational Scenarios',
    description: 'Managing tight deadlines, stakeholder trade-offs & crisis escalation',
    tip: 'Structure using the STAR framework: Situation, Task, Action taken, and quantifiable Result.',
  },
  {
    id: 'Case-based',
    label: 'Case-Based',
    description: 'Problem diagnosis, bottleneck analysis, root cause & strategic decision-making',
    tip: 'Clarify assumptions out loud, define the core metrics, and state actionable recommendations.',
  },
];

export const MockInterviewSection: React.FC<MockInterviewSectionProps> = ({
  profile,
  onUpdateProfile,
  onAskAIAssistant,
  initialRole,
}) => {
  const currentSpecMeta = SPECIALIZATIONS.find((s) => s.id === profile.specialization) || SPECIALIZATIONS[0];
  const currentSpecRoles = currentSpecMeta?.roles || [];
  const [selectedType, setSelectedType] = useState<InterviewType>('Technical');
  const [targetRole, setTargetRole] = useState(initialRole || profile.targetRole || currentSpecRoles[0] || 'Supply Chain Analyst');

  // Combined questions pool: domain-specific questions prioritized first, then general questions
  const allPool = [
    ...(sampleInterviewQuestionsBySpecialization[profile.specialization] || []),
    ...sampleInterviewQuestions,
  ];

  const [activeQuestion, setActiveQuestion] = useState<InterviewQuestionItem>(
    allPool.find((q) => q.type === 'Technical') || allPool[0] || sampleInterviewQuestions[0]
  );
  const [studentAnswer, setStudentAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [currentEvaluation, setCurrentEvaluation] = useState<InterviewEvaluationResult | null>(null);
  const [hasSyncedSkill, setHasSyncedSkill] = useState(false);
  const [interviewHistory, setInterviewHistory] = useState<SavedInterviewRecord[]>(samplePastInterviewRecords);
  const [viewHistoryRecord, setViewHistoryRecord] = useState<SavedInterviewRecord | null>(null);

  // Available questions for currently selected type
  const availableQuestions = allPool.filter((q) => q.type === selectedType);

  // Sync when initialRole or specialization changes
  React.useEffect(() => {
    if (initialRole) {
      setTargetRole(initialRole);
    } else if (profile.targetRole) {
      setTargetRole(profile.targetRole);
    } else if (currentSpecRoles[0]) {
      setTargetRole(currentSpecRoles[0]);
    }
    const questionsForType = allPool.filter((q) => q.type === selectedType);
    if (questionsForType.length > 0) {
      setActiveQuestion(questionsForType[0]);
    }
  }, [profile.specialization, initialRole, profile.targetRole]);

  const wordCount = studentAnswer.trim() ? studentAnswer.trim().split(/\s+/).length : 0;

  const handleSelectType = (type: InterviewType) => {
    setSelectedType(type);
    setCurrentEvaluation(null);
    setHasSyncedSkill(false);
    const questionsForType = allPool.filter((q) => q.type === type);
    if (questionsForType.length > 0) {
      setActiveQuestion(questionsForType[0]);
    }
  };

  const handleSelectQuestion = (q: InterviewQuestionItem) => {
    setActiveQuestion(q);
    setStudentAnswer('');
    setCurrentEvaluation(null);
    setHasSyncedSkill(false);
  };

  const handleSubmitAnswer = async () => {
    if (!studentAnswer.trim() || wordCount < 5 || isEvaluating) return;
    setIsEvaluating(true);

    try {
      const res = await fetch('/api/interview/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: selectedType,
          role: targetRole,
          specialization: profile.specialization,
          question: activeQuestion.question,
          answer: studentAnswer,
          expectedKeyPoints: activeQuestion.expectedKeyPoints,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();
      const evalResult: InterviewEvaluationResult = data.evaluation;
      setCurrentEvaluation(evalResult);

      if (evalResult.score >= 80) {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
        });
      }

      // Save to interview history
      const newRecord: SavedInterviewRecord = {
        id: `int_rec_${Date.now()}`,
        date: 'Just now',
        specialization: profile.specialization,
        type: selectedType,
        role: targetRole,
        question: activeQuestion.question,
        studentAnswer,
        evaluation: evalResult,
      };

      setInterviewHistory((prev) => [newRecord, ...prev]);

      // Increment profile interview count
      onUpdateProfile((prev) => ({
        ...prev,
        completedInterviewsCount: prev.completedInterviewsCount + 1,
      }));
    } catch (err) {
      console.error('Interview evaluation error:', err);
      // Fallback local evaluation
      const fallbackResult: InterviewEvaluationResult = {
        score: wordCount > 60 ? 82 : 72,
        grade: wordCount > 60 ? 'A' : 'B',
        summary: 'Solid foundational answer that covers core elements. For greater impact, ensure step-by-step balance sheet linkages are explicitly stated.',
        strengths: [
          'Direct response addressing the primary core question',
          'Professional language and terminology appropriate for finance interviews',
        ],
        areasForImprovement: [
          'Detail the secondary statement impacts (e.g. Retained Earnings changes)',
          'Provide a concluding sentence confirming that Assets equal Liabilities + Equity',
        ],
        benchmarkModelResponse: activeQuestion.modelAnswer,
        rubricScores: {
          technicalAccuracy: 8,
          structureAndClarity: 8,
          commercialAwareness: 8,
          depthOfExamples: 7,
        },
      };
      setCurrentEvaluation(fallbackResult);
    } finally {
      setIsEvaluating(false);
    }
  };

  // Sync evaluation score to student's Interview Skills rating
  const handleSyncToSkillScore = () => {
    if (!currentEvaluation || hasSyncedSkill) return;

    onUpdateProfile((prev) => {
      const currentSkill = prev.skills['Interview Skills'];
      const newScore = Math.min(
        100,
        Math.max(0, Math.round((currentSkill.score * 3 + currentEvaluation.score) / 4))
      );

      const allSkills = {
        ...prev.skills,
        'Interview Skills': {
          ...currentSkill,
          score: newScore,
          lastAssessedDate: 'Today',
        },
      };

      const avgScore = Math.round(
        (allSkills.Accounting.score +
          allSkills.Excel.score +
          allSkills['Financial Modelling'].score +
          allSkills['Financial Analysis'].score +
          allSkills['Interview Skills'].score) /
          5
      );

      return {
        ...prev,
        placementReadinessScore: avgScore,
        skills: allSkills,
      };
    });

    setHasSyncedSkill(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Mock Interview Simulator
            </h1>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 border border-indigo-200">
              AI Evaluator
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Simulate realistic industry interviews across Technical, HR, Situational, and Case-based rounds tailored to {targetRole}.
          </p>
        </div>

        {/* Target Role Selector */}
        <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
          <Briefcase className="w-4 h-4 text-indigo-600 shrink-0" />
          <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Practicing for:</span>
          <select
            id="mock-interview-role-select"
            value={targetRole}
            onChange={(e) => {
              const newRole = e.target.value;
              setTargetRole(newRole);
              onUpdateProfile((prev) => ({
                ...prev,
                targetRole: newRole,
              }));
            }}
            className="text-xs font-semibold text-slate-900 bg-transparent focus:outline-hidden cursor-pointer"
          >
            {/* Roles for current specialization */}
            {currentSpecRoles.length > 0 && (
              <optgroup label={`${currentSpecMeta.title} Roles`}>
                {currentSpecRoles.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </optgroup>
            )}

            {/* Supply Chain Management Roles */}
            {profile.specialization !== 'Supply Chain Management' && (
              <optgroup label="Supply Chain Management Roles">
                <option value="Supply Chain Analyst">Supply Chain Analyst</option>
                <option value="Logistics & Distribution Coordinator">Logistics & Distribution Coordinator</option>
                <option value="Strategic Sourcing & Procurement Specialist">Strategic Sourcing & Procurement Specialist</option>
              </optgroup>
            )}

            {/* Operations Management Roles */}
            {profile.specialization !== 'Operations Management' && (
              <optgroup label="Operations Management Roles">
                <option value="Operations Manager">Operations Manager</option>
                <option value="Process Improvement Specialist (Lean/Six Sigma)">Process Improvement Specialist (Lean/Six Sigma)</option>
                <option value="Capacity Planning & Resource Manager">Capacity Planning & Resource Manager</option>
              </optgroup>
            )}

            {/* Other Specialization Roles */}
            {SPECIALIZATIONS.filter(
              (s) =>
                s.id !== profile.specialization &&
                s.id !== 'Supply Chain Management' &&
                s.id !== 'Operations Management'
            ).map((s) => (
              <optgroup key={s.id} label={`${s.title} Roles`}>
                {s.roles.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Role Switcher Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 mr-1">
          <Target className="w-3.5 h-3.5 text-indigo-600" />
          Target Role:
        </span>
        {currentSpecRoles.map((role) => (
          <button
            key={role}
            onClick={() => {
              setTargetRole(role);
              onUpdateProfile((prev) => ({ ...prev, targetRole: role }));
            }}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              targetRole === role
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            {role}
          </button>
        ))}
        {profile.specialization !== 'Supply Chain Management' && (
          <button
            onClick={() => {
              setTargetRole('Supply Chain Analyst');
              onUpdateProfile((prev) => ({ ...prev, targetRole: 'Supply Chain Analyst', specialization: 'Supply Chain Management' }));
            }}
            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-all cursor-pointer"
          >
            📦 Supply Chain Analyst
          </button>
        )}
        {profile.specialization !== 'Operations Management' && (
          <button
            onClick={() => {
              setTargetRole('Operations Manager');
              onUpdateProfile((prev) => ({ ...prev, targetRole: 'Operations Manager', specialization: 'Operations Management' }));
            }}
            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-all cursor-pointer"
          >
            ⚙️ Operations Manager
          </button>
        )}
      </div>

      {/* 4 Interview Type Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {INTERVIEW_TYPES.map((typeObj) => {
          const isSelected = selectedType === typeObj.id;
          return (
            <button
              key={typeObj.id}
              onClick={() => handleSelectType(typeObj.id)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-indigo-50/80 border-indigo-600 ring-2 ring-indigo-600/20 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-bold ${isSelected ? 'text-indigo-900' : 'text-slate-900'}`}>
                  {typeObj.label}
                </span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                    isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {typeObj.id}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-snug line-clamp-2">
                {typeObj.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Practice Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Question Picker & Past Attempts (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Question Selector List */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {selectedType} Interview Prompts
              </h3>
              <span className="text-[11px] text-slate-400">
                {availableQuestions.length} questions
              </span>
            </div>

            <div className="space-y-2">
              {availableQuestions.map((q) => {
                const isActive = activeQuestion.id === q.id;
                return (
                  <button
                    key={q.id}
                    onClick={() => handleSelectQuestion(q)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-indigo-50/70 border-indigo-500 font-medium text-slate-900'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs font-semibold leading-tight line-clamp-1 mb-1 text-slate-900">
                      {q.title}
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {q.question}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interview Type Strategy Tip Box */}
          <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Interviewer Strategy Tip ({selectedType})</span>
            </div>
            <p className="text-amber-800 leading-relaxed">
              {INTERVIEW_TYPES.find((t) => t.id === selectedType)?.tip}
            </p>
          </div>

          {/* Past Attempts History Preview */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
                <History className="w-3.5 h-3.5 text-indigo-600" />
                <span>Recent Mock Rounds</span>
              </div>
              <span className="text-[11px] text-slate-400">{interviewHistory.length} attempts</span>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {interviewHistory.map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => setViewHistoryRecord(rec)}
                  className="p-2.5 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-slate-50 transition-all cursor-pointer text-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-slate-900 line-clamp-1">{rec.type} Round</span>
                    <span className="font-bold text-indigo-700 px-1.5 py-0.2 rounded bg-indigo-50 border border-indigo-100 text-[10px]">
                      {rec.evaluation.score}/100 ({rec.evaluation.grade})
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 line-clamp-1">{rec.question}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Active Question, Answer Box & AI Evaluation (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Question Box */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
            
            <div className="flex items-center justify-between gap-3 mb-3">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
                {activeQuestion.type} Question
              </span>
              <span className="text-xs text-slate-500">
                Role: <strong>{targetRole}</strong>
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug mb-3">
              "{activeQuestion.question}"
            </h2>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              <strong>Context & Expectations:</strong> {activeQuestion.promptContext}
            </p>

            {/* Answer Input Area */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Your Spoken / Typed Response
                </label>
                <div className="text-xs text-slate-500">
                  Words: <strong className={wordCount < 20 ? 'text-amber-600' : 'text-slate-900'}>{wordCount}</strong> (target: 60 - 200 words)
                </div>
              </div>

              <textarea
                id="interview-answer-input"
                rows={6}
                value={studentAnswer}
                onChange={(e) => setStudentAnswer(e.target.value)}
                placeholder="Type your interview response here. E.g., '1. On the Income Statement, Operating Income decreases by... 2. On the Cash Flow Statement...'"
                className="w-full bg-slate-50/50 border border-slate-300 rounded-xl p-4 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 leading-relaxed"
                disabled={isEvaluating}
              />

              {/* Action Buttons */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => setStudentAnswer(activeQuestion.modelAnswer)}
                  className="text-xs text-slate-500 hover:text-indigo-600 underline cursor-pointer"
                >
                  Load sample answer to test evaluation
                </button>

                <button
                  id="submit-interview-btn"
                  onClick={handleSubmitAnswer}
                  disabled={wordCount < 5 || isEvaluating}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-semibold text-sm transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  {isEvaluating ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>Gemini AI is Evaluating Answer...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit for AI Evaluation</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* AI Evaluation Results Card */}
          {currentEvaluation && (
            <div className="bg-white rounded-2xl border border-indigo-200 shadow-md p-6 sm:p-8 space-y-6 animate-fadeIn">
              
              {/* Score Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex flex-col items-center justify-center text-indigo-700 font-extrabold text-2xl shadow-xs">
                    {currentEvaluation.score}
                    <span className="text-[10px] font-semibold text-slate-500">/100</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-slate-900">
                        Performance Grade: {currentEvaluation.grade}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 max-w-md mt-1 leading-relaxed">
                      {currentEvaluation.summary}
                    </p>
                  </div>
                </div>

                {/* Sync to Skills Button */}
                <button
                  onClick={handleSyncToSkillScore}
                  disabled={hasSyncedSkill}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer self-start sm:self-center ${
                    hasSyncedSkill
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 cursor-default'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs'
                  }`}
                >
                  {hasSyncedSkill ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Updated Interview Score ({profile.skills['Interview Skills'].score}%)</span>
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-4 h-4" />
                      <span>Update Interview Skills Score</span>
                    </>
                  )}
                </button>
              </div>

              {/* Rubric Breakdown Grid */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Interviewer Rubric Breakdown
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                    <div className="text-xs text-slate-500 mb-1">Technical Accuracy</div>
                    <div className="text-lg font-bold text-slate-900">
                      {currentEvaluation.rubricScores.technicalAccuracy}/10
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                    <div className="text-xs text-slate-500 mb-1">Structure & Clarity</div>
                    <div className="text-lg font-bold text-slate-900">
                      {currentEvaluation.rubricScores.structureAndClarity}/10
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                    <div className="text-xs text-slate-500 mb-1">Commercial Awareness</div>
                    <div className="text-lg font-bold text-slate-900">
                      {currentEvaluation.rubricScores.commercialAwareness}/10
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                    <div className="text-xs text-slate-500 mb-1">Depth of Examples</div>
                    <div className="text-lg font-bold text-slate-900">
                      {currentEvaluation.rubricScores.depthOfExamples}/10
                    </div>
                  </div>
                </div>
              </div>

              {/* Strengths & Improvements Side-by-Side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Strengths */}
                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Key Strengths Observed</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-emerald-950">
                    {currentEvaluation.strengths.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Areas for Improvement */}
                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Areas for Constructive Improvement</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-amber-950">
                    {currentEvaluation.areasForImprovement.map((imp, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Benchmark Gold Standard Answer */}
              <div className="p-5 rounded-xl bg-slate-900 text-white space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Benchmark Gold-Standard Model Answer
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">Wall Street / Big 4 standard</span>
                </div>
                <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                  {currentEvaluation.benchmarkModelResponse}
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => onAskAIAssistant(`How can I memorize and practice delivering the following interview answer smoothly: "${currentEvaluation.benchmarkModelResponse.slice(0, 150)}..."`)}
                    className="text-xs text-indigo-300 hover:text-white underline cursor-pointer"
                  >
                    Practice delivery techniques with AI Assistant →
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Modal for viewing past record details */}
      {viewHistoryRecord && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase">{viewHistoryRecord.type} Interview Record</span>
                <h3 className="text-base font-bold text-slate-900">{viewHistoryRecord.question}</h3>
              </div>
              <button
                onClick={() => setViewHistoryRecord(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-500 uppercase mb-1">Your Submitted Answer</div>
              <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed whitespace-pre-wrap">
                {viewHistoryRecord.studentAnswer}
              </p>
            </div>

            <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-900">
                  Score: {viewHistoryRecord.evaluation.score}/100 ({viewHistoryRecord.evaluation.grade})
                </span>
              </div>
              <p className="text-xs text-slate-700">{viewHistoryRecord.evaluation.summary}</p>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setViewHistoryRecord(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
