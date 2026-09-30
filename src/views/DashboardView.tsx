import React, { useState } from 'react';
import {
  Zap,
  Sun,
  AlertTriangle,
  Users,
  Car,
  MessageSquareWarning,
  Trash2,
  Activity,
  Sparkles,
  ArrowRight,
  Clock,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { KPICard } from '../components/common/KPICard';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { mockAIInsights } from '../data/mockData';
import type { AIInsight } from '../types';

interface DashboardViewProps {
  onNavigate: (view: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const [selectedInsight, setSelectedInsight] = useState<AIInsight | null>(null);

  const kpis = [
    {
      title: 'Electricity Usage',
      value: '1,245 kWh',
      subtext: 'Grid load normal',
      change: '+8.2%',
      changeType: 'negative' as const,
      icon: Zap,
      iconColor: 'text-amber-400',
      accentColor: 'border-amber-500/20 bg-amber-950/10',
      targetView: 'energy',
    },
    {
      title: 'Solar Generation',
      value: '380 kWh',
      subtext: '₹3,420 estimated savings',
      change: '+14%',
      changeType: 'positive' as const,
      icon: Sun,
      iconColor: 'text-emerald-400',
      accentColor: 'border-emerald-500/20 bg-emerald-950/10',
      targetView: 'energy',
    },
    {
      title: 'Emergency Alerts',
      value: '02 Alerts',
      subtext: '1 requires attention',
      change: 'Active',
      changeType: 'negative' as const,
      icon: AlertTriangle,
      iconColor: 'text-rose-400',
      accentColor: 'border-rose-500/20 bg-rose-950/10',
      targetView: 'emergency',
    },
    {
      title: 'Workers Present',
      value: '27 / 32',
      subtext: '84% attendance rate',
      change: 'Normal',
      changeType: 'positive' as const,
      icon: Users,
      iconColor: 'text-cyan-400',
      accentColor: 'border-cyan-500/20 bg-cyan-950/10',
      targetView: 'attendance',
    },
    {
      title: 'Smart Parking',
      value: '72 / 100',
      subtext: '28 slots available',
      change: '72% Full',
      changeType: 'neutral' as const,
      icon: Car,
      iconColor: 'text-blue-400',
      accentColor: 'border-blue-500/20 bg-blue-950/10',
      targetView: 'parking',
    },
    {
      title: 'Complaints',
      value: '18 Pending',
      subtext: '15 resolved today',
      change: '3 Overdue',
      changeType: 'negative' as const,
      icon: MessageSquareWarning,
      iconColor: 'text-purple-400',
      accentColor: 'border-purple-500/20 bg-purple-950/10',
      targetView: 'complaints',
    },
    {
      title: 'Waste Status',
      value: '72% Capacity',
      subtext: 'Status: Normal',
      change: '420 kg total',
      changeType: 'neutral' as const,
      icon: Trash2,
      iconColor: 'text-indigo-400',
      accentColor: 'border-indigo-500/20 bg-indigo-950/10',
      targetView: 'waste',
    },
    {
      title: 'Maintenance',
      value: '3 Equipment Alerts',
      subtext: 'AC Unit high risk',
      change: '1 Action Required',
      changeType: 'negative' as const,
      icon: Activity,
      iconColor: 'text-rose-400',
      accentColor: 'border-rose-500/20 bg-rose-950/10',
      targetView: 'maintenance',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner & Building Health Score Dial */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Digital Twin Live Operational Telemetry</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold font-display text-white">
              JARVIS Building Control Matrix
            </h1>
            <p className="text-xs lg:text-sm text-slate-400 max-w-2xl">
              Real-time multi-sensor fusion monitoring across 5 building floors, environmental control systems, security feeds, and AI predictive maintenance engines.
            </p>
          </div>

          {/* Building Health Dial */}
          <div className="flex items-center space-x-5 bg-slate-900/90 border border-slate-700/80 p-4 rounded-xl shadow-lg shrink-0">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-cyan-400 transition-all duration-1000 ease-out"
                  strokeDasharray="92, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-bold font-display text-white">92</span>
                <span className="text-[9px] text-slate-400 font-mono">/ 100</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Building Health Score</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="success" size="md">
                  Status: Excellent
                </Badge>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Nominal performance across all 5 floors</p>
            </div>
          </div>
        </div>
      </div>

      {/* 8 KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <KPICard
            key={index}
            title={kpi.title}
            value={kpi.value}
            subtext={kpi.subtext}
            change={kpi.change}
            changeType={kpi.changeType}
            icon={kpi.icon}
            iconColor={kpi.iconColor}
            accentColor={kpi.accentColor}
            onClick={() => onNavigate(kpi.targetView)}
          />
        ))}
      </div>

      {/* AI INSIGHTS SECTION */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-white">AI Building Insights</h3>
              <p className="text-xs text-slate-400">Automated neural pattern analysis & anomaly detection</p>
            </div>
          </div>
          <span className="text-xs text-cyan-400 font-mono bg-cyan-950/50 px-2.5 py-1 rounded-lg border border-cyan-800/40">
            5 Active Recommendations
          </span>
        </div>

        <div className="space-y-3">
          {mockAIInsights.map((insight) => (
            <div
              key={insight.id}
              className="glass-card rounded-xl p-4 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-all"
            >
              <div className="flex items-start space-x-3">
                <div className="mt-0.5">
                  {insight.severity === 'warning' && (
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
                    </span>
                  )}
                  {insight.severity === 'success' && (
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-100 leading-snug">
                    {insight.message}
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 mt-1.5 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 font-mono text-slate-400">
                      <Clock className="w-3 h-3" />
                      {insight.timestamp}
                    </span>
                    <span className="text-slate-600">•</span>
                    <Badge variant={insight.severity === 'warning' ? 'warning' : 'success'}>
                      Module: {insight.module}
                    </Badge>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedInsight(insight)}
                className="self-start sm:self-center px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-500/40 text-cyan-300 text-xs font-semibold flex items-center space-x-1.5 transition-colors shrink-0"
              >
                <span>View Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Access to Digital Twin 3D View */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold font-display text-white">Interactive 3D Digital Twin Viewer</h3>
          <p className="text-xs text-slate-400 mt-1">
            Explore 5-floor building 3D mesh, temperature distribution, CCTV camera placements, and equipment health.
          </p>
        </div>
        <button
          onClick={() => onNavigate('digital-twin')}
          className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center space-x-2 transition-all self-start md:self-auto shrink-0"
        >
          <span>Launch 3D Building Twin</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Insight Details Modal */}
      <Modal
        isOpen={!!selectedInsight}
        onClose={() => setSelectedInsight(null)}
        title={`AI Insight Details: ${selectedInsight?.module}`}
      >
        {selectedInsight && (
          <div className="space-y-4 text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400 font-mono">Timestamp: {selectedInsight.timestamp}</span>
              <Badge variant={selectedInsight.severity === 'warning' ? 'warning' : 'success'}>
                {selectedInsight.severity.toUpperCase()}
              </Badge>
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">{selectedInsight.message}</h4>
              <p className="text-slate-300 mt-2 leading-relaxed bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
                {selectedInsight.details}
              </p>
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  const target = selectedInsight.module.toLowerCase();
                  setSelectedInsight(null);
                  if (target.includes('energy') || target.includes('electricity')) onNavigate('energy');
                  else if (target.includes('fire') || target.includes('emergency')) onNavigate('emergency');
                  else if (target.includes('parking')) onNavigate('parking');
                  else if (target.includes('complaint')) onNavigate('complaints');
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400"
              >
                Go to Module Page
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
