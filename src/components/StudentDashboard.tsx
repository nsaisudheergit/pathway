import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  Award,
  BookOpen,
  Briefcase,
  Target,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Video,
  BarChart3,
  Calendar,
  Layers,
  ChevronRight,
  Compass,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { StudentProfile, StudentNavTab, SpecializationType, SkillCategoryData } from '../types';
import {
  SPECIALIZATIONS,
  sampleOpportunityListings,
  generateFiveStepActionPlan,
} from '../data/specializationData';

interface StudentDashboardProps {
  profile: StudentProfile;
  onNavigateTab: (tab: StudentNavTab) => void;
  onSelectSpecialization: (spec: SpecializationType) => void;
  onOpenProfileModal: () => void;
  onAskAIAssistant: (query: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  profile,
  onNavigateTab,
  onSelectSpecialization,
  onOpenProfileModal,
  onAskAIAssistant,
}) => {
  const [selectedSpecQuick, setSelectedSpecQuick] = useState<SpecializationType>(profile.specialization);

  const plan = generateFiveStepActionPlan(profile);
  const currentSpecMeta = SPECIALIZATIONS.find((s) => s.id === profile.specialization) || SPECIALIZATIONS[0];

  // Filter opportunities for active specialization or featured
  const relevantOpportunities = sampleOpportunityListings.filter(
    (o) => o.specialization === profile.specialization || o.isFeatured
  ).slice(0, 3);

  // Status color helpers
  const readinessColor =
    profile.placementReadinessScore >= 80
      ? 'from-emerald-500 to-teal-600 text-emerald-700 bg-emerald-50 border-emerald-200'
      : profile.placementReadinessScore >= 65
      ? 'from-indigo-500 to-blue-600 text-indigo-700 bg-indigo-50 border-indigo-200'
      : 'from-amber-500 to-orange-600 text-amber-700 bg-amber-50 border-amber-200';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* 1. Welcome & Specialization Hero Card */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl text-white p-6 sm:p-8 shadow-xl border border-indigo-900/40">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-48 h-48 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                {profile.degree || 'Career Readiness'} • Class of {profile.graduationYear}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                {profile.placementStatus}
              </span>
              <span className="text-xs text-slate-400">CGPA: {profile.cgpa} / 10.0</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Welcome back, {profile.name}! 👋
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              Targeting <strong className="text-indigo-200 font-semibold">{profile.targetRole}</strong> in{' '}
              <strong className="text-white font-semibold">{profile.specialization}</strong>.
              Bridging your academic foundations to placements with continuous AI intelligence.
            </p>

            {/* Specialization Quick Switcher Pill Bar */}
            <div className="pt-2">
              <div className="text-xs font-medium text-slate-400 mb-1.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>Switch Specialization to Personalize Dashboard & Content:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {SPECIALIZATIONS.map((spec) => {
                  const isCurrent = profile.specialization === spec.id;
                  return (
                    <button
                      key={spec.id}
                      onClick={() => onSelectSpecialization(spec.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30 font-semibold ring-2 ring-indigo-400'
                          : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
                      }`}
                    >
                      {spec.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Placement Readiness Meter / Gauge Box */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 w-full lg:w-72 flex-shrink-0 text-center flex flex-col items-center justify-center">
            <div className="text-xs uppercase tracking-wider text-slate-300 font-bold mb-1">
              Overall Career Readiness
            </div>
            <div className="relative my-2 flex items-center justify-center">
              <div className="text-5xl font-black text-white tracking-tight">
                {profile.placementReadinessScore}
                <span className="text-2xl font-bold text-indigo-300">%</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 font-medium">
              {profile.placementReadinessScore >= 80
                ? 'Superday & Final Round Ready'
                : profile.placementReadinessScore >= 65
                ? 'Strong Baseline (Closing Gaps)'
                : 'Foundations in Progress'}
            </p>
            <button
              onClick={() => onNavigateTab('skills')}
              className="mt-3 w-full py-1.5 px-3 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <span>View Full Skill Breakdown</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Core Four Pillars Scores Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Academic Score */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Academic Score</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{profile.academicScore}%</div>
          <p className="text-xs text-slate-500 mt-1">Based on coursework & semester grades</p>
          <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: `${profile.academicScore}%` }} />
          </div>
        </div>

        {/* Skill Score */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Domain Skill Score</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{profile.overallSkillScore}%</div>
          <p className="text-xs text-slate-500 mt-1">Calibrated across 5 specialization skills</p>
          <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${profile.overallSkillScore}%` }} />
          </div>
        </div>

        {/* Interview Readiness */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Interview Readiness</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <Video className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{profile.interviewReadinessScore}%</div>
          <p className="text-xs text-slate-500 mt-1">{profile.completedInterviewsCount} mock sessions completed</p>
          <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-purple-600 h-full rounded-full" style={{ width: `${profile.interviewReadinessScore}%` }} />
          </div>
        </div>

        {/* Quiz Performance */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quiz Performance</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <HelpCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{profile.completedQuizzesCount} Done</div>
          <p className="text-xs text-slate-500 mt-1">Average accuracy: 82% across modules</p>
          <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-emerald-600 h-full rounded-full" style={{ width: '82%' }} />
          </div>
        </div>
      </div>

      {/* 3. Main Split Section: AI Personalization Engine & Skill Gap Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 Cols): AI 5-Step Action Plan */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">AI Personalization Engine</h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Dynamic 5-step roadmap targeting your primary development gap for <strong className="text-slate-800">{profile.targetRole}</strong>
              </p>
            </div>

            {/* Gap badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold self-start sm:self-auto">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>Biggest Gap: {plan.lowestSkill} ({plan.lowestScore}%)</span>
            </div>
          </div>

          {/* 5-Step Action Plan Cards */}
          <div className="space-y-3">
            {plan.steps.map((s) => (
              <div
                key={s.step}
                className="group flex items-start gap-3.5 p-3.5 rounded-2xl border border-slate-200/80 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all"
              >
                <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-xs">
                  {s.step}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-900 transition-colors">
                      {s.title}
                    </h4>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 uppercase tracking-wider">
                      {s.actionType}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {s.description}
                  </p>
                </div>
                <button
                  onClick={() => onNavigateTab(s.targetTab)}
                  className="self-center p-2 rounded-xl text-indigo-600 hover:bg-indigo-100 transition-colors cursor-pointer"
                  title="Go to step"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* AI Recommendations Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-indigo-600" />
                <span>Recommended Practice This Week</span>
              </div>
              <p className="text-slate-600">
                Complete at least 2 quizzes on <strong className="text-slate-900">{plan.lowestSkill}</strong> to lift your baseline past 75%.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-purple-600" />
                <span>Recommended Interview Practice</span>
              </div>
              <p className="text-slate-600">
                Run 1 Technical round and 1 Situational round in the Mock Interview simulator before Friday.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Skill Matrix Snapshot */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-slate-900">Competency Matrix</h3>
              <button
                onClick={() => onNavigateTab('skills')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                View All
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              5 core skills tailored to {profile.specialization}
            </p>

            {/* Skills List */}
            <div className="space-y-3.5">
              {Object.values(profile.skills).map((skill: SkillCategoryData) => {
                const diff = skill.score - skill.benchmark;
                const isMeeting = diff >= 0;
                return (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">{skill.name}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900">{skill.score}%</span>
                        <span className="text-[11px] text-slate-400">/ {skill.benchmark}%</span>
                        {isMeeting ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                        )}
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          isMeeting ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${skill.score}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Hub Navigator Card */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs space-y-2">
            <div className="font-bold text-indigo-900 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-700" />
              <span>Specialization Learning Hub</span>
            </div>
            <p className="text-indigo-700 leading-relaxed">
              Explore comprehensive modules for {profile.specialization} with concept breakdowns, formulas, and interview questions.
            </p>
            <button
              onClick={() => onNavigateTab('learning_hub')}
              className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <span>Launch Learning Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Active Placement & Internship Opportunities Preview */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                <Briefcase className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Internship & Placement Opportunities</h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
                Demo Data / Sample Information
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified corporate recruiting drives matching your <strong className="text-slate-800">{profile.specialization}</strong> specialization.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('internships')}
            className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 self-start sm:self-auto cursor-pointer"
          >
            <span>View All Opportunities & Eligibility Checker</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Opportunities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {relevantOpportunities.map((opp) => (
            <div
              key={opp.id}
              className="rounded-2xl border border-slate-200 p-5 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg ${opp.logoColor} text-white font-bold text-xs flex items-center justify-center`}>
                      {opp.company[0]}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{opp.company}</div>
                      <div className="text-[10px] text-slate-400">{opp.location}</div>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      opp.type === 'Final Placement'
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {opp.type}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">{opp.role}</h4>
                  <p className="text-xs font-semibold text-emerald-700 mt-0.5">{opp.stipendOrSalary}</p>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {opp.description}
                </p>

                {/* Eligibility Check Mini Pill */}
                <div className="pt-2 flex items-center gap-2 text-[11px]">
                  <span className="text-slate-500">Min CGPA: {opp.minCgpa}</span>
                  <span className="text-slate-300">•</span>
                  <span className="font-semibold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Eligible (Your CGPA: {profile.cgpa})
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">Deadline: {opp.applicationDeadline}</span>
                <button
                  onClick={() => onNavigateTab('internships')}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  <span>Prep Guide</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
