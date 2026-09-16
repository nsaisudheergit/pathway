import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  Briefcase,
  HelpCircle,
  Lightbulb,
  ChevronDown,
  Compass,
  Award,
  Target,
  Layers,
} from 'lucide-react';
import { StudentProfile, SpecializationType, ChatMessage } from '../types';
import { SPECIALIZATIONS } from '../data/specializationData';
import { getAssistantConfigForSpecialization } from '../data/aiAssistantPresets';

interface AIAssistantProps {
  profile: StudentProfile;
  onSelectSpecialization?: (spec: SpecializationType) => void;
  onQuickNavigate?: (tab: 'quiz' | 'interview' | 'skills' | 'guidance') => void;
}

function getInitialWelcomeMessage(profile: StudentProfile): ChatMessage {
  const config = getAssistantConfigForSpecialization(profile.specialization);
  return {
    id: `msg_welcome_${Date.now()}`,
    role: 'assistant',
    content: `👋 Hello **${profile.name}**! I am your **PathWay AI Companion** specialized for **${profile.specialization}** (Target Role: **${profile.targetRole}**).

*${config.welcomeSubtitle}*

Here are key focus areas we can explore together:
${config.welcomeBullets.map((b) => `- **${b.label}**: ${b.text}`).join('\n')}

Select any recommendation on the right, click a suggested follow-up chip, or type your question below!`,
    timestamp: 'Just now',
    suggestedFollowups: config.defaultFollowups,
  };
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  profile,
  onSelectSpecialization,
  onQuickNavigate,
}) => {
  const assistantConfig = getAssistantConfigForSpecialization(profile.specialization);

  const [selectedTopic, setSelectedTopic] = useState('all');
  const [tone, setTone] = useState<'detailed' | 'step-by-step' | 'concise'>('detailed');
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSpecDropdownOpen, setIsSpecDropdownOpen] = useState(false);

  // Load chat history for the current specialization
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const storageKey = `careerbridge_chat_${profile.specialization.replace(/[^a-zA-Z0-9]/g, '_')}`;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse saved chat', e);
      }
    }
    return [getInitialWelcomeMessage(profile)];
  });

  const chatEndRef = useRef<HTMLDivElement>(null);
  const prevSpecRef = useRef(profile.specialization);

  // When specialization changes, switch to that specialization's conversation
  useEffect(() => {
    if (prevSpecRef.current !== profile.specialization) {
      prevSpecRef.current = profile.specialization;
      setSelectedTopic('all');
      const storageKey = `careerbridge_chat_${profile.specialization.replace(/[^a-zA-Z0-9]/g, '_')}`;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMessages(parsed);
            return;
          }
        } catch (e) {
          console.error('Failed to parse saved chat', e);
        }
      }
      setMessages([getInitialWelcomeMessage(profile)]);
    }
  }, [profile.specialization, profile.name, profile.targetRole]);

  // Persist current messages per specialization
  useEffect(() => {
    const storageKey = `careerbridge_chat_${profile.specialization.replace(/[^a-zA-Z0-9]/g, '_')}`;
    localStorage.setItem(storageKey, JSON.stringify(messages));
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, profile.specialization]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          topic: selectedTopic === 'all' ? `General ${profile.specialization}` : selectedTopic,
          specialization: profile.specialization,
          targetRole: profile.targetRole,
          tone,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();

      const assistantMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        role: 'assistant',
        content: data.content || 'I processed your inquiry. Please feel free to ask follow-up questions.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedFollowups: data.suggestedFollowups || assistantConfig.defaultFollowups,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Error contacting AI Assistant:', err);
      const fallbackMsg: ChatMessage = {
        id: `ai_err_${Date.now()}`,
        role: 'assistant',
        content: `### ${profile.specialization} Core Guidance

Regarding: **"${query}"** for **${profile.targetRole}**:

1. **First Principles Analysis**: Always anchor your answer in standard ${profile.specialization} methodologies, empirical trade-offs, and measurable outcomes.
2. **Structured Communication**: In placements and technical assessments, structure your reasoning clearly: problem framing $\\rightarrow$ root cause identification $\\rightarrow$ systematic execution $\\rightarrow$ quantified validation.
3. **Practice Alignment**: Test this topic directly in your dedicated **Practice Quiz** or run an interactive **Mock Interview** round.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedFollowups: assistantConfig.defaultFollowups,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    if (window.confirm(`Clear conversation history for ${profile.specialization} and start fresh?`)) {
      const resetMsg: ChatMessage = {
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: `Chat history cleared for **${profile.specialization}**. What concept, interview question, or framework would you like to explore?`,
        timestamp: 'Just now',
        suggestedFollowups: assistantConfig.defaultFollowups,
      };
      setMessages([resetMsg]);
      const storageKey = `careerbridge_chat_${profile.specialization.replace(/[^a-zA-Z0-9]/g, '_')}`;
      localStorage.removeItem(storageKey);
    }
  };

  const filteredSuggestions = assistantConfig.promptSuggestions.filter(
    (s) => selectedTopic === 'all' || s.topic === selectedTopic
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              AI Academic & Career Assistant
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Gemini 3.8 Flash
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
              {assistantConfig.specialistBadge}
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Personalized academic explanations, code walkthroughs, interview coaching, and frameworks for{' '}
            <strong className="text-slate-800">{profile.specialization}</strong>.
          </p>
        </div>

        {/* Specialization Switcher & Controls */}
        <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-auto">
          {/* Active Specialization Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsSpecDropdownOpen(!isSpecDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 hover:border-indigo-400 rounded-xl text-xs font-semibold text-slate-800 shadow-2xs transition-all cursor-pointer"
              title="Switch Specialization Track"
            >
              <Compass className="w-3.5 h-3.5 text-indigo-600" />
              <span className="max-w-[190px] sm:max-w-[240px] truncate">{profile.specialization}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isSpecDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsSpecDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-1.5 w-72 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-30 max-h-96 overflow-y-auto">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Switch Track (All Specializations)
                  </div>
                  {SPECIALIZATIONS.map((spec) => {
                    const isCurrent = spec.id === profile.specialization;
                    return (
                      <button
                        key={spec.id}
                        onClick={() => {
                          if (onSelectSpecialization) {
                            onSelectSpecialization(spec.id as SpecializationType);
                          }
                          setIsSpecDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          isCurrent
                            ? 'bg-indigo-50 text-indigo-900 font-semibold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="truncate">{spec.title}</span>
                        {isCurrent && <Check className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Tone Selector */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <span className="text-slate-500 px-2 font-medium">Style:</span>
            <button
              onClick={() => setTone('detailed')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                tone === 'detailed' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mentor
            </button>
            <button
              onClick={() => setTone('step-by-step')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                tone === 'step-by-step' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Step-by-Step
            </button>
            <button
              onClick={() => setTone('concise')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                tone === 'concise' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Concise
            </button>
          </div>

          {/* Reset Chat Button */}
          <button
            onClick={handleClearChat}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
            title="Reset Conversation for Current Specialization"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Topic Filter Chips for Active Specialization */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 no-scrollbar">
        {assistantConfig.topicPresets.map((preset) => {
          const isSelected = selectedTopic === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => setSelectedTopic(preset.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{preset.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Chat Container Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Side: Chat Conversation Stream (3 cols) */}
        <div className="lg:col-span-3 flex flex-col h-[650px] bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-semibold ${
                      isUser
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'bg-gradient-to-tr from-slate-900 to-indigo-900 text-white shadow-2xs'
                    }`}
                  >
                    {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  {/* Message Bubble */}
                  <div className="flex flex-col gap-1.5 min-w-0 max-w-full">
                    <div
                      className={`p-4 rounded-2xl text-sm leading-relaxed ${
                        isUser
                          ? 'bg-indigo-600 text-white rounded-tr-xs'
                          : 'bg-slate-50 text-slate-800 rounded-tl-xs border border-slate-200/80'
                      }`}
                    >
                      {/* Formatted Content */}
                      <div className="whitespace-pre-wrap font-normal select-text break-words">
                        {msg.content}
                      </div>

                      {/* Footer info & Copy button */}
                      {!isUser && (
                        <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-400">
                          <span className="truncate mr-2">PathWay AI • {profile.specialization} Advisor</span>
                          <button
                            onClick={() => handleCopy(msg.id, msg.content)}
                            className="flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors p-1 rounded cursor-pointer flex-shrink-0"
                            title="Copy response"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-600 font-medium">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Suggested Follow-up chips for AI messages */}
                    {!isUser && msg.suggestedFollowups && msg.suggestedFollowups.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {msg.suggestedFollowups.map((followup, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSendMessage(followup)}
                            className="text-xs bg-white text-indigo-700 hover:bg-indigo-50 border border-indigo-200 hover:border-indigo-300 rounded-lg px-2.5 py-1 text-left transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                          >
                            <Lightbulb className="w-3 h-3 text-amber-500 flex-shrink-0" />
                            <span className="truncate max-w-[280px] sm:max-w-[340px]">{followup}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-3 max-w-xl mr-auto">
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 animate-pulse" />
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-600 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-indigo-600 animate-bounce"></span>
                  <span className="inline-block w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="inline-block w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-xs text-slate-500 font-medium ml-1">
                    Analyzing {profile.specialization} principles & structuring mentor answer...
                  </span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Bottom Chat Input Form */}
          <div className="p-3 sm:p-4 bg-slate-50/80 border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                id="ai-assistant-input"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={assistantConfig.inputPlaceholder}
                className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-2xs"
                disabled={isLoading}
              />
              <button
                type="submit"
                id="ai-assistant-submit-btn"
                disabled={!inputMessage.trim() || isLoading}
                className="px-4 py-3 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-2xs flex items-center gap-2 cursor-pointer flex-shrink-0"
              >
                <span>Ask</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 mt-2 px-1 gap-2">
              <span>Press <strong>Enter</strong> to send • Powered by Gemini 3.8 Flash</span>
              <span>Track: <strong className="text-slate-700">{profile.specialization}</strong></span>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Prompts & Practice Shortcuts (1 col) */}
        <div className="flex flex-col gap-4">
          {/* Quick Prompts Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">Recommended Prompts</h3>
              </div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                {selectedTopic === 'all' ? 'All' : selectedTopic}
              </span>
            </div>

            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {filteredSuggestions.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(item.prompt)}
                  className="w-full text-left p-2.5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all text-xs group cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="font-semibold text-slate-900 group-hover:text-indigo-700 truncate">
                      {item.title}
                    </span>
                    {item.tag && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-slate-100 text-slate-600 flex-shrink-0">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <div className="text-slate-500 line-clamp-2 leading-relaxed text-[11px]">
                    {item.prompt}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Action Cards linking to Quizzes, Interviews & Assessment */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-4 shadow-2xs">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle className="w-4 h-4 text-indigo-300" />
              <h4 className="text-sm font-bold">Consolidate What You Learn</h4>
            </div>
            <p className="text-xs text-indigo-200/80 mb-3 leading-relaxed">
              Transition theory into high placement scores with track-specific practice drills and simulations.
            </p>
            <div className="flex flex-col gap-2">
              {onQuickNavigate && (
                <>
                  <button
                    onClick={() => onQuickNavigate('quiz')}
                    className="w-full py-2 px-3 bg-white text-slate-900 hover:bg-indigo-50 rounded-xl text-xs font-semibold text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{assistantConfig.quizActionText}</span>
                  </button>
                  <button
                    onClick={() => onQuickNavigate('interview')}
                    className="w-full py-2 px-3 bg-indigo-600/80 hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Briefcase className="w-3.5 h-3.5 text-indigo-200" />
                    <span>{assistantConfig.interviewActionText}</span>
                  </button>
                  <button
                    onClick={() => onQuickNavigate('skills')}
                    className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Review Competency Radar →</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
