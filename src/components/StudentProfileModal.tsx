import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  Briefcase,
  Calendar,
  Sparkles,
  RotateCcw,
  Check,
  Award,
  BookOpen,
  X,
  Layers,
} from 'lucide-react';
import { StudentProfile, SpecializationType } from '../types';
import { initialStudentProfile } from '../data/mockData';
import { SPECIALIZATIONS, getDefaultSkillsForSpecialization } from '../data/specializationData';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onUpdateProfile: (updater: (prev: StudentProfile) => StudentProfile) => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
}) => {
  const [name, setName] = useState(profile.name);
  const [college, setCollege] = useState(profile.college);
  const [degree, setDegree] = useState(profile.degree);
  const [specialization, setSpecialization] = useState<SpecializationType>(profile.specialization);
  const [targetRole, setTargetRole] = useState(profile.targetRole);
  const [graduationYear, setGraduationYear] = useState(profile.graduationYear);
  const [cgpa, setCgpa] = useState(profile.cgpa);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  // Selected specialization roles
  const currentSpecMeta = SPECIALIZATIONS.find((s) => s.id === specialization) || SPECIALIZATIONS[0];

  const handleSpecializationChange = (newSpec: SpecializationType) => {
    setSpecialization(newSpec);
    const meta = SPECIALIZATIONS.find((s) => s.id === newSpec) || SPECIALIZATIONS[0];
    if (meta.roles.length > 0) {
      setTargetRole(meta.roles[0]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const specChanged = specialization !== profile.specialization;

    onUpdateProfile((prev) => {
      const newSkills = specChanged ? getDefaultSkillsForSpecialization(specialization) : prev.skills;
      return {
        ...prev,
        name,
        college,
        degree,
        specialization,
        targetRole,
        graduationYear: Number(graduationYear),
        cgpa: Number(cgpa),
        skills: newSkills,
      };
    });

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 600);
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset student profile and skill metrics to initial state?')) {
      onUpdateProfile(() => initialStudentProfile);
      localStorage.removeItem('careerbridge_chat_history');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-fadeIn relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white flex items-center justify-center text-base font-bold shadow-md shadow-indigo-100">
            {profile.name.split(' ').map((n) => n[0]).join('')}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 leading-tight">Learner & Career Profile</h3>
            <p className="text-xs text-slate-500">Configure your career track, degree background, and target job roles</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                College / Institution / Organization
              </label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="e.g. Stanford / IIT / State University / Self-Learner"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                Degree / Background
              </label>
              <input
                type="text"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                placeholder="e.g. B.Tech Computer Science / MBA / B.S. Data Science"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Specialization Selection */}
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
              Career Track & Specialization (Active Domain)
            </label>
            <select
              value={specialization}
              onChange={(e) => handleSpecializationChange(e.target.value as SpecializationType)}
              className="w-full bg-indigo-50/50 border border-indigo-200 rounded-xl px-3 py-2 text-xs font-bold text-indigo-950 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              {SPECIALIZATIONS.map((spec) => (
                <option key={spec.id} value={spec.id}>
                  {spec.title}
                </option>
              ))}
            </select>
            <p className="text-[10px] text-slate-500 mt-1">
              Changing your career track automatically configures domain-specific curriculum, skills, mock interview questions, and placement drives.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                Current CGPA (Out of 10)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={cgpa}
                onChange={(e) => setCgpa(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                Graduation Year
              </label>
              <input
                type="number"
                value={graduationYear}
                onChange={(e) => setGraduationYear(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
              Primary Target Placement Role
            </label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              {currentSpecMeta.roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Activity summary */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-3 gap-2 text-center text-slate-600">
            <div>
              <div className="text-base font-bold text-slate-900">{profile.completedQuizzesCount}</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Quizzes</div>
            </div>
            <div>
              <div className="text-base font-bold text-slate-900">{profile.completedInterviewsCount}</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Interviews</div>
            </div>
            <div>
              <div className="text-base font-bold text-indigo-600">{profile.placementReadinessScore}%</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Readiness</div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handleResetToDefault}
              className="flex items-center gap-1 text-slate-400 hover:text-rose-600 text-xs transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                {isSaved ? <Check className="w-4 h-4" /> : null}
                <span>{isSaved ? 'Saved!' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
