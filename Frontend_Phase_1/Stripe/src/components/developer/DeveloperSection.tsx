import React, { useState } from 'react';
import { Terminal, Code2, Cpu, CheckCircle2, Play, Sparkles, ArrowRight } from 'lucide-react';
import { CODE_SNIPPETS } from '../../data/stripeData';
import { CodeBlock } from '../common/CodeBlock';
import { mockStripeApi } from '../../services/mockApi';
import { Badge } from '../common/Badge';

interface DeveloperSectionProps {
  onOpenApiConsole: () => void;
}

export const DeveloperSection: React.FC<DeveloperSectionProps> = ({
  onOpenApiConsole
}) => {
  const [activeLanguage, setActiveLanguage] = useState<'node' | 'python' | 'ruby' | 'go' | 'curl'>('node');
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState<{
    status: number;
    duration: number;
    data: any;
  } | null>(null);

  const currentSnippet = CODE_SNIPPETS.find(s => s.language === activeLanguage) || CODE_SNIPPETS[0];

  const handleTestApiCall = async () => {
    setIsExecuting(true);
    try {
      const res = await mockStripeApi.runEndpoint('/v1/payment_intents', 'POST', {
        amount: 2000,
        currency: 'usd',
        automatic_payment_methods: { enabled: true }
      });
      setExecutionResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <section id="developer" className="py-24 md:py-32 bg-[#0a2540] text-white relative overflow-hidden">
      {/* Decorative gradient light orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#635bff]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#00d4ff]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          {/* Left Column: Developer Value Proposition */}
          <div className="lg:col-span-5 space-y-7">
            <div className="inline-flex items-center gap-2">
              <Badge variant="dark" size="sm">
                <Code2 className="w-3.5 h-3.5 text-[#00d4ff]" />
                Developer-First Architecture
              </Badge>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Designed for developers, built for scale
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Ship production-ready billing and checkout in hours with developer-friendly client and server SDKs, detailed API reference documentation, and local webhook simulation with the Stripe CLI.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#635bff]/20 flex items-center justify-center text-[#00d4ff] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Prebuilt UI & Composability</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Embed pre-certified UI elements with 1 line of JS or build bespoke flows on top of low-level REST APIs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#635bff]/20 flex items-center justify-center text-[#00d4ff] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Backward-Compatible Upgrades</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Pin API versions to avoid surprise regressions and upgrade at your own pace without downtime.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#635bff]/20 flex items-center justify-center text-[#00d4ff] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Official SDKs in 8+ Languages</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    First-party libraries maintained with full typing and automatic retry algorithms.
                  </p>
                </div>
              </div>
            </div>

            {/* Launch API Explorer button */}
            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={onOpenApiConsole}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#635bff] hover:bg-[#7a73ff] text-white font-bold text-sm transition-all shadow-md hover:shadow-lg hover:shadow-[#635bff]/30 cursor-pointer"
              >
                <Terminal className="w-4 h-4" />
                <span>Open Interactive API Console</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Code Terminal & Live Request Tester */}
          <div className="lg:col-span-7 space-y-4">
            {/* Language Switcher Tabs */}
            <div className="flex items-center justify-between flex-wrap gap-2 pb-2">
              <div className="flex items-center gap-1.5 p-1 bg-slate-800/80 rounded-xl border border-slate-700/60 overflow-x-auto">
                {(['node', 'python', 'ruby', 'go', 'curl'] as const).map((lang) => {
                  const label = lang === 'node' ? 'Node.js' : lang.toUpperCase();
                  return (
                    <button
                      key={lang}
                      onClick={() => setActiveLanguage(lang)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                        activeLanguage === lang
                          ? 'bg-[#635bff] text-white shadow-xs'
                          : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              <span className="text-xs font-mono text-slate-400">
                POST /v1/payment_intents
              </span>
            </div>

            {/* Code Display with Run Button */}
            <CodeBlock
              code={currentSnippet.code}
              language={currentSnippet.language}
              filename={currentSnippet.filename}
              onRun={handleTestApiCall}
              isExecuting={isExecuting}
            />

            {/* Live API Execution Output Card */}
            {executionResult && (
              <div className="rounded-2xl bg-[#081b2e] border border-emerald-500/30 p-4 font-mono text-xs animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                      HTTP {executionResult.status} OK
                    </span>
                    <span className="text-slate-500">Latency: {executionResult.duration}ms</span>
                  </div>
                  <button
                    onClick={() => setExecutionResult(null)}
                    className="text-slate-500 hover:text-slate-300 text-[11px]"
                  >
                    Clear Output
                  </button>
                </div>
                <div className="mt-3 max-h-48 overflow-y-auto text-emerald-300/90 leading-5">
                  <pre>{JSON.stringify(executionResult.data, null, 2)}</pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
