import React from 'react';
import {
  Flame,
  AlertTriangle,
  ShieldCheck,
  Calendar,
  Clock,
  Wrench,
  DollarSign
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { mockEmergencyAlerts, mockEmergencyEquipment, mockEmergencyCosts } from '../data/mockData';
import { Badge } from '../components/common/Badge';

export const EmergencyView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Status Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Status Card */}
        <div className="glass-panel rounded-2xl p-5 border border-emerald-500/30 bg-emerald-950/20 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Emergency Status
            </span>
            <div className="text-2xl font-bold font-display text-white mt-1 flex items-center gap-2">
              SAFE
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <p className="text-xs text-slate-400 mt-1">All active alarms under control</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Flame className="w-7 h-7" />
          </div>
        </div>

        {/* Today's Alerts Count */}
        <div className="glass-panel rounded-2xl p-5 border border-amber-500/30 bg-amber-950/20 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Today's Alerts
            </span>
            <div className="text-2xl font-bold font-display text-white mt-1">
              02 Alerts
            </div>
            <p className="text-xs text-slate-400 mt-1">1 warning requiring review</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <AlertTriangle className="w-7 h-7" />
          </div>
        </div>

        {/* Inspection Compliance */}
        <div className="glass-panel rounded-2xl p-5 border border-cyan-500/30 bg-cyan-950/20 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              Inspection Readiness
            </span>
            <div className="text-2xl font-bold font-display text-white mt-1">
              87.5%
            </div>
            <p className="text-xs text-slate-400 mt-1">1 unit inspection overdue</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Wrench className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* Emergency Alerts Feed & Maintenance Cost Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Emergency Alert Cards */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              Recent Emergency Sensors & Alarms
            </h3>
            <span className="text-xs font-mono text-slate-400">Live Log</span>
          </div>

          <div className="space-y-3">
            {mockEmergencyAlerts.map((alert) => (
              <div
                key={alert.id}
                className="glass-card p-4 rounded-xl border border-slate-800/80 flex items-center justify-between hover:border-slate-700"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-sm text-white">{alert.type}</h4>
                    <Badge variant={alert.severity === 'Warning' ? 'warning' : 'info'}>
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{alert.location}</p>
                  <span className="text-[10px] text-slate-500 font-mono mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {alert.timestamp}
                  </span>
                </div>

                <Badge variant={alert.status === 'Active' ? 'warning' : 'success'}>
                  {alert.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Maintenance Costs Chart */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                Monthly Safety Maintenance Cost (₹)
              </h3>
              <p className="text-xs text-slate-400">Emergency suppression & sensor audit budget</p>
            </div>
            <span className="text-xs font-mono text-cyan-400">Total YTD: ₹46,900</span>
          </div>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockEmergencyCosts}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `₹${v}`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                  formatter={(value: any) => [`₹${value.toLocaleString()}`, 'Cost']}
                />
                <Bar dataKey="cost" fill="#06b6d4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Emergency Equipment Table */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold font-display text-white">Emergency Equipment Inventory Matrix</h3>
            <p className="text-xs text-slate-400">Quarterly inspection schedule & physical audit tracking</p>
          </div>
          <button className="px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400">
            + Log Inspection
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
              <tr>
                <th className="p-3 rounded-l-lg">Equipment Name</th>
                <th className="p-3">Location</th>
                <th className="p-3">Status</th>
                <th className="p-3">Last Inspection</th>
                <th className="p-3 rounded-r-lg">Next Inspection</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {mockEmergencyEquipment.map((eq) => (
                <tr key={eq.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-semibold text-slate-100">{eq.name}</td>
                  <td className="p-3 text-slate-400">{eq.location}</td>
                  <td className="p-3">
                    <Badge
                      variant={
                        eq.status === 'Inspection Due'
                          ? 'warning'
                          : eq.status === 'Maintenance Required'
                          ? 'danger'
                          : 'success'
                      }
                    >
                      {eq.status}
                    </Badge>
                  </td>
                  <td className="p-3 text-slate-400 font-mono">{eq.lastInspection}</td>
                  <td className="p-3 font-mono text-cyan-400 flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span>{eq.nextInspection}</span>
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
