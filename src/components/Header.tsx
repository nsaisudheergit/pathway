import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  Award,
  Briefcase,
  BookOpen,
  MessageSquareText,
  HelpCircle,
  Video,
  BarChart3,
  Compass,
  CheckCircle2,
  ChevronDown,
  Layers,
  LayoutDashboard,
  Users,
  Building2,
} from 'lucide-react';
import { StudentProfile, StudentNavTab, UserRole, SpecializationType } from '../types';
import { SPECIALIZATIONS } from '../data/specializationData';

interface HeaderProps {
  activeTab: StudentNavTab;
  setActiveTab: (tab: StudentNavTab) => void;
  profile: StudentProfile;
  onOpenProfileModal: () => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  onSelectSpecialization: (spec: SpecializationType) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  profile,
  onOpenProfileModal,
  userRole,
  setUserRole,
  onSelectSpecialization,
}) => {
  const [isSpecDropdownOpen, setIsSpecDropdownOpen] = useState(false);

  const readinessColor =
    profile.placementReadinessScore >= 80
      ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
      : profile.placementReadinessScore >= 65
      ? 'text-indigo-700 bg-indigo-50 border-indigo-200'
      : 'text-amber-700 bg-amber-50 border-amber-200';

  const navItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'assistant' as const, label: 'AI Assistant', icon: MessageSquareText, badge: 'Smart' },
    { id: 'learning_hub' as const, label: 'Learning Hub', icon: BookOpen, badge: '6 Domains' },
    { id: 'quiz' as const, label: 'Practice Quiz', icon: HelpCircle, badge: `${profile.completedQuizzesCount}` },
    { id: 'interview' as const, label: 'Mock Interview', icon: Video, badge: `${profile.completedInterviewsCount}` },
    { id: 'skills' as const, label: 'Skill Assessment', icon: BarChart3, badge: '5 Skills' },
    { id: 'guidance' as const, label: 'Career Guidance', icon: Compass, badge: 'Roadmap' },
    { id: 'internships' as const, label: 'Internship Hub', icon: Briefcase, badge: 'Live Drives' },
  ];

  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
    if (role === 'faculty') {
      setActiveTab('faculty');
    } else if (role === 'placement') {
      setActiveTab('placement');
    } else {
      setActiveTab('dashboard');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner / Brand & Profile Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => {
                setUserRole('student');
                setActiveTab('dashboard');
              }}
              className="flex items-center gap-3 text-left cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-100 flex-shrink-0 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-extrabold tracking-tight text-slate-900">PathWay</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-800 border border-indigo-200">
                    AI
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 truncate hidden sm:block">
                  Bridging Learning, Skills & Careers for Management Students
                </p>
              </div>
            </button>
          </div>

          {/* Quick Metrics & Controls */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            
            {/* Multi-Role Switcher (Student, Faculty, Placement) */}
            <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200">
              <button
                onClick={() => handleRoleChange('student')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  userRole === 'student'
                    ? 'bg-white text-indigo-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Student Dashboard and Learning Modules"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Student</span>
              </button>

              <button
                onClick={() => handleRoleChange('faculty')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  userRole === 'faculty'
                    ? 'bg-white text-blue-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Faculty & Mentor Performance Intelligence"
              >
                <Users className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Faculty</span>
              </button>

              <button
                onClick={() => handleRoleChange('placement')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  userRole === 'placement'
                    ? 'bg-white text-purple-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Placement Cell and Corporate Relations"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Placement</span>
              </button>
            </div>

            {/* Active Specialization Pill / Dropdown */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsSpecDropdownOpen(!isSpecDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                <span>{profile.specialization}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isSpecDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Switch Specialization
                  </div>
                  {SPECIALIZATIONS.map((spec) => (
                    <button
                      key={spec.id}
                      onClick={() => {
                        onSelectSpecialization(spec.id);
                        setIsSpecDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-indigo-50/50 cursor-pointer ${
                        profile.specialization === spec.id ? 'font-bold text-indigo-600 bg-indigo-50/30' : 'text-slate-700'
                      }`}
                    >
                      <span>{spec.title}</span>
                      {profile.specialization === spec.id && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Placement Readiness Pill */}
            {userRole === 'student' && (
              <button
                onClick={() => setActiveTab('skills')}
                className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all hover:shadow-xs cursor-pointer ${readinessColor}`}
                title="Click to view full Skill Assessment breakdown"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Readiness: {profile.placementReadinessScore}%</span>
              </button>
            )}

            {/* Student Profile Pill */}
            <button
              id="student-profile-button"
              onClick={onOpenProfileModal}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                {profile.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div className="hidden sm:block leading-tight">
                <div className="text-xs font-bold text-slate-800 truncate max-w-[100px]">{profile.name}</div>
                <div className="text-[10px] text-slate-400">CGPA: {profile.cgpa}</div>
              </div>
            </button>
          </div>
        </div>

        {/* Primary Student Navigation Tabs Bar (Shown when in Student role) */}
        {userRole === 'student' && (
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 border-t border-slate-100 no-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-full ${
                        isActive ? 'bg-indigo-500 text-white' : 'bg-slate-200/80 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
};
