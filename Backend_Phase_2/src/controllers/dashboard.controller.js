const dashboardService = require('../services/dashboard.service');
const { sendSuccess } = require('../utils/response.utils');

class DashboardController {
  async getStats(req, res, next) {
    try {
      const stats = await dashboardService.getStats(req.user.id);
      return sendSuccess(res, 'Dashboard statistics retrieved successfully', stats, 200);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DashboardController();
