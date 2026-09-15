import React, { useState } from 'react';
import { 
  CreditCard, 
  ShoppingCart, 
  Repeat, 
  Network, 
  Wallet, 
  ShieldAlert, 
  Percent, 
  Smartphone, 
  Landmark, 
  ArrowRight, 
  Check,
  Sparkles
} from 'lucide-react';
import { PRODUCTS_CATALOG } from '../../data/stripeData';
import { ProductItem } from '../../types';
import { Badge } from '../common/Badge';

const iconComponents: Record<string, React.FC<{ className?: string }>> = {
  CreditCard,
  ShoppingCart,
  Repeat,
  Network,
  Wallet,
  ShieldAlert,
  Percent,
  Smartphone,
  Landmark
};

interface ProductSuiteProps {
  onOpenCheckoutDemo: () => void;
  onSelectProduct: (product: ProductItem) => void;
}

export const ProductSuite: React.FC<ProductSuiteProps> = ({
  onOpenCheckoutDemo,
  onSelectProduct
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'payments' | 'operations' | 'embedded'>('all');

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS_CATALOG
    : PRODUCTS_CATALOG.filter(p => p.category === selectedCategory);

  return (
    <section id="products" className="py-20 md:py-28 bg-[#f6f9fc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#635bff] mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Unified Platform</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a2540] tracking-tight leading-tight">
            A fully integrated suite of financial and payments products
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Reduce developer overhead and consolidate fragmented vendors. Everything in Stripe connects into a single unified ledger.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#0a2540] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
            }`}
          >
            All Products ({PRODUCTS_CATALOG.length})
          </button>
          <button
            onClick={() => setSelectedCategory('payments')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              selectedCategory === 'payments'
                ? 'bg-[#635bff] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
            }`}
          >
            Global Payments
          </button>
          <button
            onClick={() => setSelectedCategory('operations')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              selectedCategory === 'operations'
                ? 'bg-[#635bff] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
            }`}
          >
            Revenue & Operations
          </button>
          <button
            onClick={() => setSelectedCategory('embedded')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              selectedCategory === 'embedded'
                ? 'bg-[#635bff] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
            }`}
          >
            Embedded Finance
          </button>
        </div>

        {/* Product Bento Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredProducts.map((product) => {
            const Icon = iconComponents[product.icon] || CreditCard;

            return (
              <div
                key={product.id}
                className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar inside Card */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#635bff]/10 group-hover:bg-[#635bff] flex items-center justify-center text-[#635bff] group-hover:text-white transition-colors duration-200 shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    {product.badge && (
                      <Badge 
                        variant={product.badge.includes('AI') ? 'emerald' : product.badge.includes('+10') ? 'amber' : 'indigo'}
                      >
                        {product.badge}
                      </Badge>
                    )}
                  </div>

                  {/* Product Title & Tagline */}
                  <h3 className="text-xl font-bold text-[#0a2540] group-hover:text-[#635bff] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 mt-0.5">
                    {product.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="mt-5 space-y-2 pt-4 border-t border-slate-100">
                    {product.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                        <Check className="w-3.5 h-3.5 text-[#635bff] shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  {product.id === 'checkout' ? (
                    <button
                      onClick={onOpenCheckoutDemo}
                      className="text-xs font-bold text-[#635bff] hover:text-[#0a2540] flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Try Interactive Demo</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="text-xs font-bold text-[#635bff] hover:text-[#0a2540] flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>View Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}

                  <span className="text-[11px] font-mono text-slate-400 capitalize">
                    {product.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
