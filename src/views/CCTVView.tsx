import React, { useState } from 'react';
import {
  Video,
  Eye,
  Cpu,
  Clock,
  ShieldCheck,
  Maximize2
} from 'lucide-react';
import { mockCCTVCameras, mockDetectionEvents } from '../data/mockData';
import { Badge } from '../components/common/Badge';

export const CCTVView: React.FC = () => {
  const [selectedCamera, setSelectedCamera] = useState(mockCCTVCameras[0]);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filteredEvents = activeFilter === 'All'
    ? mockDetectionEvents
    : mockDetectionEvents.filter(e => e.objectType === activeFilter);

  return (
    <div className="space-y-6">
      {/* COCO Attribution Banner */}
      <div className="glass-panel rounded-2xl p-4 border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Neural Object Detection Engine
              <Badge variant="info">COCO Architecture</Badge>
            </h2>
            <p className="text-xs text-slate-400">
              Computer Vision powered by COCO-pretrained object detection neural networks operating on live CCTV video streams.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-xs text-cyan-400 bg-cyan-950/50 px-3 py-1.5 rounded-lg border border-cyan-800/40 shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>98.4% Frame Inference Accuracy</span>
        </div>
      </div>

      {/* 4 Camera Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockCCTVCameras.map((cam) => (
          <div
            key={cam.id}
            onClick={() => setSelectedCamera(cam)}
            className={`glass-panel rounded-2xl overflow-hidden border transition-all cursor-pointer ${
              selectedCamera.id === cam.id
                ? 'border-cyan-500/80 shadow-lg shadow-cyan-500/15'
                : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            {/* Simulated Live Video Screen */}
            <div className="relative h-56 bg-slate-950 flex items-center justify-center overflow-hidden group">
              {/* Simulated Feed Visual Grid */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(rgba(6, 182, 212, 0.4) 1px, transparent 1px)`,
                  backgroundSize: '16px 16px',
                }}
              />

              {/* Bounding Box Overlays (Simulated Computer Vision) */}
              <div className="absolute top-10 left-12 w-28 h-36 border-2 border-cyan-400 bg-cyan-500/10 rounded pointer-events-none flex flex-col justify-between p-1">
                <span className="bg-cyan-500 text-slate-950 font-mono text-[9px] font-bold px-1 rounded self-start">
                  Person 96%
                </span>
                <span className="text-[8px] text-cyan-300 font-mono self-end">ID: #P-884</span>
              </div>

              <div className="absolute bottom-8 right-16 w-36 h-24 border-2 border-emerald-400 bg-emerald-500/10 rounded pointer-events-none flex flex-col justify-between p-1">
                <span className="bg-emerald-500 text-slate-950 font-mono text-[9px] font-bold px-1 rounded self-start">
                  Car 94%
                </span>
                <span className="text-[8px] text-emerald-300 font-mono self-end">ID: #C-129</span>
              </div>

              {/* Live Overlay Status */}
              <div className="absolute top-3 left-3 flex items-center space-x-2 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-xs">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span className="font-bold text-white text-[11px] tracking-wider font-mono">● LIVE</span>
              </div>

              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-mono text-slate-300">
                1080P @ 30FPS
              </div>

              <div className="text-center z-10 opacity-70 group-hover:opacity-100 transition-opacity">
                <Video className="w-10 h-10 text-cyan-400 mx-auto mb-1" />
                <span className="text-xs text-slate-300 font-mono">Stream: {cam.name}</span>
              </div>
            </div>

            {/* Camera Details Card Body */}
            <div className="p-4 bg-slate-900/60 border-t border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-bold text-sm text-white">{cam.name}</h4>
                  <p className="text-xs text-slate-400">{cam.location}</p>
                </div>
                <button className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Detected Objects Summary Pills */}
              <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                <span className="px-2 py-1 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                  People: {cam.detectedObjects.people}
                </span>
                <span className="px-2 py-1 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                  Cars: {cam.detectedObjects.cars}
                </span>
                <span className="px-2 py-1 rounded bg-amber-950/60 text-amber-300 border border-amber-800/40">
                  Motorcycles: {cam.detectedObjects.motorcycles}
                </span>
                {cam.detectedObjects.trucks && (
                  <span className="px-2 py-1 rounded bg-purple-950/60 text-purple-300 border border-purple-800/40">
                    Trucks: {cam.detectedObjects.trucks}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI DETECTION PANEL & RECENT EVENT LOG */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-cyan-400" />
              AI Object Detection Stream & Log
            </h3>
            <p className="text-xs text-slate-400">
              Real-time classification history across Person, Car, Motorcycle, Truck, Bicycle categories.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {['All', 'Person', 'Car', 'Motorcycle', 'Truck', 'Bicycle'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  activeFilter === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Detection Events Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
              <tr>
                <th className="p-3 rounded-l-lg">Detection ID</th>
                <th className="p-3">Camera Source</th>
                <th className="p-3">Detected Object</th>
                <th className="p-3">AI Confidence</th>
                <th className="p-3 rounded-r-lg">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredEvents.map((evt) => (
                <tr key={evt.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-mono text-cyan-400 font-semibold">{evt.id}</td>
                  <td className="p-3 text-slate-200 font-medium">{evt.cameraName}</td>
                  <td className="p-3">
                    <Badge variant={evt.objectType === 'Person' ? 'info' : 'success'}>
                      {evt.objectType}
                    </Badge>
                  </td>
                  <td className="p-3 font-mono font-bold text-emerald-400">
                    {(evt.confidence * 100).toFixed(1)}%
                  </td>
                  <td className="p-3 text-slate-400 font-mono flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{evt.timestamp}</span>
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
