import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenDemo: () => void;
  onOpenStatus: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemo, onOpenStatus }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Interactive Studio', href: '#studio' },
    { label: 'Platform', href: '#platform' },
    { label: 'Integrations', href: '#integrations' },
    { label: 'ROI Calculator', href: '#calculator' },
    { label: 'Templates', href: '#templates' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-slate-950/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            id="brand-logo"
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg"
          >
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center border border-orange-500/40 group-hover:bg-orange-500 transition-colors">
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-white stroke-[2.5]"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="6" cy="6" r="3" />
                <circle cx="18" cy="18" r="3" />
                <path d="M18 9a9 9 0 0 0-9 9" />
                <path d="M6 18h4" />
                <path d="M14 6h4" />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white tracking-tight">
                Hubflow
              </span>
              <span className="text-[11px] font-mono font-medium px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 tracking-wide">
                v3.4
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav
            id="desktop-navigation"
            className="hidden lg:flex items-center gap-1 bg-slate-900/60 border border-slate-800/80 px-3 py-1.5 rounded-full backdrop-blur-sm"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-full hover:bg-slate-800/70 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Status Pill */}
            <button
              id="header-status-indicator"
              onClick={onOpenStatus}
              className="flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/70 hover:bg-slate-800 border border-slate-800 px-3 py-2 rounded-xl transition-all cursor-pointer font-mono"
              title="Click to view live global telemetry"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>99.999% SLA</span>
            </button>

            <Button
              id="header-demo-btn"
              variant="secondary"
              size="sm"
              onClick={onOpenDemo}
            >
              Architecture Review
            </Button>

            <Button
              id="header-start-free-btn"
              variant="accent"
              size="sm"
              onClick={onOpenDemo}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Launch Studio
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-status-btn"
              onClick={onOpenStatus}
              className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300"
              aria-label="System status"
            >
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-panel"
            className="md:hidden mt-3 p-4 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-150"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <Button
                id="mobile-nav-demo-btn"
                variant="secondary"
                size="md"
                className="w-full justify-center"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemo();
                }}
              >
                Book Enterprise Demo
              </Button>
              <Button
                id="mobile-nav-start-btn"
                variant="primary"
                size="md"
                className="w-full justify-center"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemo();
                }}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Start Free Trial
              </Button>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 px-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                SOC2 Type II Certified
              </span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenStatus();
                }}
                className="text-indigo-400 hover:underline"
              >
                System Status
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
