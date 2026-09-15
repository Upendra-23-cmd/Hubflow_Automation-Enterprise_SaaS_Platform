import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useToast } from '../../context/ToastContext';
import { apiService, SimulationResult } from '../../services/apiService';
import { WORKFLOW_SCENARIOS } from '../../data/mockData';
import { ExecutionLog, WorkflowNode } from '../../types';
import {
  Play,
  CheckCircle2,
  AlertCircle,
  Clock,
  Code2,
  Terminal,
  Settings,
  Sparkles,
  RotateCcw,
  Zap,
  ArrowRight,
  Database,
  Webhook,
  Cpu,
  MessageSquare,
  Inbox,
  AlertTriangle,
  Mail,
  ShoppingBag,
  Layers,
  DollarSign,
  Truck,
  GitFork,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Copy,
  Check,
  Activity,
  Sliders,
  Share2,
  FileCode,
  ListOrdered,
  Workflow as WorkflowIcon,
  PlayCircle,
  ChevronRight,
} from 'lucide-react';

export const WorkflowSimulatorSection: React.FC = () => {
  const { showToast } = useToast();
  const [activeScenarioId, setActiveScenarioId] = useState<string>(
    WORKFLOW_SCENARIOS[0].id
  );
  const [isRunning, setIsRunning] = useState(false);
  const [currentNodeIndex, setCurrentNodeIndex] = useState<number | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(
    WORKFLOW_SCENARIOS[0].nodes[0].id
  );
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(
    null
  );
  const [activeLogs, setActiveLogs] = useState<ExecutionLog[]>([]);
  const [activeTab, setActiveTab] = useState<'config' | 'logs' | 'payload'>('config');
  const [viewMode, setViewMode] = useState<'canvas' | 'waterfall' | 'yaml'>('canvas');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [copiedYaml, setCopiedYaml] = useState(false);
  const [isSingleStepRunning, setIsSingleStepRunning] = useState<string | null>(null);
  const [executionSpeed, setExecutionSpeed] = useState<'1x' | '2x'>('1x');

  const currentScenario =
    WORKFLOW_SCENARIOS.find((s) => s.id === activeScenarioId) ||
    WORKFLOW_SCENARIOS[0];

  const selectedNode =
    currentScenario.nodes.find((n) => n.id === selectedNodeId) ||
    currentScenario.nodes[0];

  const handleSelectScenario = (id: string) => {
    if (isRunning) return;
    setActiveScenarioId(id);
    const scenario = WORKFLOW_SCENARIOS.find((s) => s.id === id);
    if (scenario) {
      setSelectedNodeId(scenario.nodes[0].id);
    }
    setSimulationResult(null);
    setActiveLogs([]);
    setCurrentNodeIndex(null);
  };

  const handleRunSimulation = async () => {
    if (isRunning) return;

    setIsRunning(true);
    setCurrentNodeIndex(0);
    setActiveLogs([]);
    setSimulationResult(null);

    try {
      const res = await apiService.runWorkflowSimulation(
        activeScenarioId,
        (stepIndex, log) => {
          setCurrentNodeIndex(stepIndex);
          setActiveLogs((prev) => [...prev, log]);
          if (currentScenario.nodes[stepIndex]) {
            setSelectedNodeId(currentScenario.nodes[stepIndex].id);
          }
        }
      );

      if (res.success && res.data) {
        setSimulationResult(res.data);
        setActiveLogs(res.data.logs);
        setCurrentNodeIndex(null);
        showToast(
          'success',
          'Pipeline Executed Successfully',
          `All ${res.data.completedNodes.length} nodes completed in ${res.data.totalDurationMs}ms with zero dropped payloads.`
        );
      } else {
        showToast('error', 'Execution Error', res.error || 'Failed to run simulation.');
      }
    } catch {
      showToast('error', 'Simulation Failed', 'An unexpected error occurred.');
    } finally {
      setIsRunning(false);
      setCurrentNodeIndex(null);
    }
  };

  // Test an individual step in isolation
  const handleTestSingleNode = (node: WorkflowNode) => {
    if (isRunning || isSingleStepRunning) return;
    setIsSingleStepRunning(node.id);
    setSelectedNodeId(node.id);
    setActiveTab('logs');

    const testLog: ExecutionLog = {
      id: `test-${Date.now()}`,
      nodeId: node.id,
      timestamp: new Date().toLocaleTimeString(),
      level: 'info',
      message: `[ISOLATED TEST] Emitting mock payload into ${node.service}...`,
    };
    setActiveLogs((prev) => [...prev, testLog]);

    setTimeout(() => {
      const successLog: ExecutionLog = {
        id: `test-succ-${Date.now()}`,
        nodeId: node.id,
        timestamp: new Date().toLocaleTimeString(),
        level: 'success',
        message: `[TEST 200 OK] Node executed in ${node.executionTimeMs}ms. Output schema verified.`,
        payload: node.outputSample,
      };
      setActiveLogs((prev) => [...prev, successLog]);
      setIsSingleStepRunning(null);
      showToast('success', 'Step Test Succeeded', `${node.title} passed schema checks in ${node.executionTimeMs}ms.`);
    }, 600);
  };

  const handleReset = () => {
    if (isRunning) return;
    setSimulationResult(null);
    setActiveLogs([]);
    setCurrentNodeIndex(null);
  };

  const handleCopyYaml = () => {
    const yamlContent = `version: "3.4"
name: "${currentScenario.name}"
category: "${currentScenario.category}"
concurrency:
  max_parallel_workers: 16
  timeout: 30000ms
  dlq_enabled: true

trigger:
  type: webhook
  endpoint: "${currentScenario.nodes[0].config?.endpoint || '/v1/inbound'}"
  auth: hmac_sha256

steps:
${currentScenario.nodes
  .map(
    (n, idx) => `  - id: step_${idx + 1}_${n.type}
    name: "${n.title}"
    service: "${n.service}"
    type: "${n.type}"
    retry_policy:
      max_retries: 3
      backoff: exponential_jitter
    config:
${Object.entries(n.config || {})
  .map(([k, v]) => `      ${k}: "${v}"`)
  .join('\n')}`
  )
  .join('\n\n')}
`;
    navigator.clipboard.writeText(yamlContent);
    setCopiedYaml(true);
    setTimeout(() => setCopiedYaml(false), 2000);
    showToast('info', 'YAML Copied', 'Declarative workflow spec copied to clipboard.');
  };

  // Node type styling helpers
  const getNodeTypeBadge = (type: WorkflowNode['type']) => {
    switch (type) {
      case 'trigger':
        return {
          label: 'TRIGGER',
          color: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
          accent: '#F97316',
        };
      case 'ai':
        return {
          label: 'AI REASONING',
          color: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
          accent: '#A855F7',
        };
      case 'condition':
        return {
          label: 'ROUTER / FILTER',
          color: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
          accent: '#06B6D4',
        };
      case 'action':
        return {
          label: 'SYNC & WRITE',
          color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
          accent: '#10B981',
        };
      case 'notification':
        return {
          label: 'DISPATCH',
          color: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
          accent: '#6366F1',
        };
      default:
        return {
          label: 'ACTION',
          color: 'bg-slate-800 text-slate-300 border-slate-700',
          accent: '#64748B',
        };
    }
  };

  // Icon resolver
  const getNodeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Webhook':
        return <Webhook className="w-4 h-4 text-orange-400" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-purple-400" />;
      case 'Database':
        return <Database className="w-4 h-4 text-emerald-400" />;
      case 'MessageSquare':
        return <MessageSquare className="w-4 h-4 text-indigo-400" />;
      case 'GitFork':
        return <GitFork className="w-4 h-4 text-cyan-400" />;
      case 'Inbox':
        return <Inbox className="w-4 h-4 text-blue-400" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-purple-400" />;
      case 'AlertTriangle':
        return <AlertTriangle className="w-4 h-4 text-rose-400" />;
      case 'Mail':
        return <Mail className="w-4 h-4 text-sky-400" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-4 h-4 text-emerald-400" />;
      case 'Layers':
        return <Layers className="w-4 h-4 text-indigo-400" />;
      case 'DollarSign':
        return <DollarSign className="w-4 h-4 text-amber-400" />;
      case 'Truck':
        return <Truck className="w-4 h-4 text-teal-400" />;
      default:
        return <Zap className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <section id="studio" className="py-20 md:py-28 relative scroll-mt-20 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 mb-4">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            <span>INTERACTIVE WORKFLOW STUDIO & TRACE INSPECTOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-1">
            Simulate, Inspect, and Replay Execution Graphs
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-4 leading-relaxed">
            Test enterprise pipelines across inbound webhooks, frontier AI reasoning,
            branching logic, and SaaS data sync with deterministic low latency.
          </p>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {WORKFLOW_SCENARIOS.map((scenario) => {
            const isActive = scenario.id === activeScenarioId;
            return (
              <button
                key={scenario.id}
                id={`scenario-tab-${scenario.id}`}
                onClick={() => handleSelectScenario(scenario.id)}
                disabled={isRunning}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-orange-600 text-white border-orange-500 shadow-md shadow-orange-600/25'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border-slate-800 hover:border-slate-700'
                } disabled:opacity-50`}
              >
                <span>{scenario.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-mono ${
                    isActive
                      ? 'bg-white/20 text-white font-bold'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {scenario.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Studio Workspace Container */}
        <div className="rounded-3xl border border-slate-800 bg-slate-950/90 shadow-2xl shadow-slate-950/80 overflow-hidden backdrop-blur-xl">
          {/* Top Control Header Bar */}
          <div className="p-4 sm:px-6 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
            {/* Left: Studio Breadcrumbs & State */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-slate-600">|</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">
                  mesh://flow/{currentScenario.id}
                </span>
                <Badge variant="emerald" size="sm" className="hidden sm:inline-flex">
                  Active v3.4
                </Badge>
              </div>
            </div>

            {/* Middle: Studio View Mode Toggles */}
            <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs font-medium">
              <button
                id="view-mode-canvas"
                onClick={() => setViewMode('canvas')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'canvas'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <WorkflowIcon className="w-3.5 h-3.5 text-orange-400" />
                <span>Canvas Graph</span>
              </button>
              <button
                id="view-mode-waterfall"
                onClick={() => setViewMode('waterfall')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'waterfall'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ListOrdered className="w-3.5 h-3.5 text-indigo-400" />
                <span>Waterfall Gantt</span>
              </button>
              <button
                id="view-mode-yaml"
                onClick={() => setViewMode('yaml')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'yaml'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                <span>YAML Spec</span>
              </button>
            </div>

            {/* Right: Studio Simulation Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {simulationResult && (
                <button
                  id="reset-simulation-btn"
                  onClick={handleReset}
                  disabled={isRunning}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Reset pipeline simulation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}

              <Button
                id="run-simulation-btn"
                variant="accent"
                size="sm"
                onClick={handleRunSimulation}
                isLoading={isRunning}
                leftIcon={<Play className="w-3.5 h-3.5 fill-white" />}
              >
                {isRunning
                  ? `Executing Step ${currentNodeIndex !== null ? currentNodeIndex + 1 : ''}/${currentScenario.nodes.length}...`
                  : 'Run Pipeline Simulation'}
              </Button>
            </div>
          </div>

          {/* Main Studio Body: Canvas / Waterfall / Code + Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
            {/* Left Column: Canvas / Waterfall / YAML View (lg:col-span-7 or 8) */}
            <div
              className={`lg:col-span-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 ${
                showGrid ? 'canvas-grid-pattern' : 'bg-slate-950/60'
              } p-4 sm:p-6 relative overflow-x-auto`}
            >
              {/* Canvas Controls Floating Bar */}
              <div className="flex items-center justify-between mb-4 z-20">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    {viewMode === 'canvas' && 'Visual Flowchart Topology'}
                    {viewMode === 'waterfall' && 'Execution Latency Waterfall'}
                    {viewMode === 'yaml' && 'Declarative Workflow DSL'}
                  </span>
                  <Badge variant="slate" size="sm">
                    {currentScenario.nodes.length} Connected Nodes
                  </Badge>
                </div>

                {/* Canvas zoom & display toolbar */}
                {viewMode === 'canvas' && (
                  <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 rounded-lg p-1 text-xs text-slate-400">
                    <button
                      onClick={() => setZoomLevel((z) => Math.max(70, z - 10))}
                      className="p-1 hover:text-white hover:bg-slate-800 rounded transition-colors"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-1.5 font-mono text-[11px] text-slate-300">
                      {zoomLevel}%
                    </span>
                    <button
                      onClick={() => setZoomLevel((z) => Math.min(130, z + 10))}
                      className="p-1 hover:text-white hover:bg-slate-800 rounded transition-colors"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-slate-700">|</span>
                    <button
                      onClick={() => setShowGrid(!showGrid)}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                        showGrid ? 'text-orange-400 bg-orange-500/10' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Grid
                    </button>
                  </div>
                )}
              </div>

              {/* VIEW 1: Authentic Automation Canvas Graph (Make.com & n8n style) */}
              {viewMode === 'canvas' && (
                <div
                  className="flex-1 flex flex-col justify-center transition-transform duration-200 origin-top-left"
                  style={{ transform: `scale(${zoomLevel / 100})` }}
                >
                  <div className="space-y-4 relative py-2">
                    {currentScenario.nodes.map((node, index) => {
                      const isSelected = node.id === selectedNodeId;
                      const isCurrentlyExecuting =
                        (currentNodeIndex === index && isRunning) ||
                        isSingleStepRunning === node.id;
                      const isCompleted =
                        simulationResult !== null ||
                        (currentNodeIndex !== null && index < currentNodeIndex);
                      const typeBadge = getNodeTypeBadge(node.type);

                      return (
                        <div key={node.id} className="relative">
                          {/* SVG Connection Cable between sequential nodes */}
                          {index < currentScenario.nodes.length - 1 && (
                            <div className="absolute left-8 top-14 bottom-[-18px] w-4 -translate-x-1/2 z-0 pointer-events-none">
                              <svg className="w-full h-full" preserveAspectRatio="none">
                                <line
                                  x1="50%"
                                  y1="0%"
                                  x2="50%"
                                  y2="100%"
                                  stroke={isCompleted ? '#10B981' : isCurrentlyExecuting ? '#F97316' : '#334155'}
                                  strokeWidth="2.5"
                                  strokeDasharray={isCurrentlyExecuting ? '4 4' : 'none'}
                                  className={isCurrentlyExecuting ? 'animate-flow-dash' : ''}
                                />
                              </svg>
                            </div>
                          )}

                          {/* Node Card Container */}
                          <div
                            id={`canvas-node-${node.id}`}
                            onClick={() => setSelectedNodeId(node.id)}
                            className={`relative z-10 p-4 rounded-2xl border transition-all duration-200 cursor-pointer select-none ${
                              isSelected
                                ? 'bg-slate-900 border-orange-500/90 shadow-xl shadow-orange-950/40 ring-1 ring-orange-500/50'
                                : 'bg-slate-900/80 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900'
                            } ${
                              isCurrentlyExecuting
                                ? 'ring-2 ring-orange-400 animate-pulse-glow shadow-orange-950/60'
                                : ''
                            }`}
                          >
                            {/* Input Port Socket (Left edge) */}
                            <div
                              className={`absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-colors flex items-center justify-center ${
                                isCompleted
                                  ? 'bg-slate-950 border-emerald-400'
                                  : isCurrentlyExecuting
                                  ? 'bg-slate-950 border-orange-400 ring-2 ring-orange-400/40'
                                  : 'bg-slate-950 border-slate-600'
                              }`}
                              title="Input Port (Webhook / Payload Ingress)"
                            >
                              <div
                                className={`w-1.5 h-1.5 rounded-full ${
                                  isCompleted ? 'bg-emerald-400' : isCurrentlyExecuting ? 'bg-orange-400' : 'bg-slate-600'
                                }`}
                              />
                            </div>

                            {/* Output Port Socket (Right edge) */}
                            <div
                              className={`absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-colors flex items-center justify-center ${
                                isCompleted
                                  ? 'bg-slate-950 border-emerald-400'
                                  : isCurrentlyExecuting
                                  ? 'bg-slate-950 border-orange-400 ring-2 ring-orange-400/40'
                                  : 'bg-slate-950 border-slate-600'
                              }`}
                              title="Output Port (Egress Payload Dispatch)"
                            >
                              <div
                                className={`w-1.5 h-1.5 rounded-full ${
                                  isCompleted ? 'bg-emerald-400' : isCurrentlyExecuting ? 'bg-orange-400' : 'bg-slate-600'
                                }`}
                              />
                            </div>

                            {/* Card Content */}
                            <div className="flex items-start justify-between gap-3">
                              {/* Left Icon & Information */}
                              <div className="flex items-start gap-3.5 min-w-0">
                                <div
                                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-transform ${
                                    isCompleted
                                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                      : isCurrentlyExecuting
                                      ? 'bg-orange-500/20 border-orange-500/40 text-orange-400 scale-105'
                                      : 'bg-slate-800/90 border-slate-700/80 text-slate-300'
                                  }`}
                                >
                                  {getNodeIcon(node.iconName)}
                                </div>

                                <div className="min-w-0 flex-1">
                                  {/* Step and Type badge */}
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                                      0{index + 1}
                                    </span>
                                    <span
                                      className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded font-bold border ${typeBadge.color}`}
                                    >
                                      {typeBadge.label}
                                    </span>
                                    <span className="text-xs text-slate-400 truncate">
                                      • {node.service}
                                    </span>
                                  </div>

                                  <h4 className="text-sm font-bold text-white mt-1 truncate">
                                    {node.title}
                                  </h4>
                                  <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                                    {node.description}
                                  </p>

                                  {/* Quick Parameter Tag Pills */}
                                  {node.config && (
                                    <div className="mt-2 flex flex-wrap gap-1.5">
                                      {Object.entries(node.config)
                                        .slice(0, 2)
                                        .map(([k, v]) => (
                                          <span
                                            key={k}
                                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-slate-400"
                                          >
                                            <span className="text-slate-500">{k}:</span>
                                            <span className="text-slate-300 truncate max-w-[110px]">
                                              {String(v)}
                                            </span>
                                          </span>
                                        ))}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Right Status / Test Step Action */}
                              <div className="flex flex-col items-end gap-2 shrink-0">
                                {isCurrentlyExecuting && (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-500/20 text-orange-300 border border-orange-500/30 text-[11px] font-mono font-bold animate-pulse">
                                    <Activity className="w-3 h-3 animate-spin" />
                                    Executing...
                                  </span>
                                )}

                                {isCompleted && (
                                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[11px] font-mono font-semibold">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                    {node.executionTimeMs}ms
                                  </span>
                                )}

                                {!isCurrentlyExecuting && !isCompleted && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleTestSingleNode(node);
                                    }}
                                    disabled={isRunning}
                                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-[11px] font-medium transition-colors cursor-pointer"
                                    title="Test this node in isolation"
                                  >
                                    <PlayCircle className="w-3 h-3 text-orange-400" />
                                    <span>Test Step</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* VIEW 2: Latency Waterfall (Gantt-style) */}
              {viewMode === 'waterfall' && (
                <div className="flex-1 py-4 space-y-4">
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400">
                    <p>
                      Industrial execution waterfall showing P95 execution duration, network
                      handshakes, and concurrency timing breakdown.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {currentScenario.nodes.map((node, idx) => {
                      const duration = node.executionTimeMs || 25;
                      const maxDuration = Math.max(
                        ...currentScenario.nodes.map((n) => n.executionTimeMs || 25)
                      );
                      const widthPercent = Math.max(12, Math.round((duration / maxDuration) * 85));

                      return (
                        <div
                          key={node.id}
                          className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-white">
                              0{idx + 1}. {node.title}
                            </span>
                            <span className="font-mono text-orange-400">
                              {duration}ms
                            </span>
                          </div>
                          {/* Visual Gantt Bar */}
                          <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden flex">
                            <div
                              style={{ width: `${widthPercent}%` }}
                              className="bg-gradient-to-r from-orange-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* VIEW 3: Declarative YAML Spec View */}
              {viewMode === 'yaml' && (
                <div className="flex-1 py-4 flex flex-col">
                  <div className="flex items-center justify-between pb-3">
                    <span className="text-xs text-slate-400 font-mono">
                      hubflow-pipeline.spec.yaml
                    </span>
                    <button
                      onClick={handleCopyYaml}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
                    >
                      {copiedYaml ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied Spec</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copy YAML</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="flex-1 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-indigo-300 overflow-x-auto leading-relaxed">
{`version: "3.4"
name: "${currentScenario.name}"
category: "${currentScenario.category}"
concurrency:
  max_parallel_workers: 16
  timeout: 30000ms
  dlq_enabled: true

trigger:
  type: webhook
  endpoint: "${currentScenario.nodes[0].config?.endpoint || '/v1/inbound'}"
  auth: hmac_sha256

steps:
${currentScenario.nodes
  .map(
    (n, idx) => `  - id: step_${idx + 1}_${n.type}
    name: "${n.title}"
    service: "${n.service}"
    type: "${n.type}"
    retry_policy:
      max_retries: 3
      backoff: exponential_jitter
    config:
${Object.entries(n.config || {})
  .map(([k, v]) => `      ${k}: "${v}"`)
  .join('\n')}`
  )
  .join('\n\n')}`}
                  </pre>
                </div>
              )}

              {/* Bottom Simulation Stats Footer Card */}
              {simulationResult && (
                <div className="mt-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-slate-300 font-medium">
                      Run Finished in:{' '}
                      <strong className="text-white font-mono">
                        {simulationResult.totalDurationMs}ms
                      </strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
                    <span>Tasks: {simulationResult.metrics.tasksCount}</span>
                    <span>•</span>
                    <span>Tokens: {simulationResult.metrics.tokensConsumed}</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-bold">
                      Saved: {simulationResult.metrics.estimatedCostSaved}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Node Inspector & Execution Terminal (lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col bg-slate-950">
              {/* Tab Selector */}
              <div className="flex items-center border-b border-slate-800 px-4 bg-slate-900/50">
                <button
                  id="tab-inspector"
                  onClick={() => setActiveTab('config')}
                  className={`px-4 py-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'config'
                      ? 'border-orange-500 text-white'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Settings className="w-3.5 h-3.5 text-orange-400" />
                  Parameters & Policy
                </button>
                <button
                  id="tab-logs"
                  onClick={() => setActiveTab('logs')}
                  className={`px-4 py-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'logs'
                      ? 'border-orange-500 text-white'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  Live Logs ({activeLogs.length})
                </button>
                <button
                  id="tab-payload"
                  onClick={() => setActiveTab('payload')}
                  className={`px-4 py-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'payload'
                      ? 'border-orange-500 text-white'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                  I/O Payload
                </button>
              </div>

              {/* Tab Contents */}
              <div className="p-5 flex-1 overflow-y-auto max-h-[520px]">
                {/* 1. Node Parameters & Policy Tab */}
                {activeTab === 'config' && selectedNode && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono uppercase text-orange-400 font-bold tracking-wider">
                          {selectedNode.type} Node
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          ID: {selectedNode.id}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white">
                        {selectedNode.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {selectedNode.description}
                      </p>

                      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                        <span className="text-xs text-slate-400">Isolated Testing</span>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleTestSingleNode(selectedNode)}
                          disabled={isRunning || !!isSingleStepRunning}
                          leftIcon={<Play className="w-3 h-3 text-orange-400" />}
                        >
                          {isSingleStepRunning === selectedNode.id ? 'Running...' : 'Test This Node'}
                        </Button>
                      </div>
                    </div>

                    {/* Industrial Node Policies */}
                    <div>
                      <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Reliability & Execution Policies
                      </h5>
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                          <span className="text-slate-500 text-[10px] block">RETRY POLICY</span>
                          <span className="text-white font-semibold">3x Backoff + Jitter</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                          <span className="text-slate-500 text-[10px] block">TIMEOUT GATE</span>
                          <span className="text-white font-semibold">5,000 ms</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                          <span className="text-slate-500 text-[10px] block">IDEMPOTENCY</span>
                          <span className="text-emerald-400 font-semibold">Strict Dedupe</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                          <span className="text-slate-500 text-[10px] block">DLQ ROUTE</span>
                          <span className="text-cyan-400 font-semibold">dlq.deadletter.v1</span>
                        </div>
                      </div>
                    </div>

                    {/* Node Config Table */}
                    {selectedNode.config && (
                      <div>
                        <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                          Step Parameters
                        </h5>
                        <div className="rounded-xl border border-slate-800 bg-slate-900/60 divide-y divide-slate-800 text-xs font-mono">
                          {Object.entries(selectedNode.config).map(([k, v]) => (
                            <div
                              key={k}
                              className="p-2.5 flex items-center justify-between gap-2"
                            >
                              <span className="text-slate-400">{k}</span>
                              <span className="text-orange-300 truncate max-w-[200px]">
                                {String(v)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Sample Output Payload */}
                    {selectedNode.outputSample && (
                      <div>
                        <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                          Output Payload Preview
                        </h5>
                        <pre className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-emerald-300 font-mono overflow-x-auto">
                          {JSON.stringify(selectedNode.outputSample, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. Logs Terminal Tab */}
                {activeTab === 'logs' && (
                  <div className="space-y-2">
                    {activeLogs.length === 0 ? (
                      <div className="text-center py-14 text-slate-500 text-xs">
                        <Terminal className="w-8 h-8 mx-auto mb-2 opacity-30 text-slate-400" />
                        Click "Run Pipeline Simulation" or "Test Step" to view live streaming telemetry logs.
                      </div>
                    ) : (
                      activeLogs.map((log) => (
                        <div
                          key={log.id}
                          className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs font-mono"
                        >
                          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                            <span>{log.timestamp}</span>
                            <span
                              className={`uppercase font-bold ${
                                log.level === 'success'
                                  ? 'text-emerald-400'
                                  : log.level === 'error'
                                  ? 'text-rose-400'
                                  : 'text-orange-400'
                              }`}
                            >
                              {log.level}
                            </span>
                          </div>
                          <div className="text-slate-200 leading-snug">{log.message}</div>
                          {log.payload && (
                            <pre className="mt-2 p-2 rounded bg-slate-950 text-[10px] text-slate-400 overflow-x-auto">
                              {JSON.stringify(log.payload, null, 2)}
                            </pre>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* 3. Raw Payload Tab */}
                {activeTab === 'payload' && (
                  <div className="space-y-3">
                    <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Inbound Event Payload (JSON)
                    </h5>
                    <pre className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-indigo-300 font-mono overflow-x-auto leading-relaxed">
                      {JSON.stringify(currentScenario.defaultPayload, null, 2)}
                    </pre>
                    <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-[11px] text-slate-400">
                      Payload is signed with HMAC-SHA256 and authenticated prior to entering the execution isolate.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
