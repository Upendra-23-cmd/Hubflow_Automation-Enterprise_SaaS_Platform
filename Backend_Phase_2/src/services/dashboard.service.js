const contactRepository = require('../repositories/contact.repository');
const campaignRepository = require('../repositories/campaign.repository');

class DashboardService {
  async getStats(userId) {
    const [totalContacts, totalCampaigns, activeCampaigns] = await Promise.all([
      contactRepository.countByUserId(userId),
      campaignRepository.countByUserId(userId),
      campaignRepository.countActiveByUserId(userId),
    ]);

    return {
      totalContacts,
      totalCampaigns,
      activeCampaigns,
    };
  }
}

module.exports = new DashboardService();
