const { body } = require('express-validator');

const suggestMessageValidator = [
  body('prompt').trim().notEmpty().withMessage('Prompt topic or intent is required'),
  body('category')
    .optional()
    .isIn(['promotion', 'reminder', 'welcome'])
    .withMessage('Category must be one of: promotion, reminder, welcome'),
  body('tone')
    .optional()
    .isString()
    .withMessage('Tone must be a string (e.g. professional, casual)'),
];

module.exports = {
  suggestMessageValidator,
};
