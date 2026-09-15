const contactRepository = require('../repositories/contact.repository');
const AppError = require('../utils/appError');

class ContactService {
  async createContact(userId, data) {
    return contactRepository.create({
      ...data,
      userId,
    });
  }

  async getContacts(userId, query) {
    return contactRepository.findAll(userId, query);
  }

  async getContactById(id, userId) {
    const contact = await contactRepository.findById(id, userId);
    if (!contact) {
      throw new AppError('Contact not found', 404);
    }
    return contact;
  }

  async updateContact(id, userId, data) {
    await this.getContactById(id, userId);
    await contactRepository.update(id, userId, data);
    return this.getContactById(id, userId);
  }

  async deleteContact(id, userId) {
    await this.getContactById(id, userId);
    await contactRepository.delete(id, userId);
    return { message: 'Contact deleted successfully' };
  }
}

module.exports = new ContactService();
