import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  variant?: 'default' | 'subtle' | 'interactive' | 'accent';
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  id,
  variant = 'default',
  children,
  className = '',
  ...props
}) => {
  const variantStyles = {
    default:
      'bg-slate-900/70 border-slate-800/80 text-slate-100 shadow-sm',
    subtle:
      'bg-slate-900/40 border-slate-800/50 text-slate-200',
    interactive:
      'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/90 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md',
    accent:
      'bg-slate-900/80 border-indigo-500/30 ring-1 ring-indigo-500/20 shadow-lg shadow-indigo-950/20',
  };

  return (
    <div
      id={id}
      className={`rounded-2xl border p-6 transition-all ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
