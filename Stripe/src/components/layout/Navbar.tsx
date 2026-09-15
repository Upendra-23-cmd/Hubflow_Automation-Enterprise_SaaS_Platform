import React, { useState, useEffect, useRef } from 'react';
import { Menu, ChevronDown, Terminal, Shield, ArrowRight, Globe } from 'lucide-react';
import { StripeLogo } from '../common/StripeLogo';
import { Button } from '../common/Button';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';
import { RegionMode } from '../../types';

interface NavbarProps {
  onOpenCheckoutDemo: () => void;
  onOpenApiConsole: () => void;
  region?: RegionMode;
  onToggleRegion?: (r: RegionMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCheckoutDemo,
  onOpenApiConsole,
  region = 'in',
  onToggleRegion
}) => {
  const [activeMenu, setActiveMenu] = useState<'products' | 'solutions' | 'developers' | 'resources' | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (menu: 'products' | 'solutions' | 'developers' | 'resources') => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 250);
  };

  const cancelClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  return (
    <header
      ref={navRef}
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/60 py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <a 
              href="#" 
              className="flex items-center text-[#0a2540] hover:opacity-85 transition-opacity"
              aria-label="Stripe Home"
            >
              <StripeLogo className="h-7 w-auto" />
            </a>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center space-x-1" onMouseLeave={handleMouseLeave}>
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('products')}
              >
                <button 
                  className={`px-3 py-1.5 text-sm font-semibold rounded-full transition-colors flex items-center gap-1 cursor-pointer ${
                    activeMenu === 'products' ? 'text-[#635bff] bg-white/70 shadow-xs' : 'text-[#0a2540] hover:text-[#635bff]'
                  }`}
                >
                  <span>Products</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </button>
              </div>

              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('solutions')}
              >
                <button 
                  className={`px-3 py-1.5 text-sm font-semibold rounded-full transition-colors flex items-center gap-1 cursor-pointer ${
                    activeMenu === 'solutions' ? 'text-[#635bff] bg-white/70 shadow-xs' : 'text-[#0a2540] hover:text-[#635bff]'
                  }`}
                >
                  <span>Solutions</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </button>
              </div>

              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('developers')}
              >
                <button 
                  className={`px-3 py-1.5 text-sm font-semibold rounded-full transition-colors flex items-center gap-1 cursor-pointer ${
                    activeMenu === 'developers' ? 'text-[#635bff] bg-white/70 shadow-xs' : 'text-[#0a2540] hover:text-[#635bff]'
                  }`}
                >
                  <span>Developers</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </button>
              </div>

              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('resources')}
              >
                <button 
                  className={`px-3 py-1.5 text-sm font-semibold rounded-full transition-colors flex items-center gap-1 cursor-pointer ${
                    activeMenu === 'resources' ? 'text-[#635bff] bg-white/70 shadow-xs' : 'text-[#0a2540] hover:text-[#635bff]'
                  }`}
                >
                  <span>Resources</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </button>
              </div>

              <a
                href="#pricing"
                className="px-3 py-1.5 text-sm font-semibold text-[#0a2540] hover:text-[#635bff] transition-colors rounded-full"
              >
                Pricing
              </a>
            </nav>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Region Switcher Pill */}
            {onToggleRegion && (
              <button
                type="button"
                onClick={() => onToggleRegion(region === 'in' ? 'global' : 'in')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-200/80"
                title="Switch region between India (stripe.com/in) and Global"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span>{region === 'in' ? '🇮🇳 India' : '🌐 Global'}</span>
              </button>
            )}

            {/* Live Mock API Console Pill */}
            <button
              onClick={onOpenApiConsole}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-medium rounded-full bg-[#0a2540]/5 hover:bg-[#0a2540]/10 text-[#0a2540] border border-slate-300/60 transition-colors cursor-pointer"
              title="Open Mock API Explorer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <Terminal className="w-3.5 h-3.5 text-[#635bff]" />
              <span>API Explorer</span>
            </button>

            <a
              href="#pricing"
              className="text-sm font-semibold text-[#0a2540] hover:text-[#635bff] transition-colors px-2 py-1"
            >
              Sign in
            </a>

            <Button
              variant="primary"
              size="sm"
              href="#pricing"
              withArrow
            >
              Start now
            </Button>
          </div>

          {/* Mobile buttons */}
          <div className="flex items-center gap-3 lg:hidden">
            <Button
              variant="primary"
              size="sm"
              href="#pricing"
              className="text-xs px-3 py-1.5"
            >
              Start now
            </Button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-xl text-[#0a2540] hover:bg-black/5 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Floating Mega Menu */}
      <div onMouseEnter={cancelClose} onMouseLeave={handleMouseLeave}>
        <MegaMenu
          activeMenu={activeMenu}
          onClose={() => setActiveMenu(null)}
          onOpenCheckoutDemo={onOpenCheckoutDemo}
          onOpenApiConsole={onOpenApiConsole}
        />
      </div>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenCheckoutDemo={onOpenCheckoutDemo}
        onOpenApiConsole={onOpenApiConsole}
      />
    </header>
  );
};
