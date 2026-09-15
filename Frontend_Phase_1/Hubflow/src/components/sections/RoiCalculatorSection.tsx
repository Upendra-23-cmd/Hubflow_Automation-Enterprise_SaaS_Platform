import React, { useState, useMemo } from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useToast } from '../../context/ToastContext';
import { Calculator, DollarSign, Clock, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

interface RoiCalculatorSectionProps {
  onOpenDemo: () => void;
}

export const RoiCalculatorSection: React.FC<RoiCalculatorSectionProps> = ({
  onOpenDemo,
}) => {
  const { showToast } = useToast();

  const [teamSize, setTeamSize] = useState<number>(18);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(6);
  const [hourlyRate, setHourlyRate] = useState<number>(55);

  const presets = [
    { label: 'Startup RevOps', team: 6, hours: 5, rate: 45 },
    { label: 'Mid-Market Team', team: 25, hours: 8, rate: 60 },
    { label: 'Enterprise Engineering', team: 75, hours: 10, rate: 85 },
  ];

  const calculations = useMemo(() => {
    // 75% of repetitive tasks eliminated through Hubflow pipelines
    const efficiencyRate = 0.75;
    const monthlyHoursAutomated = Math.round(teamSize * hoursPerWeek * 4.33 * efficiencyRate);
    const monthlyGrossSavings = Math.round(monthlyHoursAutomated * hourlyRate);
    const annualGrossSavings = monthlyGrossSavings * 12;

    // Projected Hubflow investment
    let annualHubflowCost = 79 * 12; // Pro base
    if (teamSize > 40) {
      annualHubflowCost = 299 * 12; // Enterprise base
    }

    const netAnnualSavings = Math.max(0, annualGrossSavings - annualHubflowCost);
    const roiPercentage = Math.round((netAnnualSavings / annualHubflowCost) * 100);
    const paybackWeeks = Math.max(0.4, (annualHubflowCost / (annualGrossSavings / 52))).toFixed(1);

    return {
      monthlyHoursAutomated,
      monthlyGrossSavings,
      annualGrossSavings,
      netAnnualSavings,
      roiPercentage,
      paybackWeeks,
      annualHubflowCost,
    };
  }, [teamSize, hoursPerWeek, hourlyRate]);

  const handleExportReport = () => {
    showToast(
      'success',
      'ROI Assessment Generated',
      `Projected net annual savings: $${calculations.netAnnualSavings.toLocaleString()} (${calculations.roiPercentage}% ROI). Our team can benchmark your exact pipelines.`
    );
    onOpenDemo();
  };

  return (
    <section id="calculator" className="py-20 md:py-28 relative scroll-mt-20 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>ENGINEERING ECONOMIC IMPACT MODEL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-1">
            Calculate Your Return on Automation
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-4 leading-relaxed">
            Quantify how eliminating manual webhook triage, brittle glue code, and
            repetitive data synchronization directly impacts your engineering bottom line.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="max-w-5xl mx-auto rounded-3xl border border-slate-800 bg-slate-900/60 shadow-2xl p-6 sm:p-10 backdrop-blur-md">
          {/* Quick Presets */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-800">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Quick Benchmarks:
            </span>
            <div className="flex flex-wrap gap-2">
              {presets.map((p) => (
                <button
                  key={p.label}
                  onClick={() => {
                    setTeamSize(p.team);
                    setHoursPerWeek(p.hours);
                    setHourlyRate(p.rate);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
            {/* Left Controls (lg:col-span-6) */}
            <div className="lg:col-span-6 space-y-7">
              {/* Slider 1: Team Size */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="range-team-size" className="text-sm font-semibold text-white">
                    Team Members in Ops / Eng / RevOps
                  </label>
                  <span className="text-sm font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20">
                    {teamSize} people
                  </span>
                </div>
                <input
                  id="range-team-size"
                  type="range"
                  min={1}
                  max={100}
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>1 person</span>
                  <span>50</span>
                  <span>100+ Enterprise</span>
                </div>
              </div>

              {/* Slider 2: Hours Per Week */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="range-hours-week" className="text-sm font-semibold text-white">
                    Manual Sync & Triage Time (Hours/Wk/Person)
                  </label>
                  <span className="text-sm font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20">
                    {hoursPerWeek} hrs / wk
                  </span>
                </div>
                <input
                  id="range-hours-week"
                  type="range"
                  min={1}
                  max={25}
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>1 hr</span>
                  <span>12 hrs</span>
                  <span>25 hrs</span>
                </div>
              </div>

              {/* Slider 3: Hourly Rate */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="range-hourly-rate" className="text-sm font-semibold text-white">
                    Average Blended Hourly Cost ($ USD)
                  </label>
                  <span className="text-sm font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20">
                    ${hourlyRate} / hr
                  </span>
                </div>
                <input
                  id="range-hourly-rate"
                  type="range"
                  min={25}
                  max={150}
                  step={5}
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>$25/hr</span>
                  <span>$85/hr</span>
                  <span>$150/hr</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Based on verified Forrester & Gartner automation impact methodologies, factoring in 75% average task automation and reduced defect rework.
                </span>
              </div>
            </div>

            {/* Right Results Dashboard (lg:col-span-6) */}
            <div className="lg:col-span-6 p-6 sm:p-7 rounded-2xl bg-slate-950/90 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                  Projected Net Annual Value
                </span>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                    ${calculations.netAnnualSavings.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400">/ year saved</span>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Hours Reclaimed</span>
                    </div>
                    <div className="text-xl font-bold text-white mt-1">
                      {calculations.monthlyHoursAutomated.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-slate-400">hours / month</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Projected ROI</span>
                    </div>
                    <div className="text-xl font-bold text-emerald-400 mt-1">
                      {calculations.roiPercentage}%
                    </div>
                    <div className="text-[11px] text-slate-400">return on investment</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                      <span>Monthly Savings</span>
                    </div>
                    <div className="text-xl font-bold text-white mt-1">
                      ${calculations.monthlyGrossSavings.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-slate-400">recurrent value</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                      <span>Payback Period</span>
                    </div>
                    <div className="text-xl font-bold text-indigo-300 mt-1">
                      {calculations.paybackWeeks} wks
                    </div>
                    <div className="text-[11px] text-slate-400">breakeven timeline</div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4 border-t border-slate-800/80">
                <Button
                  id="claim-roi-btn"
                  variant="primary"
                  className="w-full"
                  onClick={handleExportReport}
                  leftIcon={<Sparkles className="w-4 h-4" />}
                >
                  Download ROI Breakdown & Validate With Architect
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
