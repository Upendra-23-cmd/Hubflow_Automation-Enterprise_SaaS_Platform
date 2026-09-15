const aiService = require('../services/ai.service');
const { sendSuccess } = require('../utils/response.utils');

class AIController {
  async suggestMessage(req, res, next) {
    try {
      const suggestion = await aiService.suggestMessage(req.body);
      return sendSuccess(res, 'AI marketing copy suggested successfully', suggestion, 200);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AIController();
