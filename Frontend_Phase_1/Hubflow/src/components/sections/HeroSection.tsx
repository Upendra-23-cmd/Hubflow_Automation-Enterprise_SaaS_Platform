import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { useToast } from '../../context/ToastContext';
import {
  ArrowRight,
  Play,
  Zap,
  Shield,
  Clock,
  GitBranch,
  Terminal,
  Activity,
  Cpu,
  Webhook,
  MessageSquare,
  CheckCircle2,
  Copy,
  Check,
  Code2,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface HeroSectionProps {
  onOpenDemo: () => void;
  onScrollToStudio: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenDemo,
  onScrollToStudio,
}) => {
  const { showToast } = useToast();
  const [activeHeroNode, setActiveHeroNode] = useState<number>(0);
  const [isSimulatingEvent, setIsSimulatingEvent] = useState(false);
  const [activeTab, setActiveTab] = useState<'topology' | 'code' | 'trace'>('topology');
  const [selectedPkgManager, setSelectedPkgManager] = useState<'npm' | 'pnpm' | 'yarn' | 'pip'>('npm');
  const [copiedCli, setCopiedCli] = useState(false);

  const cliCommands = {
    npm: 'npm i @hubflow/sdk',
    pnpm: 'pnpm add @hubflow/sdk',
    yarn: 'yarn add @hubflow/sdk',
    pip: 'pip install hubflow-sdk',
  };

  const handleCopyCli = () => {
    navigator.clipboard.writeText(cliCommands[selectedPkgManager]);
    setCopiedCli(true);
    showToast('success', 'Copied to Clipboard', cliCommands[selectedPkgManager]);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const handleSimulateHeroEvent = () => {
    if (isSimulatingEvent) return;
    setIsSimulatingEvent(true);
    let step = 0;
    setActiveHeroNode(0);
    const interval = setInterval(() => {
      step++;
      if (step < 4) {
        setActiveHeroNode(step);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsSimulatingEvent(false);
        }, 1200);
      }
    }, 500);
  };

  const heroNodes = [
    {
      id: 'h-1',
      stage: '01. INGRESS',
      title: 'Stripe Webhook',
      subtitle: 'charge.succeeded ($2,400)',
      icon: <Webhook className="w-4 h-4 text-orange-400" />,
      latency: '11ms',
      port: 'PORT: 443 TLS 1.3',
      trace: {
        event: 'charge.succeeded',
        amount: 240000,
        customer: 'cus_N99281a',
        currency: 'usd',
        signature: 'sha256=9b72f10...',
      },
    },
    {
      id: 'h-2',
      stage: '02. AI REASONING',
      title: 'Gemini 2.5 Flash',
      subtitle: 'Structured domain classification',
      icon: <Cpu className="w-4 h-4 text-purple-400" />,
      latency: '148ms',
      port: 'V8 ISOLATE #41',
      trace: {
        icpTier: 'Tier 1 Enterprise',
        churnRisk: '0.02 (Low)',
        recommendedOwner: 'sarah.c@company.com',
        confidenceScore: 0.98,
      },
    },
    {
      id: 'h-3',
      stage: '03. ROUTING LOGIC',
      title: 'ARR >= $10k Gate',
      subtitle: 'VIP lane conditional dispatch',
      icon: <GitBranch className="w-4 h-4 text-cyan-400" />,
      latency: '4ms',
      port: 'EVAL: TRUE',
      trace: {
        condition: 'amount >= 10000',
        evaluatedValue: 24000,
        branchSelected: 'VIP_EXPEDITE',
      },
    },
    {
      id: 'h-4',
      stage: '04. SYNC & DISPATCH',
      title: 'HubSpot & Slack VIP',
      subtitle: 'Upsert record & post alert',
      icon: <MessageSquare className="w-4 h-4 text-emerald-400" />,
      latency: '52ms',
      port: 'STATUS: 200 OK',
      trace: {
        hubspotContactId: 'hs_8829103',
        slackChannel: '#vip-sales-alerts',
        messageTs: '1726391029.001',
      },
    },
  ];

  const codeSnippet = `import { hubflow, step } from "@hubflow/sdk";

// Define a resilient, deterministic automation pipeline
export default hubflow.pipeline({
  id: "stripe-charge-reconciliation",
  trigger: hubflow.webhook({
    path: "/v1/stripe-events",
    verify: hubflow.verifyStripeSignature(process.env.STRIPE_WEBHOOK_SECRET),
  }),
  execute: async ({ event }) => {
    // Step 1: Extract domain and classify ICP using frontier AI
    const classification = await step.ai("classify-lead", {
      model: "gemini-2.5-flash",
      schema: { icpTier: "string", churnRisk: "number" },
      prompt: \`Analyze customer domain: \${event.data.object.customer_email}\`,
    });

    // Step 2: Route high-value charges to VIP sales channel
    if (event.data.object.amount >= 10000) {
      await step.run("sync-crm", async () => {
        return hubspot.contacts.upsert({
          email: event.data.object.customer_email,
          tier: classification.icpTier,
        });
      });

      await step.slack("notify-team", {
        channel: "#vip-sales-alerts",
        text: \`⚡ New VIP Enterprise Customer: $\${event.data.object.amount / 100}\`,
      });
    }
  },
});`;

  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 md:pt-36 md:pb-28 overflow-hidden border-b border-slate-900"
    >
      {/* Precision Engineering Grid background */}
      <div className="absolute inset-0 canvas-grid-pattern opacity-30 pointer-events-none -z-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Engineering Release Indicator */}
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-semibold text-white">Hubflow Engine v3.4.1</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">Durable Execution Mesh</span>
            </div>
          </div>

          {/* Main Headline - Authentic solid typography, NO AI gradient text */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
            The Event-Driven Automation Engine for High-Throughput Teams
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Replace fragile webhook scripts, polling cron jobs, and brittle glue code.
            Execute pipelines with guaranteed order, automatic state checkpointing,
            and sub-20ms P95 latency across distributed edge nodes.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              id="hero-try-studio-btn"
              variant="accent"
              size="lg"
              onClick={onScrollToStudio}
              leftIcon={<Play className="w-4 h-4 fill-white" />}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Open Workflow Studio
            </Button>
            <Button
              id="hero-book-demo-btn"
              variant="secondary"
              size="lg"
              onClick={onOpenDemo}
            >
              Architecture & Security Review
            </Button>
          </div>

          {/* Developer CLI Command Snippet */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-slate-500" />
                <div className="flex items-center gap-1">
                  {(['npm', 'pnpm', 'yarn', 'pip'] as const).map((pkg) => (
                    <button
                      key={pkg}
                      onClick={() => setSelectedPkgManager(pkg)}
                      className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
                        selectedPkgManager === pkg
                          ? 'bg-slate-800 text-white font-bold'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {pkg}
                    </button>
                  ))}
                </div>
                <span className="text-slate-600">:</span>
                <span className="text-slate-200 font-semibold truncate">
                  {cliCommands[selectedPkgManager]}
                </span>
              </div>

              <button
                onClick={handleCopyCli}
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Copy command"
                aria-label="Copy CLI command"
              >
                {copiedCli ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Technical Specifications Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-orange-400" />
              P95 &lt;18ms Ingress
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              SOC2 Type II & HIPAA Certified
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-300" />
              99.999% Availability SLA
            </span>
            <span className="flex items-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5 text-purple-400" />
              Zero-Loss Write-Ahead Log
            </span>
          </div>
        </div>

        {/* Hero Interactive Workbench - Authentic Dual View (Visual DAG & TypeScript SDK) */}
        <div className="mt-14 relative max-w-5xl mx-auto">
          <div className="rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden">
            {/* Workbench Top Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-slate-700">|</span>
                <span className="font-mono text-slate-300 font-medium text-[11px]">
                  pipelines/stripe-reconcile.ts
                </span>
                <span className="text-slate-600 hidden md:inline">•</span>
                <span className="text-emerald-400 font-mono text-[11px] hidden md:inline">
                  synced (Git commit 4c89fa)
                </span>
              </div>

              {/* View Switcher & Action */}
              <div className="flex items-center gap-2">
                <div className="flex items-center p-0.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px]">
                  <button
                    onClick={() => setActiveTab('topology')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      activeTab === 'topology'
                        ? 'bg-slate-800 text-white font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Visual DAG
                  </button>
                  <button
                    onClick={() => setActiveTab('code')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      activeTab === 'code'
                        ? 'bg-slate-800 text-white font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    TypeScript SDK
                  </button>
                  <button
                    onClick={() => setActiveTab('trace')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      activeTab === 'trace'
                        ? 'bg-slate-800 text-white font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Payload Trace
                  </button>
                </div>

                <button
                  id="hero-simulate-event-btn"
                  onClick={handleSimulateHeroEvent}
                  disabled={isSimulatingEvent}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 font-mono shadow-sm"
                >
                  <Activity className={`w-3.5 h-3.5 ${isSimulatingEvent ? 'animate-spin' : ''}`} />
                  <span>{isSimulatingEvent ? 'Executing Pipeline...' : 'Emit Webhook'}</span>
                </button>
              </div>
            </div>

            {/* Workbench Content Body */}
            <div className="p-6">
              {activeTab === 'topology' && (
                <div>
                  {/* Visual Node Graph */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
                    {heroNodes.map((node, index) => {
                      const isCurrent = activeHeroNode === index;
                      return (
                        <div
                          key={node.id}
                          onClick={() => setActiveHeroNode(index)}
                          className={`rounded-xl p-4 border transition-all duration-150 cursor-pointer ${
                            isCurrent
                              ? 'bg-slate-900 border-orange-500 ring-1 ring-orange-500/50'
                              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-2 text-[10px] font-mono">
                            <span className="text-slate-400 font-bold uppercase">
                              {node.stage}
                            </span>
                            <span className="text-slate-500 font-medium">
                              {node.latency}
                            </span>
                          </div>

                          <div className="flex items-start gap-3 mt-1">
                            <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                              {node.icon}
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="text-xs font-bold text-white truncate">
                                {node.title}
                              </h4>
                              <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                                {node.subtitle}
                              </p>
                            </div>
                          </div>

                          <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                            <span>{node.port}</span>
                            {isCurrent && (
                              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                                <CheckCircle2 className="w-3 h-3" />
                                {isSimulatingEvent ? 'Active' : 'Inspected'}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Node Inspector Drawer */}
                  <div className="mt-5 p-4 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-xs">
                    <div className="flex items-center justify-between text-slate-400 text-[11px] pb-2 border-b border-slate-800">
                      <span>Node Output State: <strong className="text-white">{heroNodes[activeHeroNode].title}</strong></span>
                      <span className="text-emerald-400">Status 200 OK</span>
                    </div>
                    <pre className="mt-2 text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
                      {JSON.stringify(heroNodes[activeHeroNode].trace, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              {activeTab === 'code' && (
                <div className="relative font-mono text-xs bg-slate-950 rounded-xl p-4 border border-slate-800 overflow-x-auto">
                  <div className="flex items-center justify-between text-slate-500 text-[11px] pb-3 border-b border-slate-800/80 mb-3">
                    <span>SDK: TypeScript 5.4+ / Node.js 20+</span>
                    <span className="text-slate-400">Durable Execution Checked</span>
                  </div>
                  <pre className="text-slate-300 leading-relaxed font-mono text-[12px]">
                    <code>{codeSnippet}</code>
                  </pre>
                </div>
              )}

              {activeTab === 'trace' && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-slate-400 text-[10px]">TRACE ID</div>
                      <div className="text-white font-semibold">trc_9981a_88201fa09</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px]">TOTAL DURATION</div>
                      <div className="text-emerald-400 font-semibold">215ms (P95)</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px]">IDEMPOTENCY KEY</div>
                      <div className="text-slate-300">idemp_stripe_ch_001a</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px]">RECOVERY DLQ</div>
                      <div className="text-slate-300">0 failures (0 retries)</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                    <div className="text-slate-500 text-[10px] uppercase font-bold">Header Verification</div>
                    <div>X-Hubflow-Signature: v1,sha256=a88e990c7f... [VALID]</div>
                    <div>X-Forwarded-For: 52.204.18.91 (AWS us-east-1)</div>
                    <div>Encryption-Key: arn:aws:kms:us-east-1:123456789012:key/hubflow-envelope</div>
                  </div>
                </div>
              )}
            </div>

            {/* Workbench Status Footer */}
            <div className="px-5 py-3 bg-slate-900/50 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-3">
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Edge Router: 12 PoPs Active
                </span>
                <span className="text-slate-700">|</span>
                <span>Ingress Buffer: In-Memory Ring</span>
              </div>
              <div className="flex items-center gap-3">
                <span>Memory: 12.4 MB / 128 MB</span>
                <span className="text-slate-700">•</span>
                <span className="text-slate-300 font-medium">Deterministic Replay Enabled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enterprise Logos Bar */}
        <div className="mt-16 pt-10 border-t border-slate-900 text-center">
          <p className="text-xs font-mono font-medium uppercase tracking-wider text-slate-400 mb-6">
            Trusted by modern engineering, platform, and data teams
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-70">
            <span className="text-sm font-mono font-bold tracking-widest text-slate-400">
              STRIPE
            </span>
            <span className="text-sm font-mono font-bold tracking-widest text-slate-400">
              HUBSPOT
            </span>
            <span className="text-sm font-mono font-bold tracking-widest text-slate-400">
              SNOWFLAKE
            </span>
            <span className="text-sm font-mono font-bold tracking-widest text-slate-400">
              DATADOG
            </span>
            <span className="text-sm font-mono font-bold tracking-widest text-slate-400">
              POSTGRESQL
            </span>
            <span className="text-sm font-mono font-bold tracking-widest text-slate-400">
              SUPABASE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
