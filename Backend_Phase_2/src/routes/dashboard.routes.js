const express = require('express');
const dashboardController = require('../controllers/dashboard.controller');
const authenticate = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authenticate);

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: High-level analytics and SaaS metrics APIs
 */

/**
 * @swagger
 * /dashboard/stats:
 *   get:
 *     summary: Retrieve total contacts, total campaigns, and active campaigns count
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard metrics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Dashboard statistics retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalContacts:
 *                       type: integer
 *                       example: 45
 *                     totalCampaigns:
 *                       type: integer
 *                       example: 12
 *                     activeCampaigns:
 *                       type: integer
 *                       example: 3
 */
router.get('/stats', dashboardController.getStats);

module.exports = router;
