const express = require("express");
const router = express.Router();
const authRouter = require("./auth.js");
const userRouter = require("./user.js");


router.use("/auth", authRouter);
router.use("/user", userRouter);

module.exports = router;

