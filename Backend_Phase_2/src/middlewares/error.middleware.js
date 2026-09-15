const logger = require('../utils/logger');
const { sendError } = require('../utils/response.utils');

const errorHandler = (err, req, res, next) => {
  logger.error(`[Unhandled Error] ${err.name}: ${err.message}`, err.stack);

  // Custom AppError
  if (err.isOperational) {
    return sendError(res, err.message, err.statusCode);
  }

  // Prisma Known Errors
  if (err.code === 'P2002') {
    return sendError(res, 'A record with this unique field already exists', 400);
  }
  if (err.code === 'P2025') {
    return sendError(res, 'Record to update/delete not found', 404);
  }

  // General 500 Server Error
  const message = process.env.NODE_ENV === 'development' ? err.message : 'Internal server error occurred';
  return sendError(res, message, 500);
};

module.exports = errorHandler;
