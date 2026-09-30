import React from 'react';
import {
  Box,
  Layers,
  ArrowRight,
  Cpu,
  Database,
  Activity,
  Award
} from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel p-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-4 max-w-4xl relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold font-mono">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>Second-Year Engineering EDI Project</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white leading-tight">
            AI-Driven Digital Twin for Intelligent Building Management and Predictive Maintenance
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            "An AI-powered Digital Twin platform that integrates security, energy, emergency, workforce, parking, complaint, and waste-management data into a centralized intelligent building-management system."
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="info">Digital Twin</Badge>
            <Badge variant="success">Three.js 3D Mesh</Badge>
            <Badge variant="warning">COCO Vision</Badge>
            <Badge variant="neutral">Vite + React + TS</Badge>
            <Badge variant="info">FastAPI/MongoDB Ready</Badge>
          </div>
        </div>
      </div>

      {/* SYSTEM ARCHITECTURE FLOW DIAGRAM */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
          <Layers className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="text-base font-bold font-display text-white">System Architecture Pipeline</h3>
            <p className="text-xs text-slate-400">End-to-end data processing and visualization pipeline</p>
          </div>
        </div>

        {/* Visual Flow Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 text-center">
          {/* Node 1 */}
          <div className="glass-card p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400">
              <Box className="w-5 h-5" />
            </div>
            <span className="font-bold text-xs text-white">Physical Building</span>
            <span className="text-[10px] text-slate-400">5 Floors, Facilities</span>
          </div>

          <div className="hidden md:flex items-center justify-center text-slate-600">
            <ArrowRight className="w-5 h-5" />
          </div>

          {/* Node 2 */}
          <div className="glass-card p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="font-bold text-xs text-white">IoT + CCTV + Sensors</span>
            <span className="text-[10px] text-slate-400">Telemetry Stream</span>
          </div>

          <div className="hidden md:flex items-center justify-center text-slate-600">
            <ArrowRight className="w-5 h-5" />
          </div>

          {/* Node 3 */}
          <div className="glass-card p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <span className="font-bold text-xs text-white">Central Database</span>
            <span className="text-[10px] text-slate-400">MongoDB / REST API</span>
          </div>

          <div className="hidden md:flex items-center justify-center text-slate-600">
            <ArrowRight className="w-5 h-5" />
          </div>

          {/* Node 4 */}
          <div className="glass-card p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-purple-400">
              <Activity className="w-5 h-5" />
            </div>
            <span className="font-bold text-xs text-white">AI / ML Engine</span>
            <span className="text-[10px] text-slate-400">Predictions & Vision</span>
          </div>

          <div className="hidden md:flex items-center justify-center text-slate-600">
            <ArrowRight className="w-5 h-5" />
          </div>

          {/* Node 5 */}
          <div className="glass-card p-4 rounded-xl border border-cyan-500/40 bg-cyan-950/20 flex flex-col items-center justify-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
              <Box className="w-5 h-5" />
            </div>
            <span className="font-bold text-xs text-cyan-300">JARVIS Twin</span>
            <span className="text-[10px] text-cyan-400 font-mono">Monitoring & Alerts</span>
          </div>
        </div>
      </div>

      {/* PROJECT OBJECTIVES SECTION */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold font-display text-white pb-3 border-b border-slate-800">
          Core Academic Project Objectives
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="glass-card p-4 rounded-xl border border-slate-800 flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold shrink-0">
              1
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Study Digital Twin & AI Principles</h4>
              <p className="text-slate-400 mt-1 leading-relaxed">
                Investigate principles of 3D Digital Twins, Artificial Intelligence, IoT sensor integration, Computer Vision, and Predictive Maintenance in smart infrastructure.
              </p>
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl border border-slate-800 flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold shrink-0">
              2
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Data Collection & Preprocessing</h4>
              <p className="text-slate-400 mt-1 leading-relaxed">
                Collect and preprocess data from public benchmark datasets (UCI, Kaggle, COCO), APIs, simulated IoT sensors, and system-generated operational records.
              </p>
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl border border-slate-800 flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold shrink-0">
              3
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">ML/DL Model Implementation</h4>
              <p className="text-slate-400 mt-1 leading-relaxed">
                Implement suitable machine learning and deep learning models for energy demand forecasting, NLP complaint classification, and vibration predictive maintenance.
              </p>
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl border border-slate-800 flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold shrink-0">
              4
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Benchmark Model Evaluation</h4>
              <p className="text-slate-400 mt-1 leading-relaxed">
                Benchmark model performance using suitable evaluation metrics (Accuracy, Precision, Recall, RMSE) and build an enterprise-grade interactive web dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
