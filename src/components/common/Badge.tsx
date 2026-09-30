import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'sm',
}) => {
  const variantStyles = {
    success: 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-950/60 text-amber-400 border-amber-500/30',
    danger: 'bg-rose-950/60 text-rose-400 border-rose-500/30',
    info: 'bg-cyan-950/60 text-cyan-400 border-cyan-500/30',
    neutral: 'bg-slate-800 text-slate-300 border-slate-700',
  };

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 font-semibold',
    md: 'text-xs px-2.5 py-1 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center rounded-md border font-mono tracking-wide ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {children}
    </span>
  );
};
