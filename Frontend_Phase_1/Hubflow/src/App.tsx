/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SystemStatusModal } from './components/layout/SystemStatusModal';
import { DemoModal } from './components/sections/DemoModal';
import { HeroSection } from './components/sections/HeroSection';
import { WorkflowSimulatorSection } from './components/sections/WorkflowSimulatorSection';
import { FeaturesBentoSection } from './components/sections/FeaturesBentoSection';
import { IntegrationsSection } from './components/sections/IntegrationsSection';
import { RoiCalculatorSection } from './components/sections/RoiCalculatorSection';
import { TemplatesSection } from './components/sections/TemplatesSection';
import { PricingSection } from './components/sections/PricingSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { FaqSection } from './components/sections/FaqSection';
import { CtaSection } from './components/sections/CtaSection';

export default function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  const scrollToStudio = () => {
    const el = document.getElementById('studio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
        {/* Sticky Global Navigation */}
        <Navbar
          onOpenDemo={() => setIsDemoModalOpen(true)}
          onOpenStatus={() => setIsStatusModalOpen(true)}
        />

        {/* Main Content Sections */}
        <main className="flex-grow">
          <HeroSection
            onOpenDemo={() => setIsDemoModalOpen(true)}
            onScrollToStudio={scrollToStudio}
          />

          <WorkflowSimulatorSection />

          <FeaturesBentoSection />

          <IntegrationsSection
            onOpenDemo={() => setIsDemoModalOpen(true)}
          />

          <RoiCalculatorSection
            onOpenDemo={() => setIsDemoModalOpen(true)}
          />

          <TemplatesSection
            onOpenDemo={() => setIsDemoModalOpen(true)}
          />

          <PricingSection
            onOpenDemo={() => setIsDemoModalOpen(true)}
          />

          <TestimonialsSection />

          <FaqSection />

          <CtaSection
            onOpenDemo={() => setIsDemoModalOpen(true)}
            onScrollToStudio={scrollToStudio}
          />
        </main>

        {/* Global Footer */}
        <Footer
          onOpenDemo={() => setIsDemoModalOpen(true)}
          onOpenStatus={() => setIsStatusModalOpen(true)}
        />

        {/* Interactive Modals */}
        <DemoModal
          isOpen={isDemoModalOpen}
          onClose={() => setIsDemoModalOpen(false)}
        />

        <SystemStatusModal
          isOpen={isStatusModalOpen}
          onClose={() => setIsStatusModalOpen(false)}
        />
      </div>
    </ToastProvider>
  );
}
