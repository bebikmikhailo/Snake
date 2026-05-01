const express = require("express");
const userController = require("../controllers/userController.js");
const router = express.Router();


router.get('/best-score', userController.authenticateToken, userController.getBestScore);
router.get('/statistic', userController.authenticateToken, userController.getStatistic);
router.post('/statistic', userController.authenticateToken, userController.saveStatistic);

module.exports = router;