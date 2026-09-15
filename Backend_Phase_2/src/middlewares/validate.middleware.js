const { validationResult } = require('express-validator');
const { sendError } = require('../utils/response.utils');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorArray = errors.array().map((err) => `${err.path}: ${err.msg}`);
    return sendError(res, 'Validation failed for request parameters', 400, errorArray);
  }
  next();
};

module.exports = validate;
