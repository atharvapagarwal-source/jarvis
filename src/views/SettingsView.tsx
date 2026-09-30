import React from 'react';
import {
  Database,
  Server
} from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const SettingsView: React.FC = () => {
  const dataSources = [
    {
      module: 'CCTV Computer Vision',
      dataset: 'COCO Dataset / COCO-pretrained object detection',
      type: 'Historical training data + Simulated stream',
      description: 'Used for object detection models (Person, Car, Motorcycle, Truck, Bicycle).',
    },
    {
      module: 'Electricity & Solar',
      dataset: 'UCI Machine Learning Repository & Kaggle Energy Datasets',
      type: 'Historical training data',
      description: 'Provides hourly consumption profiles, solar yield curves, and peak load baselines.',
    },
    {
      module: 'Weather Telemetry',
      dataset: 'Open Weather API Integration',
      type: 'Real-time API data',
      description: 'Ambient temperature, humidity, cloud coverage, and irradiance metrics.',
    },
    {
      module: 'Workers Attendance',
      dataset: 'Biometric Access Sensor Simulator',
      type: 'System-generated records',
      description: 'Simulated gate turnstile entry and exit scans.',
    },
    {
      module: 'Smart Parking',
      dataset: 'Ultrasonic Sensor & ANPR Camera Feed',
      type: 'Real-time sensor data + Simulated',
      description: '100 parking deck slots occupation states and vehicle plate logs.',
    },
    {
      module: 'Complaints & Service Tickets',
      dataset: 'Engineering Project Ticket Corpus',
      type: 'User-generated data + NLP model',
      description: 'Category and priority auto-classification model training set.',
    },
    {
      module: 'Waste Management',
      dataset: 'Public Waste Material Image Dataset',
      type: 'Historical training data',
      description: 'Image classification model for recyclable, organic, and general waste.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-white">System Settings & Data Source Attributions</h2>
            <p className="text-xs text-slate-400">
              Clear distinction between training datasets, real-time API feeds, simulated telemetry, and user input.
            </p>
          </div>
        </div>
      </div>

      {/* Dataset Legend Pills */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="glass-card p-3 rounded-xl border border-cyan-500/30 bg-cyan-950/10 text-xs">
          <span className="font-mono text-cyan-400 font-bold block mb-0.5">Real-time Sensor Data</span>
          <span className="text-[11px] text-slate-400">Live IoT telemetry streams</span>
        </div>
        <div className="glass-card p-3 rounded-xl border border-emerald-500/30 bg-emerald-950/10 text-xs">
          <span className="font-mono text-emerald-400 font-bold block mb-0.5">Historical Training</span>
          <span className="text-[11px] text-slate-400">Public ML benchmarks (UCI/COCO)</span>
        </div>
        <div className="glass-card p-3 rounded-xl border border-amber-500/30 bg-amber-950/10 text-xs">
          <span className="font-mono text-amber-400 font-bold block mb-0.5">Simulated Telemetry</span>
          <span className="text-[11px] text-slate-400">Prototype mathematical models</span>
        </div>
        <div className="glass-card p-3 rounded-xl border border-purple-500/30 bg-purple-950/10 text-xs">
          <span className="font-mono text-purple-400 font-bold block mb-0.5">User-Generated</span>
          <span className="text-[11px] text-slate-400">Interactive user inputs & tickets</span>
        </div>
      </div>

      {/* Data Source Information Table */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold font-display text-white pb-3 border-b border-slate-800">
          Academic Dataset Citation Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
              <tr>
                <th className="p-3 rounded-l-lg">Module</th>
                <th className="p-3">Source Dataset / API</th>
                <th className="p-3">Classification Type</th>
                <th className="p-3 rounded-r-lg">Application Scope</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {dataSources.map((ds, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-semibold text-white">{ds.module}</td>
                  <td className="p-3 font-mono text-cyan-400 font-semibold">{ds.dataset}</td>
                  <td className="p-3">
                    <Badge variant="info">{ds.type}</Badge>
                  </td>
                  <td className="p-3 text-slate-300">{ds.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Database-Ready MongoDB Schema Preview */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
          <Server className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="text-base font-bold font-display text-white">MongoDB & REST API Architecture Status</h3>
            <p className="text-xs text-slate-400">Database collections mapping & Python/FastAPI backend hooks</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
          {[
            'users',
            'workers',
            'attendance',
            'cctv_events',
            'emergency_alerts',
            'emergency_equipment',
            'electricity',
            'solar',
            'weather',
            'parking',
            'complaints',
            'waste',
            'maintenance',
            'buildings',
            'floors',
          ].map((col) => (
            <div key={col} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-slate-300">db.{col}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
