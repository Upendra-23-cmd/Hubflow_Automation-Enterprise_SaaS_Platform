import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { useToast } from '../../context/ToastContext';
import { apiService } from '../../services/apiService';
import { Shield, Lock, FileCode, CheckCircle2, ArrowRight } from 'lucide-react';

interface FooterProps {
  onOpenDemo: () => void;
  onOpenStatus: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDemo, onOpenStatus }) => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('error', 'Invalid Email', 'Please enter a valid email address.');
      return;
    }

    setIsSubscribing(true);
    const res = await apiService.subscribeNewsletter(email);
    setIsSubscribing(false);

    if (res.success) {
      showToast('success', 'Subscribed!', res.message);
      setEmail('');
    } else {
      showToast('error', 'Subscription Failed', res.error || 'Please try again.');
    }
  };

  return (
    <footer id="main-footer" className="bg-slate-950 border-t border-slate-900 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          {/* Brand & Newsletter col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center border border-indigo-400/30">
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 text-white stroke-[2.2]"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="6" cy="6" r="3" />
                  <circle cx="18" cy="18" r="3" />
                  <path d="M18 9a9 9 0 0 0-9 9" />
                  <path d="M6 18h4" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">Hubflow</span>
              <span className="text-[11px] font-semibold px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 uppercase tracking-wide">
                Automation
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The high-performance automation engine designed for modern engineering, RevOps, and AI workloads. Connect webhooks, LLMs, and databases in seconds.
            </p>

            {/* Newsletter input */}
            <div className="pt-2">
              <label htmlFor="newsletter-email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                Subscribe to Engineering & Architecture Updates
              </label>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="flex-1 rounded-xl bg-slate-900 border border-slate-800 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
                <Button
                  id="footer-subscribe-btn"
                  type="submit"
                  variant="primary"
                  size="sm"
                  isLoading={isSubscribing}
                  rightIcon={<ArrowRight className="w-3 h-3" />}
                >
                  Join
                </Button>
              </form>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Zero spam. Unsubscribe anytime with 1-click.
              </span>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#studio" className="hover:text-white transition-colors">
                  Interactive Studio
                </a>
              </li>
              <li>
                <a href="#platform" className="hover:text-white transition-colors">
                  Workflow Engine
                </a>
              </li>
              <li>
                <a href="#integrations" className="hover:text-white transition-colors">
                  Integrations Hub (50+)
                </a>
              </li>
              <li>
                <a href="#templates" className="hover:text-white transition-colors">
                  Template Library
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">
                  ROI & Savings Calculator
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Pricing & Quotas
                </a>
              </li>
            </ul>
          </div>

          {/* Developers & Architecture */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Architecture</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={onOpenStatus} className="hover:text-white text-left transition-colors">
                  Global Edge Status (99.99%)
                </button>
              </li>
              <li>
                <a href="#studio" className="hover:text-white transition-colors">
                  V8 Isolate Sandboxing
                </a>
              </li>
              <li>
                <a href="#platform" className="hover:text-white transition-colors">
                  Dead Letter Queues (DLQ)
                </a>
              </li>
              <li>
                <a href="#integrations" className="hover:text-white transition-colors">
                  Custom Node SDK
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Self-Hosted Kubernetes
                </a>
              </li>
              <li>
                <button onClick={onOpenDemo} className="hover:text-white text-left transition-colors">
                  Request Private VPC
                </button>
              </li>
            </ul>
          </div>

          {/* Security & Governance */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Compliance</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>SOC 2 Type II Certified</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>HIPAA Compliant Vault</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>ISO/IEC 27001</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>GDPR & CCPA Enforced</span>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenDemo}
                  className="text-xs text-indigo-400 hover:text-indigo-300 underline font-medium"
                >
                  Download Security Whitepaper
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4 text-slate-500">
            <span>© {new Date().getFullYear()} Hubflow Technologies, Inc. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-slate-400">Built for high-scale automation.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-200 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-200 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-200 transition-colors">Security Disclosures</a>
            <button
              onClick={onOpenStatus}
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              All Systems Normal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
