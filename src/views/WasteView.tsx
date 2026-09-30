import React, { useState } from 'react';
import {
  Trash2,
  Sparkles,
  PieChart as PieIcon
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { mockWasteBins } from '../data/mockData';
import { Badge } from '../components/common/Badge';

export const WasteView: React.FC = () => {
  const [selectedSample, setSelectedSample] = useState<'plastic' | 'organic' | 'paper'>('plastic');

  const wasteComposition = [
    { name: 'Recyclable', value: 180, color: '#06b6d4' },
    { name: 'Organic', value: 120, color: '#10b981' },
    { name: 'General', value: 80, color: '#f59e0b' },
    { name: 'Other', value: 40, color: '#8b5cf6' },
  ];

  const sampleResults = {
    plastic: { detected: 'PET Bottle / Plastic Wrapper', category: 'Recyclable', confidence: 96, color: 'text-cyan-400' },
    organic: { detected: 'Food Waste / Peelings', category: 'Organic Compostable', confidence: 94, color: 'text-emerald-400' },
    paper: { detected: 'Cardboard Box / Shredded Paper', category: 'Recyclable Paper', confidence: 98, color: 'text-blue-400' },
  };

  const activeResult = sampleResults[selectedSample];

  return (
    <div className="space-y-6">
      {/* 5 Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Total Waste Today</span>
          <div className="text-2xl font-bold font-display text-white mt-1">420 kg</div>
          <span className="text-[11px] text-slate-400">Combined Collections</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-cyan-500/20 bg-cyan-950/10">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400">Recyclable</span>
          <div className="text-2xl font-bold font-display text-white mt-1">180 kg</div>
          <span className="text-[11px] text-cyan-400 font-semibold">42.8% of total</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-emerald-500/20 bg-emerald-950/10">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">Organic</span>
          <div className="text-2xl font-bold font-display text-white mt-1">120 kg</div>
          <span className="text-[11px] text-emerald-400 font-semibold">28.5% of total</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-amber-500/20 bg-amber-950/10">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">General Waste</span>
          <div className="text-2xl font-bold font-display text-white mt-1">80 kg</div>
          <span className="text-[11px] text-amber-400 font-semibold">19.0% of total</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-purple-500/20 bg-purple-950/10">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-400">Other / Hazmat</span>
          <div className="text-2xl font-bold font-display text-white mt-1">40 kg</div>
          <span className="text-[11px] text-purple-400 font-semibold">9.5% of total</span>
        </div>
      </div>

      {/* Smart Bin Telemetry Cards */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-cyan-400" />
              Ultrasonic Smart Bin Telemetry Meters
            </h3>
            <p className="text-xs text-slate-400">Real-time fill level sensors across building floors</p>
          </div>
          <span className="text-xs font-mono text-cyan-400">1 Bin Overfill Warning</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockWasteBins.map((bin) => (
            <div
              key={bin.id}
              className={`glass-card p-5 rounded-xl border transition-all ${
                bin.fillPercentage > 85
                  ? 'border-rose-500/50 bg-rose-950/10'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-bold text-sm text-white">{bin.binId}</h4>
                  <p className="text-xs text-slate-400">{bin.location}</p>
                </div>
                <Badge variant={bin.fillPercentage > 85 ? 'danger' : 'success'}>
                  {bin.fillPercentage > 85 ? 'FULL' : 'NORMAL'}
                </Badge>
              </div>

              {/* Meter Fill Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Fill Level</span>
                  <span
                    className={`font-bold ${
                      bin.fillPercentage > 85 ? 'text-rose-400' : 'text-cyan-400'
                    }`}
                  >
                    {bin.fillPercentage}% Full
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden border border-slate-800 p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      bin.fillPercentage > 85
                        ? 'bg-rose-500 shadow-sm shadow-rose-500/50'
                        : 'bg-cyan-500'
                    }`}
                    style={{ width: `${bin.fillPercentage}%` }}
                  />
                </div>
              </div>

              <span className="block text-[10px] text-slate-500 font-mono mt-3">
                Last Emptied: {bin.lastEmptied}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Material Classification Sandbox & Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Waste Classifier */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">AI Waste Image Classifier Sandbox</h3>
              <p className="text-xs text-slate-400">Computer Vision model identifying material recyclability</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xs text-slate-300">Select a sample waste item to test AI classification:</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setSelectedSample('plastic')}
                className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                  selectedSample === 'plastic'
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                🍾 PET Bottle
              </button>
              <button
                onClick={() => setSelectedSample('organic')}
                className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                  selectedSample === 'organic'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                🍌 Food Scrap
              </button>
              <button
                onClick={() => setSelectedSample('paper')}
                className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                  selectedSample === 'paper'
                    ? 'bg-blue-500/20 border-blue-500 text-blue-300 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                📦 Cardboard
              </button>
            </div>

            {/* Simulated Classification Result Box */}
            <div className="glass-card p-5 rounded-xl border border-cyan-500/30 bg-cyan-950/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase">Detection Output</span>
                <Badge variant="success">AI CONFIRMED</Badge>
              </div>
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Detected Item:</span>
                  <span className="font-bold text-white">{activeResult.detected}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Category:</span>
                  <span className={`font-bold ${activeResult.color}`}>{activeResult.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Confidence Score:</span>
                  <span className="font-bold text-emerald-400">{activeResult.confidence}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Waste Breakdown Pie Chart */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold font-display text-white">Daily Waste Category Share</h3>
              <p className="text-xs text-slate-400">Proportional breakdown of 420 kg total waste</p>
            </div>
            <PieIcon className="w-5 h-5 text-cyan-400" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={wasteComposition}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {wasteComposition.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                  formatter={(val: any) => [`${val} kg`, 'Weight']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2">
            {wasteComposition.map((w) => (
              <div key={w.name} className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: w.color }} />
                <span className="text-slate-300">{w.name}:</span>
                <span className="font-bold text-white">{w.value} kg</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
