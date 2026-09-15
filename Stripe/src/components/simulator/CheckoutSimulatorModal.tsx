import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  ShieldCheck, 
  ArrowRight, 
  RefreshCw, 
  Terminal, 
  Sparkles,
  Smartphone,
  Building,
  Globe
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { mockStripeApi } from '../../services/mockApi';
import { PaymentIntentResponse, RegionMode } from '../../types';

interface CheckoutSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  region?: RegionMode;
}

export const CheckoutSimulatorModal: React.FC<CheckoutSimulatorModalProps> = ({
  isOpen,
  onClose,
  region = 'in'
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState<'inr' | 'usd'>(region === 'in' ? 'inr' : 'usd');
  const [method, setMethod] = useState<'card' | 'upi' | 'netbanking'>(region === 'in' ? 'upi' : 'card');
  const [amount, setAmount] = useState<number>(region === 'in' ? 249900 : 5900); // minor units
  const [productName, setProductName] = useState(region === 'in' ? 'Stripe India SaaS Subscription' : 'Standard SaaS Subscription');
  const [customerEmail, setCustomerEmail] = useState('rahul.sharma@example.com');
  const [customerName, setCustomerName] = useState('Rahul Sharma');
  
  // Card states
  const [cardNumber, setCardNumber] = useState('6074 •••• •••• 9812');
  const [exp, setExp] = useState('12/28');
  const [cvc, setCvc] = useState('123');
  const [postal, setPostal] = useState('400001');

  // UPI state
  const [upiId, setUpiId] = useState('rahul@okhdfcbank');

  // Netbanking state
  const [bankName, setBankName] = useState('HDFC Bank');
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<PaymentIntentResponse | null>(null);
  const [showJson, setShowJson] = useState(false);

  useEffect(() => {
    if (region === 'in') {
      setSelectedCurrency('inr');
      setMethod('upi');
      setAmount(249900);
      setProductName('Stripe India SaaS Subscription');
      setCardNumber('6074 •••• •••• 9812');
      setPostal('400001');
    } else {
      setSelectedCurrency('usd');
      setMethod('card');
      setAmount(5900);
      setProductName('Standard SaaS Subscription');
      setCardNumber('4242 •••• •••• 4242');
      setPostal('94103');
    }
  }, [region]);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    setResult(null);

    // Simulate card decline if card ends with 0002
    if (method === 'card' && cardNumber.endsWith('0002')) {
      setTimeout(() => {
        setIsLoading(false);
        setErrorMsg('Your card was declined: Insufficient funds (card_declined: insufficient_funds).');
      }, 600);
      return;
    }

    try {
      const res = await mockStripeApi.createPaymentIntent({
        amount,
        currency: selectedCurrency,
        paymentMethod: method,
        customerEmail,
        description: productName,
        upiId: method === 'upi' ? upiId : undefined,
        bankName: method === 'netbanking' ? bankName : undefined
      });
      setResult(res);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Payment simulation failed');
    } finally {
      setIsLoading(false);
    }
  };

  const loadPreset = (type: 'upi' | 'rupay' | 'global_card' | 'decline' | 'enterprise_inr') => {
    setErrorMsg(null);
    setResult(null);
    if (type === 'upi') {
      setSelectedCurrency('inr');
      setMethod('upi');
      setAmount(249900);
      setUpiId('rahul@okhdfcbank');
      setProductName('UPI Instant Collect');
    } else if (type === 'rupay') {
      setSelectedCurrency('inr');
      setMethod('card');
      setCardNumber('6074 •••• •••• 9812');
      setAmount(499900);
      setProductName('RuPay Domestic Debit');
    } else if (type === 'global_card') {
      setSelectedCurrency('usd');
      setMethod('card');
      setCardNumber('4242 •••• •••• 4242');
      setAmount(5900);
      setProductName('Global Visa / Mastercard');
    } else if (type === 'decline') {
      setSelectedCurrency('inr');
      setMethod('card');
      setCardNumber('6074 •••• •••• 0002');
      setAmount(249900);
      setProductName('Declined Charge Test');
    } else if (type === 'enterprise_inr') {
      setSelectedCurrency('inr');
      setMethod('netbanking');
      setBankName('State Bank of India');
      setAmount(25000000); // ₹2,50,000
      setProductName('Enterprise Corporate Netbanking');
    }
  };

  const formatDisplayAmount = (cents: number, cur: 'inr' | 'usd') => {
    if (cur === 'inr') {
      return `₹${(cents / 100).toLocaleString('en-IN')}`;
    }
    return `$${(cents / 100).toFixed(2)}`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Stripe Checkout & Elements Simulator"
      subtitle="Test live end-to-end payment authorization with simulated mock API"
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Test Preset Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-semibold shrink-0">Test Scenarios:</span>
          <button
            type="button"
            onClick={() => loadPreset('upi')}
            className={`px-2.5 py-1 rounded-full font-medium cursor-pointer transition-colors shrink-0 ${
              method === 'upi' ? 'bg-[#635bff] text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            🇮🇳 UPI (Instant VPA)
          </button>
          <button
            type="button"
            onClick={() => loadPreset('rupay')}
            className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium cursor-pointer transition-colors shrink-0"
          >
            🇮🇳 RuPay Card (6074)
          </button>
          <button
            type="button"
            onClick={() => loadPreset('global_card')}
            className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium cursor-pointer transition-colors shrink-0"
          >
            🌐 Visa/MC ($59.00)
          </button>
          <button
            type="button"
            onClick={() => loadPreset('enterprise_inr')}
            className="px-2.5 py-1 rounded-full bg-indigo-50 hover:bg-indigo-100 text-[#635bff] font-medium cursor-pointer transition-colors shrink-0"
          >
            🇮🇳 Netbanking (₹2.5L)
          </button>
          <button
            type="button"
            onClick={() => loadPreset('decline')}
            className="px-2.5 py-1 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 font-medium cursor-pointer transition-colors shrink-0"
          >
            ✕ Insufficient Funds (0002)
          </button>
        </div>

        {result ? (
          /* Success Screen */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#0a2540]">Transaction Succeeded</h3>
              <p className="text-sm text-slate-500 mt-1">
                Authorized {formatDisplayAmount(result.amount, selectedCurrency)} via Stripe Payments
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-mono space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-slate-400">PaymentIntent:</span>
                <span className="font-bold text-[#0a2540]">{result.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Method Type:</span>
                <span className="font-bold text-[#0a2540] uppercase">{result.payment_method_types[0]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Charge Receipt:</span>
                <span className="text-[#635bff] truncate max-w-[280px]">
                  {result.charges.data[0]?.receipt_url}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="font-bold text-emerald-600 uppercase">{result.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Seller Message:</span>
                <span className="text-slate-700 font-semibold">{result.charges.data[0]?.outcome.seller_message}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setShowJson(!showJson)}
                className="text-xs font-semibold text-[#635bff] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5" />
                {showJson ? 'Hide JSON' : 'Inspect API JSON'}
              </button>
              <button
                onClick={() => setResult(null)}
                className="text-xs font-semibold text-slate-600 hover:text-[#0a2540] flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Run Another Test
              </button>
            </div>

            {showJson && (
              <div className="text-left bg-[#0a2540] text-emerald-300 p-4 rounded-2xl text-xs font-mono max-h-56 overflow-y-auto border border-slate-800">
                <pre>{JSON.stringify(result, null, 2)}</pre>
              </div>
            )}
          </div>
        ) : (
          /* Form Screen */
          <form onSubmit={handlePay} className="space-y-4">
            {/* Order Preview */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Item</span>
                <span className="text-sm font-bold text-[#0a2540]">{productName}</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Amount</span>
                <span className="text-lg font-black text-[#0a2540]">
                  {formatDisplayAmount(amount, selectedCurrency)}
                </span>
              </div>
            </div>

            {/* Method selector */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setMethod('upi')}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                  method === 'upi' ? 'border-[#635bff] bg-[#635bff]/10 text-[#635bff]' : 'border-slate-200 text-slate-600'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>UPI (GPay/PhonePe)</span>
              </button>
              <button
                type="button"
                onClick={() => setMethod('card')}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                  method === 'card' ? 'border-[#635bff] bg-[#635bff]/10 text-[#635bff]' : 'border-slate-200 text-slate-600'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>RuPay / Card</span>
              </button>
              <button
                type="button"
                onClick={() => setMethod('netbanking')}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                  method === 'netbanking' ? 'border-[#635bff] bg-[#635bff]/10 text-[#635bff]' : 'border-slate-200 text-slate-600'
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>Netbanking</span>
              </button>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Customer Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#635bff]/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Customer Email</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#635bff]/30"
                />
              </div>
            </div>

            {/* UPI details */}
            {method === 'upi' && (
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Virtual Payment Address (VPA / UPI ID)</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  required
                  placeholder="name@bank or mobile@upi"
                  className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#635bff]/30"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Simulated approval will automatically route via NPCI switch.
                </span>
              </div>
            )}

            {/* Netbanking details */}
            {method === 'netbanking' && (
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Bank Name</label>
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#635bff]/30"
                >
                  <option value="HDFC Bank">HDFC Bank</option>
                  <option value="ICICI Bank">ICICI Bank</option>
                  <option value="State Bank of India">State Bank of India (SBI)</option>
                  <option value="Axis Bank">Axis Bank</option>
                  <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                </select>
              </div>
            )}

            {/* Card Information */}
            {method === 'card' && (
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Card details</label>
                <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#635bff]/30">
                  <div className="px-3 py-2 flex items-center border-b border-slate-200">
                    <CreditCard className="w-4 h-4 text-slate-400 mr-2" />
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      required
                      className="w-full text-xs bg-transparent focus:outline-none font-mono"
                      placeholder="Card number"
                    />
                  </div>
                  <div className="grid grid-cols-3 divide-x divide-slate-200">
                    <input
                      type="text"
                      value={exp}
                      onChange={(e) => setExp(e.target.value)}
                      required
                      placeholder="MM / YY"
                      className="px-3 py-2 text-xs bg-transparent focus:outline-none font-mono"
                    />
                    <input
                      type="text"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      required
                      placeholder="CVC"
                      className="px-3 py-2 text-xs bg-transparent focus:outline-none font-mono"
                    />
                    <input
                      type="text"
                      value={postal}
                      onChange={(e) => setPostal(e.target.value)}
                      required
                      placeholder="PIN / ZIP"
                      className="px-3 py-2 text-xs bg-transparent focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-[#635bff] hover:bg-[#0a2540] text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing Authorization...</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Authorize {formatDisplayAmount(amount, selectedCurrency)}</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </Modal>
  );
};
