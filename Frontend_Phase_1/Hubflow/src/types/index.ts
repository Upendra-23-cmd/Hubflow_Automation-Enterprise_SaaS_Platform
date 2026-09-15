export type WorkflowNodeType = 'trigger' | 'ai' | 'action' | 'condition' | 'notification';

export interface WorkflowNode {
  id: string;
  type: WorkflowNodeType;
  title: string;
  service: string;
  iconName: string;
  description: string;
  status: 'idle' | 'running' | 'success' | 'failed';
  executionTimeMs?: number;
  config?: Record<string, unknown>;
  outputSample?: Record<string, unknown>;
}

export interface ExecutionLog {
  id: string;
  timestamp: string;
  nodeId: string;
  level: 'info' | 'success' | 'warn' | 'error';
  message: string;
  payload?: Record<string, unknown>;
}

export interface WorkflowScenario {
  id: string;
  name: string;
  category: string;
  description: string;
  badge: string;
  nodes: WorkflowNode[];
  defaultPayload: Record<string, unknown>;
}

export type IntegrationCategory =
  | 'all'
  | 'ai'
  | 'crm'
  | 'communication'
  | 'devtools'
  | 'database'
  | 'ecommerce';

export interface IntegrationItem {
  id: string;
  name: string;
  category: IntegrationCategory;
  description: string;
  iconName: string;
  featured?: boolean;
  popularRecipes: string[];
  latencyMs: number;
  authType: 'OAuth 2.0' | 'API Key' | 'Webhook HMAC';
  activePipelines: string;
}

export interface TemplateItem {
  id: string;
  title: string;
  category: string;
  description: string;
  apps: string[];
  runsPerMonth: string;
  rating: number;
  setupTime: string;
  featured?: boolean;
}

export type BillingCycle = 'monthly' | 'annual';
export type Currency = 'USD' | 'EUR' | 'GBP';

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  features: string[];
  highlight: string;
  ctaText: string;
  quota: {
    tasks: string;
    concurrency: string;
    retention: string;
    support: string;
  };
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  companyLogoText: string;
  avatarUrl: string;
  quote: string;
  metric: string;
  metricLabel: string;
  verified: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'technical' | 'pricing' | 'security';
}

export interface DemoBookingRequest {
  fullName: string;
  workEmail: string;
  companyName: string;
  teamSize: string;
  primaryUseCase: string;
  notes?: string;
}

export interface SystemMetrics {
  status: 'operational' | 'degraded' | 'maintenance';
  uptime90Days: string;
  avgLatencyMs: number;
  tasksProcessedToday: string;
  activeNodesGlobal: number;
  lastIncident: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  latencyMs: number;
}
