const express = require("express");
const asyncHandler = require('../middleware/asyncHandler.js');
const validateToken = require('../middleware/validateTokenHandler.js');
const userHandler = require("../controllers/users.js");

const router = express.Router();

router.post("/register", asyncHandler(userHandler.user_register));

router.post("/login", asyncHandler(userHandler.user_login));

router.get("/current", validateToken, asyncHandler(userHandler.user_current));

module.exports = router;