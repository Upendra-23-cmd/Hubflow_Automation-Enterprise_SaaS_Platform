import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'lg'
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#0a2540]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Dialog box */}
      <div 
        role="dialog"
        aria-modal="true"
        className={`relative w-full ${maxWidthClasses[maxWidth]} max-h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all z-10`}
      >
        {(title || subtitle) && (
          <div className="flex items-start justify-between p-6 pb-4 border-b border-slate-100 shrink-0">
            <div>
              {title && <h3 className="text-xl font-bold text-[#0a2540]">{title}</h3>}
              {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="p-2 -mr-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
