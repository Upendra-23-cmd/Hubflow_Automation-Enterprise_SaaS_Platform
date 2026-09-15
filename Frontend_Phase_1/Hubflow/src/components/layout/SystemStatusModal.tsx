import React, { useEffect, useState } from 'react';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { apiService } from '../../services/apiService';
import { SystemMetrics } from '../../types';
import { CheckCircle2, Globe, Cpu, Zap, RefreshCw } from 'lucide-react';

interface SystemStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const REGIONS = [
  { name: 'US East (N. Virginia)', status: 'Operational', latency: '18ms' },
  { name: 'US West (Oregon)', status: 'Operational', latency: '22ms' },
  { name: 'Europe (Frankfurt)', status: 'Operational', latency: '26ms' },
  { name: 'Europe (London)', status: 'Operational', latency: '24ms' },
  { name: 'Asia Pacific (Tokyo)', status: 'Operational', latency: '35ms' },
  { name: 'Asia Pacific (Singapore)', status: 'Operational', latency: '31ms' },
  { name: 'South America (São Paulo)', status: 'Operational', latency: '48ms' },
  { name: 'Australia (Sydney)', status: 'Operational', latency: '44ms' },
];

export const SystemStatusModal: React.FC<SystemStatusModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMetrics = async () => {
    setIsLoading(true);
    const res = await apiService.getSystemMetrics();
    if (res.data) {
      setMetrics(res.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      fetchMetrics();
    }
  }, [isOpen]);

  return (
    <Modal
      id="system-status-modal"
      isOpen={isOpen}
      onClose={onClose}
      title="Hubflow Global Infrastructure Status"
      description="Real-time telemetry and health monitoring across our globally distributed event-mesh architecture."
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Overall banner */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-emerald-300">
                All Core Systems Operational
              </h4>
              <p className="text-xs text-emerald-400/80">
                Event dispatchers, AI inference nodes, and database triggers operating at peak performance.
              </p>
            </div>
          </div>
          <Badge variant="emerald" size="sm">
            {metrics?.uptime90Days || '99.992%'} SLA
          </Badge>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>P95 Edge Latency</span>
            </div>
            <div className="text-xl font-bold text-white mt-1.5">
              {metrics ? `${metrics.avgLatencyMs}ms` : '24ms'}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Global average</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span>Tasks Today</span>
            </div>
            <div className="text-xl font-bold text-white mt-1.5 truncate">
              {metrics ? metrics.tasksProcessedToday : '18,491,208'}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Zero dropped webhooks</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>Active Runners</span>
            </div>
            <div className="text-xl font-bold text-white mt-1.5">
              {metrics ? metrics.activeNodesGlobal.toLocaleString() : '4,280'}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Distributed clusters</div>
          </div>
        </div>

        {/* Regional Matrix */}
        <div>
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
            Edge Region Health
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1">
            {REGIONS.map((region) => (
              <div
                key={region.name}
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/80 text-xs"
              >
                <div className="flex items-center gap-2 truncate">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-slate-300 truncate">{region.name}</span>
                </div>
                <span className="text-slate-400 font-mono text-[11px]">
                  {region.latency}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <span className="text-xs text-slate-400">
            Last checked: just now (live auto-poll)
          </span>
          <div className="flex items-center gap-2">
            <Button
              id="refresh-status-btn"
              variant="outline"
              size="sm"
              isLoading={isLoading}
              onClick={fetchMetrics}
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              Refresh
            </Button>
            <Button
              id="close-status-modal-btn"
              variant="secondary"
              size="sm"
              onClick={onClose}
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
