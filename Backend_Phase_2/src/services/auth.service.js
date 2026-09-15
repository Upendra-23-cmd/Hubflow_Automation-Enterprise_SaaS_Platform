const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/user.repository');
const otpRepository = require('../repositories/otp.repository');
const { generateToken } = require('../utils/jwt.utils');
const AppError = require('../utils/appError');
const logger = require('../utils/logger');

class AuthService {
  async register({ name, email, password }) {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new AppError('Email address is already registered', 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken({ id: user.id, email: user.email });

    return { user, token };
  }

  async login({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Invalid email or password credentials', 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError('Invalid email or password credentials', 401);
    }

    const token = generateToken({ id: user.id, email: user.email });

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };

    return { user: userWithoutPassword, token };
  }

  async forgotPassword({ email }) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      // Return ambiguous message for security to prevent user enumeration
      return { message: 'If the email exists, an OTP code has been generated and sent.' };
    }

    // Generate mock 6-digit OTP code
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // Expires in 10 minutes

    await otpRepository.createOtp(user.id, otpCode, expiresAt);

    logger.info(`[Mock OTP Service] Generated OTP for user ${email}: ${otpCode}`);

    return {
      message: 'If the email exists, an OTP code has been generated and sent.',
      mockOtp: process.env.NODE_ENV === 'development' ? otpCode : undefined,
    };
  }

  async verifyOtp({ email, otp, newPassword }) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Invalid user email address', 400);
    }

    const validOtpRecord = await otpRepository.findValidOtp(user.id, otp);
    if (!validOtpRecord) {
      throw new AppError('Invalid or expired OTP code', 400);
    }

    await otpRepository.markAsUsed(validOtpRecord.id);

    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      await userRepository.updatePassword(user.id, hashedPassword);
    }

    return { message: 'OTP verified successfully. Password updated.' };
  }
}

module.exports = new AuthService();
