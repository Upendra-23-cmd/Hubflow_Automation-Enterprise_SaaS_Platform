import React, { useState } from 'react';
import { Check, Copy, Play } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
  onRun?: () => void;
  isExecuting?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  filename,
  onRun,
  isExecuting = false
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  // Basic syntax colorizer for keywords, strings, comments
  const renderHighlightedCode = (rawCode: string) => {
    const lines = rawCode.split('\n');
    return lines.map((line, idx) => {
      // Simple token styling
      let formatted = line
        .replace(/(\/\/.*$)/g, '<span class="text-slate-500 italic">$1</span>')
        .replace(/(#.*$)/g, '<span class="text-slate-500 italic">$1</span>')
        .replace(/\b(const|let|var|require|import|from|await|async|def|function|return|package|func)\b/g, '<span class="text-[#ff7b72]">$1</span>')
        .replace(/\b(stripe|PaymentIntent|payment_intents|paymentIntents)\b/g, '<span class="text-[#79c0ff] font-medium">$1</span>')
        .replace(/('([^']*)'|"([^"]*)")/g, '<span class="text-[#a5d6ff]">$1</span>')
        .replace(/\b(\d+)\b/g, '<span class="text-[#f2cc60]">$1</span>')
        .replace(/\b(true|false|nil|None)\b/g, '<span class="text-[#ff7b72]">$1</span>');

      return (
        <div key={idx} className="table-row font-mono text-[13px] leading-6">
          <span className="table-cell select-none pr-4 text-right text-slate-600 w-8 text-xs">{idx + 1}</span>
          <span 
            className="table-cell whitespace-pre text-slate-200" 
            dangerouslySetInnerHTML={{ __html: formatted }}
          />
        </div>
      );
    });
  };

  return (
    <div className="relative rounded-2xl bg-[#0a2540] border border-slate-700/60 shadow-2xl overflow-hidden font-mono">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#081f35] border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]/80" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/80" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]/80" />
          </div>
          {filename && (
            <span className="ml-3 text-xs text-slate-400 font-sans tracking-wide">
              {filename}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onRun && (
            <button
              onClick={onRun}
              disabled={isExecuting}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-sans font-medium rounded-md bg-[#635bff] hover:bg-[#7a73ff] text-white transition-all shadow-xs disabled:opacity-50 cursor-pointer active:scale-95"
              title="Test run with simulated mock API"
            >
              <Play className="w-3 h-3 fill-current" />
              {isExecuting ? 'Running...' : 'Test Request'}
            </button>
          )}

          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
            title="Copy code"
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Code Body */}
      <div className="p-4 overflow-x-auto">
        <div className="table min-w-full">
          {renderHighlightedCode(code)}
        </div>
      </div>
    </div>
  );
};
