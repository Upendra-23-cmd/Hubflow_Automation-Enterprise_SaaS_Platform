import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/hero/Hero';
import { CustomerLogos } from './components/customers/CustomerLogos';
import { ProductSuite } from './components/products/ProductSuite';
import { DeveloperSection } from './components/developer/DeveloperSection';
import { GlobalScaleSection } from './components/global/GlobalScaleSection';
import { PricingCalculator } from './components/pricing/PricingCalculator';
import { Footer } from './components/layout/Footer';
import { CheckoutSimulatorModal } from './components/simulator/CheckoutSimulatorModal';
import { ApiConsoleModal } from './components/api-explorer/ApiConsoleModal';
import { ProductDetailModal } from './components/products/ProductDetailModal';
import { ProductItem, RegionMode } from './types';

export default function App() {
  const [region, setRegion] = useState<RegionMode>('in');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isApiConsoleOpen, setIsApiConsoleOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  return (
    <div className="min-h-screen bg-[#f6f9fc] text-[#0a2540] flex flex-col relative font-sans selection:bg-[#635bff] selection:text-white">
      {/* Top Navigation */}
      <Navbar
        onOpenCheckoutDemo={() => setIsCheckoutModalOpen(true)}
        onOpenApiConsole={() => setIsApiConsoleOpen(true)}
        region={region}
        onToggleRegion={(reg) => setRegion(reg)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero with dynamic gradient mesh & live payment card */}
        <Hero
          onOpenCheckoutDemo={() => setIsCheckoutModalOpen(true)}
          onOpenApiConsole={() => setIsApiConsoleOpen(true)}
          region={region}
          onToggleRegion={(reg) => setRegion(reg)}
        />

        {/* Customer Logo Cloud & Case Study Spotlight */}
        <CustomerLogos />

        {/* Product Suite Bento Grid with Category Filter */}
        <ProductSuite
          onOpenCheckoutDemo={() => setIsCheckoutModalOpen(true)}
          onSelectProduct={(product) => setSelectedProduct(product)}
        />

        {/* Developer First Section with Multi-Language Code Runner */}
        <DeveloperSection
          onOpenApiConsole={() => setIsApiConsoleOpen(true)}
        />

        {/* Global Scale Infrastructure & Live Telemetry */}
        <GlobalScaleSection />

        {/* Pricing & Interactive Fee Calculator */}
        <PricingCalculator
          onOpenCheckoutDemo={() => setIsCheckoutModalOpen(true)}
          region={region}
          onToggleRegion={(reg) => setRegion(reg)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenApiConsole={() => setIsApiConsoleOpen(true)}
        onOpenCheckoutDemo={() => setIsCheckoutModalOpen(true)}
        region={region}
        onToggleRegion={(reg) => setRegion(reg)}
      />

      {/* Interactive Modals */}
      <CheckoutSimulatorModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        region={region}
      />

      <ApiConsoleModal
        isOpen={isApiConsoleOpen}
        onClose={() => setIsApiConsoleOpen(false)}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenCheckoutDemo={() => {
          setSelectedProduct(null);
          setIsCheckoutModalOpen(true);
        }}
      />
    </div>
  );
}
