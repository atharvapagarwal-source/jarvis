import React, { useState } from 'react';
import { Box, Lock, Mail, ShieldCheck, ArrowRight } from 'lucide-react';
import type { UserRole } from '../types';

interface LoginViewProps {
  onLogin: (role: UserRole) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('admin@jarvis.smartbuilding.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [role, setRole] = useState<UserRole>('Administrator');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(role);
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Abstract Building Digital Backdrop Visualization */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[140px]" />
        {/* Grid lines overlay */}
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(rgba(6, 182, 212, 0.15) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Branding header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-xl shadow-cyan-500/25 mb-4 border border-cyan-400/30">
            <Box className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold font-display tracking-wider bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
            JARVIS
          </h1>
          <p className="text-xs font-semibold text-cyan-400 tracking-widest uppercase mt-1">
            AI-Driven Building Digital Twin
          </p>
          <p className="text-slate-400 text-xs mt-2">
            Intelligent Building Management & Predictive Maintenance Platform
          </p>
        </div>

        {/* Login Form Card */}
        <div className="glass-panel rounded-2xl p-8 border border-slate-800 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role Selection Tabs */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Select Portal Access Role
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['Administrator', 'Facility Manager', 'Security', 'Resident'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all text-center ${
                      role === r
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold shadow-sm shadow-cyan-500/20'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  placeholder="name@building.edu"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center space-x-2 text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-500"
                />
                <span>Remember Session</span>
              </label>
              <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-cyan-400 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-[1.01]"
            >
              <span>Authenticate & Access Digital Twin</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Secure badge footer */}
          <div className="mt-6 pt-4 border-t border-slate-800 text-center flex items-center justify-center space-x-1.5 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Encrypted 256-Bit TLS Connection to Smart Hub</span>
          </div>
        </div>
      </div>
    </div>
  );
};
