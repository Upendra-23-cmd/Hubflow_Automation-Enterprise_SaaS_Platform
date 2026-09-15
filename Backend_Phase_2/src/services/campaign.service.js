const campaignRepository = require('../repositories/campaign.repository');
const contactRepository = require('../repositories/contact.repository');
const queueService = require('./queue.service');
const AppError = require('../utils/appError');

class CampaignService {
  async createCampaign(userId, data) {
    return campaignRepository.create({
      ...data,
      userId,
    });
  }

  async getCampaigns(userId, query) {
    return campaignRepository.findAll(userId, query);
  }

  async getCampaignById(id, userId) {
    const campaign = await campaignRepository.findById(id, userId);
    if (!campaign) {
      throw new AppError('Campaign not found', 404);
    }
    return campaign;
  }

  async updateCampaign(id, userId, data) {
    await this.getCampaignById(id, userId);
    return campaignRepository.update(id, userId, data);
  }

  async deleteCampaign(id, userId) {
    await this.getCampaignById(id, userId);
    await campaignRepository.delete(id, userId);
    return { message: 'Campaign deleted successfully' };
  }

  async sendCampaign(id, userId) {
    const campaign = await this.getCampaignById(id, userId);

    if (campaign.status === 'COMPLETED' || campaign.status === 'PROCESSING') {
      throw new AppError(`Campaign is already in ${campaign.status} status`, 400);
    }

    // Fetch active target contacts
    const { contacts } = await contactRepository.findAll(userId, { status: 'ACTIVE', limit: 1000 });

    if (contacts.length === 0) {
      throw new AppError('No active target contacts found to dispatch campaign', 400);
    }

    // Dispatch async campaign processing queue job
    await queueService.processCampaignJob(campaign.id, userId, contacts, campaign.message);

    return {
      message: 'Campaign processing job queued successfully',
      campaignId: campaign.id,
      recipientCount: contacts.length,
    };
  }
}

module.exports = new CampaignService();
