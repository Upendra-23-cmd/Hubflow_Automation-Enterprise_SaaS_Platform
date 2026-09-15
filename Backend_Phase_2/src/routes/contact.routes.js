const express = require('express');
const contactController = require('../controllers/contact.controller');
const authenticate = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const {
  createContactValidator,
  updateContactValidator,
} = require('../validators/contact.validator');

const router = express.Router();

router.use(authenticate);

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Customer Relationship Management (CRM) contact management APIs
 */

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new CRM contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, phone]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Alice Smith
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *               email:
 *                 type: string
 *                 example: alice@example.com
 *               tags:
 *                 type: string
 *                 example: VIP,Lead
 *               status:
 *                 type: string
 *                 enum: [ACTIVE, INACTIVE, UNSUBSCRIBED]
 *                 example: ACTIVE
 *     responses:
 *       201:
 *         description: Contact created successfully
 *   get:
 *     summary: List contacts with optional search filter and pagination
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search keyword for name, email, phone, or tags
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [ACTIVE, INACTIVE, UNSUBSCRIBED]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: List of contacts returned successfully
 */
router
  .route('/')
  .post(createContactValidator, validate, contactController.createContact)
  .get(contactController.getContacts);

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Retrieve single contact by ID
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact details
 *       404:
 *         description: Contact not found
 *   put:
 *     summary: Update contact information
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               tags:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [ACTIVE, INACTIVE, UNSUBSCRIBED]
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *   delete:
 *     summary: Delete contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 */
router
  .route('/:id')
  .get(contactController.getContactById)
  .put(updateContactValidator, validate, contactController.updateContact)
  .delete(contactController.deleteContact);

module.exports = router;
