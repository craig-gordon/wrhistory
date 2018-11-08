const express = require('express');
const router = express.Router();

const authRoutes = require('./api/auth.js');
const createChartRoutes = require('./api/createChart.js');

router.use('/auth', authRoutes);
router.use('/create', createChartRoutes);

module.exports = router;
