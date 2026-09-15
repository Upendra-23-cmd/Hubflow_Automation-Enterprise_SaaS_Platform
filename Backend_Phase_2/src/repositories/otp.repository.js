const prisma = require('../config/prisma');

class OtpRepository {
  async createOtp(userId, code, expiresAt) {
    // Invalidate previous OTPs
    await prisma.otpCode.updateMany({
      where: { userId, isUsed: false },
      data: { isUsed: true },
    });

    return prisma.otpCode.create({
      data: {
        userId,
        code,
        expiresAt,
      },
    });
  }

  async findValidOtp(userId, code) {
    return prisma.otpCode.findFirst({
      where: {
        userId,
        code,
        isUsed: false,
        expiresAt: {
          gt: new Date(),
        },
      },
    });
  }

  async markAsUsed(otpId) {
    return prisma.otpCode.update({
      where: { id: otpId },
      data: { isUsed: true },
    });
  }
}

module.exports = new OtpRepository();
