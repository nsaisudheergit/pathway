import React, { useState } from 'react';
import {
  Compass,
  Target,
  Briefcase,
  TrendingUp,
  Sparkles,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Clock,
  Award,
  DollarSign,
  Building,
  HelpCircle,
  Video,
  ChevronRight,
  ListOrdered,
} from 'lucide-react';
import {
  StudentProfile,
  CareerPathOption,
  SkillRecommendation,
  SkillName,
} from '../types';
import { careerPathsData, initialRecommendations } from '../data/mockData';
import { careerPathsBySpecialization, SPECIALIZATIONS } from '../data/specializationData';

interface CareerGuidanceSectionProps {
  profile: StudentProfile;
  onUpdateProfile: (updater: (prev: StudentProfile) => StudentProfile) => void;
  onNavigateToQuiz: (subject?: string) => void;
  onNavigateToInterview: () => void;
  onAskAIAssistant: (query: string) => void;
}

export const CareerGuidanceSection: React.FC<CareerGuidanceSectionProps> = ({
  profile,
  onUpdateProfile,
  onNavigateToQuiz,
  onNavigateToInterview,
  onAskAIAssistant,
}) => {
  const activeCareerPaths = careerPathsBySpecialization[profile.specialization] || careerPathsData;
  const [recommendations, setRecommendations] = useState<SkillRecommendation[]>(initialRecommendations);
  const [selectedCareerPath, setSelectedCareerPath] = useState<CareerPathOption>(activeCareerPaths[0] || careerPathsData[0]);

  // Sync selected career path when specialization changes
  React.useEffect(() => {
    if (activeCareerPaths.length > 0) {
      setSelectedCareerPath(activeCareerPaths[0]);
    }
  }, [profile.specialization]);

  const targetRole = profile.targetRole || 'Financial Analyst';

  // Calculate gaps against current target role benchmarks
  const gaps = (Object.keys(profile.skills) as SkillName[]).map((skillName) => {
    const skill = profile.skills[skillName];
    const diff = skill.score - skill.benchmark;
    return {
      name: skillName,
      score: skill.score,
      benchmark: skill.benchmark,
      diff,
      status: diff >= 0 ? 'Exceeds / Meets' : 'Skill Gap',
    };
  });

  const highPriorityRecommendations = recommendations.filter((r) => r.priority === 'High');
  const otherRecommendations = recommendations.filter((r) => r.priority !== 'High');

  const handleToggleTaskStatus = (id: string) => {
    setRecommendations((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const nextStatus = r.status === 'Completed' ? 'In Progress' : 'Completed';
          return { ...r, status: nextStatus };
        }
        return r;
      })
    );
  };

  const handleSwitchTargetRole = (newRole: string) => {
    onUpdateProfile((prev) => ({
      ...prev,
      targetRole: newRole,
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Top Banner: Target Role & Readiness Context */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                Specialization: {profile.specialization}
              </span>
              <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Placement Cycle 2026
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Career Roadmap & Placement Readiness
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Tailored guidance aligned to your primary objective: becoming a high-performing <strong>{targetRole}</strong>. Discover prioritized skills, targeted practice modules, and alternative pathways.
            </p>
          </div>

          {/* Role Switcher Pill */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 flex-shrink-0">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-indigo-200 mb-1.5">
              Current Target Role
            </label>
            <select
              value={targetRole}
              onChange={(e) => handleSwitchTargetRole(e.target.value)}
              className="w-full bg-slate-900/80 border border-white/20 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-hidden cursor-pointer"
            >
              <option value="Financial Analyst">Financial Analyst (Corporate FP&A)</option>
              <option value="Investment Banking Analyst">Investment Banking Analyst</option>
              <option value="Equity Research Associate">Equity Research Associate</option>
              <option value="Credit & Risk Analyst">Credit & Risk Analyst</option>
            </select>
            <div className="text-[10px] text-indigo-200/70 mt-1.5">
              Readiness Score: <strong>{profile.placementReadinessScore}%</strong>
            </div>
          </div>
        </div>

      </div>

      {/* SECTION A: Target Role Benchmark Gap Analysis */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Role Skill Gap Analysis ({targetRole})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Comparison of your current scores against typical hiring benchmarks for top corporate finance & Wall Street cohorts.
            </p>
          </div>
          <span className="text-xs font-medium text-slate-400 hidden sm:block">
            Grey line = Target Benchmark
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {gaps.map((g) => {
            const isAhead = g.diff >= 0;
            return (
              <div
                key={g.name}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-slate-800 truncate mb-1">
                    {g.name}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-slate-900">{g.score}%</span>
                    <span className="text-xs text-slate-400">req. {g.benchmark}%</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block ${
                      isAhead
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {isAhead ? `+${g.diff}% Ready` : `${g.diff}% Gap`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION B: Recommended Skills to Learn */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Recommended Skills to Learn
            </h2>
            <p className="text-xs text-slate-500">
              Priority curriculum recommended based on your lowest scoring competencies.
            </p>
          </div>
          <span className="text-xs text-indigo-600 font-semibold">
            {recommendations.filter((r) => r.status === 'Completed').length} of {recommendations.length} completed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec) => {
            const isCompleted = rec.status === 'Completed';
            return (
              <div
                key={rec.id}
                className={`p-5 rounded-2xl border transition-all shadow-xs flex flex-col justify-between ${
                  isCompleted
                    ? 'bg-slate-50/80 border-slate-200 opacity-80'
                    : rec.priority === 'High'
                    ? 'bg-white border-indigo-200 ring-1 ring-indigo-100'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      {rec.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          rec.priority === 'High'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {rec.priority} Priority
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {rec.estimatedHours} hrs
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className={`text-sm font-bold text-slate-900 ${isCompleted ? 'line-through text-slate-500' : ''}`}>
                    {rec.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {rec.whyItMatters}
                  </p>

                  {/* Action Steps */}
                  <div className="mt-3 space-y-1">
                    {rec.recommendedActions.map((act, i) => (
                      <div key={i} className="text-xs text-slate-700 flex items-start gap-1.5">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => handleToggleTaskStatus(rec.id)}
                    className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
                  >
                    <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-600' : 'text-slate-300'}`} />
                    <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
                  </button>

                  <button
                    onClick={() => onAskAIAssistant(`Provide a step-by-step masterclass on "${rec.title}" for a ${targetRole} candidate.`)}
                    className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Practice with AI Tutor</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION C: Curated Topics to Practice */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Curated High-Yield Practice Topics
            </h2>
            <p className="text-xs text-slate-500">
              Directly targeted topics with the highest recurrence rate in {targetRole} screening tests.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { topic: '3-Statement Flow Mechanics', subject: 'Financial Accounting', tag: 'High Yield' },
            { topic: 'WACC & Capital Structure', subject: 'Corporate Finance', tag: 'Core Theory' },
            { topic: 'Advanced Lookup & Dynamic Formulas', subject: 'Excel for Finance', tag: 'Modeling Speed' },
            { topic: 'Gordon Growth Terminal Value', subject: 'Valuation & DCF', tag: 'DCF Trap' },
            { topic: 'DuPont Framework & Margin Ratios', subject: 'Financial Statement Analysis', tag: 'Analytics' },
            { topic: 'Variance Analysis & FP&A Commentary', subject: 'Business Analytics', tag: 'Corporate Case' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 transition-all shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.2 rounded">
                    {item.subject}
                  </span>
                  <span className="text-[10px] font-medium text-slate-400">
                    {item.tag}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{item.topic}</h4>
              </div>

              <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100">
                <button
                  onClick={() => onNavigateToQuiz(item.subject)}
                  className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                >
                  Take Quiz →
                </button>
                <button
                  onClick={() => onAskAIAssistant(`Teach me the core interview principles of ${item.topic}`)}
                  className="text-[11px] font-medium text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Ask Tutor
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION D: Suitable Career Pathways */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Suitable Career Pathways & Fit Matching
          </h2>
          <p className="text-xs text-slate-500">
            Alternative and progression career tracks in finance based on your quantitative, accounting, and communication profile.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {activeCareerPaths.map((career) => {
            const isSelected = selectedCareerPath.id === career.id;
            return (
              <button
                key={career.id}
                onClick={() => setSelectedCareerPath(career)}
                className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-indigo-50/80 border-indigo-600 ring-2 ring-indigo-600/20 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500">Fit Match</span>
                    <span
                      className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                        career.matchScore >= 80
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-indigo-100 text-indigo-800'
                      }`}
                    >
                      {career.matchScore}% Match
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {career.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {career.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 text-xs font-semibold text-indigo-700 flex items-center justify-between">
                  <span>View Details</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Career Path Detail Card */}
        {selectedCareerPath && (
          <div className="bg-white rounded-2xl border border-indigo-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-indigo-100 text-indigo-800">
                    {selectedCareerPath.matchScore}% Student Profile Match
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  {selectedCareerPath.title}
                </h3>
              </div>

              <div className="text-left sm:text-right">
                <div className="text-xs text-slate-400 font-medium">Average Starting Package</div>
                <div className="text-base font-bold text-slate-900">
                  {selectedCareerPath.averageStartingSalary}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              <div>
                <div className="font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Top Hiring Firms</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCareerPath.topEmployers.map((emp, i) => (
                    <span key={i} className="px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700 font-medium">
                      {emp}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Core Competencies Tested</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCareerPath.coreCompetencies.map((comp, i) => (
                    <span key={i} className="px-2.5 py-1 bg-indigo-50 text-indigo-800 rounded-lg font-medium border border-indigo-100">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Typical 5-Year Progression</span>
                </div>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {selectedCareerPath.typicalProgression}
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="text-slate-700">
                <strong>Your Current Skill Gap:</strong> {selectedCareerPath.skillGap}
              </div>
              <button
                onClick={() => onAskAIAssistant(`How can I tailor my resume and interview strategy for a ${selectedCareerPath.title} role?`)}
                className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors self-start sm:self-auto cursor-pointer"
              >
                Ask AI Career Prep Strategy →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SECTION E: 4-Phase Placement Milestones */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <h2 className="text-lg font-bold text-slate-900 mb-1">
          4-Phase College Placement Milestone Roadmap
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Track your progress through the university placement season timeline.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {[
            {
              phase: 'Phase 1',
              title: 'Academic & Accounting Core',
              status: 'Completed',
              desc: 'Mastered 3-statement links, revenue recognition, and basic ratio analysis.',
              badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
            },
            {
              phase: 'Phase 2',
              title: 'Advanced Excel & Modelling',
              status: 'In Progress (75%)',
              desc: 'Building debt schedules, sensitivity matrices, and DCF templates.',
              badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
            },
            {
              phase: 'Phase 3',
              title: 'Technical M&A & Case Rigor',
              status: 'Next Up',
              desc: 'Accretion/dilution math, commercial dilemmas, and speed case problem solving.',
              badgeColor: 'bg-slate-100 text-slate-700 border-slate-200',
            },
            {
              phase: 'Phase 4',
              title: 'Superday Interview Polish',
              status: 'Upcoming',
              desc: 'Behavioral STAR mastery, high-pressure technical walkthroughs, executive communication.',
              badgeColor: 'bg-slate-100 text-slate-700 border-slate-200',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {item.phase}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                    {item.status}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mb-1">{item.title}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
