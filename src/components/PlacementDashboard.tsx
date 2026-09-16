import React, { useState } from 'react';
import {
  Briefcase,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  Building2,
  PieChart,
  BarChart3,
  Calendar,
  Layers,
  Search,
  ExternalLink,
} from 'lucide-react';
import { SPECIALIZATIONS } from '../data/specializationData';

export const PlacementDashboard: React.FC = () => {
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('All');

  // Placement KPIs
  const placementKpis = [
    { label: 'Total Eligible Batch', value: '240', sub: 'Across all 6 specializations', icon: Users, color: 'text-blue-600 bg-blue-50' },
    { label: 'Offers Extended', value: '168', sub: '70% Placement Conversion', icon: Award, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Pre-Placement Offers (PPO)', value: '42', sub: 'From summer internships', icon: CheckCircle2, color: 'text-purple-600 bg-purple-50' },
    { label: 'Average Package (CTC)', value: '₹14.8 LPA', sub: 'Highest: ₹28.5 LPA', icon: TrendingUp, color: 'text-indigo-600 bg-indigo-50' },
  ];

  // Pipeline stages
  const recruitmentPipeline = [
    { stage: 'Registered on Portal', count: 240, percent: '100%', color: 'bg-slate-900' },
    { stage: 'Profile Verified & Eligible', count: 218, percent: '90.8%', color: 'bg-indigo-600' },
    { stage: 'Shortlisted by Recruiter', count: 185, percent: '77.0%', color: 'bg-blue-600' },
    { stage: 'Cleared GD / Technical Rounds', count: 172, percent: '71.6%', color: 'bg-purple-600' },
    { stage: 'Final Offers Released', count: 168, percent: '70.0%', color: 'bg-emerald-600' },
  ];

  // Specialization wise readiness & placement rates
  const specializationStats = [
    { name: 'Finance', total: 60, placed: 48, ppo: 14, avgCtc: '₹16.2 LPA', readiness: 84 },
    { name: 'Marketing', total: 55, placed: 40, ppo: 10, avgCtc: '₹14.5 LPA', readiness: 81 },
    { name: 'Human Resources (HR)', total: 35, placed: 24, ppo: 5, avgCtc: '₹12.8 LPA', readiness: 78 },
    { name: 'Business Analytics', total: 45, placed: 35, ppo: 9, avgCtc: '₹17.5 LPA', readiness: 88 },
    { name: 'Agri-Business Management', total: 25, placed: 12, ppo: 2, avgCtc: '₹11.2 LPA', readiness: 74 },
    { name: 'Healthcare Management', total: 20, placed: 9, ppo: 2, avgCtc: '₹12.0 LPA', readiness: 76 },
  ];

  const filteredStats =
    selectedSpecialization === 'All'
      ? specializationStats
      : specializationStats.filter((s) => s.name === selectedSpecialization);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <Briefcase className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Placement Cell & Corporate Relations</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            End-to-end placement pipeline tracking, recruiter company drives, and domain-wise CTC benchmarking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Season: 2025–26 Cycle</span>
          <span className="text-slate-300">•</span>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            Phase 1 Corporate Recruitment Live
          </span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {placementKpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{kpi.label}</span>
                <div className={`p-2 rounded-xl ${kpi.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900">{kpi.value}</div>
              <p className="text-xs text-slate-500 mt-1">{kpi.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Recruitment Pipeline Funnel */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Placement Conversion Pipeline</h3>
          <p className="text-xs text-slate-500">
            Real-time candidate progression from portal registration to signed corporate offers.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          {recruitmentPipeline.map((step, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">
                  {idx + 1}. {step.stage}
                </span>
                <span className="font-bold text-slate-900">
                  {step.count} candidates ({step.percent})
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className={`h-full rounded-full ${step.color}`} style={{ width: step.percent }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Specialization Breakdown Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Specialization Placement & CTC Benchmarks</h3>
            <p className="text-xs text-slate-500">
              Cross-domain performance comparison and candidate readiness indices.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedSpecialization('All')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                selectedSpecialization === 'All'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All
            </button>
            {SPECIALIZATIONS.map((spec) => (
              <button
                key={spec.id}
                onClick={() => setSelectedSpecialization(spec.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                  selectedSpecialization === spec.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {spec.title}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Specialization</th>
                <th className="py-3 px-3 text-center">Cohort Size</th>
                <th className="py-3 px-3 text-center">Placed</th>
                <th className="py-3 px-3 text-center">Placement %</th>
                <th className="py-3 px-3 text-center">PPOs</th>
                <th className="py-3 px-3 text-center">Avg Package</th>
                <th className="py-3 px-3 text-center">Readiness Index</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStats.map((row, idx) => {
                const placementRate = Math.round((row.placed / row.total) * 100);
                return (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-3 font-bold text-slate-900">{row.name}</td>
                    <td className="py-3.5 px-3 text-center text-slate-600">{row.total}</td>
                    <td className="py-3.5 px-3 text-center font-semibold text-emerald-700">{row.placed}</td>
                    <td className="py-3.5 px-3 text-center font-bold text-slate-900">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-800">
                        {placementRate}%
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center text-purple-700 font-semibold">{row.ppo}</td>
                    <td className="py-3.5 px-3 text-center font-bold text-slate-900">{row.avgCtc}</td>
                    <td className="py-3.5 px-3 text-center">
                      <span className="font-bold text-indigo-600">{row.readiness}%</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recruiter Partnership Highlights */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">Top Participating Recruiter Partners</h3>
          </div>
          <span className="text-xs text-slate-400">Over 65+ Empanelled Corporate Organizations</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-2">
          {['Goldman Sachs', 'HUL', 'McKinsey', 'Deloitte', 'ITC Limited', 'Apollo Hospitals'].map((comp, idx) => (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-white/10 border border-white/10 text-center font-bold text-xs text-slate-200"
            >
              {comp}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
