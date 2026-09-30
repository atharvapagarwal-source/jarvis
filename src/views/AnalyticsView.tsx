import React, { useState } from 'react';
import {
  Download,
  FileText,
  Zap,
  Car,
  Users,
  MessageSquareWarning,
  Flame,
  Trash2,
  Activity
} from 'lucide-react';
import { Modal } from '../components/common/Modal';
import { Badge } from '../components/common/Badge';

export const AnalyticsView: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string>('energy');
  const [dateRange, setDateRange] = useState<string>('weekly');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportedStatus, setExportedStatus] = useState<string | null>(null);

  const modules = [
    { id: 'energy', label: 'Energy Analytics', icon: Zap },
    { id: 'parking', label: 'Parking Analytics', icon: Car },
    { id: 'attendance', label: 'Attendance Analytics', icon: Users },
    { id: 'complaints', label: 'Complaint Analytics', icon: MessageSquareWarning },
    { id: 'emergency', label: 'Emergency Analytics', icon: Flame },
    { id: 'waste', label: 'Waste Analytics', icon: Trash2 },
    { id: 'maintenance', label: 'Maintenance Analytics', icon: Activity },
  ];

  const handleTriggerExport = (type: 'CSV' | 'PDF') => {
    setExportedStatus(`Generating ${type} report for ${activeModule.toUpperCase()} (${dateRange})...`);
    setTimeout(() => {
      setExportedStatus(`✓ Report successfully compiled! File JARVIS_${activeModule}_${dateRange}.${type.toLowerCase()} saved.`);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Analytics Header Controls */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-display text-white">JARVIS Cross-Modular Analytics Engine</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Aggregated time-series data analysis and downloadable compliance reports.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Date Selector */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            {['daily', 'weekly', 'monthly', 'quarterly'].map((r) => (
              <button
                key={r}
                onClick={() => setDateRange(r)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${
                  dateRange === r ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Export Button */}
          <button
            onClick={() => {
              setExportedStatus(null);
              setIsExportModalOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Report</span>
          </button>
        </div>
      </div>

      {/* Module Selection Pills */}
      <div className="flex bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 overflow-x-auto scrollbar-none space-x-1">
        {modules.map((m) => {
          const Icon = m.icon;
          const isActive = activeModule === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setActiveModule(m.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 shrink-0 transition-all ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Analytics Content Matrix */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold font-display text-white uppercase tracking-wider">
              {activeModule} Diagnostic Summary ({dateRange})
            </h3>
            <p className="text-xs text-slate-400">Statistical aggregation and historical variance</p>
          </div>
          <Badge variant="info">Verified Dataset</Badge>
        </div>

        {/* Detailed Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-[11px] text-slate-400 font-mono uppercase">Mean Operational Index</span>
            <div className="text-2xl font-bold font-display text-white">94.2%</div>
            <p className="text-xs text-emerald-400">+3.1% compared to prior period</p>
          </div>

          <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-[11px] text-slate-400 font-mono uppercase">Peak Anomaly Outliers</span>
            <div className="text-2xl font-bold font-display text-white">2 Detected</div>
            <p className="text-xs text-amber-400">Resolved via automated setpoint adjustment</p>
          </div>

          <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-[11px] text-slate-400 font-mono uppercase">Estimated Cost Savings</span>
            <div className="text-2xl font-bold font-display text-white">₹14,850</div>
            <p className="text-xs text-cyan-400">Achieved via predictive AI scheduling</p>
          </div>
        </div>

        {/* Simulated Report Table Preview */}
        <div className="overflow-x-auto pt-4">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
              <tr>
                <th className="p-3 rounded-l-lg">Metric Name</th>
                <th className="p-3">Baseline Target</th>
                <th className="p-3">Observed Telemetry</th>
                <th className="p-3">Variance %</th>
                <th className="p-3 rounded-r-lg">Compliance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-white">Primary Metric 01</td>
                <td className="p-3 font-mono text-slate-400">1,150 units</td>
                <td className="p-3 font-mono text-cyan-400 font-bold">1,245 units</td>
                <td className="p-3 font-mono text-amber-400">+8.2%</td>
                <td className="p-3">
                  <Badge variant="success">PASSED</Badge>
                </td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-white">Secondary Metric 02</td>
                <td className="p-3 font-mono text-slate-400">85.0%</td>
                <td className="p-3 font-mono text-cyan-400 font-bold">84.4%</td>
                <td className="p-3 font-mono text-slate-400">-0.6%</td>
                <td className="p-3">
                  <Badge variant="success">PASSED</Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Export Modal */}
      <Modal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        title="Download Analytics & Telemetry Report"
      >
        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex justify-between font-mono text-slate-400">
              <span>Target Module:</span>
              <span className="font-bold text-cyan-400 uppercase">{activeModule}</span>
            </div>
            <div className="flex justify-between font-mono text-slate-400">
              <span>Selected Period:</span>
              <span className="font-bold text-white uppercase">{dateRange}</span>
            </div>
            <div className="flex justify-between font-mono text-slate-400">
              <span>Format Compatibility:</span>
              <span className="font-bold text-emerald-400">CSV Data Stream / PDF Document</span>
            </div>
          </div>

          {exportedStatus && (
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-[11px] animate-fade-in">
              {exportedStatus}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => handleTriggerExport('CSV')}
              className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs flex items-center justify-center space-x-2"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Export CSV Dataset</span>
            </button>

            <button
              onClick={() => handleTriggerExport('PDF')}
              className="py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export PDF Report</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
