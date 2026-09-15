import React from 'react';
import { ArrowRight, ChevronRight, Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'dark' | 'light' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  withArrow?: boolean;
  withChevron?: boolean;
  isLoading?: boolean;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  withArrow = false,
  withChevron = false,
  isLoading = false,
  href,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'group inline-flex items-center justify-center font-medium transition-all duration-200 select-none focus:outline-none focus:ring-2 focus:ring-[#635bff]/40 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 rounded-full gap-1.5',
    md: 'text-sm px-4 py-2 rounded-full gap-2',
    lg: 'text-base px-5 py-2.5 rounded-full gap-2.5'
  };

  const variantStyles = {
    primary: 'bg-[#635bff] text-white hover:bg-[#0a2540] shadow-sm hover:shadow-md hover:shadow-[#635bff]/20 font-semibold',
    secondary: 'bg-white/90 backdrop-blur-md text-[#0a2540] hover:bg-white border border-slate-200/80 shadow-xs hover:shadow-sm font-semibold',
    dark: 'bg-[#0a2540] text-white hover:bg-slate-800 shadow-sm font-semibold border border-slate-700/50',
    light: 'bg-white text-[#0a2540] hover:bg-slate-100 shadow-sm font-semibold',
    ghost: 'bg-transparent text-[#0a2540] hover:text-[#635bff] hover:bg-[#635bff]/5 rounded-lg',
    link: 'bg-transparent p-0 text-[#635bff] hover:text-[#0a2540] font-semibold hover:underline underline-offset-4 gap-1'
  };

  const content = (
    <>
      {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current" />}
      <span>{children}</span>
      {withArrow && !isLoading && (
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
      )}
      {withChevron && !isLoading && (
        <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 shrink-0" />
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`${baseStyles} ${variant === 'link' ? '' : sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={`${baseStyles} ${variant === 'link' ? '' : sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {content}
    </button>
  );
};
