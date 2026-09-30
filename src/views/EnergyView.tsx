import React, { useState } from 'react';
import {
  Zap,
  Sun,
  AlertTriangle,
  CloudSun,
  Database,
  Sparkles,
  TrendingUp,
  Cloud
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { mockEnergyReadings } from '../data/mockData';
import { Badge } from '../components/common/Badge';

export const EnergyView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hourly' | 'weekly' | 'solarVsGrid'>('hourly');

  const weeklyData = [
    { day: 'Mon', grid: 1180, solar: 350 },
    { day: 'Tue', grid: 1210, solar: 370 },
    { day: 'Wed', grid: 1245, solar: 380 },
    { day: 'Thu', grid: 1190, solar: 360 },
    { day: 'Fri', grid: 1280, solar: 340 },
    { day: 'Sat', grid: 920, solar: 390 },
    { day: 'Sun', grid: 850, solar: 410 },
  ];

  return (
    <div className="space-y-6">
      {/* 5 Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-amber-500/20 bg-amber-950/10">
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Today's Usage</span>
            <Zap className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-display text-white">1,245 kWh</div>
          <span className="text-[11px] text-amber-400 font-semibold">+8.2% from yesterday</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Estimated Cost</span>
            <span className="text-xs font-mono text-cyan-400 font-bold">₹</span>
          </div>
          <div className="text-2xl font-bold font-display text-white">₹9,820</div>
          <span className="text-[11px] text-slate-400">Tariff: ₹7.88/kWh</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-emerald-500/20 bg-emerald-950/10">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Solar Generation</span>
            <Sun className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-display text-white">380 kWh</div>
          <span className="text-[11px] text-emerald-400 font-semibold">Peak: 140 kW @ 12:00</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-emerald-500/20 bg-emerald-950/10">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Solar Savings</span>
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-display text-white">₹3,420</div>
          <span className="text-[11px] text-emerald-400 font-semibold">Clean Energy Offset</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-cyan-500/20 bg-cyan-950/10">
          <div className="flex items-center justify-between text-cyan-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Solar Efficiency</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-display text-white">82%</div>
          <span className="text-[11px] text-cyan-400 font-semibold">Optimal Inverter Ratio</span>
        </div>
      </div>

      {/* AI Energy Anomaly Alert Banner */}
      <div className="glass-panel p-4 rounded-2xl border border-amber-500/40 bg-amber-950/30 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              AI Anomaly Detection Triggered
              <Badge variant="warning">ALERT</Badge>
            </h4>
            <p className="text-xs text-amber-200">
              Electricity consumption is 18% above normal weekday pattern. HVAC load on Floor 3 spike identified.
            </p>
          </div>
        </div>
        <button className="px-3.5 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 shrink-0">
          Optimize Load
        </button>
      </div>

      {/* Main Charts & Prediction Side Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Panel */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold font-display text-white">Power Telemetry & Forecast Charts</h3>
              <p className="text-xs text-slate-400">Real-time meter readings vs photovoltaic output</p>
            </div>

            {/* Tab selection */}
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab('hourly')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  activeTab === 'hourly' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Hourly Profile
              </button>
              <button
                onClick={() => setActiveTab('solarVsGrid')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  activeTab === 'solarVsGrid' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Solar vs Grid
              </button>
              <button
                onClick={() => setActiveTab('weekly')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  activeTab === 'weekly' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Weekly Trend
              </button>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              {activeTab === 'hourly' ? (
                <AreaChart data={mockEnergyReadings}>
                  <defs>
                    <linearGradient id="gridGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="solarGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                  />
                  <Area type="monotone" dataKey="gridUsage" stroke="#f59e0b" fillOpacity={1} fill="url(#gridGrad)" name="Grid Usage (kWh)" />
                  <Area type="monotone" dataKey="solarYield" stroke="#10b981" fillOpacity={1} fill="url(#solarGrad)" name="Solar Yield (kWh)" />
                </AreaChart>
              ) : (
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Bar dataKey="grid" name="Grid Electricity (kWh)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="solar" name="Solar Yield (kWh)" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Energy Prediction & Weather Widget */}
        <div className="space-y-6">
          {/* AI Forecast Card */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">AI Energy Forecast Model</h4>
                <p className="text-[11px] text-slate-400">Trained on historical load curves</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="glass-card p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Tomorrow's Predicted Usage</span>
                <span className="font-bold font-mono text-cyan-400 text-sm">1,310 kWh</span>
              </div>

              <div className="glass-card p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Expected Monthly Bill</span>
                <span className="font-bold font-mono text-white text-sm">₹52,400</span>
              </div>
            </div>
          </div>

          {/* Solar & Weather Diagnostics */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                <CloudSun className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Solar Weather Telemetry</h4>
                <p className="text-[11px] text-slate-400">Weather API Integration</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Cloud className="w-3.5 h-3.5 text-slate-400" />
                  Current Weather:
                </span>
                <span className="font-semibold text-white">Partly Cloudy (27°C)</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Solar Performance:</span>
                <Badge variant="success">Normal</Badge>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300">
                <span className="font-bold text-cyan-400 block mb-1">AI Recommendation:</span>
                "Monitor panel performance if cloud cover remains high."
              </div>
            </div>
          </div>

          {/* Dataset Citation */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center space-x-2.5 text-[11px] text-slate-400">
            <Database className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <strong className="text-slate-200">Data Attribution:</strong> UCI Machine Learning Repository & Kaggle Energy Datasets.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
