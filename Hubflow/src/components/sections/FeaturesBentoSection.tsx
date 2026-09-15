import React, { useState } from 'react';
import {
  Zap,
  Cpu,
  ShieldCheck,
  RotateCw,
  GitBranch,
  Gauge,
  CheckCircle2,
  Lock,
  Layers,
  Terminal,
  Activity,
  Server,
  ArrowRight,
} from 'lucide-react';

export const FeaturesBentoSection: React.FC = () => {
  const [selectedStageIndex, setSelectedStageIndex] = useState(0);

  const architectureStages = [
    {
      id: 'ingress',
      stage: '01. INGRESS & EDGE TERMINATION',
      title: 'Global Edge Ingress & Cryptographic Signature Verification',
      metric: '<14ms P95',
      summary:
        'Terminates inbound webhooks across 12 Anycast edge points-of-presence, verifies HMAC-SHA256 signatures with zero key exposure, and enqueues events directly into distributed in-memory ring buffers.',
      specs: [
        { label: 'Ingress Protocol', value: 'HTTP/2, HTTP/3 (QUIC), WebSocket' },
        { label: 'Signature Algorithms', value: 'HMAC-SHA256, Ed25519, RSA-4096' },
        { label: 'Buffer Storage', value: 'In-memory ring buffer (Zero-copy)' },
        { label: 'DDoS & Rate Shield', value: 'Token bucket per IP & Org key' },
      ],
      codeSample: `// Edge verification handler
export async function verifyWebhook(req: Request, secret: string) {
  const sig = req.headers.get("x-hub-signature-256");
  const body = await req.arrayBuffer();
  const valid = await crypto.subtle.verify(
    "HMAC",
    await importKey(secret),
    hexToBytes(sig),
    body
  );
  if (!valid) throw new SecurityError("Invalid signature");
  return enqueueToBuffer(body);
}`,
    },
    {
      id: 'wal',
      stage: '02. STATE DURABILITY',
      title: 'Distributed Write-Ahead Log (WAL) & Idempotency Vault',
      metric: 'Zero Loss',
      summary:
        'Every event is persisted into a crash-resilient write-ahead log before any execution starts. Unique idempotency keys ensure network retries never trigger duplicate side effects, charges, or emails.',
      specs: [
        { label: 'Consensus Engine', value: 'Raft-backed distributed WAL' },
        { label: 'Deduplication Window', value: 'Configurable (default 72 hours)' },
        { label: 'State Serialization', value: 'Protocol Buffers (Protobuf v3)' },
        { label: 'Storage Encryption', value: 'AES-256-GCM Envelope KMS' },
      ],
      codeSample: `// Idempotent execution lock
const lock = await wal.acquireIdempotencyLock({
  key: \`charge_\${event.id}\`,
  ttlMs: 72 * 3600 * 1000,
});
if (lock.status === "duplicate") {
  return lock.cachedResponse;
}
await wal.append({ state: "QUEUED", payload: event });`,
    },
    {
      id: 'workers',
      stage: '03. ISOLATED RUNTIMES',
      title: 'Sandboxed V8 Isolates & Private VPC Runners',
      metric: '5ms Boot',
      summary:
        'Execute user TypeScript, Python, or WebAssembly in secure, ephemeral V8 isolates with memory fencing and strict CPU quotas. Enterprise teams can deploy private runners inside their AWS or GCP perimeter.',
      specs: [
        { label: 'Cold Start Latency', value: '< 5ms (pre-warmed worker pool)' },
        { label: 'Memory Ceiling', value: '128 MB to 4 GB per step' },
        { label: 'Execution Timeout', value: 'Up to 15 minutes (or unlimited VPC)' },
        { label: 'Isolated File System', value: 'Ephemeral scratch disk /tmp' },
      ],
      codeSample: `// Sandboxed step runner configuration
export const stepRunnerConfig = {
  runtime: "v8-isolated-worker-20",
  maxMemoryMb: 512,
  cpuAllowanceMs: 3000,
  networkEgress: "strictly-allowed-hosts",
  kmsKeyId: process.env.VPC_KMS_KEY_ARN,
};`,
    },
    {
      id: 'ai-reasoning',
      stage: '04. MODEL GOVERNANCE',
      title: 'Frontier AI Reasoning with Strict JSON Schema Validation',
      metric: 'Zero Retention',
      summary:
        'Orchestrate Gemini 2.5 Flash, Claude 3.5, and GPT-4o with deterministic JSON schema enforcement. Automated repair loops handle malformed LLM outputs, and BAA agreements guarantee customer data is never used for training.',
      specs: [
        { label: 'Structured Enforcement', value: 'Zod & JSON-Schema AST validation' },
        { label: 'Repair Loop Policy', value: 'Auto-correct with temperature drop' },
        { label: 'Privacy Agreement', value: 'Zero data retention (HIPAA compliant)' },
        { label: 'Latency Optimization', value: 'Speculative decoding & streaming' },
      ],
      codeSample: `// Schema-enforced AI extraction node
const triage = await step.ai("ticket-sentiment", {
  model: "gemini-2.5-flash",
  schema: z.object({
    urgency: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
    summary: z.string().max(120),
    actionRequired: z.boolean(),
  }),
  retryMalformed: 2,
});`,
    },
    {
      id: 'dlq-recovery',
      stage: '05. RESILIENCE & DLQ',
      title: 'Dead-Letter Queues, Circuit Breakers & Replay GUI',
      metric: '100% Recoverable',
      summary:
        'When downstream SaaS APIs fail or hit rate limits (429/503), the circuit breaker trips, applying exponential backoff with full jitter. Persistent failures land in the Dead-Letter Queue for single-click replay.',
      specs: [
        { label: 'Retry Strategy', value: 'Exponential backoff with full jitter' },
        { label: 'DLQ Retention', value: '30 days searchable event payload' },
        { label: 'Circuit Breaker', value: 'Automatic pause at 15% error rate' },
        { label: 'Replay Granularity', value: 'Resume from failed step without duplicate runs' },
      ],
      codeSample: `// Dead-letter queue retry policy
export const retryPolicy = {
  maxRetries: 5,
  initialIntervalMs: 250,
  backoffFactor: 2.0,
  jitter: "full",
  retryableStatusCodes: [408, 429, 500, 502, 503, 504],
  onExhausted: "route-to-dlq-with-pagerduty-alert",
};`,
    },
  ];

  const comparisonRows = [
    {
      feature: 'Ingress Latency (P95)',
      hubflow: '< 18ms (Edge Push Event Mesh)',
      legacySaaS: '1 - 15 minutes (Polling cron)',
      customQueue: '100ms - 400ms (DIY Gateway)',
    },
    {
      feature: 'State Checkpointing',
      hubflow: 'Automatic WAL on every step',
      legacySaaS: 'Opaque black-box state',
      customQueue: 'Manual DB transactions',
    },
    {
      feature: 'Replay from Exact Step',
      hubflow: 'Yes, deterministic without duplicate side effects',
      legacySaaS: 'No (must re-run entire pipeline)',
      customQueue: 'Requires complex custom idempotent state code',
    },
    {
      feature: 'Developer SDK & GitOps',
      hubflow: 'Native TypeScript/Python SDK + CI/CD sync',
      legacySaaS: 'Proprietary web GUI only',
      customQueue: 'Raw code without visual debugging',
    },
    {
      feature: 'Enterprise Compliance',
      hubflow: 'SOC2 Type II, HIPAA, Hybrid Private VPC',
      legacySaaS: 'Public multi-tenant SaaS only',
      customQueue: 'Requires DIY audit logging & encryption',
    },
    {
      feature: 'AI Schema Enforcement',
      hubflow: 'Native Zod validation & auto-healing',
      legacySaaS: 'Unstructured text prompts',
      customQueue: 'Manual regex / schema parsing',
    },
  ];

  const currentStage = architectureStages[selectedStageIndex];

  return (
    <section id="platform" className="py-20 md:py-28 relative scroll-mt-20 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 mb-4">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            <span>SYSTEM ARCHITECTURE SPECIFICATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Engineered for Sub-20ms Latency & Zero Dropped Events
          </h2>
          <p className="text-base text-slate-400 mt-4 leading-relaxed">
            Examine the five durable stages of the Hubflow execution mesh. Built from
            the ground up to eliminate single points of failure in distributed pipelines.
          </p>
        </div>

        {/* Interactive Architecture Stage Navigator */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 shadow-xl overflow-hidden mb-16">
          {/* Stage Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-b border-slate-800 bg-slate-900/60 text-xs font-mono">
            {architectureStages.map((stage, idx) => {
              const isSelected = selectedStageIndex === idx;
              return (
                <button
                  key={stage.id}
                  onClick={() => setSelectedStageIndex(idx)}
                  className={`p-4 text-left border-r border-b lg:border-b-0 border-slate-800 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-slate-950 text-white border-t-2 border-t-orange-500 font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="text-[10px] text-slate-500 mb-1">{stage.stage.split('.')[0]}. STAGE</div>
                  <div className="truncate font-semibold">{stage.title.split(' ')[0]} {stage.title.split(' ')[1]}</div>
                  <div className="text-[11px] text-orange-400 mt-1 font-mono">{stage.metric}</div>
                </button>
              );
            })}
          </div>

          {/* Stage Detail Grid */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Stage Overview & Technical Specs */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-mono text-orange-400 font-semibold uppercase tracking-wider">
                  {currentStage.stage}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                  {currentStage.title}
                </h3>
                <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                  {currentStage.summary}
                </p>
              </div>

              {/* Technical Specifications Table */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/80 overflow-hidden font-mono text-xs">
                <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold text-[11px] uppercase tracking-wider">
                  Engine Parameters
                </div>
                <div className="divide-y divide-slate-800/80">
                  {currentStage.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="px-4 py-2.5 flex items-center justify-between gap-4">
                      <span className="text-slate-400">{spec.label}</span>
                      <span className="text-white font-medium text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Actual Code & Execution Output */}
            <div className="lg:col-span-6 rounded-xl border border-slate-800 bg-slate-900/90 font-mono text-xs overflow-hidden">
              <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-slate-400 text-[11px]">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Terminal className="w-3.5 h-3.5 text-orange-400" />
                  hubflow-core/{currentStage.id}.ts
                </span>
                <span className="text-emerald-400">Validated</span>
              </div>
              <pre className="p-4 text-[11px] text-slate-200 overflow-x-auto leading-relaxed bg-slate-950">
                <code>{currentStage.codeSample}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Technical Architectural Comparison Table */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Technical Comparison: Hubflow vs. Alternatives
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              Why high-scale engineering and revenue teams replace DIY queues and legacy SaaS with Hubflow.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-950 border border-slate-800 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-300 font-mono">
                    <th className="p-4 sm:p-5 font-bold uppercase tracking-wider w-1/4">
                      Capability
                    </th>
                    <th className="p-4 sm:p-5 font-bold uppercase tracking-wider text-orange-400 bg-orange-500/5 w-1/4">
                      Hubflow Durable Mesh
                    </th>
                    <th className="p-4 sm:p-5 font-bold uppercase tracking-wider text-slate-400 w-1/4">
                      Legacy SaaS (Zapier / Make)
                    </th>
                    <th className="p-4 sm:p-5 font-bold uppercase tracking-wider text-slate-400 w-1/4">
                      DIY SQS / Celery / BullMQ
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {comparisonRows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-4 sm:p-5 font-semibold text-white font-mono">
                        {row.feature}
                      </td>
                      <td className="p-4 sm:p-5 font-medium text-slate-200 bg-orange-500/5 border-x border-orange-500/10">
                        <div className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{row.hubflow}</span>
                        </div>
                      </td>
                      <td className="p-4 sm:p-5 text-slate-400">
                        {row.legacySaaS}
                      </td>
                      <td className="p-4 sm:p-5 text-slate-400">
                        {row.customQueue}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
