import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  CheckCircle2, 
  Lock, 
  ArrowUpRight, 
  Sparkles, 
  Terminal, 
  ShieldCheck, 
  Smartphone, 
  QrCode, 
  Building, 
  ArrowRight,
  RefreshCw,
  Zap,
  Globe
} from 'lucide-react';
import { mockStripeApi } from '../../services/mockApi';
import { PaymentIntentResponse, RegionMode } from '../../types';

interface InteractiveCheckoutWidgetProps {
  region?: RegionMode;
  onToggleRegion?: (r: RegionMode) => void;
}

export const InteractiveCheckoutWidget: React.FC<InteractiveCheckoutWidgetProps> = ({
  region = 'in',
  onToggleRegion
}) => {
  // Method state
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'netbanking' | 'apple_pay' | 'link'>(
    region === 'in' ? 'upi' : 'card'
  );

  // Sync default method when region prop changes
  useEffect(() => {
    if (region === 'in' && (selectedMethod === 'apple_pay' || selectedMethod === 'link')) {
      setSelectedMethod('upi');
    } else if (region === 'global' && (selectedMethod === 'upi' || selectedMethod === 'netbanking')) {
      setSelectedMethod('card');
    }
  }, [region]);

  // UPI specific states
  const [upiMode, setUpiMode] = useState<'vpa' | 'qr'>('vpa');
  const [upiId, setUpiId] = useState('alex.chen@okhdfcbank');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [upiApprovalPending, setUpiApprovalPending] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Card specific states
  const [cardNumber, setCardNumber] = useState(region === 'in' ? '6074 •••• •••• 9812' : '4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('08/29');
  const [cvc, setCvc] = useState('888');
  const [email, setEmail] = useState('alex.chen@company.com');

  const [isLoading, setIsLoading] = useState(false);
  const [paymentResult, setPaymentResult] = useState<PaymentIntentResponse | null>(null);
  const [showJsonView, setShowJsonView] = useState(false);

  // Amount based on region
  const amount = region === 'in' ? 249900 : 4900; // ₹2,499.00 or $49.00 in minor units
  const formattedAmount = region === 'in' ? '₹2,499.00' : '$49.00';
  const currencyCode = region === 'in' ? 'inr' : 'usd';

  const handleSimulatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setPaymentResult(null);

    // If UPI flow, show simulated app approval step
    if (selectedMethod === 'upi') {
      setUpiApprovalPending(true);
      setCountdown(3);

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            completePayment();
            return 0;
          }
          return prev - 1;
        });
      }, 900);
      return;
    }

    completePayment();
  };

  const completePayment = async () => {
    try {
      const res = await mockStripeApi.createPaymentIntent({
        amount,
        currency: currencyCode,
        paymentMethod: selectedMethod === 'upi' ? 'upi' : selectedMethod === 'netbanking' ? 'netbanking' : 'card',
        customerEmail: email,
        description: region === 'in' ? 'Stripe India SaaS Subscription' : 'SaaS Pro Monthly Subscription',
        upiId: selectedMethod === 'upi' ? upiId : undefined,
        bankName: selectedMethod === 'netbanking' ? selectedBank : undefined
      });
      setPaymentResult(res);
    } catch (err) {
      console.error('Payment error', err);
    } finally {
      setIsLoading(false);
      setUpiApprovalPending(false);
    }
  };

  const resetPayment = () => {
    setPaymentResult(null);
    setShowJsonView(false);
    setUpiApprovalPending(false);
  };

  const indianBanks = [
    { name: 'HDFC Bank', code: 'HDFC' },
    { name: 'ICICI Bank', code: 'ICICI' },
    { name: 'State Bank of India', code: 'SBI' },
    { name: 'Axis Bank', code: 'AXIS' },
    { name: 'Kotak Bank', code: 'KOTAK' }
  ];

  return (
    <div className="relative w-full max-w-md mx-auto lg:max-w-none">
      {/* Decorative backdrop glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#635bff]/40 via-[#ff5b79]/30 to-[#00d4ff]/40 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 -z-10" />

      {/* Main Container */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/80 shadow-[0_20px_50px_rgba(10,37,64,0.12)] p-6 md:p-7 overflow-hidden text-[#0a2540]">
        {/* Header with merchant & total */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#635bff] flex items-center justify-center text-white font-bold text-sm shadow-xs shadow-[#635bff]/30">
              S
            </div>
            <div>
              <div className="text-sm font-bold text-[#0a2540] flex items-center gap-1.5">
                {region === 'in' ? 'Acme Software India' : 'Acme Global SaaS'}
                <ShieldCheck className="w-3.5 h-3.5 text-[#635bff]" />
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Stripe Elements Demo</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">Total</span>
            <span className="text-lg font-extrabold text-[#0a2540] tracking-tight">{formattedAmount}</span>
          </div>
        </div>

        {/* In-Widget Region & Method Switcher Pill */}
        <div className="flex items-center justify-between py-2 border-b border-slate-100 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[11px] font-medium">Region:</span>
            {onToggleRegion ? (
              <button
                type="button"
                onClick={() => onToggleRegion(region === 'in' ? 'global' : 'in')}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-semibold text-[11px] bg-slate-100 hover:bg-slate-200 text-[#0a2540] transition-colors cursor-pointer"
              >
                <span>{region === 'in' ? '🇮🇳 India (INR ₹)' : '🌐 Global (USD $)'}</span>
                <RefreshCw className="w-2.5 h-2.5 opacity-60 ml-0.5" />
              </button>
            ) : (
              <span className="font-semibold text-[11px] text-[#0a2540]">
                {region === 'in' ? '🇮🇳 India (INR ₹)' : '🌐 Global (USD $)'}
              </span>
            )}
          </div>

          <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
            Live Sandbox
          </span>
        </div>

        {/* UPI Approval Waiting Screen */}
        {upiApprovalPending ? (
          <div className="py-8 text-center space-y-4 animate-in fade-in duration-200">
            <div className="w-14 h-14 rounded-full bg-indigo-50 text-[#635bff] flex items-center justify-center mx-auto relative">
              <Smartphone className="w-7 h-7 animate-bounce" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-ping" />
            </div>

            <div>
              <h4 className="text-base font-bold text-[#0a2540]">Approve on your UPI App</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Collect request of <span className="font-bold text-[#0a2540]">{formattedAmount}</span> sent to <span className="font-mono font-bold text-[#635bff]">{upiId}</span>
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs max-w-xs mx-auto flex items-center justify-between text-slate-600 font-mono">
              <span>Simulating approval...</span>
              <span className="font-bold text-[#635bff]">{countdown}s</span>
            </div>

            <p className="text-[11px] text-slate-400">
              Open Google Pay, PhonePe, or Paytm to enter UPI PIN
            </p>
          </div>
        ) : paymentResult ? (
          /* Payment Succeeded State */
          <div className="py-6 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-lg font-bold text-[#0a2540]">Payment Complete</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Stripe authorized <span className="font-bold text-[#0a2540]">{formattedAmount}</span> in <span className="font-semibold text-emerald-600">284ms</span>
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-left text-xs space-y-1.5 font-mono">
              <div className="flex justify-between text-slate-500">
                <span>Method:</span>
                <span className="font-semibold text-[#0a2540] uppercase">
                  {paymentResult.payment_method_types[0] || 'UPI'}
                </span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>PaymentIntent:</span>
                <span className="font-semibold text-[#0a2540]">{paymentResult.id.substring(0, 18)}...</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Network Status:</span>
                <span className="font-semibold text-emerald-600">Approved by Network</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Message:</span>
                <span className="font-semibold text-slate-700 truncate max-w-[200px]">
                  {paymentResult.charges.data[0]?.outcome.seller_message}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowJsonView(!showJsonView)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#635bff] hover:text-[#0a2540] transition-colors cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5" />
                {showJsonView ? 'Hide API Payload' : 'Inspect JSON Response'}
              </button>
              <span className="text-slate-300">•</span>
              <button
                type="button"
                onClick={resetPayment}
                className="text-xs font-medium text-slate-500 hover:text-slate-800 underline transition-colors cursor-pointer"
              >
                Test Another Payment
              </button>
            </div>

            {showJsonView && (
              <div className="mt-3 p-3 bg-[#0a2540] text-emerald-300 text-left rounded-xl text-[11px] font-mono max-h-44 overflow-y-auto border border-slate-800">
                <pre>{JSON.stringify(paymentResult, null, 2)}</pre>
              </div>
            )}
          </div>
        ) : (
          /* Active Checkout Form */
          <form onSubmit={handleSimulatePayment} className="mt-4 space-y-4">
            {/* Payment Method Selector Tabs */}
            {region === 'in' ? (
              /* India Methods: UPI, Card (RuPay), Netbanking */
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedMethod('upi')}
                  className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    selectedMethod === 'upi'
                      ? 'border-[#635bff] bg-[#635bff]/5 text-[#635bff] shadow-xs ring-1 ring-[#635bff]'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <span className="text-xs font-black tracking-tight mb-0.5">UPI</span>
                  <span className="text-[10px] text-slate-400">GPay, PhonePe</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('card')}
                  className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    selectedMethod === 'card'
                      ? 'border-[#635bff] bg-[#635bff]/5 text-[#635bff] shadow-xs ring-1 ring-[#635bff]'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mb-0.5" />
                  <span className="text-[10px] text-slate-400">RuPay & Cards</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('netbanking')}
                  className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    selectedMethod === 'netbanking'
                      ? 'border-[#635bff] bg-[#635bff]/5 text-[#635bff] shadow-xs ring-1 ring-[#635bff]'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <Building className="w-4 h-4 mb-0.5" />
                  <span className="text-[10px] text-slate-400">Netbanking</span>
                </button>
              </div>
            ) : (
              /* Global Methods: Card, Apple Pay, Link */
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedMethod('card')}
                  className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    selectedMethod === 'card'
                      ? 'border-[#635bff] bg-[#635bff]/5 text-[#635bff] shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mb-1" />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('apple_pay')}
                  className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    selectedMethod === 'apple_pay'
                      ? 'border-[#635bff] bg-[#635bff]/5 text-[#635bff] shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <span className="text-sm font-black mb-0.5"> Pay</span>
                  <span>Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('link')}
                  className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    selectedMethod === 'link'
                      ? 'border-[#635bff] bg-[#635bff]/5 text-[#635bff] shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <span className="text-xs font-bold text-[#00d4ff] bg-[#0a2540] px-1 rounded mb-1">link</span>
                  <span>1-Click</span>
                </button>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#635bff]/30 focus:border-[#635bff] transition-colors"
                placeholder="you@company.com"
              />
            </div>

            {/* UPI Flow Elements */}
            {selectedMethod === 'upi' && (
              <div className="space-y-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0a2540]">UPI Payment Mode</span>
                  <div className="flex rounded-lg bg-slate-200/70 p-0.5 text-[10px] font-bold">
                    <button
                      type="button"
                      onClick={() => setUpiMode('vpa')}
                      className={`px-2 py-0.5 rounded-md transition-all ${
                        upiMode === 'vpa' ? 'bg-white text-[#635bff] shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      UPI ID / VPA
                    </button>
                    <button
                      type="button"
                      onClick={() => setUpiMode('qr')}
                      className={`px-2 py-0.5 rounded-md transition-all ${
                        upiMode === 'qr' ? 'bg-white text-[#635bff] shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      Scan QR Code
                    </button>
                  </div>
                </div>

                {upiMode === 'vpa' ? (
                  <div className="space-y-2">
                    <div className="relative">
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        required
                        placeholder="mobile@upi or name@okhdfcbank"
                        className="w-full px-3 py-2 text-xs font-mono bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#635bff]/30"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">
                        VERIFIED
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap text-[10px]">
                      <span className="text-slate-400">Quick suggestions:</span>
                      <button
                        type="button"
                        onClick={() => setUpiId('alex@okhdfcbank')}
                        className="px-1.5 py-0.5 rounded bg-white border border-slate-200 hover:border-[#635bff] text-slate-600 font-mono cursor-pointer"
                      >
                        @okhdfcbank
                      </button>
                      <button
                        type="button"
                        onClick={() => setUpiId('alex@okaxis')}
                        className="px-1.5 py-0.5 rounded bg-white border border-slate-200 hover:border-[#635bff] text-slate-600 font-mono cursor-pointer"
                      >
                        @okaxis
                      </button>
                      <button
                        type="button"
                        onClick={() => setUpiId('alex@paytm')}
                        className="px-1.5 py-0.5 rounded bg-white border border-slate-200 hover:border-[#635bff] text-slate-600 font-mono cursor-pointer"
                      >
                        @paytm
                      </button>
                    </div>
                  </div>
                ) : (
                  /* QR Code view */
                  <div className="text-center py-2 space-y-2">
                    <div className="w-28 h-28 mx-auto bg-white p-2 rounded-xl border border-slate-200 shadow-xs flex items-center justify-center">
                      {/* Stylized QR representation */}
                      <div className="w-full h-full border-2 border-dashed border-slate-300 rounded flex flex-col items-center justify-center p-2 bg-slate-50/50">
                        <QrCode className="w-12 h-12 text-[#0a2540]" />
                        <span className="text-[9px] font-mono font-bold text-[#635bff] mt-1">SCAN IN APP</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500">
                      Scan with Google Pay, PhonePe, Paytm, BHIM, or any banking app
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-1 text-[10px] text-slate-500 border-t border-slate-200/60">
                  <span>Supported Apps:</span>
                  <div className="flex items-center gap-1 font-bold text-slate-600">
                    <span className="px-1 py-0.5 bg-white rounded border border-slate-200">GPay</span>
                    <span className="px-1 py-0.5 bg-white rounded border border-slate-200">PhonePe</span>
                    <span className="px-1 py-0.5 bg-white rounded border border-slate-200">Paytm</span>
                    <span className="px-1 py-0.5 bg-white rounded border border-slate-200">BHIM</span>
                  </div>
                </div>
              </div>
            )}

            {/* Netbanking Flow Elements */}
            {selectedMethod === 'netbanking' && (
              <div className="space-y-2 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <label className="block text-xs font-bold text-[#0a2540]">
                  Select Indian Bank
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {indianBanks.map((bank) => (
                    <button
                      key={bank.name}
                      type="button"
                      onClick={() => setSelectedBank(bank.name)}
                      className={`p-2 rounded-xl text-left text-xs font-medium border transition-all cursor-pointer ${
                        selectedBank === bank.name
                          ? 'border-[#635bff] bg-white text-[#635bff] shadow-xs ring-1 ring-[#635bff]'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="font-bold text-[11px]">{bank.code}</div>
                      <div className="text-[10px] text-slate-400 truncate">{bank.name}</div>
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 pt-1">
                  Supports 50+ Indian retail and corporate netbanking portals.
                </p>
              </div>
            )}

            {/* Card Information Fields */}
            {selectedMethod === 'card' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-semibold text-slate-600">
                    Card Information
                  </label>
                  {region === 'in' && (
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                      RuPay Accepted
                    </span>
                  )}
                </div>
                <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#635bff]/30 focus-within:border-[#635bff] transition-all">
                  <div className="flex items-center px-3.5 py-2 border-b border-slate-200">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full text-xs bg-transparent focus:outline-none font-mono tracking-wider"
                      placeholder="Card number"
                    />
                    <div className="flex gap-1 shrink-0 ml-2">
                      {region === 'in' && (
                        <span className="px-1.5 py-0.5 text-[9px] font-bold bg-[#007934] text-white rounded">
                          RuPay
                        </span>
                      )}
                      <span className="px-1.5 py-0.5 text-[9px] font-bold bg-[#1a1f71] text-white rounded">VISA</span>
                      <span className="px-1.5 py-0.5 text-[9px] font-bold bg-[#eb001b] text-white rounded">MC</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-slate-200">
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="px-3.5 py-2 text-xs bg-transparent focus:outline-none font-mono"
                      placeholder="MM / YY"
                    />
                    <input
                      type="text"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      className="px-3.5 py-2 text-xs bg-transparent focus:outline-none font-mono"
                      placeholder="CVC"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-slate-400" />
                    RBI Compliant Tokenization
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (region === 'in') {
                        setCardNumber('6074 •••• •••• 9812');
                        setExpiry('10/29');
                        setCvc('924');
                      } else {
                        setCardNumber('4000 •••• •••• 0027');
                        setExpiry('11/29');
                        setCvc('731');
                      }
                    }}
                    className="text-[#635bff] hover:text-[#0a2540] font-semibold transition-colors flex items-center gap-0.5 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3" />
                    Fill {region === 'in' ? 'Test RuPay' : 'Test Card'}
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-[#635bff] hover:bg-[#0a2540] text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg hover:shadow-[#635bff]/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authorizing with Bank...</span>
                </>
              ) : (
                <>
                  <span>
                    Pay {formattedAmount} {selectedMethod === 'upi' ? 'via UPI' : ''}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Bottom subtle note */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Stripe Elements Engine</span>
          <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
            Test Mode (NPCI / Visa Sandbox)
          </span>
        </div>
      </div>
    </div>
  );
};
