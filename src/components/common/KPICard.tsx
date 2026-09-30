import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtext?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
  accentColor?: string;
  onClick?: () => void;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  subtext,
  change,
  changeType = 'neutral',
  icon: Icon,
  iconColor = 'text-cyan-400',
  accentColor = 'bg-cyan-500/10 border-cyan-500/20',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`glass-card glass-card-hover rounded-xl p-4 flex flex-col justify-between cursor-pointer border ${accentColor}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        <div className={`p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 ${iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-3">
        <div className="text-2xl font-bold font-display text-white tracking-tight">
          {value}
        </div>
        {subtext && (
          <div className="text-xs text-slate-400 mt-1 flex items-center justify-between">
            <span>{subtext}</span>
            {change && (
              <span
                className={`font-semibold text-xs flex items-center gap-0.5 ${
                  changeType === 'positive'
                    ? 'text-emerald-400'
                    : changeType === 'negative'
                    ? 'text-rose-400'
                    : 'text-slate-400'
                }`}
              >
                {changeType === 'positive' && <TrendingUp className="w-3 h-3" />}
                {changeType === 'negative' && <TrendingDown className="w-3 h-3" />}
                {change}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
