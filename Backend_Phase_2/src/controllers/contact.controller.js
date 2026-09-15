const contactService = require('../services/contact.service');
const { sendSuccess } = require('../utils/response.utils');

class ContactController {
  async createContact(req, res, next) {
    try {
      const contact = await contactService.createContact(req.user.id, req.body);
      return sendSuccess(res, 'Contact created successfully', contact, 201);
    } catch (error) {
      next(error);
    }
  }

  async getContacts(req, res, next) {
    try {
      const data = await contactService.getContacts(req.user.id, req.query);
      return sendSuccess(res, 'Contacts retrieved successfully', data, 200);
    } catch (error) {
      next(error);
    }
  }

  async getContactById(req, res, next) {
    try {
      const contact = await contactService.getContactById(req.params.id, req.user.id);
      return sendSuccess(res, 'Contact details retrieved', contact, 200);
    } catch (error) {
      next(error);
    }
  }

  async updateContact(req, res, next) {
    try {
      const contact = await contactService.updateContact(req.params.id, req.user.id, req.body);
      return sendSuccess(res, 'Contact updated successfully', contact, 200);
    } catch (error) {
      next(error);
    }
  }

  async deleteContact(req, res, next) {
    try {
      const result = await contactService.deleteContact(req.params.id, req.user.id);
      return sendSuccess(res, result.message, null, 200);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ContactController();
