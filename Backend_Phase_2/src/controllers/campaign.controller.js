const campaignService = require('../services/campaign.service');
const { sendSuccess } = require('../utils/response.utils');

class CampaignController {
  async createCampaign(req, res, next) {
    try {
      const campaign = await campaignService.createCampaign(req.user.id, req.body);
      return sendSuccess(res, 'Campaign created successfully', campaign, 201);
    } catch (error) {
      next(error);
    }
  }

  async getCampaigns(req, res, next) {
    try {
      const data = await campaignService.getCampaigns(req.user.id, req.query);
      return sendSuccess(res, 'Campaigns retrieved successfully', data, 200);
    } catch (error) {
      next(error);
    }
  }

  async getCampaignById(req, res, next) {
    try {
      const campaign = await campaignService.getCampaignById(req.params.id, req.user.id);
      return sendSuccess(res, 'Campaign details retrieved', campaign, 200);
    } catch (error) {
      next(error);
    }
  }

  async updateCampaign(req, res, next) {
    try {
      const campaign = await campaignService.updateCampaign(req.params.id, req.user.id, req.body);
      return sendSuccess(res, 'Campaign updated successfully', campaign, 200);
    } catch (error) {
      next(error);
    }
  }

  async deleteCampaign(req, res, next) {
    try {
      const result = await campaignService.deleteCampaign(req.params.id, req.user.id);
      return sendSuccess(res, result.message, null, 200);
    } catch (error) {
      next(error);
    }
  }

  async sendCampaign(req, res, next) {
    try {
      const result = await campaignService.sendCampaign(req.params.id, req.user.id);
      return sendSuccess(res, result.message, result, 200);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CampaignController();
