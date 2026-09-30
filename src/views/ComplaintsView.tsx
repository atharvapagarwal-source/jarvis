import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { mockComplaints } from '../data/mockData';
import { Badge } from '../components/common/Badge';

export const ComplaintsView: React.FC = () => {
  const [complaints] = useState(mockComplaints);
  const [aiInputText, setAiInputText] = useState('Water is leaking from the ceiling in Floor 3 corridor.');
  const [aiOutput, setAiOutput] = useState<{ category: string; priority: string; confidence: number } | null>({
    category: 'Plumbing',
    priority: 'High',
    confidence: 94,
  });

  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const handleClassifyAI = () => {
    const text = aiInputText.toLowerCase();
    let category = 'Other';
    let priority = 'Medium';
    let confidence = 91;

    if (text.includes('water') || text.includes('leak') || text.includes('pipe') || text.includes('plumbing')) {
      category = 'Plumbing';
      priority = 'High';
      confidence = 94;
    } else if (text.includes('light') || text.includes('spark') || text.includes('wire') || text.includes('power') || text.includes('flicker')) {
      category = 'Electrical';
      priority = 'High';
      confidence = 96;
    } else if (text.includes('elevator') || text.includes('lift') || text.includes('stuck')) {
      category = 'Lift';
      priority = 'Critical';
      confidence = 98;
    } else if (text.includes('trash') || text.includes('clean') || text.includes('dirty') || text.includes('bin')) {
      category = 'Cleaning';
      priority = 'Low';
      confidence = 92;
    }

    setAiOutput({ category, priority, confidence });
  };

  const filtered = complaints.filter((c) => {
    const catMatch = filterCategory === 'All' || c.category === filterCategory;
    const statMatch = filterStatus === 'All' || c.status === filterStatus;
    return catMatch && statMatch;
  });

  return (
    <div className="space-y-6">
      {/* 5 Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Total Complaints</span>
          <div className="text-2xl font-bold font-display text-white mt-1">48</div>
          <span className="text-[11px] text-slate-400">Recorded YTD</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-blue-500/20 bg-blue-950/10">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-400">Registered</span>
          <div className="text-2xl font-bold font-display text-white mt-1">18</div>
          <span className="text-[11px] text-blue-400 font-semibold">New Ticket Queue</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-amber-500/20 bg-amber-950/10">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">In Progress</span>
          <div className="text-2xl font-bold font-display text-white mt-1">12</div>
          <span className="text-[11px] text-amber-400 font-semibold">Technician Assigned</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-emerald-500/20 bg-emerald-950/10">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">Solved</span>
          <div className="text-2xl font-bold font-display text-white mt-1">15</div>
          <span className="text-[11px] text-emerald-400 font-semibold">Resolved Today</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-rose-500/20 bg-rose-950/10">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-400">Overlooked</span>
          <div className="text-2xl font-bold font-display text-white mt-1">3</div>
          <span className="text-[11px] text-rose-400 font-semibold">SLA Breach</span>
        </div>
      </div>

      {/* AI COMPLAINT AUTO-CLASSIFIER INTERACTIVE DEMO */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold font-display text-white">AI Complaint Classification Sandbox</h3>
            <p className="text-xs text-slate-400">
              Natural Language Processing model auto-categorizes issue text and assigns SLA priority.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Text Input */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-xs font-semibold text-slate-300">
              Test Complaint Description Text:
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={aiInputText}
                onChange={(e) => setAiInputText(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                placeholder="e.g. Elevator produces noise on 3rd floor..."
              />
              <button
                onClick={handleClassifyAI}
                className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 flex items-center space-x-1.5 shrink-0"
              >
                <span>Run AI Classifier</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* AI Output Result Card */}
          {aiOutput && (
            <div className="glass-card p-4 rounded-xl border border-cyan-500/40 bg-cyan-950/20 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Predicted Category:</span>
                <span className="font-bold text-white text-sm">{aiOutput.category}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>SLA Priority:</span>
                <Badge variant={aiOutput.priority === 'High' || aiOutput.priority === 'Critical' ? 'danger' : 'info'}>
                  {aiOutput.priority}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Model Confidence:</span>
                <span className="font-bold text-emerald-400">{aiOutput.confidence}%</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Complaint Tickets Table */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold font-display text-white">Active Complaint & Maintenance Tickets</h3>
            <p className="text-xs text-slate-400">Filter tickets by category and resolution status</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-slate-300 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-cyan-500"
            >
              <option value="All">All Categories</option>
              <option value="Electrical">Electrical</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Security">Security</option>
              <option value="Lift">Lift</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-slate-300 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-cyan-500"
            >
              <option value="All">All Statuses</option>
              <option value="Registered">Registered</option>
              <option value="In Progress">In Progress</option>
              <option value="Solved">Solved</option>
              <option value="Overlooked">Overlooked</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
              <tr>
                <th className="p-3 rounded-l-lg">Ticket ID</th>
                <th className="p-3">Category</th>
                <th className="p-3">Description</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Assigned To</th>
                <th className="p-3">Status</th>
                <th className="p-3 rounded-r-lg">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((cmp) => (
                <tr key={cmp.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-mono font-bold text-cyan-400">{cmp.complaintId}</td>
                  <td className="p-3 text-slate-200 font-medium">{cmp.category}</td>
                  <td className="p-3 text-slate-300 max-w-xs">{cmp.description}</td>
                  <td className="p-3">
                    <Badge
                      variant={
                        cmp.priority === 'Critical'
                          ? 'danger'
                          : cmp.priority === 'High'
                          ? 'warning'
                          : 'info'
                      }
                    >
                      {cmp.priority}
                    </Badge>
                  </td>
                  <td className="p-3 text-slate-400">{cmp.assignedTo}</td>
                  <td className="p-3">
                    <Badge
                      variant={
                        cmp.status === 'Solved'
                          ? 'success'
                          : cmp.status === 'Overlooked'
                          ? 'danger'
                          : cmp.status === 'In Progress'
                          ? 'warning'
                          : 'info'
                      }
                    >
                      {cmp.status}
                    </Badge>
                  </td>
                  <td className="p-3 text-slate-400 font-mono">{cmp.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
