const express = require('express');
const aiController = require('../controllers/ai.controller');
const authenticate = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { suggestMessageValidator } = require('../validators/ai.validator');

const router = express.Router();

router.use(authenticate);

/**
 * @swagger
 * tags:
 *   name: AI Assistant
 *   description: AI Marketing Copy Suggestions & Automation Services
 */

/**
 * @swagger
 * /ai/suggest-message:
 *   post:
 *     summary: Generate automated marketing copy message suggestions based on context
 *     tags: [AI Assistant]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [prompt]
 *             properties:
 *               prompt:
 *                 type: string
 *                 example: Summer clearance promotion for SaaS products
 *               category:
 *                 type: string
 *                 enum: [promotion, reminder, welcome]
 *                 example: promotion
 *               tone:
 *                 type: string
 *                 example: professional
 *     responses:
 *       200:
 *         description: AI copy suggestion generated successfully
 */
router.post('/suggest-message', suggestMessageValidator, validate, aiController.suggestMessage);

module.exports = router;
