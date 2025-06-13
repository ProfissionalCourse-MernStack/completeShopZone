const express = require("express");
const router = express.Router();

const forgotPassword = require("../controllers/forgotPassword");
const resetPassword = require("../controllers/resetPassword");

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:resetToken", resetPassword);

module.exports = router;
