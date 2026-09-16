import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Target,
  Sliders,
  RotateCcw,
  ArrowUpRight,
  BookOpen,
  HelpCircle,
  Video,
} from 'lucide-react';
import { SkillName, StudentProfile, SkillCategoryData } from '../types';

interface SkillAssessmentSectionProps {
  profile: StudentProfile;
  onUpdateProfile: (updater: (prev: StudentProfile) => StudentProfile) => void;
  onNavigateToQuiz: (subject: string) => void;
  onNavigateToInterview: () => void;
  onAskAIAssistant: (query: string) => void;
}

const SKILL_ICONS: Record<SkillName, string> = {
  Accounting: '📒',
  Excel: '📊',
  'Financial Modelling': '📐',
  'Financial Analysis': '📈',
  'Interview Skills': '🎙️',
};

export const SkillAssessmentSection: React.FC<SkillAssessmentSectionProps> = ({
  profile,
  onUpdateProfile,
  onNavigateToQuiz,
  onNavigateToInterview,
  onAskAIAssistant,
}) => {
  const [expandedSkill, setExpandedSkill] = useState<SkillName | null>('Financial Modelling');
  const [isCalibrating, setIsCalibrating] = useState(false);

  const skillsList = Object.values(profile.skills) as SkillCategoryData[];

  // Calculate readiness categorization
  const overallScore = profile.placementReadinessScore;
  const readinessTier =
    overallScore >= 82
      ? { label: 'Highly Placement Ready', desc: 'Ready for Superdays and top-tier analyst rounds.', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' }
      : overallScore >= 70
      ? { label: 'Strong Baseline — 3-4 Weeks Away', desc: 'Solid fundamentals; close gaps in modeling & interview walkthroughs.', color: 'text-indigo-700 bg-indigo-50 border-indigo-200' }
      : { label: 'Building Foundations', desc: 'Focus on core accounting flow and Excel speed.', color: 'text-amber-700 bg-amber-50 border-amber-200' };

  // Identify top strengths and critical gaps across all skills
  const allStrengths = skillsList.flatMap((s) => s.strengths.map((str) => ({ skill: s.name, text: str })));
  const allWeaknesses = skillsList.flatMap((s) => s.weaknesses.map((w) => ({ skill: s.name, text: w })));

  const handleScoreSliderChange = (skillName: SkillName, newScore: number) => {
    onUpdateProfile((prev) => {
      const updatedSkill = { ...prev.skills[skillName], score: newScore, lastAssessedDate: 'Just now' };
      const updatedSkills = { ...prev.skills, [skillName]: updatedSkill };
      const avg = Math.round(
        (updatedSkills.Accounting.score +
          updatedSkills.Excel.score +
          updatedSkills['Financial Modelling'].score +
          updatedSkills['Financial Analysis'].score +
          updatedSkills['Interview Skills'].score) /
          5
      );
      return {
        ...prev,
        placementReadinessScore: avg,
        skills: updatedSkills,
      };
    });
  };

  const handleResetScores = () => {
    onUpdateProfile((prev) => ({
      ...prev,
      placementReadinessScore: 75,
      skills: {
        Accounting: { ...prev.skills.Accounting, score: 78 },
        Excel: { ...prev.skills.Excel, score: 84 },
        'Financial Modelling': { ...prev.skills['Financial Modelling'], score: 64 },
        'Financial Analysis': { ...prev.skills['Financial Analysis'], score: 82 },
        'Interview Skills': { ...prev.skills['Interview Skills'], score: 68 },
      },
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Page Title & Readiness Hero */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Core Competency Matrix
            </span>
            <span className="text-xs text-slate-400">Target Role: {profile.targetRole}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-2">
            Placement Skill Assessment
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Evaluated across {Object.keys(profile.skills).length} foundational dimensions for {profile.targetRole} placements. Scores update continuously as you take quizzes and complete mock interviews.
          </p>
        </div>

        {/* Readiness Index Card */}
        <div className="flex items-center gap-5 bg-slate-50 p-4 rounded-xl border border-slate-200 flex-shrink-0">
          <div className="text-center">
            <div className="text-4xl font-extrabold text-slate-900 tracking-tight">
              {overallScore}%
            </div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
              Readiness Index
            </div>
          </div>
          <div className="border-l border-slate-200 pl-4 max-w-xs">
            <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${readinessTier.color}`}>
              {readinessTier.label}
            </span>
            <p className="text-xs text-slate-500 mt-1 leading-snug">
              {readinessTier.desc}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Calibrator Toggle */}
      <div className="flex items-center justify-between bg-slate-100 px-4 py-2 rounded-xl text-xs text-slate-600">
        <div className="flex items-center gap-2 font-medium">
          <Sliders className="w-3.5 h-3.5 text-indigo-600" />
          <span>Interactive Score Calibration:</span>
          <button
            onClick={() => setIsCalibrating(!isCalibrating)}
            className="text-indigo-600 hover:text-indigo-800 font-semibold underline cursor-pointer"
          >
            {isCalibrating ? 'Hide Sliders' : 'Adjust Scores Manually'}
          </button>
        </div>
        {isCalibrating && (
          <button
            onClick={handleResetScores}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset to Baseline</span>
          </button>
        )}
      </div>

      {/* Main 5 Skills Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {skillsList.map((skill) => {
          const isExpanded = expandedSkill === skill.name;
          const delta = skill.score - skill.benchmark;
          const isAhead = delta >= 0;

          return (
            <div
              key={skill.name}
              className={`bg-white rounded-2xl border transition-all shadow-xs flex flex-col justify-between ${
                isExpanded ? 'border-indigo-400 ring-2 ring-indigo-50' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{SKILL_ICONS[skill.name]}</span>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 leading-tight">
                        {skill.name}
                      </h3>
                      <span className="text-[11px] text-slate-400">
                        Assessed {skill.lastAssessedDate}
                      </span>
                    </div>
                  </div>

                  {/* Score Badge */}
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-slate-900">
                      {skill.score}%
                    </span>
                    <div className="text-[10px] font-semibold text-slate-400">
                      Target: {skill.benchmark}%
                    </div>
                  </div>
                </div>

                {/* Progress Bar & Benchmark Tick */}
                <div className="relative pt-1 mb-4">
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        skill.score >= skill.benchmark ? 'bg-emerald-500' : 'bg-indigo-600'
                      }`}
                      style={{ width: `${Math.min(100, skill.score)}%` }}
                    />
                  </div>
                  {/* Benchmark Marker line */}
                  <div
                    className="absolute top-0 w-0.5 h-4 bg-slate-400"
                    style={{ left: `${skill.benchmark}%` }}
                    title={`Target Role Benchmark: ${skill.benchmark}%`}
                  />
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                    <span className={isAhead ? 'text-emerald-600 font-semibold' : 'text-amber-600 font-semibold'}>
                      {isAhead ? `+${delta}% above target` : `${delta}% gap to target`}
                    </span>
                    <span>Benchmark: {skill.benchmark}%</span>
                  </div>
                </div>

                {/* Manual Calibration Slider (If toggled) */}
                {isCalibrating && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 mb-3 space-y-1">
                    <div className="flex justify-between text-[11px] font-medium text-slate-600">
                      <span>Calibrate Score</span>
                      <strong>{skill.score}%</strong>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="100"
                      value={skill.score}
                      onChange={(e) => handleScoreSliderChange(skill.name, parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                )}

                {/* Strengths & Weaknesses Snapshot */}
                <div className="space-y-2.5 text-xs">
                  {/* Strengths */}
                  <div>
                    <div className="flex items-center gap-1 font-semibold text-emerald-800 text-[11px] uppercase tracking-wider mb-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Key Strength</span>
                    </div>
                    <p className="text-slate-700 bg-emerald-50/50 p-2 rounded-lg border border-emerald-100/60 leading-snug">
                      {skill.strengths[0]}
                    </p>
                  </div>

                  {/* Weaknesses */}
                  <div>
                    <div className="flex items-center gap-1 font-semibold text-amber-800 text-[11px] uppercase tracking-wider mb-1">
                      <AlertTriangle className="w-3 h-3 text-amber-600" />
                      <span>Identified Weakness</span>
                    </div>
                    <p className="text-slate-700 bg-amber-50/50 p-2 rounded-lg border border-amber-100/60 leading-snug">
                      {skill.weaknesses[0]}
                    </p>
                  </div>
                </div>

                {/* Sub-skill competency breakdown (expanded) */}
                {isExpanded && (
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Sub-Competency Mastery
                    </div>
                    {skill.subSkills.map((sub, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="flex justify-between text-xs text-slate-700">
                          <span className="truncate max-w-[180px]">{sub.name}</span>
                          <span className="font-semibold">{sub.score}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 rounded-full"
                            style={{ width: `${sub.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer: Expand & Action shortcuts */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 rounded-b-2xl flex items-center justify-between text-xs">
                <button
                  onClick={() => setExpandedSkill(isExpanded ? null : skill.name)}
                  className="text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <span>{isExpanded ? 'Collapse' : 'View Subskills'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onAskAIAssistant(`How can I improve my ${skill.name} skills, specifically addressing "${skill.weaknesses[0]}" for ${profile.targetRole} interviews?`)}
                    className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>Tutor Me</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Global Strengths vs Weaknesses Summary Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
        
        {/* Identified Strengths */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Candidate Strengths (Ready to Highlight on Resume)
            </h3>
          </div>
          <div className="space-y-2">
            {allStrengths.slice(0, 4).map((str, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200/60 flex items-start gap-2.5 text-xs text-slate-800"
              >
                <span className="font-bold text-emerald-700 uppercase tracking-wider text-[10px] bg-emerald-100 px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5">
                  {str.skill}
                </span>
                <span className="leading-snug">{str.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Identified Weaknesses */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              High-Priority Growth Gaps (Target Before Placement)
            </h3>
          </div>
          <div className="space-y-2">
            {allWeaknesses.slice(0, 4).map((w, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-amber-50/50 border border-amber-200/60 flex items-start justify-between gap-2 text-xs text-slate-800"
              >
                <div className="flex items-start gap-2">
                  <span className="font-bold text-amber-700 uppercase tracking-wider text-[10px] bg-amber-100 px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5">
                    {w.skill}
                  </span>
                  <span className="leading-snug">{w.text}</span>
                </div>
                <button
                  onClick={() => onAskAIAssistant(`Teach me step-by-step how to resolve this gap: "${w.text}" in ${w.skill}`)}
                  className="text-indigo-600 hover:text-indigo-900 font-semibold flex-shrink-0 cursor-pointer"
                >
                  Practice →
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
