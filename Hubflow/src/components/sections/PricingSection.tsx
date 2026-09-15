import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { PRICING_PLANS } from '../../data/mockData';
import { BillingCycle, Currency } from '../../types';
import { Check, Zap, Shield, ChevronDown, ChevronUp } from 'lucide-react';

interface PricingSectionProps {
  onOpenDemo: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenDemo }) => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('annual');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [showFullMatrix, setShowFullMatrix] = useState(false);

  const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
  };

  const currencyRates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
  };

  const formatPrice = (usdAmount: number) => {
    if (usdAmount === 0) return '0';
    const converted = Math.round(usdAmount * currencyRates[currency]);
    return converted.toString();
  };

  const fullSpecs = [
    {
      category: 'Scale & Concurrency',
      rows: [
        { name: 'Monthly Task Quota', starter: '10,000 included', pro: '150,000 included ($0.0003/extra)', enterprise: 'Unlimited / Custom Volume' },
        { name: 'Concurrent Executions', starter: '5 parallel runs', pro: '50 parallel runs', enterprise: 'Unlimited / Dedicated' },
        { name: 'Max Step Execution Time', starter: '30 seconds', pro: '5 minutes', enterprise: 'Up to 15m (Unlimited on VPC)' },
        { name: 'Edge Ingress POPs', starter: '3 US regions', pro: '12 Global Anycast PoPs', enterprise: 'Global + Private VPC' },
      ],
    },
    {
      category: 'Developer Tooling & SDKs',
      rows: [
        { name: 'TypeScript & Node SDK', starter: 'Included', pro: 'Included', enterprise: 'Included' },
        { name: 'Python SDK', starter: 'Included', pro: 'Included', enterprise: 'Included' },
        { name: 'Local CLI & Live Debugger', starter: 'Included', pro: 'Included', enterprise: 'Included' },
        { name: 'GitOps & CI/CD Pipeline Sync', starter: 'Community', pro: 'Automated GitHub/GitLab', enterprise: 'Custom Enterprise VCS' },
      ],
    },
    {
      category: 'Reliability & Fault Tolerance',
      rows: [
        { name: 'Availability SLA', starter: 'Best effort', pro: '99.95% financially backed', enterprise: '99.999% custom SLA' },
        { name: 'Dead-Letter Queue (DLQ)', starter: '24 hours retention', pro: '30 days searchable logs', enterprise: 'Unlimited / S3 streaming' },
        { name: 'Deterministic Replay', starter: 'Manual re-run', pro: 'Single-click step replay', enterprise: 'Automated replay policies' },
        { name: 'Circuit Breaker Auto-Trip', starter: 'Basic 3 retries', pro: 'Jittered exponential backoff', enterprise: 'Custom backoff algorithms' },
      ],
    },
    {
      category: 'Security, Privacy & Governance',
      rows: [
        { name: 'Encryption at Rest & Transit', starter: 'TLS 1.3 & AES-256', pro: 'TLS 1.3 & AES-256', enterprise: 'Customer-Managed KMS (AWS/GCP)' },
        { name: 'Compliance Certifications', starter: 'SOC2 Type II hosting', pro: 'SOC2 Type II report available', enterprise: 'SOC2 Type II + HIPAA BAA' },
        { name: 'Single Sign-On (SAML / Okta)', starter: 'Google / GitHub OAuth', pro: 'Google / GitHub OAuth', enterprise: 'SAML 2.0, Okta, Azure AD' },
        { name: 'Audit Logs & RBAC', starter: 'Owner only', pro: 'Role-based access (3 roles)', enterprise: 'Granular RBAC + SIEM export' },
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 relative scroll-mt-20 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 mb-4">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            <span>TRANSPARENT VALUE-ALIGNED PRICING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Transparent Pricing for High-Throughput Pipelines
          </h2>
          <p className="text-base text-slate-400 mt-4 leading-relaxed">
            Zero charges for internal branching or filtered conditions.
            Start free, scale into dedicated high-throughput infrastructure as your volume grows.
          </p>

          {/* Billing Switcher & Currency selector */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="p-1 rounded-xl bg-slate-900 border border-slate-800 flex items-center">
              <button
                id="billing-monthly-btn"
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-orange-600 text-white shadow-sm font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly Billing
              </button>
              <button
                id="billing-annual-btn"
                onClick={() => setBillingCycle('annual')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  billingCycle === 'annual'
                    ? 'bg-orange-600 text-white shadow-sm font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Annual Billing</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold">
                  Save 20%
                </span>
              </button>
            </div>

            {/* Currency switcher */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              {(['USD', 'EUR', 'GBP'] as Currency[]).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-2.5 py-1 rounded-lg font-mono font-medium transition-colors cursor-pointer ${
                    currency === curr
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-14">
          {PRICING_PLANS.map((plan) => {
            const price =
              billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                id={`pricing-card-${plan.id}`}
                className={`relative rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all ${
                  plan.popular
                    ? 'bg-slate-900 border-2 border-orange-500 shadow-xl'
                    : 'bg-slate-950 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-6">
                    <span className="px-3 py-0.5 rounded bg-orange-600 text-white text-[11px] font-mono font-bold uppercase tracking-wider">
                      Most Selected by Scaling Teams
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xl font-bold text-white font-mono">{plan.name}</h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 min-h-[36px]">
                    {plan.tagline}
                  </p>

                  {/* Price display */}
                  <div className="mt-6 flex items-baseline gap-1.5 font-mono">
                    <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                      {currencySymbols[currency]}
                      {formatPrice(price)}
                    </span>
                    <span className="text-xs text-slate-400 font-sans">
                      / month {billingCycle === 'annual' && price > 0 ? '(billed annually)' : ''}
                    </span>
                  </div>

                  {/* Quota breakdown box */}
                  <div className="mt-6 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Included Tasks:</span>
                      <strong className="text-white">{plan.quota.tasks}</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Concurrency:</span>
                      <strong className="text-white">{plan.quota.concurrency}</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Log Retention:</span>
                      <strong className="text-white">{plan.quota.retention}</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Support Level:</span>
                      <strong className="text-orange-400">{plan.quota.support}</strong>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="mt-7 space-y-3">
                    <span className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider block">
                      Core Inclusions:
                    </span>
                    <ul className="space-y-2 text-xs">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <Button
                    id={`plan-cta-${plan.id}`}
                    variant={plan.popular ? 'accent' : 'outline'}
                    size="md"
                    className="w-full justify-center font-mono text-xs"
                    onClick={onOpenDemo}
                  >
                    {plan.ctaText}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Capability & Limits Matrix Toggle */}
        <div className="text-center">
          <button
            onClick={() => setShowFullMatrix(!showFullMatrix)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 transition-colors cursor-pointer"
          >
            <span>{showFullMatrix ? 'Hide Technical Specification Matrix' : 'View Full Technical Specification Matrix'}</span>
            {showFullMatrix ? (
              <ChevronUp className="w-3.5 h-3.5 text-orange-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-orange-400" />
            )}
          </button>
        </div>

        {/* Expanded Matrix */}
        {showFullMatrix && (
          <div className="mt-8 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-300">
                    <th className="p-4 font-bold uppercase w-1/4">Specification</th>
                    <th className="p-4 font-bold uppercase w-1/4">Starter Developer</th>
                    <th className="p-4 font-bold uppercase text-orange-400 w-1/4">Professional Team</th>
                    <th className="p-4 font-bold uppercase w-1/4">Enterprise Scale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {fullSpecs.map((cat, cIdx) => (
                    <React.Fragment key={cIdx}>
                      <tr className="bg-slate-900/40">
                        <td colSpan={4} className="p-3 text-[11px] font-bold text-orange-400 uppercase tracking-wider bg-slate-900/60 border-t border-slate-800">
                          {cat.category}
                        </td>
                      </tr>
                      {cat.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-900/20 transition-colors">
                          <td className="p-3.5 text-white font-medium">{row.name}</td>
                          <td className="p-3.5 text-slate-400">{row.starter}</td>
                          <td className="p-3.5 text-slate-200 bg-orange-500/5">{row.pro}</td>
                          <td className="p-3.5 text-slate-300 font-semibold">{row.enterprise}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
