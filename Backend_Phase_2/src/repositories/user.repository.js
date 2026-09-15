const prisma = require('../config/prisma');

class UserRepository {
  async findByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async create(userData) {
    return prisma.user.create({
      data: userData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async updatePassword(id, hashedPassword) {
    return prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }
}

module.exports = new UserRepository();
