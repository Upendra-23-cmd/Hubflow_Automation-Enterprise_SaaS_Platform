import React from 'react';

export interface BadgeProps {
  id?: string;
  variant?: 'indigo' | 'emerald' | 'amber' | 'cyan' | 'purple' | 'slate' | 'rose' | 'orange';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  id,
  variant = 'indigo',
  size = 'md',
  children,
  icon,
  className = '',
}) => {
  const variantStyles = {
    indigo: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/25',
    orange: 'bg-orange-500/10 text-orange-300 border-orange-500/25',
    emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
    amber: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
    cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/25',
    purple: 'bg-purple-500/10 text-purple-300 border-purple-500/25',
    slate: 'bg-slate-800/80 text-slate-300 border-slate-700/80',
    rose: 'bg-rose-500/10 text-rose-300 border-rose-500/25',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  };

  return (
    <span
      id={id}
      className={`inline-flex items-center font-medium rounded-full border tracking-wide whitespace-nowrap select-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
