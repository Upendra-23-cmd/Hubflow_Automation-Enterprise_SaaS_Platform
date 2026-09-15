const prisma = require('../config/prisma');

class ContactRepository {
  async create(data) {
    return prisma.contact.create({
      data,
    });
  }

  async findById(id, userId) {
    return prisma.contact.findFirst({
      where: { id, userId },
    });
  }

  async findAll(userId, { search, status, page = 1, limit = 10 }) {
    const where = { userId };

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { phone: { contains: search } },
        { email: { contains: search } },
        { tags: { contains: search } },
      ];
    }

    const skip = (page - 1) * limit;

    const [total, contacts] = await Promise.all([
      prisma.contact.count({ where }),
      prisma.contact.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      contacts,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async update(id, userId, data) {
    return prisma.contact.updateMany({
      where: { id, userId },
      data,
    });
  }

  async delete(id, userId) {
    return prisma.contact.deleteMany({
      where: { id, userId },
    });
  }

  async countByUserId(userId) {
    return prisma.contact.count({
      where: { userId },
    });
  }
}

module.exports = new ContactRepository();
