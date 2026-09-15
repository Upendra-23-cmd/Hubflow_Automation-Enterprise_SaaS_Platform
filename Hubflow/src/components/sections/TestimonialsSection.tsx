import React, { useState } from 'react';
import {
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  Database,
  Server,
  Activity,
  GitBranch,
  Terminal,
} from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);

  const caseStudies = [
    {
      id: 'finscale',
      company: 'Finscale Technologies',
      industry: 'Global Payments & Billing Infrastructure',
      scale: '45M events / month',
      title: 'Eliminating Dropped Webhooks & Reconciling $180M in High-Volume Subscriptions',
      challenge:
        'During flash promotional spikes, their legacy Celery queue workers and polling scripts crashed with Redis buffer overflows, silently dropping 0.3% of Stripe and Adyen webhooks.',
      solution:
        'Migrated to Hubflow’s event mesh. Edge ingress terminates payment signatures in under 12ms and commits to a distributed write-ahead log with automatic 72-hour idempotency keys.',
      results: [
        { metric: '0 Dropped Events', label: 'Over 180M processed webhooks' },
        { metric: '< 18ms', label: 'P95 end-to-end ledger dispatch' },
        { metric: '$240,000', label: 'Annual cloud & SRE ops saved' },
      ],
      architecture: [
        { step: 'Stripe & Adyen Webhooks', detail: 'Edge HMAC signature verification across 12 PoPs' },
        { step: 'Hubflow WAL', detail: 'Durable queue with unique transaction idempotency key' },
        { step: 'PostgreSQL & NetSuite', detail: 'Bi-directional parallel write with transactional rollback' },
        { step: 'Slack Alerting', detail: 'Real-time notification for failed charges > $1,000' },
      ],
      quote:
        'Hubflow replaced 4 custom microservices and 18 fragile polling workers. In over 180 million events, we have recorded exactly zero dropped transactions and zero duplicate charges.',
      author: 'Alex Rivera',
      authorRole: 'VP of Platform Engineering, Finscale Tech',
    },
    {
      id: 'medsecure',
      company: 'MedSecure Health',
      industry: 'Digital Health & Clinical Telehealth',
      scale: '120,000 patient docs / day',
      title: 'HIPAA-Compliant Unstructured Document Ingestion with Private VPC Runners',
      challenge:
        'Strict HIPAA and SOC2 regulations prevented the clinical team from using public multi-tenant SaaS tools to extract lab data from incoming physician PDFs and faxes.',
      solution:
        'Deployed Hubflow Enterprise with self-hosted Kubernetes runners inside their AWS GovCloud VPC. Sensitive records are encrypted with customer-managed KMS keys and never leave their perimeter.',
      results: [
        { metric: '100% HIPAA', label: 'Zero-retention BAA signed' },
        { metric: '8 Seconds', label: 'Average intake time (was 4 hours)' },
        { metric: '99.4%', label: 'Clinical extraction accuracy' },
      ],
      architecture: [
        { step: 'EHR / Fax Ingress', detail: 'Encrypted S3 bucket trigger with AWS KMS' },
        { step: 'Private VPC Runner', detail: 'Isolated V8 sandboxed worker in customer AWS GovCloud' },
        { step: 'Gemini 2.5 Structured Extraction', detail: 'Zero data retention agreement, strict JSON schema' },
        { step: 'FHIR / HL7 Store', detail: 'Direct commit to compliant healthcare database' },
      ],
      quote:
        'Compliance was our insurmountable blocker with other automation platforms. Hubflow gave us the speed of a modern visual workflow engine combined with the security isolation of our own private VPC.',
      author: 'Dr. Priya Sharma',
      authorRole: 'Chief Technology Officer, MedSecure Health',
    },
    {
      id: 'stackpulse',
      company: 'StackPulse Systems',
      industry: 'Developer Tools & Cloud Infrastructure',
      scale: '850+ microservices & repos',
      title: 'GitOps Workflow Automation & Zero-Downtime Multi-Region Releases',
      challenge:
        'Engineers were manually synchronizing sprint status across GitHub PRs, Linear issues, and Datadog canary monitors, resulting in frequent communication gaps during production deployments.',
      solution:
        'Implemented type-safe Hubflow TypeScript pipelines version-controlled directly in Git repositories. Workflows trigger on GitHub release tags and automatically manage canary deployments.',
      results: [
        { metric: '15 hrs / wk', label: 'Engineer time saved per team' },
        { metric: '94% Faster', label: 'Incident rollback response' },
        { metric: '100% GitOps', label: 'All workflows audited in Git' },
      ],
      architecture: [
        { step: 'GitHub Release Tag', detail: 'Signed webhook triggers production release pipeline' },
        { step: 'Canary Health Check', detail: 'Datadog & Cloudwatch metric polling with auto-rollback' },
        { step: 'Linear Issue Sync', detail: 'Closes completed tickets and tags PR author' },
        { step: 'Customer Changelog', detail: 'Auto-generates semantic release notes for Discord & docs' },
      ],
      quote:
        'Writing our pipelines as real TypeScript code in Git while retaining a real-time visual debugger was a game changer for our SRE and platform teams.',
      author: 'Marcus Vance',
      authorRole: 'Head of Infrastructure, StackPulse',
    },
  ];

  const currentCase = caseStudies[activeCaseIndex];

  return (
    <section id="testimonials" className="py-20 md:py-28 relative scroll-mt-20 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>PRODUCTION DEPLOYMENT PROFILES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            How High-Scale Teams Run Hubflow in Production
          </h2>
          <p className="text-base text-slate-400 mt-4 leading-relaxed">
            Real architectural breakdowns, failure-mode mitigations, and performance
            benchmarks from engineering leaders who scaled their operations with Hubflow.
          </p>
        </div>

        {/* Case Study Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {caseStudies.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveCaseIndex(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer border ${
                activeCaseIndex === idx
                  ? 'bg-orange-600 text-white border-orange-500 shadow-md font-bold'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border-slate-800'
              }`}
            >
              <span>{item.company}</span>
              <span className="ml-2 text-[11px] opacity-75">({item.scale})</span>
            </button>
          ))}
        </div>

        {/* Selected Case Study Detail Card */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Challenge & Results */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
                  <span className="text-orange-400 font-semibold">{currentCase.industry}</span>
                  <span>•</span>
                  <span>Scale: {currentCase.scale}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  {currentCase.title}
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="font-mono text-[11px] font-bold text-rose-400 uppercase tracking-wider block mb-1">
                    The Architectural Challenge
                  </span>
                  <p className="text-slate-300 leading-relaxed">{currentCase.challenge}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="font-mono text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                    The Hubflow Implementation
                  </span>
                  <p className="text-slate-300 leading-relaxed">{currentCase.solution}</p>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {currentCase.results.map((res, rIdx) => (
                  <div key={rIdx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center font-mono">
                    <div className="text-lg sm:text-2xl font-extrabold text-white">
                      {res.metric}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">{res.label}</div>
                  </div>
                ))}
              </div>

              {/* Engineering Quote */}
              <div className="pt-4 border-t border-slate-900">
                <blockquote className="text-xs sm:text-sm text-slate-300 italic border-l-2 border-orange-500 pl-4 py-1">
                  "{currentCase.quote}"
                </blockquote>
                <div className="mt-3 text-xs font-mono text-slate-400 pl-4">
                  <strong className="text-white">{currentCase.author}</strong> — {currentCase.authorRole}
                </div>
              </div>
            </div>

            {/* Right: Architecture Blueprint Flow */}
            <div className="lg:col-span-5 rounded-xl bg-slate-900/70 border border-slate-800 p-5 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400 text-[11px]">
                <span className="flex items-center gap-1.5 text-white font-bold">
                  <Activity className="w-3.5 h-3.5 text-orange-400" />
                  Deployed Pipeline Topology
                </span>
                <span className="text-emerald-400">Production Active</span>
              </div>

              <div className="mt-4 space-y-3">
                {currentCase.architecture.map((node, nIdx) => (
                  <div key={nIdx} className="relative">
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-3">
                      <span className="w-5 h-5 rounded bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px] text-orange-400 shrink-0 mt-0.5">
                        {nIdx + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-white truncate">{node.step}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">{node.detail}</div>
                      </div>
                    </div>
                    {nIdx < currentCase.architecture.length - 1 && (
                      <div className="w-0.5 h-3 bg-slate-800 mx-auto my-0.5" />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Encryption: AES-256-GCM</span>
                <span className="text-emerald-400">Idempotency Checked</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
