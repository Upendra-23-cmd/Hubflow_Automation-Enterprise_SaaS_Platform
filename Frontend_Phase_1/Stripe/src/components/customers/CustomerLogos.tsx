import React, { useState } from 'react';
import { CUSTOMER_LOGOS, CUSTOMER_STORIES } from '../../data/stripeData';
import { ArrowRight, Quote } from 'lucide-react';

export const CustomerLogos: React.FC = () => {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const activeStory = CUSTOMER_STORIES[activeStoryIdx];

  return (
    <section id="customers" className="py-16 md:py-20 bg-white border-y border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subtle Section Header */}
        <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-8">
          Powering commerce for the most innovative internet companies
        </p>

        {/* Logo Cloud with subtle hover depth */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 items-center justify-items-center">
          {CUSTOMER_LOGOS.map((company) => (
            <div
              key={company.name}
              className="w-full flex flex-col items-center justify-center p-3 rounded-2xl border border-transparent hover:border-slate-200/80 hover:bg-slate-50/80 transition-all duration-200 group cursor-default"
            >
              <span className="text-lg md:text-xl font-black text-slate-400 group-hover:text-[#0a2540] tracking-tighter transition-colors">
                {company.name}
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-tight mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                {company.category}
              </span>
            </div>
          ))}
        </div>

        {/* Interactive Customer Testimonial Spotlight */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-xs relative overflow-hidden">
          {/* Subtle colored accent */}
          <div 
            className="absolute -right-20 -top-20 w-60 h-60 rounded-full opacity-10 blur-3xl pointer-events-none"
            style={{ backgroundColor: activeStory.highlightColor || '#635bff' }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Story Metric Callout */}
            <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-200/80 pb-6 lg:pb-0 lg:pr-8">
              <div 
                className="text-4xl sm:text-5xl font-black tracking-tight"
                style={{ color: activeStory.highlightColor || '#635bff' }}
              >
                {activeStory.metric}
              </div>
              <div className="text-sm font-semibold text-slate-700 mt-1">
                {activeStory.metricLabel}
              </div>
              <div className="mt-4 flex gap-2">
                {CUSTOMER_STORIES.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveStoryIdx(idx)}
                    className={`text-xs px-2.5 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                      activeStoryIdx === idx
                        ? 'bg-[#0a2540] text-white'
                        : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {s.company}
                  </button>
                ))}
              </div>
            </div>

            {/* Story Quote */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-slate-400">
                <Quote className="w-5 h-5 text-[#635bff]" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {activeStory.company} Enterprise Case Study
                </span>
              </div>
              <p className="text-base sm:text-lg text-[#0a2540] font-medium leading-relaxed italic">
                "{activeStory.quote}"
              </p>
              <div>
                <div className="text-sm font-bold text-[#0a2540]">{activeStory.author}</div>
                <div className="text-xs text-slate-500">{activeStory.role}, {activeStory.company}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
