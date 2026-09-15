const { body } = require('express-validator');

const createCampaignValidator = [
  body('name').trim().notEmpty().withMessage('Campaign name is required'),
  body('message').trim().notEmpty().withMessage('Campaign message content is required'),
  body('scheduledAt')
    .optional()
    .isISO8601()
    .withMessage('Scheduled date must be a valid ISO8601 string'),
  body('status')
    .optional()
    .isIn(['DRAFT', 'SCHEDULED', 'PROCESSING', 'COMPLETED', 'FAILED'])
    .withMessage('Invalid campaign status'),
  body('targetTags').optional().isString().withMessage('targetTags must be a string'),
];

const updateCampaignValidator = [
  body('name').optional().trim().notEmpty().withMessage('Campaign name cannot be empty'),
  body('message').optional().trim().notEmpty().withMessage('Message cannot be empty'),
  body('scheduledAt')
    .optional()
    .isISO8601()
    .withMessage('Scheduled date must be a valid ISO8601 string'),
  body('status')
    .optional()
    .isIn(['DRAFT', 'SCHEDULED', 'PROCESSING', 'COMPLETED', 'FAILED'])
    .withMessage('Invalid campaign status'),
  body('targetTags').optional().isString().withMessage('targetTags must be a string'),
];

module.exports = {
  createCampaignValidator,
  updateCampaignValidator,
};
