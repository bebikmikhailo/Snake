const express = require("express");
const authController = require("../controllers/authController.js");
const router = express.Router();


router.post('/sign-in', authController.authorizeUser);

router.post('/sign-up', authController.createUser);

module.exports = router;