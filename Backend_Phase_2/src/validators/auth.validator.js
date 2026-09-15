const { body } = require('express-validator');

const registerValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

const loginValidator = [
  body('email').trim().isEmail().withMessage('Please provide a valid email address'),
  body('password').notEmpty().withMessage('Password is required'),
];

const forgotPasswordValidator = [
  body('email').trim().isEmail().withMessage('Please provide a valid email address'),
];

const verifyOtpValidator = [
  body('email').trim().isEmail().withMessage('Please provide a valid email address'),
  body('otp').trim().isLength({ min: 6, max: 6 }).withMessage('OTP must be a 6-digit code'),
  body('newPassword')
    .optional()
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long'),
];

module.exports = {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  verifyOtpValidator,
};
