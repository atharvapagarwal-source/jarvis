import React, { useState } from 'react';
import {
  Car,
  Clock,
  ShieldCheck,
  Zap,
  TrendingUp
} from 'lucide-react';
import { mockVehicleActivities } from '../data/mockData';
import { Badge } from '../components/common/Badge';

export const ParkingView: React.FC = () => {
  const [filterSlotStatus, setFilterSlotStatus] = useState<string>('All');

  // Simulated 100 slot grid status generator
  const slots = Array.from({ length: 100 }, (_, i) => {
    const num = i + 1;
    let status: 'Available' | 'Occupied' | 'Reserved' = 'Occupied';
    if (num <= 28) status = 'Available';
    else if (num <= 33) status = 'Reserved';

    const isEV = num <= 10;
    return {
      id: `slot-${num}`,
      slotNumber: isEV ? `EV-${num}` : `A-${num}`,
      status,
      isEV,
    };
  });

  const filteredSlots = filterSlotStatus === 'All'
    ? slots
    : slots.filter(s => s.status === filterSlotStatus);

  return (
    <div className="space-y-6">
      {/* 5 Top Parking KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Total Slots</span>
            <Car className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold font-display text-white">100</div>
          <span className="text-[11px] text-slate-400">Ground Floor & Deck B</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-rose-500/20 bg-rose-950/10">
          <div className="flex items-center justify-between text-rose-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Occupied</span>
            <Car className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold font-display text-white">72</div>
          <span className="text-[11px] text-rose-400 font-semibold">72% Occupancy Rate</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-emerald-500/20 bg-emerald-950/10">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Available</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-display text-white">28</div>
          <span className="text-[11px] text-emerald-400 font-semibold">Open for Entry</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-amber-500/20 bg-amber-950/10">
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Reserved</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-display text-white">5</div>
          <span className="text-[11px] text-amber-400 font-semibold">EV & VIP Slots</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-cyan-500/20 bg-cyan-950/10">
          <div className="flex items-center justify-between text-cyan-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Peak Hours</span>
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="text-lg font-bold font-display text-white">10:30 AM</div>
          <span className="text-[11px] text-cyan-400 font-semibold">Avg Duration: 4h 12m</span>
        </div>
      </div>

      {/* Visual Parking Slots Grid */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
              <Car className="w-5 h-5 text-cyan-400" />
              Interactive 100-Slot Parking Deck Grid
            </h3>
            <p className="text-xs text-slate-400">Ultrasonic sensor status indicator map</p>
          </div>

          {/* Color Legend & Filter */}
          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Available', 'Occupied', 'Reserved'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterSlotStatus(st)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  filterSlotStatus === st
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-6 text-xs text-slate-300 font-mono">
          <span className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded bg-emerald-500 inline-block" />
            <span>Green = Available (28)</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded bg-rose-500 inline-block" />
            <span>Red = Occupied (72)</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded bg-amber-500 inline-block" />
            <span>Yellow = Reserved (5)</span>
          </span>
        </div>

        {/* 100 Slots Grid Display */}
        <div className="grid grid-cols-5 sm:grid-cols-10 lg:grid-cols-20 gap-2 pt-2">
          {filteredSlots.map((slot) => (
            <div
              key={slot.id}
              className={`p-2 rounded-lg text-center font-mono border transition-all cursor-pointer hover:scale-105 ${
                slot.status === 'Available'
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'
                  : slot.status === 'Reserved'
                  ? 'bg-amber-950/60 border-amber-500/40 text-amber-400'
                  : 'bg-rose-950/40 border-rose-500/30 text-rose-300'
              }`}
            >
              <span className="block text-[10px] font-bold">{slot.slotNumber}</span>
              <span className="text-[8px] opacity-75">{slot.status[0]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Vehicle Activity Table */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold font-display text-white">ANPR Gate Vehicle Activity Log</h3>
            <p className="text-xs text-slate-400">Automated Number Plate Recognition entry/exit telemetry</p>
          </div>
          <span className="text-xs font-mono text-cyan-400">Today: 142 Entries / 114 Exits</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
              <tr>
                <th className="p-3 rounded-l-lg">Vehicle Plate Number</th>
                <th className="p-3">Vehicle Type</th>
                <th className="p-3">Entry Time</th>
                <th className="p-3">Exit Time</th>
                <th className="p-3">Assigned Slot</th>
                <th className="p-3 rounded-r-lg">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {mockVehicleActivities.map((act) => (
                <tr key={act.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-mono font-bold text-white">{act.vehicleNumber}</td>
                  <td className="p-3">
                    <Badge variant={act.vehicleType === 'EV' ? 'success' : 'info'}>
                      {act.vehicleType}
                    </Badge>
                  </td>
                  <td className="p-3 font-mono text-slate-300">{act.entryTime}</td>
                  <td className="p-3 font-mono text-slate-400">{act.exitTime}</td>
                  <td className="p-3 font-mono font-semibold text-cyan-400">{act.parkingSlot}</td>
                  <td className="p-3 font-mono text-slate-300 flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{act.duration}</span>
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
