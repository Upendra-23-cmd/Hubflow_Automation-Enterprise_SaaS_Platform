const logger = require('../utils/logger');

class WhatsAppService {
  /**
   * Mock WhatsApp Cloud API / Twilio Message Dispatcher
   */
  async sendMessage({ to, message }) {
    logger.info(`[WhatsApp Service] Mock sending WhatsApp message to: ${to}`);
    // Simulate network delay for enterprise gateway dispatch
    await new Promise((resolve) => setTimeout(resolve, 100));

    return {
      status: 'SENT',
      messageId: `wamid_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      recipient: to,
      timestamp: new Date().toISOString(),
    };
  }
}

module.exports = new WhatsAppService();
