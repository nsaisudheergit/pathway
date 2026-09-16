import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Sparkles,
  HelpCircle,
  Video,
  Layers,
  Search,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Cpu,
  Loader2,
  X,
  Trash2,
  AlertCircle,
  Lightbulb,
  GraduationCap,
} from 'lucide-react';
import { SpecializationType, StudentProfile, LearningHubModule } from '../types';
import { SPECIALIZATIONS, learningHubModules } from '../data/specializationData';

interface LearningHubSectionProps {
  profile: StudentProfile;
  onSelectSpecialization?: (spec: SpecializationType) => void;
  onNavigateToQuiz?: (subject?: string, topic?: string) => void;
  onSelectTopicForQuiz?: (subject: string, topic: string) => void;
  onAskAIAssistant?: (initialPrompt: string) => void;
  onAskAIAboutConcept?: (conceptTitle: string, specialization: SpecializationType) => void;
}

export const LearningHubSection: React.FC<LearningHubSectionProps> = ({
  profile,
  onSelectSpecialization,
  onNavigateToQuiz,
  onSelectTopicForQuiz,
  onAskAIAssistant,
  onAskAIAboutConcept,
}) => {
  const [selectedSpecialization, setSelectedSpecialization] = useState<SpecializationType>(profile.specialization);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);

  // Synchronize when profile specialization changes globally
  useEffect(() => {
    setSelectedSpecialization(profile.specialization);
  }, [profile.specialization]);

  // Direct AI Model Search & Generation State
  const [isSearchingModel, setIsSearchingModel] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [activeConceptOverview, setActiveConceptOverview] = useState<LearningHubModule | null>(null);
  const [aiGeneratedModules, setAiGeneratedModules] = useState<LearningHubModule[]>([]);
  const [lastSearchedPrompt, setLastSearchedPrompt] = useState<string | null>(null);

  const handlePracticeQuiz = (subject: string, topic: string) => {
    if (onNavigateToQuiz) {
      onNavigateToQuiz(subject, topic);
    } else if (onSelectTopicForQuiz) {
      onSelectTopicForQuiz(subject, topic);
    }
  };

  const handleAskAI = (conceptTitle: string, specialization: SpecializationType) => {
    if (onAskAIAssistant) {
      onAskAIAssistant(
        `Explain the core principles, practical industry applications, and common interview questions for "${conceptTitle}" in ${specialization}.`
      );
    } else if (onAskAIAboutConcept) {
      onAskAIAboutConcept(conceptTitle, specialization);
    }
  };

  // Trigger direct model search and concept overview generation with Gemini
  const triggerModelSearch = async (queryText: string) => {
    const q = queryText.trim();
    if (!q) return;

    setIsSearchingModel(true);
    setSearchError(null);
    setLastSearchedPrompt(q);

    try {
      const res = await fetch('/api/learning-hub/generate-concept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          specialization: selectedSpecialization,
          targetRole: profile.targetRole || 'Specialist',
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      if (data && data.module) {
        const newMod: LearningHubModule = data.module;
        // Directly render concept overview on screen
        setActiveConceptOverview(newMod);
        // Also keep in collection
        setAiGeneratedModules((prev) => [
          newMod,
          ...prev.filter((m) => m.title.toLowerCase() !== newMod.title.toLowerCase()),
        ]);
        setExpandedModuleId(newMod.id);
      }
    } catch (err: any) {
      console.error('Error generating learning concept with model:', err);
      setSearchError(err?.message || 'Failed to generate concept overview with Gemini. Please retry.');
    } finally {
      setIsSearchingModel(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerModelSearch(searchQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchError(null);
    setActiveConceptOverview(null);
  };

  const handleRemoveAiModule = (id: string) => {
    if (activeConceptOverview?.id === id) {
      setActiveConceptOverview(null);
    }
    setAiGeneratedModules((prev) => prev.filter((m) => m.id !== id));
  };

  // Standard curriculum modules for the selected specialization
  const specCurriculumModules = learningHubModules.filter((m) => m.specialization === selectedSpecialization);

  // Past generated modules for this specialization
  const otherAiModules = aiGeneratedModules.filter(
    (m) => m.specialization === selectedSpecialization && m.id !== activeConceptOverview?.id
  );

  const activeSpecMeta = SPECIALIZATIONS.find((s) => s.id === selectedSpecialization) || SPECIALIZATIONS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Header with Direct Gemini Concept Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Specialization Learning Hub</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Explore core curriculum modules or search any topic to have Gemini generate an in-depth concept overview with formulas and interview questions.
          </p>
        </div>

        {/* Gemini Concept Search: typing does not filter locally; hitting Enter invokes Gemini directly */}
        <form
          id="learning-hub-search-form"
          onSubmit={handleSearchSubmit}
          className="relative w-full lg:w-96 flex items-center"
          role="search"
        >
          {/* Search button on left - at least 40x40px touch target */}
          <button
            type="submit"
            id="learning-hub-search-btn"
            aria-label="Search and generate concept overview with Gemini"
            disabled={isSearchingModel}
            className="absolute left-1.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 active:scale-95 transition-all cursor-pointer z-10 disabled:opacity-50"
            title="Press Enter or tap to generate concept overview with Gemini"
          >
            {isSearchingModel ? (
              <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </button>

          {/* Search input: directly triggers Gemini on Enter without static filtering */}
          <input
            id="learning-hub-search-input"
            name="learningHubQuery"
            type="search"
            inputMode="search"
            enterKeyHint="search"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            placeholder="Search any concept (e.g. Antimalarial drugs)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                triggerModelSearch(searchQuery);
              }
            }}
            className="w-full pl-11 pr-24 py-2.5 rounded-xl border border-slate-300 bg-white text-base sm:text-sm text-slate-900 placeholder:text-slate-400 shadow-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />

          {/* Right Action Items: Clear button & AI Search pill */}
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1 z-10">
            {searchQuery.trim().length > 0 && !isSearchingModel && (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label="Clear search query"
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="submit"
              disabled={isSearchingModel || !searchQuery.trim()}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 disabled:hover:bg-indigo-600 transition-all cursor-pointer shadow-xs"
              title="Generate concept overview with Gemini 3.8 Flash"
            >
              <Sparkles className="w-3 h-3" />
              <span>{isSearchingModel ? 'Generating...' : 'AI Generate'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Search Error Alert */}
      {searchError && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-between gap-3 text-rose-800 text-xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{searchError}</span>
          </div>
          <button
            onClick={() => triggerModelSearch(searchQuery)}
            className="font-bold underline hover:text-rose-900 cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* Specialization Selector Tabs */}
      <div className="bg-slate-100/80 p-1.5 rounded-2xl flex flex-wrap gap-1.5">
        {SPECIALIZATIONS.map((spec) => {
          const isSelected = selectedSpecialization === spec.id;
          const isUserSpec = profile.specialization === spec.id;
          return (
            <button
              key={spec.id}
              onClick={() => {
                setSelectedSpecialization(spec.id);
                setExpandedModuleId(null);
                if (onSelectSpecialization) {
                  onSelectSpecialization(spec.id);
                }
              }}
              className={`flex-1 min-w-[150px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                isSelected
                  ? 'bg-white text-indigo-900 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <span>{spec.title}</span>
              {isUserSpec && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Your Primary Specialization" />
              )}
            </button>
          );
        })}
      </div>

      {/* Domain Overview Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-50/70 via-blue-50/40 to-slate-50 border border-indigo-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${activeSpecMeta.badgeColor}`}>
              {activeSpecMeta.title}
            </span>
            <span className="text-xs text-slate-500">{activeSpecMeta.tagline}</span>
          </div>
          <div className="text-xs text-slate-600 pt-1">
            <strong>Target Roles:</strong> {activeSpecMeta.roles.join(' • ')}
          </div>
        </div>

        <button
          onClick={() =>
            onAskAIAboutConcept?.(`Give me an executive overview and study plan for ${activeSpecMeta.title}`, activeSpecMeta.id)
          }
          className="py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer self-start md:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ask AI Tutor About {activeSpecMeta.title}</span>
        </button>
      </div>

      {/* Active Generating Shimmer State */}
      {isSearchingModel && (
        <div className="p-6 rounded-3xl bg-indigo-50/70 border-2 border-indigo-300 shadow-sm flex items-center gap-4 animate-pulse">
          <div className="p-3 rounded-2xl bg-indigo-600 text-white shrink-0 shadow-xs">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-indigo-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Gemini 3.8 Flash is generating concept overview for &ldquo;{lastSearchedPrompt || searchQuery}&rdquo;...</span>
            </h3>
            <p className="text-xs text-indigo-800">
              Synthesizing core domain frameworks, formulas, and high-yield interview focus questions for {activeSpecMeta.title}.
            </p>
          </div>
        </div>
      )}

      {/* DIRECT ON-SCREEN GEMINI CONCEPT OVERVIEW */}
      {activeConceptOverview && (
        <section aria-labelledby="active-concept-heading" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-indigo-600 text-white">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              <h2 id="active-concept-heading" className="text-xs font-black uppercase tracking-wider text-indigo-950">
                Generated Concept Overview
              </h2>
            </div>
            <button
              onClick={() => setActiveConceptOverview(null)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Dismiss Overview</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl border-2 border-indigo-400/80 shadow-md overflow-hidden transition-all bg-gradient-to-b from-indigo-50/25 via-white to-white">
            {/* Header */}
            <div className="p-6 sm:p-7 border-b border-indigo-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-800 uppercase tracking-wider">
                    {activeConceptOverview.subject}
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    {activeConceptOverview.difficulty} Level
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    <span>Generated by Gemini 3.8 Flash</span>
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">{activeConceptOverview.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{activeConceptOverview.description}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2 self-start md:self-center">
                <button
                  onClick={() =>
                    handlePracticeQuiz(
                      activeConceptOverview.subject,
                      activeConceptOverview.quizTopicLink || activeConceptOverview.title
                    )
                  }
                  className="py-2 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Practice Quiz on This</span>
                </button>

                <button
                  onClick={() => handleAskAI(activeConceptOverview.title, activeConceptOverview.specialization)}
                  className="py-2 px-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Ask AI Tutor</span>
                </button>
              </div>
            </div>

            {/* Key Concepts Grid */}
            <div className="p-6 sm:p-7 bg-slate-50/50 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                <span>Core Frameworks, Principles & Formulas</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeConceptOverview.keyConcepts.map((concept, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-md bg-indigo-50 text-indigo-700 flex items-center justify-center text-[10px]">
                          {idx + 1}
                        </span>
                        <span>{concept.title}</span>
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{concept.description}</p>
                    </div>

                    {concept.frameworkOrFormula && (
                      <div className="p-2.5 rounded-xl bg-slate-900 text-emerald-300 font-mono text-[11px] leading-tight overflow-x-auto">
                        {concept.frameworkOrFormula}
                      </div>
                    )}

                    <button
                      onClick={() =>
                        onAskAIAboutConcept?.(
                          `${concept.title} in ${activeConceptOverview.title}`,
                          activeConceptOverview.specialization
                        )
                      }
                      className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer self-start"
                    >
                      <span>Deep-Dive with AI</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Placement Interview Focus Questions */}
              {activeConceptOverview.interviewFocusQuestions &&
                activeConceptOverview.interviewFocusQuestions.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-200/80 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-purple-600" />
                      <span>High-Frequency Placement Interview Questions</span>
                    </div>

                    {activeConceptOverview.interviewFocusQuestions.map((q, qIdx) => (
                      <div
                        key={qIdx}
                        className="bg-purple-50/60 border border-purple-200/70 rounded-2xl p-4 space-y-2"
                      >
                        <div className="text-xs font-bold text-purple-950">Q: {q.question}</div>
                        <div className="text-xs text-slate-700 leading-relaxed">
                          <strong className="text-purple-900">How to Answer:</strong> {q.modelKeyPoints}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          </div>
        </section>
      )}

      {/* SPECIALIZATION SYLLABUS MODULES (Intact, never stripped by static filtering) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-slate-700" />
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-700">
              Curriculum Syllabus Modules ({activeSpecMeta.title})
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            {specCurriculumModules.length + otherAiModules.length} Modules Available
          </span>
        </div>

        <div className="space-y-6">
          {[...otherAiModules, ...specCurriculumModules].map((module) => {
            const isExpanded = expandedModuleId === module.id;
            const isAiGenerated = module.id.startsWith('ai_mod_') || module.id.startsWith('mod_');

            return (
              <div
                key={module.id}
                className={`bg-white rounded-3xl border shadow-xs overflow-hidden transition-all ${
                  isAiGenerated
                    ? 'border-indigo-300 ring-1 ring-indigo-200 bg-gradient-to-b from-indigo-50/20 to-white'
                    : 'border-slate-200/80 hover:border-indigo-200'
                }`}
              >
                {/* Module Card Header */}
                <div className="p-6 sm:p-7 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 uppercase tracking-wider">
                        {module.subject}
                      </span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700">
                        {module.difficulty} Level
                      </span>
                      {isAiGenerated && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-emerald-600" />
                          <span>Generated by Gemini 3.8 Flash</span>
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{module.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{module.description}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 self-start md:self-center">
                    <button
                      onClick={() => handlePracticeQuiz(module.subject, module.quizTopicLink || module.title)}
                      className="py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Practice Quiz</span>
                    </button>

                    <button
                      onClick={() => handleAskAI(module.title, module.specialization)}
                      className="py-1.5 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Ask AI Tutor</span>
                    </button>

                    {isAiGenerated && (
                      <button
                        onClick={() => handleRemoveAiModule(module.id)}
                        className="p-1.5 rounded-xl border border-slate-200 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Dismiss generated module"
                        aria-label="Dismiss module"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={() => setExpandedModuleId(isExpanded ? null : module.id)}
                      className="p-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
                      title={isExpanded ? 'Collapse' : 'Expand full concepts'}
                      aria-label={isExpanded ? 'Collapse concepts' : 'Expand concepts'}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Key Concepts Grid (Expandable) */}
                {isExpanded && (
                  <div className="p-6 sm:p-7 bg-slate-50/50 space-y-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Core Frameworks, Principles & Formulas</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {module.keyConcepts.map((concept, idx) => (
                        <div
                          key={idx}
                          className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-3"
                        >
                          <div className="space-y-1.5">
                            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                              <span className="w-5 h-5 rounded-md bg-indigo-50 text-indigo-700 flex items-center justify-center text-[10px]">
                                {idx + 1}
                              </span>
                              <span>{concept.title}</span>
                            </h4>
                            <p className="text-xs text-slate-600 leading-relaxed">{concept.description}</p>
                          </div>

                          {concept.frameworkOrFormula && (
                            <div className="p-2.5 rounded-xl bg-slate-900 text-emerald-300 font-mono text-[11px] leading-tight overflow-x-auto">
                              {concept.frameworkOrFormula}
                            </div>
                          )}

                          <button
                            onClick={() =>
                              onAskAIAboutConcept?.(`${concept.title} in ${module.title}`, module.specialization)
                            }
                            className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer self-start"
                          >
                            <span>Deep-Dive with AI</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Interview Focus Section */}
                    {module.interviewFocusQuestions && module.interviewFocusQuestions.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-slate-200/80 space-y-3">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                          <Video className="w-3.5 h-3.5 text-purple-600" />
                          <span>High-Frequency Placement Interview Questions</span>
                        </div>

                        {module.interviewFocusQuestions.map((q, qIdx) => (
                          <div key={qIdx} className="bg-purple-50/60 border border-purple-200/70 rounded-2xl p-4 space-y-2">
                            <div className="text-xs font-bold text-purple-950">Q: {q.question}</div>
                            <div className="text-xs text-slate-700 leading-relaxed">
                              <strong className="text-purple-900">How to Answer:</strong> {q.modelKeyPoints}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
