import React, { useState, useEffect } from 'react';
import { Terminal, Send, Check, Copy, RefreshCw, Layers, Shield, Play } from 'lucide-react';
import { Modal } from '../common/Modal';
import { mockStripeApi } from '../../services/mockApi';
import { ApiLogEntry } from '../../types';

interface ApiConsoleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AVAILABLE_ENDPOINTS = [
  { endpoint: '/v1/payment_intents', method: 'POST' as const, label: 'Create Payment Intent', defaultBody: { amount: 3500, currency: 'usd', automatic_payment_methods: { enabled: true } } },
  { endpoint: '/v1/payment_intents', method: 'GET' as const, label: 'List Recent Intents' },
  { endpoint: '/v1/customers', method: 'GET' as const, label: 'Retrieve Customer Record' },
  { endpoint: '/v1/balance', method: 'GET' as const, label: 'Fetch Multi-Currency Balances' },
  { endpoint: '/v1/exchange_rates', method: 'GET' as const, label: 'Get Real-Time FX Rates' }
];

export const ApiConsoleModal: React.FC<ApiConsoleModalProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedEndpointIdx, setSelectedEndpointIdx] = useState(0);
  const [requestBodyText, setRequestBodyText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [responseOutput, setResponseOutput] = useState<any>(null);
  const [responseHeaders, setResponseHeaders] = useState<Record<string, string>>({});
  const [latency, setLatency] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [logs, setLogs] = useState<ApiLogEntry[]>([]);

  const currentEndpoint = AVAILABLE_ENDPOINTS[selectedEndpointIdx];

  useEffect(() => {
    if (currentEndpoint.method === 'POST') {
      setRequestBodyText(JSON.stringify(currentEndpoint.defaultBody || {}, null, 2));
    } else {
      setRequestBodyText('');
    }
  }, [selectedEndpointIdx]);

  useEffect(() => {
    if (isOpen) {
      mockStripeApi.getApiLogs().then(setLogs);
    }
  }, [isOpen]);

  const handleSendRequest = async () => {
    setIsLoading(true);
    let parsedBody: any = undefined;
    if (currentEndpoint.method === 'POST' && requestBodyText.trim()) {
      try {
        parsedBody = JSON.parse(requestBodyText);
      } catch (err) {
        parsedBody = { error: 'Invalid JSON' };
      }
    }

    try {
      const res = await mockStripeApi.runEndpoint(
        currentEndpoint.endpoint,
        currentEndpoint.method,
        parsedBody
      );
      setResponseOutput(res.data);
      setLatency(res.duration);
      setResponseHeaders({
        'content-type': 'application/json; charset=utf-8',
        'stripe-version': '2026-09-15',
        'access-control-allow-origin': '*',
        'x-stripe-request-id': `req_${Math.random().toString(36).substring(2, 9)}`
      });

      // Refresh log
      const updatedLogs = await mockStripeApi.getApiLogs();
      setLogs(updatedLogs);
    } catch (err: any) {
      setResponseOutput({ error: err?.message || 'Request failed' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!responseOutput) return;
    navigator.clipboard.writeText(JSON.stringify(responseOutput, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Stripe Developer REST API Console"
      subtitle="Interact with live simulated Stripe API endpoints, headers, and logs"
      maxWidth="3xl"
    >
      <div className="space-y-5">
        {/* Endpoint Selector Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="flex-1 flex items-center bg-slate-100 rounded-xl px-3 py-2 border border-slate-200">
            <span className={`text-xs font-mono font-bold mr-2 px-2 py-0.5 rounded ${
              currentEndpoint.method === 'POST' 
                ? 'bg-blue-600 text-white' 
                : 'bg-emerald-600 text-white'
            }`}>
              {currentEndpoint.method}
            </span>
            <select
              value={selectedEndpointIdx}
              onChange={(e) => setSelectedEndpointIdx(Number(e.target.value))}
              className="w-full bg-transparent text-xs font-mono text-[#0a2540] font-semibold focus:outline-none cursor-pointer"
            >
              {AVAILABLE_ENDPOINTS.map((ep, idx) => (
                <option key={idx} value={idx}>
                  {ep.endpoint} — {ep.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSendRequest}
            disabled={isLoading}
            className="px-4 py-2 bg-[#635bff] hover:bg-[#0a2540] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60 shadow-xs"
          >
            {isLoading ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            <span>Send Request</span>
          </button>
        </div>

        {/* Request Payload Editor (if POST) */}
        {currentEndpoint.method === 'POST' && (
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">
              Request Payload (JSON)
            </label>
            <textarea
              value={requestBodyText}
              onChange={(e) => setRequestBodyText(e.target.value)}
              rows={4}
              className="w-full p-3 font-mono text-xs bg-[#0a2540] text-slate-200 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-[#635bff]"
            />
          </div>
        )}

        {/* Response Viewer */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1.5">
            <div className="flex items-center gap-2">
              <span>Response Body</span>
              {latency && (
                <span className="text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  200 OK • {latency}ms
                </span>
              )}
            </div>
            {responseOutput && (
              <button
                onClick={handleCopy}
                className="text-[#635bff] hover:text-[#0a2540] flex items-center gap-1 cursor-pointer font-medium"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied' : 'Copy JSON'}
              </button>
            )}
          </div>

          <div className="bg-[#081f35] border border-slate-800 rounded-2xl p-4 font-mono text-xs text-emerald-300 max-h-60 overflow-y-auto shadow-inner">
            {responseOutput ? (
              <pre>{JSON.stringify(responseOutput, null, 2)}</pre>
            ) : (
              <div className="text-slate-500 italic py-6 text-center">
                Click "Send Request" to test this endpoint.
              </div>
            )}
          </div>
        </div>

        {/* Simulated Response Headers */}
        {Object.keys(responseHeaders).length > 0 && (
          <div className="text-[11px] font-mono text-slate-500 bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1">
            <span className="font-bold text-slate-600 block mb-1">HTTP Response Headers:</span>
            {Object.entries(responseHeaders).map(([k, v]) => (
              <div key={k} className="flex gap-2">
                <span className="text-slate-400">{k}:</span>
                <span className="text-slate-700">{v}</span>
              </div>
            ))}
          </div>
        )}

        {/* In-Memory Request History Log */}
        {logs.length > 0 && (
          <div className="border-t border-slate-200 pt-4">
            <h5 className="text-xs font-bold text-[#0a2540] mb-2">Recent API Request Audit Log</h5>
            <div className="space-y-1.5 max-h-32 overflow-y-auto">
              {logs.slice(0, 5).map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between text-[11px] font-mono p-2 rounded-lg bg-slate-50 border border-slate-200/70"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#635bff]">{log.method}</span>
                    <span className="text-[#0a2540]">{log.endpoint}</span>
                    <span className="text-emerald-600">{log.status}</span>
                  </div>
                  <div className="text-slate-400">
                    {log.durationMs}ms
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
