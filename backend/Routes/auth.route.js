const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/auth.controller");
const { loginValidator } = require("../validators/user.validator");
const validator = require("../middleWares/validator.middleware");

router.post("/login", validator(loginValidator), loginUser);

module.exports = router;
