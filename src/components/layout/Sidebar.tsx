import React from 'react';
import {
  LayoutDashboard,
  Box,
  Video,
  Flame,
  Zap,
  Users,
  Car,
  MessageSquareWarning,
  Trash2,
  Activity,
  BarChart3,
  Bot,
  Settings,
  Info,
  ChevronRight,
  ShieldCheck,
  User,
  X
} from 'lucide-react';
import type { UserRole } from '../../types';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
  role,
  setRole,
  isOpen,
  onClose,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'digital-twin', label: 'Digital Twin', icon: Box },
    { id: 'cctv', label: 'CCTV Monitoring', icon: Video },
    { id: 'emergency', label: 'Fire & Emergency', icon: Flame },
    { id: 'energy', label: 'Electricity & Solar', icon: Zap },
    { id: 'attendance', label: 'Workers Attendance', icon: Users },
    { id: 'parking', label: 'Smart Parking', icon: Car },
    { id: 'complaints', label: 'Complaints', icon: MessageSquareWarning },
    { id: 'waste', label: 'Waste Management', icon: Trash2 },
    { id: 'maintenance', label: 'Predictive Maintenance', icon: Activity },
    { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Bot },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'about', label: 'About Project', icon: Info },
  ];

  const handleNavClick = (id: string) => {
    setActiveView(id);
    onClose();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-[#0F172A] border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header Branding */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Box className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg tracking-wider text-white flex items-center gap-1.5">
                JARVIS
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-sans font-semibold border border-cyan-500/30">
                  AI v2.4
                </span>
              </h1>
              <p className="text-[11px] text-slate-400 font-medium">AI Building Digital Twin</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg font-medium text-sm transition-all duration-150 group ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/10 text-cyan-400 border border-cyan-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 text-cyan-400" />}
              </button>
            );
          })}
        </nav>

        {/* Footer Status & User Info */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/50 space-y-3">
          {/* System status */}
          <div className="px-3 py-2 rounded-lg bg-emerald-950/40 border border-emerald-500/20 flex items-center space-x-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* User profile dropdown / info */}
          <div className="pt-1 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 font-bold text-xs">
                <User className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white leading-tight">Admin</p>
                <p className="text-[10px] text-slate-400">{role}</p>
              </div>
            </div>
            
            {/* Quick role toggle */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="bg-slate-800 text-[11px] text-slate-300 border border-slate-700 rounded px-2 py-1 outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="Administrator">Admin</option>
              <option value="Facility Manager">Manager</option>
              <option value="Security">Security</option>
              <option value="Resident">Resident</option>
            </select>
          </div>
        </div>
      </aside>
    </>
  );
};
