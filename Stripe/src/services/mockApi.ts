import { PaymentIntentRequest, PaymentIntentResponse, ApiLogEntry } from '../types';

// In-memory request log to simulate Stripe Dashboard API logs
let apiLogs: ApiLogEntry[] = [
  {
    id: 'req_init_99812a',
    method: 'POST',
    endpoint: '/v1/payment_intents',
    status: 200,
    durationMs: 142,
    timestamp: new Date(Date.now() - 360000).toISOString(),
    requestBody: { amount: 8900, currency: 'usd', payment_method_types: ['card'] },
    responseBody: { id: 'pi_3P0001LkdIwHu7ix01', status: 'succeeded', amount: 8900 }
  },
  {
    id: 'req_init_99812b',
    method: 'GET',
    endpoint: '/v1/balance',
    status: 200,
    durationMs: 98,
    timestamp: new Date(Date.now() - 180000).toISOString(),
    responseBody: { object: 'balance', available: [{ amount: 4529000, currency: 'usd' }] }
  }
];

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockStripeApi = {
  /**
   * Create a Payment Intent (simulates POST /v1/payment_intents)
   */
  async createPaymentIntent(payload: PaymentIntentRequest): Promise<PaymentIntentResponse> {
    const startTime = performance.now();
    await wait(280 + Math.random() * 120); // 280-400ms realistic network latency

    const randomId = Math.random().toString(36).substring(2, 10);
    const intentId = `pi_3P${randomId.toUpperCase()}LkdIwHu7ix`;
    const chargeId = `ch_1P${randomId.toUpperCase()}902KlM`;

    const sellerMsg = payload.paymentMethod === 'upi'
      ? `UPI payment authorized instantly via VPA ${payload.upiId || 'user@upi'}`
      : payload.paymentMethod === 'netbanking'
      ? `Netbanking payment completed via ${payload.bankName || 'HDFC Bank'}`
      : 'Payment complete.';

    const response: PaymentIntentResponse = {
      id: intentId,
      object: 'payment_intent',
      amount: payload.amount,
      amount_received: payload.amount,
      currency: payload.currency.toLowerCase(),
      status: 'succeeded',
      client_secret: `${intentId}_secret_${Math.random().toString(36).substring(2, 15)}`,
      created: Math.floor(Date.now() / 1000),
      payment_method_types: [payload.paymentMethod],
      charges: {
        data: [
          {
            id: chargeId,
            paid: true,
            receipt_url: `https://pay.stripe.com/receipts/acct_mock/${chargeId}`,
            outcome: {
              network_status: 'approved_by_network',
              risk_level: 'normal',
              seller_message: sellerMsg
            }
          }
        ]
      }
    };

    const duration = Math.round(performance.now() - startTime);

    apiLogs.unshift({
      id: `req_${Math.random().toString(36).substring(2, 9)}`,
      method: 'POST',
      endpoint: '/v1/payment_intents',
      status: 200,
      durationMs: duration,
      timestamp: new Date().toISOString(),
      requestBody: payload,
      responseBody: response
    });

    return response;
  },

  /**
   * Fetch Live API Logs
   */
  async getApiLogs(): Promise<ApiLogEntry[]> {
    await wait(100);
    return [...apiLogs];
  },

  /**
   * Calculate dynamic processing fees and volume breakdown
   */
  async calculateFees(
    monthlyVolume: number, 
    avgOrderValue: number, 
    internationalPercentage = 15,
    region: 'in' | 'global' = 'in'
  ) {
    await wait(120);
    const transactionsCount = avgOrderValue > 0 ? Math.round(monthlyVolume / avgOrderValue) : 0;
    
    const domesticPct = (100 - internationalPercentage) / 100;
    const intlPct = internationalPercentage / 100;
    const domesticVol = monthlyVolume * domesticPct;
    const intlVol = monthlyVolume * intlPct;

    let basePctFee = 0;
    let fixedFee = 0;
    let internationalFee = 0;
    let gstAmount = 0;

    if (region === 'in') {
      // Stripe India standard rates:
      // 2% for domestic cards, UPI, netbanking
      // 3% for international cards
      basePctFee = domesticVol * 0.02;
      internationalFee = intlVol * 0.03;
      fixedFee = 0;
      const subtotalFees = basePctFee + internationalFee;
      gstAmount = subtotalFees * 0.18; // 18% GST on processing fees in India
    } else {
      // US / Global standard rates: 2.9% + 30c + 1% for international
      basePctFee = monthlyVolume * 0.029;
      fixedFee = transactionsCount * 0.30;
      internationalFee = intlVol * 0.01;
      gstAmount = 0;
    }

    const totalFees = Math.round((basePctFee + fixedFee + internationalFee + gstAmount) * 100) / 100;
    const netVolume = Math.max(0, Math.round((monthlyVolume - totalFees) * 100) / 100);
    const effectiveRate = monthlyVolume > 0 ? ((totalFees / monthlyVolume) * 100).toFixed(2) : (region === 'in' ? '2.36' : '2.90');

    return {
      monthlyVolume,
      avgOrderValue,
      transactionsCount,
      totalFees,
      netVolume,
      effectiveRate,
      gstAmount: Math.round(gstAmount * 100) / 100,
      gst: Math.round(gstAmount * 100) / 100,
      domesticVolume: Math.round(domesticVol),
      intlVolume: Math.round(intlVol),
      savingsVsCompetitors: Math.round(monthlyVolume * 0.008) // Estimated 0.8% higher authorization lift
    };
  },

  /**
   * Execute an arbitrary mock endpoint for the Interactive Developer Console
   */
  async runEndpoint(endpoint: string, method: 'GET' | 'POST', body?: any) {
    const startTime = performance.now();
    await wait(200 + Math.random() * 100);

    let responseData: any;
    let status = 200;

    switch (endpoint) {
      case '/v1/payment_intents':
        if (method === 'POST') {
          const amt = body?.amount || 2000;
          const curr = body?.currency || 'usd';
          responseData = {
            id: `pi_3P${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
            object: 'payment_intent',
            amount: amt,
            currency: curr,
            status: 'succeeded',
            client_secret: `pi_mock_secret_${Math.random().toString(36).substring(2, 10)}`,
            created: Math.floor(Date.now() / 1000)
          };
        } else {
          responseData = {
            object: 'list',
            data: [
              { id: 'pi_3P9821LkdIw', amount: 4900, currency: 'usd', status: 'succeeded' },
              { id: 'pi_3P9822LkdIw', amount: 12500, currency: 'eur', status: 'succeeded' }
            ],
            has_more: false
          };
        }
        break;

      case '/v1/customers':
        responseData = {
          id: `cus_${Math.random().toString(36).substring(2, 10)}`,
          object: 'customer',
          email: body?.email || 'alex.chen@example.com',
          name: body?.name || 'Alex Chen',
          balance: 0,
          created: Math.floor(Date.now() / 1000),
          delinquent: false
        };
        break;

      case '/v1/balance':
        responseData = {
          object: 'balance',
          available: [
            { amount: 12845000, currency: 'usd', source_types: { card: 12845000 } },
            { amount: 4210000, currency: 'eur', source_types: { card: 4210000 } }
          ],
          livemode: true,
          pending: [
            { amount: 892000, currency: 'usd' }
          ]
        };
        break;

      case '/v1/exchange_rates':
        responseData = {
          object: 'exchange_rates',
          id: 'usd',
          rates: {
            eur: 0.92,
            gbp: 0.79,
            jpy: 154.20,
            cad: 1.36,
            aud: 1.52,
            inr: 83.45,
            sgd: 1.34
          }
        };
        break;

      default:
        responseData = {
          status: 'ok',
          message: `Endpoint ${endpoint} executed successfully in test mode.`,
          timestamp: new Date().toISOString()
        };
    }

    const duration = Math.round(performance.now() - startTime);

    apiLogs.unshift({
      id: `req_${Math.random().toString(36).substring(2, 9)}`,
      method,
      endpoint,
      status,
      durationMs: duration,
      timestamp: new Date().toISOString(),
      requestBody: body,
      responseBody: responseData
    });

    return {
      status,
      duration,
      data: responseData
    };
  }
};
