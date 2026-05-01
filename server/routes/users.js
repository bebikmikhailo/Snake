const express = require("express");
const userController = require("../controllers/userController.js");
const router = express.Router();


router.get('/best-players', userController.getBestPlayersByScore);

module.exports = router;