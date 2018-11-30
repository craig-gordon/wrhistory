const express = require('express');
const router = express.Router();

const authRoutes = require('./api/auth.js');
const homeRoutes = require('./api/home.js');
const createChartRoutes = require('./api/createChart.js');
const gameDataRoutes = require('./api/gameData.js');

router.use('/auth', authRoutes);
router.use('/home', homeRoutes);
router.use('/create', createChartRoutes);
router.use('/gameData', gameDataRoutes);

module.exports = router;
