const express = require('express');
const campaignController = require('../controllers/campaign.controller');
const authenticate = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const {
  createCampaignValidator,
  updateCampaignValidator,
} = require('../validators/campaign.validator');

const router = express.Router();

router.use(authenticate);

/**
 * @swagger
 * tags:
 *   name: Campaigns
 *   description: Marketing & WhatsApp Campaign Management APIs
 */

/**
 * @swagger
 * /campaigns:
 *   post:
 *     summary: Create a new marketing campaign
 *     tags: [Campaigns]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, message]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Summer Promo 2026
 *               message:
 *                 type: string
 *                 example: "Hi {name}, enjoy 20% off on Hubflow services this summer!"
 *               scheduledAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-08-10T10:00:00Z"
 *               targetTags:
 *                 type: string
 *                 example: VIP,Lead
 *     responses:
 *       201:
 *         description: Campaign created successfully
 *   get:
 *     summary: List campaigns with optional status filter and pagination
 *     tags: [Campaigns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [DRAFT, SCHEDULED, PROCESSING, COMPLETED, FAILED]
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
 *         description: List of campaigns
 */
router
  .route('/')
  .post(createCampaignValidator, validate, campaignController.createCampaign)
  .get(campaignController.getCampaigns);

/**
 * @swagger
 * /campaigns/{id}:
 *   get:
 *     summary: Retrieve campaign details
 *     tags: [Campaigns]
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
 *         description: Campaign details
 *   put:
 *     summary: Update campaign configuration
 *     tags: [Campaigns]
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
 *               message:
 *                 type: string
 *               scheduledAt:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [DRAFT, SCHEDULED, PROCESSING, COMPLETED, FAILED]
 *     responses:
 *       200:
 *         description: Campaign updated
 *   delete:
 *     summary: Delete campaign
 *     tags: [Campaigns]
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
 *         description: Campaign deleted
 */
router
  .route('/:id')
  .get(campaignController.getCampaignById)
  .put(updateCampaignValidator, validate, campaignController.updateCampaign)
  .delete(campaignController.deleteCampaign);

/**
 * @swagger
 * /campaigns/{id}/send:
 *   post:
 *     summary: Mock Send Campaign (Trigger asynchronous WhatsApp dispatch queue processing)
 *     tags: [Campaigns]
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
 *         description: Campaign processing job queued successfully
 *       400:
 *         description: Campaign already processed or no active target contacts found
 */
router.post('/:id/send', campaignController.sendCampaign);

module.exports = router;
