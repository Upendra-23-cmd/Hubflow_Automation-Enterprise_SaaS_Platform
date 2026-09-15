const { body } = require('express-validator');

const createContactValidator = [
  body('name').trim().notEmpty().withMessage('Contact name is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('email').optional({ checkFalsy: true }).trim().isEmail().withMessage('Invalid email address'),
  body('tags').optional().isString().withMessage('Tags must be a string (e.g. VIP,Lead)'),
  body('status')
    .optional()
    .isIn(['ACTIVE', 'INACTIVE', 'UNSUBSCRIBED'])
    .withMessage('Invalid contact status'),
];

const updateContactValidator = [
  body('name').optional().trim().notEmpty().withMessage('Contact name cannot be empty'),
  body('phone').optional().trim().notEmpty().withMessage('Phone number cannot be empty'),
  body('email').optional({ checkFalsy: true }).trim().isEmail().withMessage('Invalid email address'),
  body('tags').optional().isString().withMessage('Tags must be a string'),
  body('status')
    .optional()
    .isIn(['ACTIVE', 'INACTIVE', 'UNSUBSCRIBED'])
    .withMessage('Invalid contact status'),
];

module.exports = {
  createContactValidator,
  updateContactValidator,
};
