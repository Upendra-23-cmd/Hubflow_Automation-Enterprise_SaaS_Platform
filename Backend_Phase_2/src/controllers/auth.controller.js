const authService = require('../services/auth.service');
const { sendSuccess } = require('../utils/response.utils');

class AuthController {
  async register(req, res, next) {
    try {
      const result = await authService.register(req.body);
      return sendSuccess(res, 'User registered successfully', result, 201);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const result = await authService.login(req.body);
      return sendSuccess(res, 'User logged in successfully', result, 200);
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const result = await authService.forgotPassword(req.body);
      return sendSuccess(res, result.message, result.mockOtp ? { mockOtp: result.mockOtp } : null, 200);
    } catch (error) {
      next(error);
    }
  }

  async verifyOtp(req, res, next) {
    try {
      const result = await authService.verifyOtp(req.body);
      return sendSuccess(res, result.message, null, 200);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
