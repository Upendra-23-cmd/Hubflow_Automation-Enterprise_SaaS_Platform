import React from 'react';
import { Button } from '../ui/Button';
import { ArrowRight, ShieldCheck, CheckCircle2, Terminal } from 'lucide-react';

interface CtaSectionProps {
  onOpenDemo: () => void;
  onScrollToStudio: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  onOpenDemo,
  onScrollToStudio,
}) => {
  return (
    <section id="cta" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8 sm:p-14 lg:p-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>PRODUCTION-READY DEPLOYMENT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight max-w-3xl mx-auto leading-tight">
            Stop Debugging Fragile Cron Scripts. Build on a Durable Execution Mesh.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Join thousands of modern platform and engineering teams running millions
            of mission-critical automation tasks with deterministic state and sub-20ms edge latency.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              id="cta-start-free-btn"
              variant="accent"
              size="lg"
              onClick={onScrollToStudio}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Open Workflow Studio Free
            </Button>
            <Button
              id="cta-book-demo-btn"
              variant="secondary"
              size="lg"
              onClick={onOpenDemo}
            >
              Schedule Architecture Review
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              10,000 tasks/mo included free
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Zero credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-slate-300" />
              SOC2 Type II & HIPAA Certified
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
