import React from 'react';
import { StripeLogo } from '../common/StripeLogo';
import { Globe, ArrowUpRight, MessageCircle } from 'lucide-react';
import { RegionMode } from '../../types';

interface FooterProps {
  onOpenApiConsole: () => void;
  onOpenCheckoutDemo: () => void;
  region?: RegionMode;
  onToggleRegion?: (r: RegionMode) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenApiConsole,
  onOpenCheckoutDemo,
  region = 'in',
  onToggleRegion
}) => {
  return (
    <footer className="bg-[#f6f9fc] text-slate-600 border-t border-slate-200/80 pt-16 pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-slate-200/80">
          {/* Col 1: Brand & Country */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <a href="#" className="flex items-center text-[#0a2540]">
              <StripeLogo className="h-6 w-auto" />
            </a>

            <button
              type="button"
              onClick={() => onToggleRegion && onToggleRegion(region === 'in' ? 'global' : 'in')}
              className="flex items-center gap-2 text-slate-600 hover:text-[#0a2540] transition-colors cursor-pointer pt-2 group"
            >
              <Globe className="w-4 h-4 text-slate-400 group-hover:text-[#635bff]" />
              <span className="font-semibold text-xs">
                {region === 'in' ? '🇮🇳 India (English)' : '🌐 United States (English)'}
              </span>
            </button>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-700">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Stripe Systems Operational</span>
              </div>
            </div>

            {region === 'in' && (
              <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                Stripe India Payments Private Limited • Registered Office: Mumbai, Maharashtra. RBI PA authorized.
              </p>
            )}
          </div>

          {/* Col 2: Products */}
          <div className="space-y-3">
            <div className="font-bold text-[#0a2540] tracking-wide text-xs uppercase">Products</div>
            <ul className="space-y-2.5">
              <li><a href="#products" className="hover:text-[#635bff] transition-colors">Payments</a></li>
              <li>
                <button 
                  onClick={onOpenCheckoutDemo} 
                  className="hover:text-[#635bff] transition-colors cursor-pointer text-left"
                >
                  Checkout (Demo)
                </button>
              </li>
              <li><a href="#products" className="hover:text-[#635bff] transition-colors">Billing & Subscriptions</a></li>
              <li><a href="#products" className="hover:text-[#635bff] transition-colors">Stripe Connect</a></li>
              <li><a href="#products" className="hover:text-[#635bff] transition-colors">Stripe Issuing</a></li>
              <li><a href="#products" className="hover:text-[#635bff] transition-colors">Stripe Radar</a></li>
              <li><a href="#products" className="hover:text-[#635bff] transition-colors">Stripe Tax</a></li>
            </ul>
          </div>

          {/* Col 3: Solutions */}
          <div className="space-y-3">
            <div className="font-bold text-[#0a2540] tracking-wide text-xs uppercase">Solutions</div>
            <ul className="space-y-2.5">
              <li><a href="#solutions" className="hover:text-[#635bff] transition-colors">Startups & Scale-ups</a></li>
              <li><a href="#solutions" className="hover:text-[#635bff] transition-colors">Global Enterprises</a></li>
              <li><a href="#solutions" className="hover:text-[#635bff] transition-colors">SaaS & Recurring</a></li>
              <li><a href="#solutions" className="hover:text-[#635bff] transition-colors">Platforms & Marketplaces</a></li>
              <li><a href="#solutions" className="hover:text-[#635bff] transition-colors">E-commerce Brands</a></li>
              <li><a href="#solutions" className="hover:text-[#635bff] transition-colors">Crypto & AI Platforms</a></li>
            </ul>
          </div>

          {/* Col 4: Developers */}
          <div className="space-y-3">
            <div className="font-bold text-[#0a2540] tracking-wide text-xs uppercase">Developers</div>
            <ul className="space-y-2.5">
              <li><a href="#developer" className="hover:text-[#635bff] transition-colors">Documentation</a></li>
              <li>
                <button 
                  onClick={onOpenApiConsole} 
                  className="hover:text-[#635bff] transition-colors cursor-pointer text-left font-semibold text-[#635bff]"
                >
                  API Reference Explorer
                </button>
              </li>
              <li><a href="#developer" className="hover:text-[#635bff] transition-colors">SDK Libraries (8+ languages)</a></li>
              <li><a href="#global" className="hover:text-[#635bff] transition-colors">99.999% SLA Uptime</a></li>
              <li><a href="#developer" className="hover:text-[#635bff] transition-colors">Stripe CLI</a></li>
            </ul>
          </div>

          {/* Col 5: Company */}
          <div className="space-y-3">
            <div className="font-bold text-[#0a2540] tracking-wide text-xs uppercase">Company</div>
            <ul className="space-y-2.5">
              <li><a href="#customers" className="hover:text-[#635bff] transition-colors">Customer Stories</a></li>
              <li><a href="#pricing" className="hover:text-[#635bff] transition-colors">Pricing & Fee Calculator</a></li>
              <li><a href="#resources" className="hover:text-[#635bff] transition-colors">Newsroom & Research</a></li>
              <li><a href="#resources" className="hover:text-[#635bff] transition-colors">Stripe Climate</a></li>
              <li><a href="#resources" className="hover:text-[#635bff] transition-colors">Privacy & Terms</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <div>
            © {new Date().getFullYear()} Stripe, Inc. Pixel-perfect clone application for design & developer demonstration.
          </div>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-slate-600 transition-colors">Privacy & Terms</a>
            <a href="#security" className="hover:text-slate-600 transition-colors">Security & PCI-DSS</a>
            <button 
              onClick={onOpenApiConsole}
              className="text-[#635bff] hover:underline font-semibold"
            >
              Mock REST Console
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
