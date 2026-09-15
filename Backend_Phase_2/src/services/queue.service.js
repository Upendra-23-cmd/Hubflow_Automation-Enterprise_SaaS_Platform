const logger = require('../utils/logger');
const whatsappService = require('./whatsapp.service');
const campaignRepository = require('../repositories/campaign.repository');

class QueueService {
  /**
   * Queue processing engine simulation for campaign bulk delivery
   */
  async processCampaignJob(campaignId, userId, targetContacts, message) {
    logger.info(`[Queue Processor] Processing campaign job #${campaignId} for ${targetContacts.length} contacts`);

    // Asynchronously dispatch jobs without blocking response
    setImmediate(async () => {
      let sentCount = 0;
      let deliveredCount = 0;

      await campaignRepository.update(campaignId, userId, { status: 'PROCESSING' });

      for (const contact of targetContacts) {
        try {
          const res = await whatsappService.sendMessage({
            to: contact.phone,
            message: message.replace('{name}', contact.name || 'Valued Customer'),
          });

          if (res.status === 'SENT') {
            sentCount++;
            deliveredCount++;
          }
        } catch (err) {
          logger.error(`[Queue Processor] Failed sending to ${contact.phone}`, err.message);
        }
      }

      await campaignRepository.update(campaignId, userId, {
        status: 'COMPLETED',
        totalSent: sentCount,
        totalDelivered: deliveredCount,
      });

      logger.info(`[Queue Processor] Completed campaign job #${campaignId}. Sent: ${sentCount}, Delivered: ${deliveredCount}`);
    });
  }
}

module.exports = new QueueService();
