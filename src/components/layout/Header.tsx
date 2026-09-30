import React, { useState, useEffect } from 'react';
import {
  Menu,
  Bell,
  Search,
  LogOut,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Info,
  X
} from 'lucide-react';
import type { NotificationItem } from '../../types';

interface HeaderProps {
  onMenuToggle: () => void;
  activeView: string;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
  onLogout: () => void;
}

const viewTitles: Record<string, { title: string; subtitle: string }> = {
  dashboard: { title: 'Good Morning, Admin', subtitle: "Here's the current operational overview of your building." },
  'digital-twin': { title: '3D Building Digital Twin', subtitle: 'Real-time 3D telemetry, floor isolation, and structural diagnostics.' },
  cctv: { title: 'CCTV Computer Vision Monitoring', subtitle: 'AI-driven object detection powered by COCO-pretrained neural networks.' },
  emergency: { title: 'Fire & Emergency Safety System', subtitle: 'Sensors, suppression equipment audit, and emergency compliance.' },
  energy: { title: 'Electricity & Solar Energy Management', subtitle: 'Smart grid usage, solar yield analytics, and ML demand forecasts.' },
  attendance: { title: 'Workers Attendance & Roster', subtitle: 'Workforce deployment, access control logs, and attendance metrics.' },
  parking: { title: 'Smart Parking Management', subtitle: '100-slot automated parking grid telemetry and vehicle activity.' },
  complaints: { title: 'Complaints & Service Tickets', subtitle: 'Facility ticketing system with AI category & priority auto-classification.' },
  waste: { title: 'Smart Waste Management', subtitle: 'Ultrasonic bin level monitoring & AI waste classification model.' },
  maintenance: { title: 'AI Predictive Maintenance Engine', subtitle: 'Vibration & thermal diagnostic predictive failure forecasting.' },
  analytics: { title: 'Analytics & Multi-Module Reports', subtitle: 'Historical trends, comparative analytics, and PDF/CSV report exports.' },
  'ai-assistant': { title: 'JARVIS AI Building Assistant', subtitle: 'Interactive natural language interface connected to building telemetry.' },
  settings: { title: 'System Settings & Data Sources', subtitle: 'Dataset citations, sensor configurations, and API connections.' },
  about: { title: 'About Engineering Project', subtitle: 'Architecture diagram, project objectives, and evaluation details.' },
};

export const Header: React.FC<HeaderProps> = ({
  onMenuToggle,
  activeView,
  notifications,
  onMarkNotificationRead,
  onLogout,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [lastUpdatedSec, setLastUpdatedSec] = useState(12);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter((n) => !n.read).length;
  const currentInfo = viewTitles[activeView] || { title: 'JARVIS Dashboard', subtitle: 'Building Digital Twin Platform' };

  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdatedSec((prev) => (prev >= 60 ? 2 : prev + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-[#0F172A]/80 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5 flex items-center justify-between">
      {/* Left section */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          aria-label="Open Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-lg lg:text-xl font-bold font-display text-white leading-tight">
            {currentInfo.title}
          </h2>
          <p className="text-xs text-slate-400 hidden sm:block">
            {currentInfo.subtitle}
          </p>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-3 lg:space-x-4">
        {/* Live Simulation Ticker */}
        <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <RefreshCw className="w-3 h-3 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="font-mono text-[11px] text-slate-300">Updated {lastUpdatedSec}s ago</span>
        </div>

        {/* Global Search Bar */}
        <div className="relative hidden xl:block w-56">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search telemetry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-700/80 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl z-50 overflow-hidden">
              <div className="p-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-800/50">
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-semibold text-white">Notifications</h4>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold">
                    {unreadCount} new
                  </span>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
                {notifications.length === 0 ? (
                  <p className="p-4 text-xs text-slate-400 text-center">No notifications</p>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => onMarkNotificationRead(item.id)}
                      className={`p-3 text-xs flex items-start space-x-3 cursor-pointer hover:bg-slate-800/50 transition-colors ${
                        !item.read ? 'bg-cyan-950/20' : ''
                      }`}
                    >
                      <div className="mt-0.5">
                        {item.severity === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                        {item.severity === 'danger' && <AlertTriangle className="w-4 h-4 text-rose-400" />}
                        {item.severity === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                        {item.severity === 'info' && <Info className="w-4 h-4 text-cyan-400" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className="font-semibold text-slate-200">{item.title}</h5>
                          <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                        </div>
                        <p className="text-slate-400 mt-0.5">{item.description}</p>
                        <span className="inline-block mt-1 text-[10px] text-cyan-400 bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-800/40">
                          {item.module}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Logout button */}
        <button
          onClick={onLogout}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 text-xs font-semibold transition-colors"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};
