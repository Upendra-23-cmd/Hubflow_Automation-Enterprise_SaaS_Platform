const { verifyToken } = require('../utils/jwt.utils');
const userRepository = require('../repositories/user.repository');
const { sendError } = require('../utils/response.utils');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, 'Authorization token missing or invalid format', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    const user = await userRepository.findById(decoded.id);
    if (!user) {
      return sendError(res, 'User associated with token no longer exists', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return sendError(res, 'Authentication token has expired', 401);
    }
    if (error.name === 'JsonWebTokenError') {
      return sendError(res, 'Invalid authentication token signature', 401);
    }
    return sendError(res, 'Authentication failed', 401);
  }
};

module.exports = authenticate;
