import React, { useState } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Calendar,
  MapPin,
  Award,
  ChevronRight,
  Sparkles,
  ExternalLink,
  BookOpen,
  Video,
  Info,
} from 'lucide-react';
import { StudentProfile, OpportunityListing, SpecializationType, StudentNavTab } from '../types';
import { sampleOpportunityListings, SPECIALIZATIONS } from '../data/specializationData';

interface InternshipHubSectionProps {
  profile: StudentProfile;
  onNavigateTab: (tab: StudentNavTab) => void;
  onStartInterviewForRole: (role: string, specialization: SpecializationType) => void;
}

export const InternshipHubSection: React.FC<InternshipHubSectionProps> = ({
  profile,
  onNavigateTab,
  onStartInterviewForRole,
}) => {
  const [selectedSpec, setSelectedSpec] = useState<string>(profile.specialization);
  const [typeFilter, setTypeFilter] = useState<'All' | 'Internship' | 'Final Placement'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOpportunityForPrep, setSelectedOpportunityForPrep] = useState<OpportunityListing | null>(null);

  // Filter listings
  const filteredListings = sampleOpportunityListings.filter((opp) => {
    if (selectedSpec !== 'All' && opp.specialization !== selectedSpec) return false;
    if (typeFilter !== 'All' && opp.type !== typeFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        opp.company.toLowerCase().includes(q) ||
        opp.role.toLowerCase().includes(q) ||
        opp.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Eligibility Evaluation helper
  const evaluateEligibility = (opp: OpportunityListing) => {
    const isCgpaMet = profile.cgpa >= opp.minCgpa;
    const skillGaps: { skill: string; current: number; required: number }[] = [];

    opp.requiredSkills.forEach((req) => {
      const studentSkill = profile.skills[req.skill];
      const currentScore = studentSkill ? studentSkill.score : 60;
      if (currentScore < req.minScore) {
        skillGaps.push({ skill: req.skill, current: currentScore, required: req.minScore });
      }
    });

    let status: 'Eligible' | 'Skill Gaps' | 'Not Eligible' = 'Eligible';
    if (!isCgpaMet) {
      status = 'Not Eligible';
    } else if (skillGaps.length > 0) {
      status = 'Skill Gaps';
    }

    return { isCgpaMet, skillGaps, status };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Briefcase className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Internship & Placement Hub
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Real-time campus recruitment listings, automated eligibility analysis, and role preparation roadmaps.
          </p>
        </div>

        {/* Demo Data Disclaimer Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold self-start md:self-auto">
          <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>Demo Data / Sample Illustrative Information</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search companies, roles, or cities (e.g. Goldman, Mumbai, Brand Manager)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Type Filter Buttons */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            {(['All', 'Internship', 'Final Placement'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  typeFilter === t
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Specialization Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-500 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Specialization:</span>
          </span>
          <button
            onClick={() => setSelectedSpec('All')}
            className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer ${
              selectedSpec === 'All'
                ? 'bg-slate-900 text-white font-semibold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Specializations
          </button>
          {SPECIALIZATIONS.map((spec) => (
            <button
              key={spec.id}
              onClick={() => setSelectedSpec(spec.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedSpec === spec.id
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {spec.title}
            </button>
          ))}
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredListings.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-700">No opportunities match this filter</h3>
            <p className="text-xs text-slate-500">Reset your search filter or select another specialization.</p>
            <button
              onClick={() => {
                setSelectedSpec('All');
                setTypeFilter('All');
                setSearchQuery('');
              }}
              className="mt-2 text-xs font-bold text-indigo-600 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredListings.map((opp) => {
            const eligibility = evaluateEligibility(opp);
            return (
              <div
                key={opp.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  {/* Top Bar: Logo, Name & Type */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl ${opp.logoColor} text-white font-black text-sm flex items-center justify-center shadow-xs`}
                      >
                        {opp.company[0]}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 leading-tight">{opp.company}</h3>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" />
                          <span>{opp.location}</span>
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        opp.type === 'Final Placement'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {opp.type}
                    </span>
                  </div>

                  {/* Role Title & Compensation */}
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900 leading-snug">{opp.role}</h4>
                    <div className="text-sm font-bold text-emerald-700 mt-1">{opp.stipendOrSalary}</div>
                  </div>

                  {/* Specialization & Openings Pills */}
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-semibold text-[11px]">
                      {opp.specialization}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium text-[11px]">
                      {opp.openings} Openings
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium text-[11px]">
                      Min CGPA: {opp.minCgpa}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {opp.description}
                  </p>

                  {/* Automated Eligibility Verdict */}
                  <div
                    className={`p-3 rounded-2xl border text-xs space-y-1.5 ${
                      eligibility.status === 'Eligible'
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                        : eligibility.status === 'Skill Gaps'
                        ? 'bg-amber-50/70 border-amber-200 text-amber-900'
                        : 'bg-rose-50/70 border-rose-200 text-rose-900'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span className="flex items-center gap-1.5">
                        {eligibility.status === 'Eligible' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : eligibility.status === 'Skill Gaps' ? (
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-600" />
                        )}
                        <span>
                          {eligibility.status === 'Eligible'
                            ? 'You Meet All Criteria!'
                            : eligibility.status === 'Skill Gaps'
                            ? 'Eligible (Improve Target Skills)'
                            : 'CGPA Below Requirement'}
                        </span>
                      </span>
                      <span className="text-[10px] font-semibold">Your CGPA: {profile.cgpa}</span>
                    </div>

                    {eligibility.skillGaps.length > 0 && (
                      <p className="text-[11px] text-slate-600">
                        Gaps to close:{' '}
                        {eligibility.skillGaps.map((g) => `${g.skill} (${g.current}% vs ${g.required}%)`).join(', ')}
                      </p>
                    )}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Apply by {opp.applicationDeadline}</span>
                  </div>

                  <button
                    onClick={() => setSelectedOpportunityForPrep(opp)}
                    className="py-1.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <span>Prep Guide</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Role Preparation Guide Modal */}
      {selectedOpportunityForPrep && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                    {selectedOpportunityForPrep.specialization}
                  </span>
                  <span className="text-xs text-slate-400">
                    Deadline: {selectedOpportunityForPrep.applicationDeadline}
                  </span>
                </div>
                <h2 className="text-xl font-black text-slate-900 mt-1">
                  {selectedOpportunityForPrep.role} @ {selectedOpportunityForPrep.company}
                </h2>
              </div>
              <button
                onClick={() => setSelectedOpportunityForPrep(null)}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Recruitment Pipeline */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Official Selection Rounds
              </h4>
              <div className="flex flex-wrap items-center gap-2">
                {selectedOpportunityForPrep.recruitmentProcess.map((round, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700"
                  >
                    <span className="w-5 h-5 rounded-md bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    <span>{round}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Preparation Advice */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>AI Tailored Interview Prep Advice</span>
              </h4>
              <div className="space-y-2">
                {selectedOpportunityForPrep.preparationAdvice.map((advice, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-indigo-50/50 text-xs text-indigo-950 border border-indigo-100">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{advice}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                onClick={() => {
                  const opp = selectedOpportunityForPrep;
                  setSelectedOpportunityForPrep(null);
                  onStartInterviewForRole(opp.role, opp.specialization);
                }}
                className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Video className="w-4 h-4" />
                <span>Simulate Mock Interview for this Role</span>
              </button>

              <button
                onClick={() => setSelectedOpportunityForPrep(null)}
                className="w-full sm:w-auto py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
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
