import React, { useState } from 'react';
import {
  Activity,
  Wrench,
  Sparkles,
  Thermometer
} from 'lucide-react';
import { mockMaintenanceEquipment } from '../data/mockData';
import type { MaintenanceEquipment } from '../types';
import { Badge } from '../components/common/Badge';

export const MaintenanceView: React.FC = () => {
  const [selectedEq, setSelectedEq] = useState<MaintenanceEquipment | null>(mockMaintenanceEquipment[1]); // Water pump by default

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-white">AI Predictive Maintenance Diagnostics</h2>
            <p className="text-xs text-slate-400">
              Machine learning failure forecasting based on 3-axis vibration sensors & thermal imaging.
            </p>
          </div>
        </div>

        <span className="px-3.5 py-1.5 rounded-lg bg-rose-950/60 text-rose-400 border border-rose-500/30 text-xs font-mono font-bold shrink-0">
          1 Critical Action Required (AC Unit 02)
        </span>
      </div>

      {/* 4 Equipment Health Gauge Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockMaintenanceEquipment.map((eq) => (
          <div
            key={eq.id}
            onClick={() => setSelectedEq(eq)}
            className={`glass-panel p-5 rounded-2xl border transition-all cursor-pointer ${
              selectedEq?.id === eq.id
                ? 'border-cyan-500/80 shadow-lg shadow-cyan-500/15'
                : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {eq.name.split(' ')[0]} Telemetry
              </span>
              <Badge
                variant={
                  eq.status === 'High Risk'
                    ? 'danger'
                    : eq.status === 'Maintenance Recommended'
                    ? 'warning'
                    : 'success'
                }
              >
                {eq.status}
              </Badge>
            </div>

            <h3 className="font-bold text-base text-white font-display mb-3">{eq.name}</h3>

            {/* Health Meter Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Health Index</span>
                <span
                  className={`font-bold ${
                    eq.health < 50
                      ? 'text-rose-400'
                      : eq.health < 75
                      ? 'text-amber-400'
                      : 'text-emerald-400'
                  }`}
                >
                  {eq.health}%
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    eq.health < 50
                      ? 'bg-rose-500'
                      : eq.health < 75
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${eq.health}%` }}
                />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Failure Window:</span>
              <span className="font-bold text-cyan-400">Within {eq.predictedFailureDays} days</span>
            </div>
          </div>
        ))}
      </div>

      {/* AI MAINTENANCE PREDICTION DIAGNOSTIC DETAIL PANEL */}
      {selectedEq && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-cyan-400">Diagnostic Inspection</span>
                <h3 className="text-lg font-bold font-display text-white">{selectedEq.name} Deep Diagnosis</h3>
              </div>
            </div>
            <Badge
              variant={
                selectedEq.status === 'High Risk'
                  ? 'danger'
                  : selectedEq.status === 'Maintenance Recommended'
                  ? 'warning'
                  : 'success'
              }
              size="md"
            >
              Status: {selectedEq.status}
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* AI Recommendation Summary */}
            <div className="lg:col-span-2 space-y-4">
              <div className="glass-card p-5 rounded-xl border border-cyan-500/30 bg-cyan-950/20 space-y-3">
                <h4 className="font-bold text-sm text-cyan-300 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-cyan-400" />
                  AI Maintenance Prediction & Root Cause
                </h4>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  {selectedEq.reason}
                </p>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Predicted Required Service Date:</span>
                  <span className="font-bold text-emerald-400">{selectedEq.nextPredictedDate}</span>
                </div>
              </div>

              {/* Sensor Parameters Breakdown */}
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center space-x-2 text-amber-400 mb-1">
                    <Activity className="w-4 h-4" />
                    <span className="font-semibold">Vibration Spectrum</span>
                  </div>
                  <div className="text-lg font-bold text-white">{selectedEq.vibrationLevel}</div>
                  <span className="text-[10px] text-slate-400">Threshold limit: 1.5 mm/s</span>
                </div>

                <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center space-x-2 text-rose-400 mb-1">
                    <Thermometer className="w-4 h-4" />
                    <span className="font-semibold">Operating Temperature</span>
                  </div>
                  <div className="text-lg font-bold text-white">{selectedEq.temp}</div>
                  <span className="text-[10px] text-slate-400">Thermal cutout limit: 55°C</span>
                </div>
              </div>
            </div>

            {/* Maintenance History */}
            <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Maintenance History & Log</h4>
              <div className="space-y-3 text-xs">
                <div className="pb-2 border-b border-slate-800/80">
                  <span className="text-[10px] text-slate-400 font-mono">Last Overhaul:</span>
                  <p className="font-semibold text-slate-200 mt-0.5">{selectedEq.lastMaintained}</p>
                  <span className="text-[10px] text-emerald-400">Verified by Otis Mechanical</span>
                </div>

                <div className="pb-2 border-b border-slate-800/80">
                  <span className="text-[10px] text-slate-400 font-mono">Warranty Status:</span>
                  <p className="font-semibold text-slate-200 mt-0.5">Active until Dec 2028</p>
                </div>

                <button className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors">
                  Create Work Order Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
