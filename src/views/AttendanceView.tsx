import React, { useState } from 'react';
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  Search,
  Download,
  Calendar
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { mockWorkers } from '../data/mockData';
import { Badge } from '../components/common/Badge';

export const AttendanceView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const attendanceTrend = [
    { day: 'Mon', rate: 87.5 },
    { day: 'Tue', rate: 90.6 },
    { day: 'Wed', rate: 84.4 },
    { day: 'Thu', rate: 88.0 },
    { day: 'Fri', rate: 91.2 },
    { day: 'Sat', rate: 75.0 },
    { day: 'Sun', rate: 68.0 },
  ];

  const filteredWorkers = mockWorkers.filter((w) => {
    const matchesSearch =
      w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.workerId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || w.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6">
      {/* 5 Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Total Workers</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-display text-white">32</div>
          <span className="text-[11px] text-slate-400">Registered Roster</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-emerald-500/20 bg-emerald-950/10">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Present</span>
            <UserCheck className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-display text-white">27</div>
          <span className="text-[11px] text-emerald-400 font-semibold">On Site Active</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-rose-500/20 bg-rose-950/10">
          <div className="flex items-center justify-between text-rose-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Absent</span>
            <UserX className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-display text-white">4</div>
          <span className="text-[11px] text-rose-400 font-semibold">Unexcused</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-amber-500/20 bg-amber-950/10">
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">On Leave</span>
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-display text-white">1</div>
          <span className="text-[11px] text-amber-400 font-semibold">Approved Leave</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-cyan-500/20 bg-cyan-950/10">
          <div className="flex items-center justify-between text-cyan-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Attendance Rate</span>
            <span className="text-xs font-mono font-bold">%</span>
          </div>
          <div className="text-2xl font-bold font-display text-white">84.4%</div>
          <span className="text-[11px] text-cyan-400 font-semibold">Target: &gt;85%</span>
        </div>
      </div>

      {/* Attendance Trend Line Chart */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold font-display text-white">7-Day Attendance Rate Trend</h3>
            <p className="text-xs text-slate-400">Weekly workforce availability percentage</p>
          </div>
          <div className="flex items-center space-x-2 text-xs text-cyan-400 font-mono">
            <Calendar className="w-4 h-4" />
            <span>This Week</span>
          </div>
        </div>

        <div className="h-48 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={attendanceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} domain={[50, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                formatter={(val: any) => [`${val}%`, 'Attendance Rate']}
              />
              <Line type="monotone" dataKey="rate" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4, fill: '#06b6d4' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Worker Roster Table */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold font-display text-white">Worker Roster & Access Logs</h3>
            <p className="text-xs text-slate-400">Biometric gate scan entry and exit timestamps</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative w-48">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search worker..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Department Filter */}
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-slate-300 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-cyan-500"
            >
              <option value="All">All Departments</option>
              <option value="Security">Security</option>
              <option value="HVAC Maintenance">HVAC Maintenance</option>
              <option value="Electrical Tech">Electrical Tech</option>
              <option value="Cleaning & Waste">Cleaning & Waste</option>
              <option value="IT Systems">IT Systems</option>
            </select>

            <button className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-white flex items-center space-x-1.5">
              <Download className="w-3.5 h-3.5" />
              <span>Export Roster</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
              <tr>
                <th className="p-3 rounded-l-lg">Worker ID</th>
                <th className="p-3">Worker Name</th>
                <th className="p-3">Department</th>
                <th className="p-3">Entry Time</th>
                <th className="p-3">Exit Time</th>
                <th className="p-3">Status</th>
                <th className="p-3 rounded-r-lg">Attendance %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredWorkers.map((w) => (
                <tr key={w.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-mono font-semibold text-cyan-400">{w.workerId}</td>
                  <td className="p-3 font-semibold text-white">{w.name}</td>
                  <td className="p-3 text-slate-400">{w.department}</td>
                  <td className="p-3 font-mono text-slate-300">{w.entryTime}</td>
                  <td className="p-3 font-mono text-slate-300">{w.exitTime}</td>
                  <td className="p-3">
                    <Badge
                      variant={
                        w.status === 'Present'
                          ? 'success'
                          : w.status === 'On Leave'
                          ? 'warning'
                          : 'danger'
                      }
                    >
                      {w.status}
                    </Badge>
                  </td>
                  <td className="p-3 font-mono font-bold text-white">{w.attendanceRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
