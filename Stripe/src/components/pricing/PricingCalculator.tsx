import React, { useState, useEffect } from 'react';
import { Calculator, Check, ArrowRight, Sparkles, HelpCircle, ShieldCheck, Globe, RefreshCw } from 'lucide-react';
import { mockStripeApi } from '../../services/mockApi';
import { Button } from '../common/Button';
import { RegionMode } from '../../types';

interface PricingCalculatorProps {
  onOpenCheckoutDemo: () => void;
  region?: RegionMode;
  onToggleRegion?: (r: RegionMode) => void;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({
  onOpenCheckoutDemo,
  region = 'in',
  onToggleRegion
}) => {
  // Region-aware state defaults
  const [currentRegion, setCurrentRegion] = useState<RegionMode>(region);

  useEffect(() => {
    setCurrentRegion(region);
  }, [region]);

  const isIndia = currentRegion === 'in';

  // Volume in major units (INR or USD)
  const [monthlyVolume, setMonthlyVolume] = useState<number>(isIndia ? 1000000 : 50000);
  const [avgOrderValue, setAvgOrderValue] = useState<number>(isIndia ? 2500 : 45);
  const [intlPercentage, setIntlPercentage] = useState<number>(15);
  const [feeBreakdown, setFeeBreakdown] = useState<any>(null);

  // When switching region, adapt default numbers
  const handleRegionSwitch = (newRegion: RegionMode) => {
    setCurrentRegion(newRegion);
    if (onToggleRegion) onToggleRegion(newRegion);
    if (newRegion === 'in') {
      setMonthlyVolume(1000000); // 10 Lakhs
      setAvgOrderValue(2500);
    } else {
      setMonthlyVolume(50000); // $50k
      setAvgOrderValue(45);
    }
  };

  useEffect(() => {
    let isCurrent = true;
    mockStripeApi.calculateFees(monthlyVolume, avgOrderValue, intlPercentage, currentRegion).then((res) => {
      if (isCurrent) {
        setFeeBreakdown(res);
      }
    });
    return () => {
      isCurrent = false;
    };
  }, [monthlyVolume, avgOrderValue, intlPercentage, currentRegion]);

  // Format currency helpers
  const formatMoney = (amount: number) => {
    if (isIndia) {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
    return `$${amount.toLocaleString('en-US')}`;
  };

  return (
    <section id="pricing" className="py-24 md:py-32 bg-[#f6f9fc] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with region toggle pill */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#635bff]/10 text-[#635bff] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isIndia ? 'Stripe India Pricing' : 'Transparent Pricing'}</span>
            </div>

            {/* Region Switcher Button */}
            <div className="inline-flex rounded-full bg-slate-200/70 p-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => handleRegionSwitch('in')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  isIndia ? 'bg-white text-[#635bff] shadow-xs font-bold' : 'text-slate-600 hover:text-[#0a2540]'
                }`}
              >
                🇮🇳 India (INR ₹)
              </button>
              <button
                type="button"
                onClick={() => handleRegionSwitch('global')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  !isIndia ? 'bg-white text-[#635bff] shadow-xs font-bold' : 'text-slate-600 hover:text-[#0a2540]'
                }`}
              >
                🌐 Global (USD $)
              </button>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a2540] tracking-tight leading-tight">
            {isIndia 
              ? 'Pay as you grow for India and cross-border trade' 
              : 'Pay as you grow, with no hidden fees'}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            {isIndia
              ? '2.0% flat fee for Indian cards, UPI, and Netbanking. 3.0% for international cards. Plus 18% GST with complete Input Tax Credit (ITC) invoices.'
              : 'Standard pricing is 2.9% + 30¢ per successful card charge. Use our live calculator to estimate your costs based on your monthly revenue model.'}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Card 1: Standard Pay-as-you-go */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-2xl font-bold text-[#0a2540]">
                    {isIndia ? 'Integrated for India' : 'Integrated'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isIndia ? 'Complete domestic & international suite' : 'Everything you need to accept global payments'}
                  </p>
                </div>
                <span className="text-xs font-bold text-[#635bff] bg-[#635bff]/10 px-2.5 py-1 rounded-full">
                  Standard
                </span>
              </div>

              {isIndia ? (
                /* India Rate Display */
                <div className="mt-6 mb-6 space-y-3">
                  <div className="p-4 rounded-2xl bg-[#635bff]/5 border border-[#635bff]/15">
                    <div className="flex items-baseline justify-between">
                      <span className="text-3xl sm:text-4xl font-black text-[#0a2540]">2.0%</span>
                      <span className="text-xs font-bold text-[#635bff] uppercase tracking-wide">Domestic</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Per successful transaction on Indian credit/debit cards, UPI, and Netbanking.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold text-[#0a2540]">3.0%</span>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">International</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Per successful transaction on international cards & 135+ currencies.
                    </p>
                  </div>
                  <p className="text-[11px] text-slate-400 italic">
                    *Applicable Goods and Services Tax (GST) of 18% assessed on processing fees.
                  </p>
                </div>
              ) : (
                /* Global Rate Display */
                <div className="mt-6 mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-black text-[#0a2540]">2.9%</span>
                    <span className="text-xl font-bold text-slate-400">+ 30¢</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Per successful card transaction</p>
                </div>
              )}

              <ul className="space-y-3 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-600">
                {isIndia ? (
                  <>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#635bff] shrink-0 mt-0.5" />
                      <span>Zero setup fee, zero annual maintenance fee</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#635bff] shrink-0 mt-0.5" />
                      <span>Instant UPI activation (Google Pay, PhonePe, Paytm, BHIM, CRED)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#635bff] shrink-0 mt-0.5" />
                      <span>Automated monthly GST invoices with Input Tax Credit (ITC) eligibility</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#635bff] shrink-0 mt-0.5" />
                      <span>Automated Foreign Inward Remittance Statement (FIRS) for exports</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#635bff] shrink-0 mt-0.5" />
                      <span>RBI circular compliant card tokenization & recurring e-mandates</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#635bff] shrink-0 mt-0.5" />
                      <span>Access to 100+ global payment methods & 135+ currencies</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#635bff] shrink-0 mt-0.5" />
                      <span>Integrated Stripe Radar AI fraud protection</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#635bff] shrink-0 mt-0.5" />
                      <span>24/7 technical chat and phone support</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#635bff] shrink-0 mt-0.5" />
                      <span>No setup fees, monthly maintenance fees, or hidden charges</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <Button
                variant="primary"
                size="lg"
                className="w-full justify-center"
                withArrow
                onClick={onOpenCheckoutDemo}
              >
                {isIndia ? 'Create Stripe India account' : 'Get started with Integrated'}
              </Button>
            </div>
          </div>

          {/* Card 2: Interactive Fee Calculator */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-[#635bff]" />
                  <h3 className="text-xl font-bold text-[#0a2540]">
                    {isIndia ? 'India Fee & Payout Estimator' : 'Interactive Fee Estimator'}
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {isIndia ? 'INR (₹) Sandbox' : 'USD ($) Sandbox'}
                </span>
              </div>

              {/* Sliders Area */}
              <div className="mt-6 space-y-6">
                {/* Volume Slider */}
                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-slate-600">Monthly Processing Volume</span>
                    <span className="text-[#0a2540] font-mono text-base font-bold">
                      {formatMoney(monthlyVolume)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={isIndia ? 50000 : 5000}
                    max={isIndia ? 10000000 : 500000}
                    step={isIndia ? 50000 : 5000}
                    value={monthlyVolume}
                    onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#635bff]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>{isIndia ? '₹50,000' : '$5k'}</span>
                    <span>{isIndia ? '₹50 Lakhs' : '$250k'}</span>
                    <span>{isIndia ? '₹1 Crore+' : '$500k+'}</span>
                  </div>
                </div>

                {/* Avg Ticket Slider */}
                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-slate-600">Average Ticket Size (Order Value)</span>
                    <span className="text-[#0a2540] font-mono text-base font-bold">
                      {formatMoney(avgOrderValue)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={isIndia ? 200 : 10}
                    max={isIndia ? 25000 : 250}
                    step={isIndia ? 100 : 5}
                    value={avgOrderValue}
                    onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#635bff]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>{isIndia ? '₹200' : '$10'}</span>
                    <span>{isIndia ? '₹12,500' : '$100'}</span>
                    <span>{isIndia ? '₹25,000+' : '$250'}</span>
                  </div>
                </div>

                {/* International Percentage */}
                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-slate-600">Cross-Border / International Cards Share</span>
                    <span className="text-[#0a2540] font-mono text-base font-bold">
                      {intlPercentage}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="60"
                    step="5"
                    value={intlPercentage}
                    onChange={(e) => setIntlPercentage(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#635bff]"
                  />
                </div>
              </div>

              {/* Calculated Outputs */}
              {feeBreakdown && (
                <div className="mt-8 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">
                      Estimated Fees {isIndia ? '(inc. 18% GST)' : ''}
                    </span>
                    <span className="text-lg sm:text-xl font-bold text-[#0a2540] font-mono">
                      {isIndia ? `₹${feeBreakdown.totalFees.toLocaleString('en-IN')}` : `$${feeBreakdown.totalFees.toLocaleString('en-US')}`}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 block font-medium">
                      {isIndia ? 'Net Bank Settlement' : 'Net Payout to Bank'}
                    </span>
                    <span className="text-lg sm:text-xl font-bold text-emerald-600 font-mono">
                      {isIndia ? `₹${feeBreakdown.netVolume.toLocaleString('en-IN')}` : `$${feeBreakdown.netVolume.toLocaleString('en-US')}`}
                    </span>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-xs text-slate-400 block font-medium">Effective Take Rate</span>
                    <span className="text-lg sm:text-xl font-bold text-[#635bff] font-mono">
                      {feeBreakdown.effectiveRate}%
                    </span>
                  </div>

                  {isIndia && feeBreakdown.gst && (
                    <div className="col-span-2 sm:col-span-3 pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
                      <span>Input Tax Credit (ITC) GST portion:</span>
                      <span className="font-mono font-bold text-[#0a2540]">
                        ₹{feeBreakdown.gst.toLocaleString('en-IN')} (Eligible for business set-off)
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Enterprise callout at bottom */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>
                {isIndia 
                  ? 'Processing over ₹50 Lakhs/month? Contact our Mumbai sales team for volume discounts.' 
                  : 'Processing over $100k/month? Custom volume rates apply.'}
              </span>
              <a href="#contact" className="font-bold text-[#635bff] hover:underline flex items-center gap-0.5 shrink-0 ml-2">
                Contact sales <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
