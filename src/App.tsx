import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { StudentDashboard } from './components/StudentDashboard';
import { AIAssistant } from './components/AIAssistant';
import { LearningHubSection } from './components/LearningHubSection';
import { QuizSection } from './components/QuizSection';
import { MockInterviewSection } from './components/MockInterviewSection';
import { SkillAssessmentSection } from './components/SkillAssessmentSection';
import { CareerGuidanceSection } from './components/CareerGuidanceSection';
import { InternshipHubSection } from './components/InternshipHubSection';
import { FacultyDashboard } from './components/FacultyDashboard';
import { PlacementDashboard } from './components/PlacementDashboard';
import { StudentProfileModal } from './components/StudentProfileModal';
import { StudentProfile, StudentNavTab, UserRole, SpecializationType } from './types';
import { initialStudentProfile } from './data/mockData';
import { SPECIALIZATIONS, getDefaultSkillsForSpecialization } from './data/specializationData';

export default function App() {
  const [activeTab, setActiveTab] = useState<StudentNavTab>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Navigation parameter states for cross-module jumping
  const [quizParams, setQuizParams] = useState<{ subject?: string; topic?: string }>({});
  const [interviewRoleParam, setInterviewRoleParam] = useState<string | undefined>(undefined);

  // Student Profile State with LocalStorage Persistence
  const [profile, setProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('careerbridge_profile_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to load student profile from storage', e);
      }
    }
    return initialStudentProfile;
  });

  useEffect(() => {
    localStorage.setItem('careerbridge_profile_data', JSON.stringify(profile));
  }, [profile]);

  // Handler to change active specialization across all modules
  const handleSelectSpecialization = (newSpec: SpecializationType) => {
    const specMeta = SPECIALIZATIONS.find((s) => s.id === newSpec);
    const newTargetRole = specMeta?.roles[0] || profile.targetRole;
    const newSkills = getDefaultSkillsForSpecialization(newSpec);

    // Calculate updated placement readiness
    const skillScores = Object.values(newSkills).map((s) => s.score);
    const avgSkill = Math.round(skillScores.reduce((a, b) => a + b, 0) / skillScores.length);
    const academicScore = profile.academicScore || 82;
    const interviewReadiness = profile.interviewReadinessScore || 78;
    const placementReadinessScore = Math.round(avgSkill * 0.45 + academicScore * 0.25 + interviewReadiness * 0.3);

    setProfile((prev) => ({
      ...prev,
      specialization: newSpec,
      targetRole: newTargetRole,
      skills: newSkills,
      overallSkillScore: avgSkill,
      placementReadinessScore,
    }));
  };

  // Handler to navigate to AI Assistant with pre-filled question
  const handleAskAIAssistant = (query: string) => {
    setUserRole('student');
    setActiveTab('assistant');
    setTimeout(() => {
      const inputEl = document.getElementById('ai-assistant-input') as HTMLInputElement | null;
      if (inputEl) {
        inputEl.value = query;
        inputEl.focus();
        const submitBtn = document.getElementById('ai-assistant-submit-btn') as HTMLButtonElement | null;
        if (submitBtn) {
          submitBtn.click();
        }
      }
    }, 150);
  };

  // Handler to navigate to Quiz module with pre-selected subject/topic
  const handleNavigateToQuiz = (subject?: string, topic?: string) => {
    setUserRole('student');
    setQuizParams({ subject, topic });
    setActiveTab('quiz');
  };

  // Handler to navigate to Mock Interview module with pre-selected target role
  const handleNavigateToInterview = (role?: string) => {
    setUserRole('student');
    setInterviewRoleParam(role);
    setActiveTab('interview');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-100 selection:text-indigo-900 font-sans">
      {/* Top Application Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profile={profile}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        userRole={userRole}
        setUserRole={setUserRole}
        onSelectSpecialization={handleSelectSpecialization}
      />

      {/* Main Content View Container */}
      <main className="flex-1 pb-16">
        {/* Role: Student Views */}
        {userRole === 'student' && (
          <>
            {activeTab === 'dashboard' && (
              <StudentDashboard
                profile={profile}
                onSelectSpecialization={handleSelectSpecialization}
                onNavigateToQuiz={handleNavigateToQuiz}
                onNavigateToInterview={handleNavigateToInterview}
                onAskAIAssistant={handleAskAIAssistant}
                onNavigateTab={(tab) => setActiveTab(tab)}
              />
            )}

            {activeTab === 'assistant' && (
              <AIAssistant
                profile={profile}
                onSelectSpecialization={handleSelectSpecialization}
                onQuickNavigate={(tab) => setActiveTab(tab)}
              />
            )}

            {activeTab === 'learning_hub' && (
              <LearningHubSection
                profile={profile}
                onSelectSpecialization={handleSelectSpecialization}
                onNavigateToQuiz={handleNavigateToQuiz}
                onAskAIAssistant={handleAskAIAssistant}
              />
            )}

            {activeTab === 'quiz' && (
              <QuizSection
                profile={profile}
                onUpdateProfile={setProfile}
                onAskAIAssistant={handleAskAIAssistant}
                initialSubject={quizParams.subject}
                initialTopic={quizParams.topic}
              />
            )}

            {activeTab === 'interview' && (
              <MockInterviewSection
                profile={profile}
                onUpdateProfile={setProfile}
                onAskAIAssistant={handleAskAIAssistant}
                initialRole={interviewRoleParam}
              />
            )}

            {activeTab === 'skills' && (
              <SkillAssessmentSection
                profile={profile}
                onUpdateProfile={setProfile}
                onNavigateToQuiz={handleNavigateToQuiz}
                onNavigateToInterview={handleNavigateToInterview}
                onAskAIAssistant={handleAskAIAssistant}
              />
            )}

            {activeTab === 'guidance' && (
              <CareerGuidanceSection
                profile={profile}
                onUpdateProfile={setProfile}
                onNavigateToQuiz={handleNavigateToQuiz}
                onNavigateToInterview={handleNavigateToInterview}
                onAskAIAssistant={handleAskAIAssistant}
              />
            )}

            {activeTab === 'internships' && (
              <InternshipHubSection
                profile={profile}
                onNavigateToInterview={handleNavigateToInterview}
                onAskAIAssistant={handleAskAIAssistant}
              />
            )}
          </>
        )}

        {/* Role: Faculty Dashboard */}
        {userRole === 'faculty' && <FacultyDashboard />}

        {/* Role: Placement Cell Dashboard */}
        {userRole === 'placement' && <PlacementDashboard />}
      </main>

      {/* Student Profile & Settings Modal */}
      <StudentProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onUpdateProfile={setProfile}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900">PathWay AI</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600">Bridging Learning, Skills and Careers with AI</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-500">
            <span>Specialization: <strong className="text-slate-800">{profile.specialization}</strong></span>
            <span>Target Role: <strong className="text-slate-800">{profile.targetRole}</strong></span>
            <span>Placement Readiness: <strong className="text-indigo-600">{profile.placementReadinessScore}%</strong></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
