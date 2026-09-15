import {
  ApiResponse,
  DemoBookingRequest,
  ExecutionLog,
  IntegrationCategory,
  IntegrationItem,
  SystemMetrics,
  TemplateItem,
  WorkflowNode,
} from '../types';
import {
  INTEGRATIONS_LIST,
  SYSTEM_METRICS_DATA,
  TEMPLATES_LIST,
  WORKFLOW_SCENARIOS,
} from '../data/mockData';

// Simulated artificial network latency helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface SimulationResult {
  scenarioId: string;
  executionId: string;
  status: 'completed' | 'failed';
  totalDurationMs: number;
  completedNodes: WorkflowNode[];
  logs: ExecutionLog[];
  metrics: {
    tasksCount: number;
    tokensConsumed: number;
    estimatedCostSaved: string;
  };
}

export const apiService = {
  /**
   * Fetch current global operational health and latency metrics
   */
  async getSystemMetrics(): Promise<ApiResponse<SystemMetrics>> {
    const startTime = performance.now();
    await delay(250); // realistic API latency

    // Add slight jitter for live heartbeat realism
    const jitterLatency = Math.floor(22 + Math.random() * 5);
    const updatedMetrics: SystemMetrics = {
      ...SYSTEM_METRICS_DATA,
      avgLatencyMs: jitterLatency,
      tasksProcessedToday: (
        18491208 + Math.floor(Math.random() * 500)
      ).toLocaleString(),
    };

    return {
      success: true,
      data: updatedMetrics,
      latencyMs: Math.round(performance.now() - startTime),
      message: 'System cluster operational across 8 regions.',
    };
  },

  /**
   * Fetch & filter integrations
   */
  async getIntegrations(
    query = '',
    category: IntegrationCategory = 'all'
  ): Promise<ApiResponse<IntegrationItem[]>> {
    const startTime = performance.now();
    await delay(180);

    let filtered = INTEGRATIONS_LIST;

    if (category !== 'all') {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.popularRecipes.some((r) => r.toLowerCase().includes(q))
      );
    }

    return {
      success: true,
      data: filtered,
      latencyMs: Math.round(performance.now() - startTime),
      message: `Retrieved ${filtered.length} integrations matching query.`,
    };
  },

  /**
   * Fetch templates with optional category filtering
   */
  async getTemplates(category = 'all'): Promise<ApiResponse<TemplateItem[]>> {
    const startTime = performance.now();
    await delay(150);

    let templates = TEMPLATES_LIST;
    if (category !== 'all') {
      templates = templates.filter(
        (t) => t.category.toLowerCase() === category.toLowerCase()
      );
    }

    return {
      success: true,
      data: templates,
      latencyMs: Math.round(performance.now() - startTime),
    };
  },

  /**
   * Run an asynchronous workflow pipeline execution simulation
   */
  async runWorkflowSimulation(
    scenarioId: string,
    onStepUpdate?: (nodeIndex: number, log: ExecutionLog) => void
  ): Promise<ApiResponse<SimulationResult>> {
    const startTime = performance.now();
    const scenario = WORKFLOW_SCENARIOS.find((s) => s.id === scenarioId);

    if (!scenario) {
      return {
        success: false,
        error: `Workflow scenario '${scenarioId}' not found.`,
        latencyMs: 10,
      };
    }

    const executionId = `exec_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;
    const logs: ExecutionLog[] = [];
    const completedNodes: WorkflowNode[] = [];

    // Step 0: Initializing pipeline
    const initialLog: ExecutionLog = {
      id: `log_init_${Date.now()}`,
      timestamp: new Date().toISOString().substring(11, 23),
      nodeId: 'gateway',
      level: 'info',
      message: `[Hubflow Engine] Booting pipeline execution context ${executionId} in region us-east-1.`,
    };
    logs.push(initialLog);

    let totalExecutionTime = 0;

    for (let i = 0; i < scenario.nodes.length; i++) {
      const node = scenario.nodes[i];
      const stepDuration = Math.floor(node.executionTimeMs || 80);
      totalExecutionTime += stepDuration;

      // Simulate node computation
      await delay(Math.min(stepDuration * 1.5, 400));

      const stepLog: ExecutionLog = {
        id: `log_${node.id}_${Date.now()}`,
        timestamp: new Date().toISOString().substring(11, 23),
        nodeId: node.id,
        level: 'success',
        message: `[${node.service}] Executed node "${node.title}" in ${stepDuration}ms with exit status 0 (OK).`,
        payload: node.outputSample,
      };

      logs.push(stepLog);

      const completedNode: WorkflowNode = {
        ...node,
        status: 'success',
        executionTimeMs: stepDuration,
      };
      completedNodes.push(completedNode);

      if (onStepUpdate) {
        onStepUpdate(i, stepLog);
      }
    }

    const finalLog: ExecutionLog = {
      id: `log_complete_${Date.now()}`,
      timestamp: new Date().toISOString().substring(11, 23),
      nodeId: 'completion',
      level: 'success',
      message: `Pipeline finished with 0 errors. All ${scenario.nodes.length} nodes resolved successfully. Total duration: ${totalExecutionTime}ms.`,
    };
    logs.push(finalLog);

    const result: SimulationResult = {
      scenarioId,
      executionId,
      status: 'completed',
      totalDurationMs: totalExecutionTime,
      completedNodes,
      logs,
      metrics: {
        tasksCount: scenario.nodes.length,
        tokensConsumed: scenario.nodes.some((n) => n.type === 'ai') ? 418 : 0,
        estimatedCostSaved: '$24.50',
      },
    };

    return {
      success: true,
      data: result,
      latencyMs: Math.round(performance.now() - startTime),
      message: `Pipeline execution ${executionId} succeeded.`,
    };
  },

  /**
   * Submit live enterprise demo booking request
   */
  async submitDemoRequest(
    request: DemoBookingRequest
  ): Promise<ApiResponse<{ confirmationId: string; meetingLink: string }>> {
    const startTime = performance.now();
    await delay(650); // realistic API processing

    // Validation
    if (!request.workEmail || !request.workEmail.includes('@')) {
      return {
        success: false,
        error: 'Please provide a valid work email address.',
        latencyMs: Math.round(performance.now() - startTime),
      };
    }

    if (!request.fullName.trim() || !request.companyName.trim()) {
      return {
        success: false,
        error: 'Full name and company name are required.',
        latencyMs: Math.round(performance.now() - startTime),
      };
    }

    const confirmationId = `DEMO-${Date.now().toString(36).toUpperCase()}`;

    // Store in localStorage for persistence
    try {
      const existing = JSON.parse(
        localStorage.getItem('hubflow_demo_requests') || '[]'
      );
      existing.push({
        ...request,
        confirmationId,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem('hubflow_demo_requests', JSON.stringify(existing));
    } catch {
      // ignore storage error if any
    }

    return {
      success: true,
      data: {
        confirmationId,
        meetingLink: 'https://cal.com/hubflow-automation/enterprise-architecture-review',
      },
      message: `Thank you, ${request.fullName.split(' ')[0]}! Your priority architecture review session has been reserved.`,
      latencyMs: Math.round(performance.now() - startTime),
    };
  },

  /**
   * Newsletter / Product updates subscription
   */
  async subscribeNewsletter(email: string): Promise<ApiResponse<{ email: string }>> {
    const startTime = performance.now();
    await delay(400);

    if (!email || !email.includes('@')) {
      return {
        success: false,
        error: 'Please enter a valid email address.',
        latencyMs: Math.round(performance.now() - startTime),
      };
    }

    return {
      success: true,
      data: { email },
      message: 'You are now subscribed to Hubflow Automation releases and engineering blogs.',
      latencyMs: Math.round(performance.now() - startTime),
    };
  },
};
