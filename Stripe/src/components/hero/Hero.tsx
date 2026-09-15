import React, { useState } from 'react';
import { ChevronRight, ArrowRight, ShieldCheck, Zap, Sparkles, Check, Globe } from 'lucide-react';
import { GradientCanvas } from './GradientCanvas';
import { InteractiveCheckoutWidget } from './InteractiveCheckoutWidget';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { RegionMode } from '../../types';

interface HeroProps {
  onOpenCheckoutDemo: () => void;
  onOpenApiConsole: () => void;
  region?: RegionMode;
  onToggleRegion?: (r: RegionMode) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenCheckoutDemo,
  onOpenApiConsole,
  region = 'in',
  onToggleRegion
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Dynamic Animated Gradient Mesh Background */}
      <GradientCanvas />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-7 text-left">
            {/* Announcement Pill */}
            <div className="inline-flex items-center">
              <a
                href="#products"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/85 hover:bg-white border border-slate-200/90 text-xs font-semibold text-[#0a2540] shadow-xs hover:shadow-sm transition-all group"
              >
                <Badge variant="indigo" size="sm" pulse>
                  New
                </Badge>
                <span>
                  The next generation of payments infrastructure
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0a2540] tracking-tight leading-[1.08]">
              Financial infrastructure for the internet
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
              Millions of companies of all sizes—from startups to Fortune 500s—use Stripe’s software and APIs to accept payments, send payouts, and manage their businesses online.
            </p>

            {/* Email Start Form & CTA Buttons */}
            <div className="space-y-3 pt-1">
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row items-stretch gap-2.5 max-w-md">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 text-sm bg-white/95 rounded-full border border-slate-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#635bff]/40 focus:border-[#635bff] transition-all"
                  />
                  {subscribed && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-emerald-600 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Sent!
                    </span>
                  )}
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  withArrow
                  className="shrink-0"
                >
                  Start now
                </Button>
              </form>

              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 pt-1">
                <a
                  href="#pricing"
                  className="hover:text-[#635bff] transition-colors flex items-center gap-1 font-semibold text-[#0a2540]"
                >
                  Contact sales <ChevronRight className="w-3.5 h-3.5" />
                </a>
                <span className="text-slate-300">•</span>
                <button
                  type="button"
                  onClick={onOpenCheckoutDemo}
                  className="text-[#635bff] hover:text-[#0a2540] transition-colors flex items-center gap-1 cursor-pointer font-bold"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Launch Checkout Simulator
                </button>
              </div>
            </div>

            {/* Key Trust Signals */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-200/60 max-w-xl">
              <div>
                <div className="text-xl font-bold text-[#0a2540]">
                  500M+
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Daily API requests
                </div>
              </div>
              <div>
                <div className="text-xl font-bold text-[#0a2540]">99.999%</div>
                <div className="text-xs text-slate-500 font-medium">Historical uptime</div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <div className="text-xl font-bold text-[#0a2540]">
                  135+
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Currencies & payment methods
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Widget */}
          <div className="lg:col-span-5 relative">
            <InteractiveCheckoutWidget 
              region={region} 
              onToggleRegion={onToggleRegion} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};
