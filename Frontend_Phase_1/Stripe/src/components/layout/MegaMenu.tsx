import React from 'react';
import { 
  CreditCard, 
  ShoppingCart, 
  Layout, 
  Link as LinkIcon, 
  Repeat, 
  FileText, 
  Percent, 
  ShieldAlert, 
  Network, 
  Wallet, 
  Landmark, 
  Leaf,
  Rocket,
  Building2,
  ShoppingBag,
  Layers,
  GitFork,
  Sparkles,
  BookOpen,
  Terminal,
  Clock,
  Code2,
  Cpu,
  FolderGit2,
  Users,
  MailOpen,
  Newspaper,
  HelpCircle,
  Activity,
  PhoneCall,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { NAV_DATA } from '../../data/stripeData';
import { Badge } from '../common/Badge';

// Map icon string to Lucide component
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  CreditCard,
  ShoppingCart,
  Layout,
  Link: LinkIcon,
  Repeat,
  FileText,
  Percent,
  ShieldAlert,
  Network,
  Wallet,
  Landmark,
  Leaf,
  Rocket,
  Building2,
  ShoppingBag,
  Layers,
  GitFork,
  Sparkles,
  BookOpen,
  Terminal,
  Clock,
  Code2,
  Cpu,
  FolderGit2,
  Users,
  MailOpen,
  Newspaper,
  HelpCircle,
  Activity,
  PhoneCall
};

interface MegaMenuProps {
  activeMenu: 'products' | 'solutions' | 'developers' | 'resources' | null;
  onClose: () => void;
  onOpenCheckoutDemo: () => void;
  onOpenApiConsole: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({
  activeMenu,
  onClose,
  onOpenCheckoutDemo,
  onOpenApiConsole
}) => {
  if (!activeMenu) return null;

  const renderIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName] || CreditCard;
    return <IconComponent className="w-5 h-5 text-[#635bff] group-hover:text-[#0a2540] transition-colors shrink-0" />;
  };

  return (
    <div 
      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 w-full max-w-4xl px-4 animate-in fade-in slide-in-from-top-2 duration-200"
      onMouseLeave={onClose}
    >
      <div className="bg-white/98 backdrop-blur-2xl rounded-3xl border border-slate-200/80 shadow-[0_30px_70px_rgba(10,37,64,0.18)] p-6 md:p-8 text-[#0a2540]">
        {activeMenu === 'products' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Column 1: Global Payments */}
              <div>
                <div className="text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-4">
                  Global Payments
                </div>
                <div className="space-y-3.5">
                  {NAV_DATA.products.payments.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      onClick={(e) => {
                        if (item.title === 'Checkout') {
                          e.preventDefault();
                          onOpenCheckoutDemo();
                          onClose();
                        }
                      }}
                      className="group flex items-start gap-3 p-2 -mx-2 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="mt-0.5 p-1.5 rounded-lg bg-slate-100 group-hover:bg-[#635bff]/10 transition-colors">
                        {renderIcon(item.icon)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#0a2540] group-hover:text-[#635bff] transition-colors flex items-center gap-1.5">
                          {item.title}
                          {item.badge && (
                            <Badge variant="indigo" size="sm">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 leading-snug mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Column 2: Revenue & Operations */}
              <div>
                <div className="text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-4">
                  Revenue & Operations
                </div>
                <div className="space-y-3.5">
                  {NAV_DATA.products.operations.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      className="group flex items-start gap-3 p-2 -mx-2 rounded-xl hover:bg-slate-50 transition-colors"
                      onClick={onClose}
                    >
                      <div className="mt-0.5 p-1.5 rounded-lg bg-slate-100 group-hover:bg-[#635bff]/10 transition-colors">
                        {renderIcon(item.icon)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#0a2540] group-hover:text-[#635bff] transition-colors flex items-center gap-1.5">
                          {item.title}
                          {item.badge && (
                            <Badge variant={item.badge === 'AI Powered' ? 'emerald' : 'slate'} size="sm">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 leading-snug mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Column 3: Embedded Finance */}
              <div>
                <div className="text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-4">
                  Embedded Finance
                </div>
                <div className="space-y-3.5">
                  {NAV_DATA.products.embedded.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      className="group flex items-start gap-3 p-2 -mx-2 rounded-xl hover:bg-slate-50 transition-colors"
                      onClick={onClose}
                    >
                      <div className="mt-0.5 p-1.5 rounded-lg bg-slate-100 group-hover:bg-[#635bff]/10 transition-colors">
                        {renderIcon(item.icon)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#0a2540] group-hover:text-[#635bff] transition-colors flex items-center gap-1.5">
                          {item.title}
                          {item.badge && (
                            <Badge variant="amber" size="sm">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 leading-snug mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-slate-600">
              <span className="text-slate-400">Want to test payments without writing code?</span>
              <button
                onClick={() => {
                  onOpenCheckoutDemo();
                  onClose();
                }}
                className="text-[#635bff] hover:text-[#0a2540] flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Launch Interactive Checkout Simulator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {activeMenu === 'solutions' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-4">
                By Business Model
              </div>
              <div className="space-y-3.5">
                {NAV_DATA.solutions.byModel.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="group flex items-start gap-3 p-2 -mx-2 rounded-xl hover:bg-slate-50 transition-colors"
                    onClick={onClose}
                  >
                    <div className="mt-0.5 p-1.5 rounded-lg bg-slate-100 group-hover:bg-[#635bff]/10 transition-colors">
                      {renderIcon(item.icon)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#0a2540] group-hover:text-[#635bff] transition-colors">
                        {item.title}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-4">
                By Company Stage
              </div>
              <div className="space-y-3.5">
                {NAV_DATA.solutions.byStage.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="group flex items-start gap-3 p-2 -mx-2 rounded-xl hover:bg-slate-50 transition-colors"
                    onClick={onClose}
                  >
                    <div className="mt-0.5 p-1.5 rounded-lg bg-slate-100 group-hover:bg-[#635bff]/10 transition-colors">
                      {renderIcon(item.icon)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#0a2540] group-hover:text-[#635bff] transition-colors flex items-center gap-1.5">
                        {item.title}
                        {item.badge && <Badge variant="slate">{item.badge}</Badge>}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Highlight card */}
              <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-[#635bff]/10 to-[#00d4ff]/10 border border-[#635bff]/20">
                <h5 className="text-xs font-bold text-[#0a2540]">Startups build faster on Stripe</h5>
                <p className="text-xs text-slate-600 mt-1">
                  Incorporate with Atlas, accept cards in minutes, and get discounts on AWS and Google Cloud.
                </p>
                <a href="#solutions" onClick={onClose} className="mt-2 text-xs font-bold text-[#635bff] inline-flex items-center gap-1">
                  Explore Startup Program <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

        {activeMenu === 'developers' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-4">
                  Documentation & References
                </div>
                <div className="space-y-3.5">
                  {NAV_DATA.developers.resources.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      className="group flex items-start gap-3 p-2 -mx-2 rounded-xl hover:bg-slate-50 transition-colors"
                      onClick={(e) => {
                        if (item.title === 'API Reference') {
                          e.preventDefault();
                          onOpenApiConsole();
                          onClose();
                        } else {
                          onClose();
                        }
                      }}
                    >
                      <div className="mt-0.5 p-1.5 rounded-lg bg-slate-100 group-hover:bg-[#635bff]/10 transition-colors">
                        {renderIcon(item.icon)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#0a2540] group-hover:text-[#635bff] transition-colors flex items-center gap-1.5">
                          {item.title}
                          {item.badge && <Badge variant="indigo">{item.badge}</Badge>}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-4">
                  SDKs & Developer Tools
                </div>
                <div className="space-y-3.5">
                  {NAV_DATA.developers.sdks.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      className="group flex items-start gap-3 p-2 -mx-2 rounded-xl hover:bg-slate-50 transition-colors"
                      onClick={onClose}
                    >
                      <div className="mt-0.5 p-1.5 rounded-lg bg-slate-100 group-hover:bg-[#635bff]/10 transition-colors">
                        {renderIcon(item.icon)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#0a2540] group-hover:text-[#635bff] transition-colors">
                          {item.title}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Developer interactive bar */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>API Status: 100% Operational (99.999% uptime)</span>
              </div>
              <button
                onClick={() => {
                  onOpenApiConsole();
                  onClose();
                }}
                className="text-xs font-bold text-[#635bff] hover:text-[#0a2540] flex items-center gap-1 cursor-pointer"
              >
                <span>Launch Mock REST API Console</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {activeMenu === 'resources' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-4">
                Company & Ecosystem
              </div>
              <div className="space-y-3.5">
                {NAV_DATA.resources.company.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="group flex items-start gap-3 p-2 -mx-2 rounded-xl hover:bg-slate-50 transition-colors"
                    onClick={onClose}
                  >
                    <div className="mt-0.5 p-1.5 rounded-lg bg-slate-100 group-hover:bg-[#635bff]/10 transition-colors">
                      {renderIcon(item.icon)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#0a2540] group-hover:text-[#635bff] transition-colors">
                        {item.title}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-4">
                Support & Verification
              </div>
              <div className="space-y-3.5">
                {NAV_DATA.resources.support.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="group flex items-start gap-3 p-2 -mx-2 rounded-xl hover:bg-slate-50 transition-colors"
                    onClick={onClose}
                  >
                    <div className="mt-0.5 p-1.5 rounded-lg bg-slate-100 group-hover:bg-[#635bff]/10 transition-colors">
                      {renderIcon(item.icon)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#0a2540] group-hover:text-[#635bff] transition-colors flex items-center gap-1.5">
                        {item.title}
                        {item.badge && (
                          <Badge variant="emerald" size="sm" pulse>
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
