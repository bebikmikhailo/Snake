const express = require("express");
const router = express.Router();
const authRouter = require("./auth.js");
const userRouter = require("./user.js");
const usersRouter = require("./users.js");


router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/users", usersRouter);

module.exports = router;

