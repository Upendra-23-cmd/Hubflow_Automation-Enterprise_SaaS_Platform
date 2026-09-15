const express = require('express');
const authRoutes = require('./auth.routes');
const contactRoutes = require('./contact.routes');
const campaignRoutes = require('./campaign.routes');
const dashboardRoutes = require('./dashboard.routes');
const aiRoutes = require('./ai.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/contacts', contactRoutes);
router.use('/campaigns', campaignRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/ai', aiRoutes);

module.exports = router;
