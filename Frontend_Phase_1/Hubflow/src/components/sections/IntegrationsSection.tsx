import React, { useState, useMemo } from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { INTEGRATIONS_LIST } from '../../data/mockData';
import { IntegrationCategory, IntegrationItem } from '../../types';
import {
  Search,
  Zap,
  Lock,
  ArrowUpRight,
  Sparkles,
  Bot,
  Users,
  Cloud,
  MessageSquare,
  Disc,
  GitBranch,
  CheckSquare,
  CreditCard,
  ShoppingBag,
  Database,
  Server,
  FileText,
  Table,
  Headphones,
  BellRing,
  Plus,
} from 'lucide-react';

interface IntegrationsSectionProps {
  onOpenDemo: () => void;
}

export const IntegrationsSection: React.FC<IntegrationsSectionProps> = ({
  onOpenDemo,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<IntegrationCategory>('all');
  const [activeIntegration, setActiveIntegration] = useState<IntegrationItem | null>(
    null
  );

  const categories: { label: string; value: IntegrationCategory }[] = [
    { label: 'All Connectors', value: 'all' },
    { label: 'AI & LLMs', value: 'ai' },
    { label: 'CRMs', value: 'crm' },
    { label: 'Communication', value: 'communication' },
    { label: 'Developer Tools', value: 'devtools' },
    { label: 'Databases', value: 'database' },
    { label: 'E-Commerce & Payments', value: 'ecommerce' },
  ];

  const filteredIntegrations = useMemo(() => {
    return INTEGRATIONS_LIST.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.popularRecipes.some((r) =>
          r.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getIntegrationIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-indigo-400" />;
      case 'Bot':
        return <Bot className="w-5 h-5 text-violet-400" />;
      case 'Users':
        return <Users className="w-5 h-5 text-orange-400" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-blue-400" />;
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5 text-emerald-400" />;
      case 'Disc':
        return <Disc className="w-5 h-5 text-indigo-300" />;
      case 'GitBranch':
        return <GitBranch className="w-5 h-5 text-slate-200" />;
      case 'CheckSquare':
        return <CheckSquare className="w-5 h-5 text-purple-400" />;
      case 'CreditCard':
        return <CreditCard className="w-5 h-5 text-cyan-400" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-5 h-5 text-emerald-300" />;
      case 'Database':
        return <Database className="w-5 h-5 text-sky-400" />;
      case 'Server':
        return <Server className="w-5 h-5 text-teal-400" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-slate-300" />;
      case 'Table':
        return <Table className="w-5 h-5 text-amber-400" />;
      case 'Headphones':
        return <Headphones className="w-5 h-5 text-rose-400" />;
      case 'BellRing':
        return <BellRing className="w-5 h-5 text-red-400" />;
      default:
        return <Zap className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <section id="integrations" className="py-20 md:py-28 relative scroll-mt-20 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 mb-4">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            <span>ECOSYSTEM DIRECTORY • 50+ PRODUCTION CONNECTORS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-1">
            Connect Your Stack in Minutes, Not Weeks
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-4 leading-relaxed">
            Enterprise integrations with bidirectional sync, sub-20ms webhook delivery,
            schema auto-discovery, and hardware-backed OAuth2 key vaults.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Search box */}
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="integration-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 50+ connectors, triggers, and actions..."
              className="w-full rounded-xl bg-slate-900/90 border border-slate-800 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Categories Pill Navigation */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.value}
                id={`category-pill-${cat.value}`}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
                  selectedCategory === cat.value
                    ? 'bg-orange-600 text-white border-orange-500 shadow-sm shadow-orange-600/30'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredIntegrations.map((item) => (
            <div
              key={item.id}
              id={`integration-card-${item.id}`}
              onClick={() => setActiveIntegration(item)}
              className="group p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/90 transition-all duration-200 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getIntegrationIcon(item.iconName)}
                  </div>
                  <Badge variant="slate" size="sm">
                    {item.latencyMs}ms avg
                  </Badge>
                </div>

                <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center justify-between">
                  <span>{item.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </h4>
                <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3 text-slate-400" />
                  {item.authType}
                </span>
                <span className="font-mono text-slate-400">
                  {item.activePipelines} flows
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredIntegrations.length === 0 && (
          <div className="text-center py-16 p-8 rounded-2xl bg-slate-900/40 border border-slate-800">
            <Search className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h4 className="text-base font-semibold text-white">
              No connectors found matching "{searchQuery}"
            </h4>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Looking for a specialized internal tool or proprietary database?
              Hubflow supports custom connectors via our open Node SDK.
            </p>
            <div className="mt-5">
              <Button
                id="request-connector-btn"
                variant="primary"
                size="sm"
                onClick={onOpenDemo}
                leftIcon={<Plus className="w-3.5 h-3.5" />}
              >
                Request Custom Connector
              </Button>
            </div>
          </div>
        )}

        {/* Custom Connector Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-white">
              Don't see your internal ERP or custom microservice?
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Build custom private nodes in under 20 minutes with our TypeScript Node SDK, or let our Solutions team write it.
            </p>
          </div>
          <Button
            id="explore-custom-sdk-btn"
            variant="outline"
            size="sm"
            onClick={onOpenDemo}
          >
            Explore Node SDK
          </Button>
        </div>
      </div>

      {/* Integration Detail Modal */}
      {activeIntegration && (
        <Modal
          id="integration-detail-modal"
          isOpen={!!activeIntegration}
          onClose={() => setActiveIntegration(null)}
          title={`${activeIntegration.name} Integration`}
          description={activeIntegration.description}
          maxWidth="md"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Authentication</span>
                <p className="font-semibold text-white mt-1">
                  {activeIntegration.authType}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400">P95 Latency</span>
                <p className="font-semibold text-emerald-400 mt-1 font-mono">
                  {activeIntegration.latencyMs} ms
                </p>
              </div>
            </div>

            <div>
              <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Popular Pre-Built Recipes
              </h5>
              <div className="space-y-2">
                {activeIntegration.popularRecipes.map((recipe, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 flex items-center justify-between"
                  >
                    <span>{recipe}</span>
                    <span className="text-[11px] text-indigo-400 font-mono">
                      1-click install
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 flex gap-2">
              <Button
                id="modal-use-integration-btn"
                variant="primary"
                size="sm"
                className="w-full"
                onClick={() => {
                  setActiveIntegration(null);
                  onOpenDemo();
                }}
              >
                Launch in Studio
              </Button>
              <Button
                id="modal-close-integration-btn"
                variant="secondary"
                size="sm"
                onClick={() => setActiveIntegration(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
