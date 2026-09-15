import React, { useState } from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { TEMPLATES_LIST } from '../../data/mockData';
import { TemplateItem } from '../../types';
import { Sparkles, Star, Clock, ArrowRight, Play, Check } from 'lucide-react';

interface TemplatesSectionProps {
  onOpenDemo: () => void;
}

export const TemplatesSection: React.FC<TemplatesSectionProps> = ({
  onOpenDemo,
}) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Sales & Marketing',
    'Support Ops',
    'Engineering',
    'Finance & Retention',
    'Operations',
  ];

  const filtered =
    activeCategory === 'All'
      ? TEMPLATES_LIST
      : TEMPLATES_LIST.filter(
          (t) => t.category.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <section id="templates" className="py-20 md:py-28 relative scroll-mt-20 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 mb-4">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            <span>PRODUCTION BLUEPRINTS • VERSION CONTROLLED</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-1">
            Deploy Pipelines from Battle-Tested Architecture Blueprints
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-4 leading-relaxed">
            Skip writing boilerplate webhook listeners and JSON mappings. Clone
            production-ready pipelines tested on millions of real-world executions.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
                activeCategory === cat
                  ? 'bg-orange-600 text-white border-orange-500 shadow-sm shadow-orange-600/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((template) => (
            <div
              key={template.id}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/90 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge variant="indigo" size="sm">
                    {template.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{template.rating}</span>
                  </div>
                </div>

                <h4 className="text-base font-bold text-white leading-snug">
                  {template.title}
                </h4>
                <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {template.description}
                </p>

                {/* Connected Apps */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {template.apps.map((app) => (
                    <span
                      key={app}
                      className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-300 font-medium"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom metadata and action */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {template.setupTime}
                  </span>
                  <span>•</span>
                  <span>{template.runsPerMonth}</span>
                </div>

                <Button
                  id={`use-template-${template.id}`}
                  variant="outline"
                  size="sm"
                  onClick={onOpenDemo}
                  rightIcon={<ArrowRight className="w-3 h-3" />}
                >
                  Deploy
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
