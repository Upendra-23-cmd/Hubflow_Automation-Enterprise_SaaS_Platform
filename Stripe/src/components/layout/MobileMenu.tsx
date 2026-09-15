import React, { useState, useEffect } from 'react';
import { X, ChevronDown, ArrowRight, ShieldCheck, Terminal, ShoppingCart, Calculator } from 'lucide-react';
import { StripeLogo } from '../common/StripeLogo';
import { NAV_DATA } from '../../data/stripeData';
import { Button } from '../common/Button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCheckoutDemo: () => void;
  onOpenApiConsole: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onOpenCheckoutDemo,
  onOpenApiConsole
}) => {
  const [openSection, setOpenSection] = useState<string | null>('products');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-white">
      {/* Top Header in Mobile Menu */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
        <a href="#" onClick={onClose} className="flex items-center">
          <StripeLogo className="h-7 w-auto text-[#0a2540]" />
        </a>
        <button
          onClick={onClose}
          className="p-2 -mr-2 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Quick Access Action Bar for Mobile */}
      <div className="bg-slate-50 border-b border-slate-100 px-6 py-3 flex gap-2 overflow-x-auto">
        <button
          onClick={() => {
            onClose();
            onOpenCheckoutDemo();
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#635bff]/10 text-[#635bff] shrink-0"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          Test Checkout
        </button>

        <button
          onClick={() => {
            onClose();
            onOpenApiConsole();
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-200/80 text-slate-800 shrink-0"
        >
          <Terminal className="w-3.5 h-3.5" />
          API Explorer
        </button>
      </div>

      {/* Scrollable Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {/* Products Accordion */}
        <div className="border-b border-slate-100 pb-3">
          <button
            onClick={() => toggleSection('products')}
            className="w-full flex items-center justify-between py-2 text-base font-bold text-[#0a2540]"
          >
            <span>Products</span>
            <ChevronDown 
              className={`w-5 h-5 text-slate-400 transition-transform ${openSection === 'products' ? 'rotate-180' : ''}`} 
            />
          </button>
          {openSection === 'products' && (
            <div className="pt-2 pb-3 pl-2 space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Payments</div>
              {NAV_DATA.products.payments.map((p) => (
                <a
                  key={p.title}
                  href={p.href}
                  onClick={onClose}
                  className="block py-1.5 text-sm font-medium text-slate-700 hover:text-[#635bff]"
                >
                  {p.title}
                </a>
              ))}
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pt-2">Operations</div>
              {NAV_DATA.products.operations.map((p) => (
                <a
                  key={p.title}
                  href={p.href}
                  onClick={onClose}
                  className="block py-1.5 text-sm font-medium text-slate-700 hover:text-[#635bff]"
                >
                  {p.title}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Solutions Accordion */}
        <div className="border-b border-slate-100 pb-3">
          <button
            onClick={() => toggleSection('solutions')}
            className="w-full flex items-center justify-between py-2 text-base font-bold text-[#0a2540]"
          >
            <span>Solutions</span>
            <ChevronDown 
              className={`w-5 h-5 text-slate-400 transition-transform ${openSection === 'solutions' ? 'rotate-180' : ''}`} 
            />
          </button>
          {openSection === 'solutions' && (
            <div className="pt-2 pb-3 pl-2 space-y-2">
              {NAV_DATA.solutions.byModel.map((p) => (
                <a
                  key={p.title}
                  href={p.href}
                  onClick={onClose}
                  className="block py-1.5 text-sm font-medium text-slate-700 hover:text-[#635bff]"
                >
                  {p.title}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Developers Section */}
        <div className="border-b border-slate-100 pb-3">
          <button
            onClick={() => toggleSection('developers')}
            className="w-full flex items-center justify-between py-2 text-base font-bold text-[#0a2540]"
          >
            <span>Developers</span>
            <ChevronDown 
              className={`w-5 h-5 text-slate-400 transition-transform ${openSection === 'developers' ? 'rotate-180' : ''}`} 
            />
          </button>
          {openSection === 'developers' && (
            <div className="pt-2 pb-3 pl-2 space-y-2">
              {NAV_DATA.developers.resources.map((p) => (
                <a
                  key={p.title}
                  href={p.href}
                  onClick={onClose}
                  className="block py-1.5 text-sm font-medium text-slate-700 hover:text-[#635bff]"
                >
                  {p.title}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Resources Section */}
        <div className="border-b border-slate-100 pb-3">
          <button
            onClick={() => toggleSection('resources')}
            className="w-full flex items-center justify-between py-2 text-base font-bold text-[#0a2540]"
          >
            <span>Resources</span>
            <ChevronDown 
              className={`w-5 h-5 text-slate-400 transition-transform ${openSection === 'resources' ? 'rotate-180' : ''}`} 
            />
          </button>
          {openSection === 'resources' && (
            <div className="pt-2 pb-3 pl-2 space-y-2">
              {NAV_DATA.resources.company.map((p) => (
                <a
                  key={p.title}
                  href={p.href}
                  onClick={onClose}
                  className="block py-1.5 text-sm font-medium text-slate-700 hover:text-[#635bff]"
                >
                  {p.title}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Direct link to pricing */}
        <a
          href="#pricing"
          onClick={onClose}
          className="block py-2 text-base font-bold text-[#0a2540] hover:text-[#635bff]"
        >
          Pricing & Calculator
        </a>
      </div>

      {/* Mobile Footer CTAs */}
      <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-3">
        <Button
          variant="primary"
          size="lg"
          className="w-full justify-center"
          href="#pricing"
          onClick={onClose}
          withArrow
        >
          Start now
        </Button>
        <button
          onClick={() => {
            onClose();
            onOpenCheckoutDemo();
          }}
          className="w-full py-2.5 px-4 rounded-full border border-slate-200 bg-white text-sm font-semibold text-[#0a2540] text-center"
        >
          Try Live Checkout Simulator
        </button>
      </div>
    </div>
  );
};
