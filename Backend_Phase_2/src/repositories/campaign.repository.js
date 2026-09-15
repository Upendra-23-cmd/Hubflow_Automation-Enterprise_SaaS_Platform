const prisma = require('../config/prisma');

class CampaignRepository {
  async create(data) {
    return prisma.campaign.create({
      data,
    });
  }

  async findById(id, userId) {
    return prisma.campaign.findFirst({
      where: { id, userId },
    });
  }

  async findAll(userId, { status, page = 1, limit = 10 }) {
    const where = { userId };
    if (status) {
      where.status = status;
    }

    const skip = (page - 1) * limit;

    const [total, campaigns] = await Promise.all([
      prisma.campaign.count({ where }),
      prisma.campaign.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      campaigns,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async update(id, userId, data) {
    await prisma.campaign.updateMany({
      where: { id, userId },
      data,
    });
    return this.findById(id, userId);
  }

  async delete(id, userId) {
    return prisma.campaign.deleteMany({
      where: { id, userId },
    });
  }

  async countByUserId(userId) {
    return prisma.campaign.count({
      where: { userId },
    });
  }

  async countActiveByUserId(userId) {
    return prisma.campaign.count({
      where: {
        userId,
        status: { in: ['SCHEDULED', 'PROCESSING'] },
      },
    });
  }
}

module.exports = new CampaignRepository();
