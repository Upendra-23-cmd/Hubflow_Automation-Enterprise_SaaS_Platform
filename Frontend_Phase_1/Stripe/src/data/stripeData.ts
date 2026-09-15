import { NavMenuData, ProductItem, CodeSnippet, CustomerStory, GlobalStat } from '../types';

export const NAV_DATA: NavMenuData = {
  products: {
    payments: [
      {
        title: 'Payments',
        description: 'Online payments acceptance with 100+ payment methods',
        icon: 'CreditCard',
        badge: 'Popular',
        href: '#products'
      },
      {
        title: 'Checkout',
        description: 'Pre-built, conversion-optimized checkout page',
        icon: 'ShoppingCart',
        href: '#checkout-demo'
      },
      {
        title: 'Elements',
        description: 'Customizable UI components for web and mobile',
        icon: 'Layout',
        href: '#products'
      },
      {
        title: 'Payment Links',
        description: 'No-code payment links to share anywhere',
        icon: 'Link',
        href: '#products'
      }
    ],
    operations: [
      {
        title: 'Billing',
        description: 'Flexible recurring billing & subscription management',
        icon: 'Repeat',
        badge: 'Enterprise',
        href: '#products'
      },
      {
        title: 'Invoicing',
        description: 'Smart automated invoices that get paid 3x faster',
        icon: 'FileText',
        href: '#products'
      },
      {
        title: 'Tax',
        description: 'Automate sales tax, VAT, and GST calculation',
        icon: 'Percent',
        href: '#products'
      },
      {
        title: 'Radar',
        description: 'AI-driven fraud detection & dispute mitigation',
        icon: 'ShieldAlert',
        badge: 'AI Powered',
        href: '#products'
      }
    ],
    embedded: [
      {
        title: 'Connect',
        description: 'Payments engine for multi-party platforms & marketplaces',
        icon: 'Network',
        href: '#products'
      },
      {
        title: 'Issuing',
        description: 'Create and distribute physical and virtual payment cards',
        icon: 'CreditCard',
        badge: 'New',
        href: '#products'
      },
      {
        title: 'Treasury',
        description: 'Banking-as-a-service for customer accounts & yield',
        icon: 'Landmark',
        href: '#products'
      },
      {
        title: 'Climate',
        description: 'Direct a fraction of revenue toward carbon removal',
        icon: 'Leaf',
        href: '#products'
      }
    ]
  },
  solutions: {
    byStage: [
      {
        title: 'Startups',
        description: 'Launch fast with ready-to-use APIs and Atlas company formation',
        icon: 'Rocket',
        href: '#solutions'
      },
      {
        title: 'Enterprises',
        description: 'Modernize legacy architectures with institutional resilience',
        icon: 'Building2',
        badge: 'Proven Scale',
        href: '#solutions'
      }
    ],
    byModel: [
      {
        title: 'E-commerce',
        description: 'Boost checkout conversion across 195+ countries',
        icon: 'ShoppingBag',
        href: '#solutions'
      },
      {
        title: 'SaaS & Subscriptions',
        description: 'Manage complex usage-based and tiered recurring revenue',
        icon: 'Layers',
        href: '#solutions'
      },
      {
        title: 'Platforms & Marketplaces',
        description: 'Route funds dynamically across sellers and service providers',
        icon: 'GitFork',
        href: '#solutions'
      },
      {
        title: 'Creator Economy',
        description: 'Instant global payouts with custom split fees',
        icon: 'Sparkles',
        href: '#solutions'
      }
    ]
  },
  developers: {
    resources: [
      {
        title: 'Documentation',
        description: 'Full guides, API references, and interactive tutorials',
        icon: 'BookOpen',
        href: '#developer'
      },
      {
        title: 'API Reference',
        description: 'Inspect exact JSON endpoints, status codes & responses',
        icon: 'Terminal',
        badge: 'REST',
        href: '#developer'
      },
      {
        title: 'API Changelog',
        description: 'Continuous improvements with zero breaking changes',
        icon: 'Clock',
        href: '#developer'
      }
    ],
    sdks: [
      {
        title: 'Official Libraries',
        description: 'SDKs for Node, Python, Go, Ruby, Java, PHP, .NET, iOS & Android',
        icon: 'Code2',
        href: '#developer'
      },
      {
        title: 'Stripe CLI',
        description: 'Listen to real webhooks and trigger test events locally',
        icon: 'Cpu',
        href: '#developer'
      },
      {
        title: 'Stripe Samples',
        description: 'Open-source starter templates ready to deploy in 1 click',
        icon: 'FolderGit2',
        href: '#developer'
      }
    ]
  },
  resources: {
    company: [
      {
        title: 'Customers',
        description: 'Stories from millions of businesses building on Stripe',
        icon: 'Users',
        href: '#customers'
      },
      {
        title: 'Annual Letter',
        description: 'Read the latest shareholder update on internet commerce',
        icon: 'MailOpen',
        href: '#resources'
      },
      {
        title: 'Newsroom',
        description: 'Product launches, company news, and industry research',
        icon: 'Newspaper',
        href: '#resources'
      }
    ],
    support: [
      {
        title: 'Support Center',
        description: '24/7 technical and account assistance',
        icon: 'HelpCircle',
        href: '#resources'
      },
      {
        title: 'System Status',
        description: 'Real-time telemetry and 99.999% uptime verification',
        icon: 'Activity',
        badge: 'Operational',
        href: '#global'
      },
      {
        title: 'Contact Sales',
        description: 'Speak with payments specialists to customize your tier',
        icon: 'PhoneCall',
        href: '#pricing'
      }
    ]
  }
};

export const PRODUCTS_CATALOG: ProductItem[] = [
  {
    id: 'payments',
    name: 'Payments',
    tagline: 'Online and in-person payments acceptance',
    description: 'Accept credit cards, mobile wallets, buy now pay later, and local bank transfers with optimized authorization rates.',
    category: 'payments',
    icon: 'CreditCard',
    badge: 'Core Engine',
    features: ['100+ payment methods', 'Built-in Radar fraud defense', 'Dynamic 3D Secure routing', 'Zero-friction 1-click Link checkout'],
    docLink: '#developer'
  },
  {
    id: 'checkout',
    name: 'Stripe Checkout',
    tagline: 'Prebuilt hosted conversion engine',
    description: 'A prebuilt payment page that adapts to your customer’s device, language, and preferred payment method automatically.',
    category: 'payments',
    icon: 'ShoppingCart',
    badge: '+10.5% Conversion',
    features: ['Responsive mobile checkout', 'Apple Pay & Google Pay ready', 'Automated tax calculation', 'Custom domain branding'],
    docLink: '#developer'
  },
  {
    id: 'billing',
    name: 'Billing & Subscriptions',
    tagline: 'Recurring revenue automation at enterprise scale',
    description: 'Manage flat rate, per-seat, usage-based, and hybrid subscription models without writing complex billing engines.',
    category: 'operations',
    icon: 'Repeat',
    badge: 'Smart Retries',
    features: ['Machine learning Smart Retries', 'Customer self-serve portal', 'Automated proration & upgrades', 'Multi-currency invoicing'],
    docLink: '#developer'
  },
  {
    id: 'connect',
    name: 'Stripe Connect',
    tagline: 'Payments for platforms and multi-sided marketplaces',
    description: 'Onboard sellers, facilitate split payments, hold funds in escrow, and disburse global payouts to bank accounts and debit cards.',
    category: 'embedded',
    icon: 'Network',
    badge: 'Marketplaces',
    features: ['Instant seller onboarding', 'Custom fee splits & commissions', 'Local payouts in 45+ countries', '1099 tax reporting automation'],
    docLink: '#developer'
  },
  {
    id: 'issuing',
    name: 'Stripe Issuing',
    tagline: 'Programmatic card creation and expense controls',
    description: 'Create, distribute, and control physical and virtual debit cards for your employees, contractors, or platform users instantly.',
    category: 'embedded',
    icon: 'Wallet',
    badge: 'Real-time Auth',
    features: ['Real-time spend limits & controls', 'Instant virtual card generation', 'Custom branded card plastics', 'Apple Wallet provisioning'],
    docLink: '#developer'
  },
  {
    id: 'radar',
    name: 'Stripe Radar',
    tagline: 'AI-driven fraud prevention trained on billions',
    description: 'Radar machine learning models evaluate risk scores in milliseconds using transaction signals across the global Stripe network.',
    category: 'operations',
    icon: 'ShieldAlert',
    badge: 'Adaptive ML',
    features: ['Trained on hundreds of billions of dollars', 'Custom rule builder with blocklists', 'Chargeback protection guarantee', 'Early dispute alerts'],
    docLink: '#developer'
  },
  {
    id: 'tax',
    name: 'Stripe Tax',
    tagline: 'Automated global sales tax, VAT, and GST',
    description: 'Eliminate the friction of tax compliance. Stripe Tax calculates and collects the right tax rates automatically in 50+ countries.',
    category: 'operations',
    icon: 'Percent',
    badge: 'Automated',
    features: ['Automatic tax registration tracking', 'Location-based tax calculation', 'Filing-ready summary reports', 'Digital goods and physical tax rules'],
    docLink: '#developer'
  },
  {
    id: 'terminal',
    name: 'Stripe Terminal',
    tagline: 'In-person point of sale unified with online',
    description: 'Bring your online Stripe integration to the real world with pre-certified card readers, fleet management, and unified reporting.',
    category: 'payments',
    icon: 'Smartphone',
    badge: 'Omnichannel',
    features: ['Pre-certified smart readers', 'Tap to Pay on iPhone & Android', 'Unified customer profiles', 'Cloud-based terminal SDK'],
    docLink: '#developer'
  },
  {
    id: 'treasury',
    name: 'Stripe Treasury',
    tagline: 'Embedded banking infrastructure for SaaS',
    description: 'Embed financial accounts directly into your SaaS platform. Allow users to hold funds, earn yields, pay bills, and manage cash flow.',
    category: 'embedded',
    icon: 'Landmark',
    badge: 'FDIC Insured',
    features: ['Virtual accounts with ACH routing', 'Eligible for pass-through FDIC insurance', 'Direct wires and ACH payouts', 'Developer-friendly balance ledger'],
    docLink: '#developer'
  },
  {
    id: 'upi-rupay',
    name: 'UPI & RuPay Acceptance',
    tagline: 'Native Unified Payments Interface for India',
    description: 'Accept instant payments from 350M+ Indian customers via Google Pay, PhonePe, Paytm, BHIM, and domestic RuPay cards with zero-redirect in-app flows.',
    category: 'payments',
    icon: 'Smartphone',
    badge: 'India Native',
    features: ['Instant QR and VPA collect', 'Direct bank-to-bank settlement', 'RuPay debit & credit cards', 'Sub-15ms local NPCI switch latency'],
    docLink: '#developer'
  },
  {
    id: 'export-compliance',
    name: 'Export Compliance & FIRS',
    tagline: 'Automated inward remittances for Indian businesses',
    description: 'Export software, SaaS, and physical goods globally from India with automated Foreign Inward Remittance Statements (FIRS) and compliant RBI purpose code tagging.',
    category: 'operations',
    icon: 'Percent',
    badge: 'RBI Compliant',
    features: ['Automated digital FIRS generation', 'Direct settlement in INR', '135+ global foreign currencies', 'Customs export documentation'],
    docLink: '#developer'
  }
];

export const CODE_SNIPPETS: CodeSnippet[] = [
  {
    language: 'node',
    label: 'Node.js',
    filename: 'server.js',
    code: `const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create a PaymentIntent with UPI, Card, and Netbanking support
const paymentIntent = await stripe.paymentIntents.create({
  amount: 249900, // ₹2,499.00 in paise
  currency: 'inr',
  payment_method_types: ['card', 'upi', 'netbanking'],
  description: 'Pro Plan Subscription (India & Global)',
  metadata: {
    order_id: 'ord_in_987654321',
    customer_country: 'IN',
  },
});

console.log('Client secret generated:', paymentIntent.client_secret);`
  },
  {
    language: 'python',
    label: 'Python',
    filename: 'app.py',
    code: `import os
import stripe

stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")

# Create a PaymentIntent with Indian Rupees and UPI support
intent = stripe.PaymentIntent.create(
    amount=249900, # ₹2,499.00 in paise
    currency="inr",
    payment_method_types=["card", "upi", "netbanking"],
    metadata={"order_id": "ord_in_987654321", "country": "IN"},
)

print(f"Payment intent ready: {intent.id}")`
  },
  {
    language: 'ruby',
    label: 'Ruby',
    filename: 'charge.rb',
    code: `require 'stripe'
Stripe.api_key = ENV['STRIPE_SECRET_KEY']

intent = Stripe::PaymentIntent.create({
  amount: 249900, # ₹2,499.00
  currency: 'inr',
  payment_method_types: ['card', 'upi', 'netbanking'],
  metadata: { order_id: 'ord_in_987654321' }
})

puts "Created intent: #{intent.id}"`
  },
  {
    language: 'go',
    label: 'Go',
    filename: 'main.go',
    code: `package main

import (
	"fmt"
	"os"
	"github.com/stripe/stripe-go/v78"
	"github.com/stripe/stripe-go/v78/paymentintent"
)

func main() {
	stripe.Key = os.Getenv("STRIPE_SECRET_KEY")

	params := &stripe.PaymentIntentParams{
		Amount:   stripe.Int64(249900),
		Currency: stripe.String("inr"),
		PaymentMethodTypes: stripe.StringSlice([]string{
			"card", "upi", "netbanking",
		}),
	}
	pi, _ := paymentintent.New(params)
	fmt.Printf("Intent client secret: %s\\n", pi.ClientSecret)
}`
  },
  {
    language: 'curl',
    label: 'cURL',
    filename: 'terminal.sh',
    code: `curl https://api.stripe.com/v1/payment_intents \\
  -u sk_test_51...: \\
  -d amount=249900 \\
  -d currency=inr \\
  -d "payment_method_types[]=card" \\
  -d "payment_method_types[]=upi" \\
  -d "payment_method_types[]=netbanking" \\
  -d "metadata[order_id]"=ord_in_987654321`
  }
];

export const CUSTOMER_LOGOS = [
  { name: 'Urban Company', ticker: 'URBN', category: 'Home Services Unicorn' },
  { name: 'CRED', ticker: 'CRED', category: 'Fintech & Rewards' },
  { name: 'Postman', ticker: 'POST', category: 'API Platform' },
  { name: 'Swiggy', ticker: 'SWIG', category: 'On-Demand Delivery' },
  { name: 'Zomato', ticker: 'ZOMATO', category: 'Food Tech' },
  { name: 'OpenAI', ticker: 'AI', category: 'Frontier AI' },
  { name: 'Amazon', ticker: 'AMZN', category: 'Global E-commerce' },
  { name: 'Shopify', ticker: 'SHOP', category: 'Commerce Engine' },
  { name: 'BrowserStack', ticker: 'BSTACK', category: 'Developer Cloud' },
  { name: 'Google', ticker: 'GOOGL', category: 'Global Tech' }
];

export const CUSTOMER_STORIES: CustomerStory[] = [
  {
    id: 'story-postman',
    company: 'Postman',
    logo: 'Postman',
    quote: 'Stripe’s global infrastructure and India export compliance allowed Postman to bill developers in 130+ countries from Bengaluru without maintaining multi-region billing silos.',
    author: 'Abhinav Asthana',
    role: 'Co-founder & Chief Executive Officer',
    metric: '30M+',
    metricLabel: 'Global developers monetized seamlessly',
    highlightColor: '#ff6c37'
  },
  {
    id: 'story-urban-company',
    company: 'Urban Company',
    logo: 'Urban Company',
    quote: 'Processing instant UPI and card authorizations with Stripe’s high-availability network gives our service professionals and customers in India an effortless experience.',
    author: 'Raghav Chandra',
    role: 'Co-founder & Chief Technology Officer',
    metric: '99.98%',
    metricLabel: 'UPI & Domestic Authorization Success',
    highlightColor: '#635bff'
  },
  {
    id: 'story-amazon',
    company: 'Amazon',
    logo: 'Amazon',
    quote: 'Stripe is an integral technology partner helping Amazon process payments securely across multiple global geographies and Prime delivery services.',
    author: 'Dilip Kumar',
    role: 'Vice President, Payment Products',
    metric: '99.999%',
    metricLabel: 'Historical peak holiday uptime',
    highlightColor: '#ff9900'
  },
  {
    id: 'story-openai',
    company: 'OpenAI',
    logo: 'OpenAI',
    quote: 'Stripe helped OpenAI scale subscription billing for ChatGPT Plus and developer API usage seamlessly as demand surged by orders of magnitude in weeks.',
    author: 'Brad Lightcap',
    role: 'Chief Operating Officer',
    metric: '100M+',
    metricLabel: 'Subscribers and API developers served',
    highlightColor: '#10a37f'
  }
];

export const GLOBAL_STATS: GlobalStat[] = [
  {
    id: 'stat-requests',
    number: '500M+',
    label: 'API requests per day',
    sublabel: 'Handling peak spikes during global retail events with sub-second latency'
  },
  {
    id: 'stat-uptime',
    number: '99.999%',
    label: 'Historical uptime',
    sublabel: 'Decentralized cloud infrastructure resilient to cloud provider disruptions'
  },
  {
    id: 'stat-countries',
    number: '135+',
    label: 'Currencies and payment methods',
    sublabel: 'Enable customers around the world to pay how they prefer'
  },
  {
    id: 'stat-businesses',
    number: 'Millions',
    label: 'Of businesses worldwide',
    sublabel: 'From ambitious garage startups to the Fortune 500'
  }
];
