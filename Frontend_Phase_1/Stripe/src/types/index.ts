export interface NavItem {
  title: string;
  description: string;
  icon: string;
  badge?: string;
  href: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
  featured?: {
    title: string;
    description: string;
    linkText: string;
    href: string;
  };
}

export interface NavMenuData {
  products: {
    payments: NavItem[];
    operations: NavItem[];
    embedded: NavItem[];
  };
  solutions: {
    byStage: NavItem[];
    byModel: NavItem[];
  };
  developers: {
    resources: NavItem[];
    sdks: NavItem[];
  };
  resources: {
    company: NavItem[];
    support: NavItem[];
  };
}

export interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: 'payments' | 'operations' | 'embedded';
  icon: string;
  badge?: string;
  features: string[];
  docLink: string;
  demoData?: Record<string, any>;
}

export interface CodeSnippet {
  language: string;
  label: string;
  code: string;
  filename: string;
}

export interface CustomerStory {
  id: string;
  company: string;
  logo: string;
  quote: string;
  author: string;
  role: string;
  metric: string;
  metricLabel: string;
  highlightColor?: string;
}

export interface GlobalStat {
  id: string;
  number: string;
  label: string;
  sublabel: string;
}

export type RegionMode = 'in' | 'global';

export interface PaymentIntentRequest {
  amount: number;
  currency: string;
  paymentMethod: 'card' | 'apple_pay' | 'google_pay' | 'link' | 'upi' | 'netbanking';
  customerEmail: string;
  description?: string;
  upiId?: string;
  bankName?: string;
}

export interface PaymentIntentResponse {
  id: string;
  object: 'payment_intent';
  amount: number;
  amount_received: number;
  currency: string;
  status: 'requires_payment_method' | 'processing' | 'succeeded' | 'canceled';
  client_secret: string;
  created: number;
  payment_method_types: string[];
  charges: {
    data: Array<{
      id: string;
      paid: boolean;
      receipt_url: string;
      outcome: {
        network_status: string;
        risk_level: string;
        seller_message: string;
      };
    }>;
  };
}

export interface ApiLogEntry {
  id: string;
  method: 'GET' | 'POST' | 'DELETE';
  endpoint: string;
  status: number;
  durationMs: number;
  timestamp: string;
  requestBody?: any;
  responseBody?: any;
}
