import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'indigo' | 'slate' | 'emerald' | 'amber' | 'dark' | 'outline';
  size?: 'sm' | 'md';
  pulse?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'indigo',
  size = 'sm',
  pulse = false,
  className = ''
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 tracking-tight font-semibold',
    md: 'text-xs px-2.5 py-1 tracking-tight font-semibold'
  };

  const variantStyles = {
    indigo: 'bg-[#635bff]/10 text-[#635bff] border border-[#635bff]/20',
    slate: 'bg-slate-100 text-slate-700 border border-slate-200',
    emerald: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border border-amber-200',
    dark: 'bg-white/10 text-slate-200 border border-white/15 backdrop-blur-sm',
    outline: 'bg-transparent text-slate-600 border border-slate-300'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full whitespace-nowrap ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current"></span>
        </span>
      )}
      {children}
    </span>
  );
};
