const express = require("express");
const userController = require("../controllers/userController.js");
const router = express.Router();


router.get('/best-score', userController.authenticateToken, userController.getBestScore);
router.post('/best-score', userController.authenticateToken, userController.setBestScore);

module.exports = router;