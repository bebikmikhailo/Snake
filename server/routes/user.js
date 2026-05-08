const express = require("express");
const userController = require("../controllers/userController.js");
const router = express.Router();
const multer = require("../multer.js");


router.get('/best-score', userController.authenticateToken, userController.getBestScore);
router.get('/statistic', userController.authenticateToken, userController.getStatistic);
router.post('/statistic', userController.authenticateToken, userController.saveStatistic);
router.post('/username', userController.authenticateToken, userController.saveUsername);
router.get('/avatar', userController.authenticateToken, userController.getAvatar);
router.post('/avatar', userController.authenticateToken, multer.single("avatar"), userController.saveAvatar);

module.exports = router;