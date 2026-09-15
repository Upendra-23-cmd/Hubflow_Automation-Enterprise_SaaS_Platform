import React, { useState, useEffect } from 'react';
import { Globe2, ShieldCheck, Zap, Activity, Radio, ArrowUpRight } from 'lucide-react';
import { GLOBAL_STATS } from '../../data/stripeData';
import { Badge } from '../common/Badge';

export const GlobalScaleSection: React.FC = () => {
  // Simulated real-time metrics
  const [tps, setTps] = useState(14820);
  const [uptimePercent, setUptimePercent] = useState('99.9992%');
  const [authRate, setAuthRate] = useState('98.4%');

  useEffect(() => {
    const interval = setInterval(() => {
      setTps(prev => Math.floor(prev + (Math.random() * 80 - 40)));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const globalNodes = [
    { city: 'Mumbai (ap-south-1)', lat: '19.07', lon: '72.87', status: 'Optimal' },
    { city: 'Singapore', lat: '1.35', lon: '103.81', status: 'Optimal' },
    { city: 'Tokyo', lat: '35.67', lon: '139.65', status: 'Optimal' },
    { city: 'Frankfurt', lat: '50.11', lon: '8.68', status: 'Optimal' },
    { city: 'London', lat: '51.50', lon: '-0.12', status: 'Optimal' },
    { city: 'New York', lat: '40.71', lon: '-74.00', status: 'Optimal' },
    { city: 'San Francisco', lat: '37.77', lon: '-122.41', status: 'Optimal' },
    { city: 'Sydney', lat: '-33.86', lon: '151.20', status: 'Optimal' }
  ];

  return (
    <section id="global" className="py-24 md:py-32 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-bold uppercase tracking-wider text-[#635bff] mb-3 flex items-center gap-1.5">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Global Scale & Infrastructure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a2540] tracking-tight leading-tight">
            The financial backbone for internet commerce
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Stripe operates a hyper-scale, distributed financial network built with enterprise resilience to handle peak global shopping events with zero hiccups.
          </p>
        </div>

        {/* Live Network Telemetry Bar */}
        <div className="mt-10 p-4 sm:p-5 rounded-2xl bg-[#0a2540] text-white flex flex-wrap items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono font-bold tracking-wide uppercase text-slate-300">
              Live Global Network Telemetry
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
            <div>
              <span className="text-slate-400 block text-[10px]">Peak Throughput</span>
              <span className="font-bold text-white text-sm">{tps.toLocaleString()} TPS</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Rolling 365d Uptime</span>
              <span className="font-bold text-emerald-400 text-sm">{uptimePercent}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Smart Auth Lift</span>
              <span className="font-bold text-[#00d4ff] text-sm">+{authRate}</span>
            </div>
          </div>
        </div>

        {/* Big Number Metrics Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {GLOBAL_STATS.map((stat) => (
            <div 
              key={stat.id}
              className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 hover:bg-white transition-all shadow-xs"
            >
              <div className="text-4xl sm:text-5xl font-black text-[#0a2540] tracking-tight">
                {stat.number}
              </div>
              <div className="text-sm font-bold text-[#0a2540] mt-2">
                {stat.label}
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>

        {/* Regional Node Transparency Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <div>
              <h4 className="text-base font-bold text-[#0a2540]">Primary Regional Edge Gateways</h4>
              <p className="text-xs text-slate-500">Sub-50ms latency routing across international payment networks</p>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
              All 7 Regions Active
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {globalNodes.map((node) => (
              <div
                key={node.city}
                className="p-3 bg-white rounded-xl border border-slate-200 text-center space-y-1 hover:border-[#635bff]/40 transition-colors"
              >
                <span className="text-xs font-bold text-[#0a2540] block truncate">{node.city}</span>
                <span className="text-[10px] font-mono text-emerald-600 font-semibold flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {node.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
