import React from 'react';
import { Check, ExternalLink, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { Modal } from '../common/Modal';
import { ProductItem } from '../../types';
import { Badge } from '../common/Badge';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onOpenCheckoutDemo: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenCheckoutDemo
}) => {
  if (!product) return null;

  return (
    <Modal
      isOpen={!!product}
      onClose={onClose}
      title={product.name}
      subtitle={product.tagline}
      maxWidth="xl"
    >
      <div className="space-y-6">
        <p className="text-sm text-slate-600 leading-relaxed">
          {product.description}
        </p>

        {/* Feature Highlights */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Core Capabilities & Security
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {product.features.map((feat) => (
              <div key={feat} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-[#0a2540]">
                <Check className="w-4 h-4 text-[#635bff] shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Architecture Specs */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">Compliance & Standards:</span>
            <span className="font-semibold text-[#0a2540]">PCI-DSS Level 1, SOC 1 & 2</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">Global Network Availability:</span>
            <span className="font-semibold text-emerald-600">99.999% SLA Uptime</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">API Integration Mode:</span>
            <span className="font-semibold text-[#635bff]">Stripe.js & Server SDKs</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            onClick={() => {
              onClose();
              onOpenCheckoutDemo();
            }}
            className="px-4 py-2 bg-[#635bff] hover:bg-[#0a2540] text-white rounded-full text-xs font-bold transition-colors cursor-pointer"
          >
            Launch Interactive Demo
          </button>
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
