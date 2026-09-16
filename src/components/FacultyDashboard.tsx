import React, { useState } from 'react';
import {
  GraduationCap,
  TrendingUp,
  AlertTriangle,
  Users,
  Search,
  Filter,
  BarChart3,
  CheckCircle2,
  BookOpen,
  ArrowUpRight,
  HelpCircle,
  Clock,
  Layers,
} from 'lucide-react';
import { SpecializationType } from '../types';
import { sampleFacultyRoster, SPECIALIZATIONS } from '../data/specializationData';

export const FacultyDashboard: React.FC = () => {
  const [selectedSpec, setSelectedSpec] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudentDetail, setSelectedStudentDetail] = useState<any | null>(null);

  // Filter roster
  const filteredRoster = sampleFacultyRoster.filter((st) => {
    if (selectedSpec !== 'All' && st.specialization !== selectedSpec) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return st.name.toLowerCase().includes(q) || st.targetRole.toLowerCase().includes(q);
    }
    return true;
  });

  // Calculate high-level stats
  const totalStudents = sampleFacultyRoster.length;
  const placementReadyCount = sampleFacultyRoster.filter((s) => s.status === 'Placement Ready').length;
  const needsAttentionCount = sampleFacultyRoster.filter((s) => s.status === 'Needs Attention').length;
  const avgReadiness = Math.round(
    sampleFacultyRoster.reduce((acc, s) => acc + s.readinessScore, 0) / totalStudents
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Faculty & Mentor Intelligence</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Real-time cohort performance analytics, topic weakness diagnostics, and academic intervention tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Academic Year: 2025–26</span>
          <span className="text-slate-300">•</span>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
            Term IV (Specialization Stage)
          </span>
        </div>
      </div>

      {/* Cohort KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Batch Roster</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-black text-slate-900">{totalStudents} Students</div>
          <p className="text-xs text-slate-500 mt-1">Across all career tracks & disciplines</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Batch Avg Readiness</span>
            <TrendingUp className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-black text-indigo-900">{avgReadiness}%</div>
          <p className="text-xs text-slate-500 mt-1">Target benchmark: 80%</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Placement Ready</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-700">{placementReadyCount} Students</div>
          <p className="text-xs text-slate-500 mt-1">Eligible for Tier-1 corporate drives</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Academic Intervention</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600">{needsAttentionCount} Students</div>
          <p className="text-xs text-slate-500 mt-1">Score below 70% threshold</p>
        </div>
      </div>

      {/* Weak Topics Diagnostic Banner */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-3xl p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-bold text-amber-950">Cohort Topic Deficit Alerts (Needs Faculty Review)</h3>
          </div>
          <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
            Immediate Attention
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="bg-white p-3.5 rounded-2xl border border-amber-200 text-xs space-y-1">
            <div className="font-bold text-slate-900">Finance: Debt Schedules & Terminal Value</div>
            <p className="text-slate-500 leading-relaxed">
              34% of students struggled with circular interest loops and DCF perpetual growth ceilings.
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-amber-200 text-xs space-y-1">
            <div className="font-bold text-slate-900">Business Analytics: SQL Window Functions</div>
            <p className="text-slate-500 leading-relaxed">
              41% of students failed to distinguish between DENSE_RANK() and RANK() in partitioning questions.
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-amber-200 text-xs space-y-1">
            <div className="font-bold text-slate-900">Healthcare: NABH Chapter Audits</div>
            <p className="text-slate-500 leading-relaxed">
              Common errors in root cause analysis (RCA) and patient safety incident documentation.
            </p>
          </div>
        </div>
      </div>

      {/* Student Roster Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-7 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Student Performance Distribution</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Filter by specialization to track individual quiz completion, mock interviews, and topic vulnerabilities.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search student or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Specialization Filter Bar */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedSpec('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedSpec === 'All'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Specializations
          </button>
          {SPECIALIZATIONS.map((spec) => (
            <button
              key={spec.id}
              onClick={() => setSelectedSpec(spec.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedSpec === spec.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {spec.title}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Student Name</th>
                <th className="py-3 px-3">Specialization</th>
                <th className="py-3 px-3">Target Role</th>
                <th className="py-3 px-3 text-center">Quizzes</th>
                <th className="py-3 px-3 text-center">Quiz Avg</th>
                <th className="py-3 px-3 text-center">Readiness</th>
                <th className="py-3 px-3">Weakest Topic</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRoster.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-slate-900">{student.name}</div>
                    <div className="text-[11px] text-slate-400">{student.email}</div>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-semibold text-slate-700">{student.specialization}</span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-600">{student.targetRole}</td>
                  <td className="py-3.5 px-3 text-center font-semibold text-slate-800">
                    {student.quizzesCompleted}
                  </td>
                  <td className="py-3.5 px-3 text-center font-bold text-slate-900">
                    {student.avgQuizScore}%
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <span
                      className={`font-black ${
                        student.readinessScore >= 80
                          ? 'text-emerald-600'
                          : student.readinessScore >= 70
                          ? 'text-indigo-600'
                          : 'text-amber-600'
                      }`}
                    >
                      {student.readinessScore}%
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-500 font-medium">
                    {student.weakestTopic}
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider ${
                        student.status === 'Placement Ready'
                          ? 'bg-emerald-100 text-emerald-800'
                          : student.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
