const express = require("express");
const router = express.Router();

// Get user IP as middleware
const requestIp = require("request-ip");
router.use(requestIp.mw());

// Controller
const userController = require("../controllers/user.controller");

// Routes
router.get("/location", userController.getLocationByIp);
router.get("/settings", userController.getSettings);
router.post("/contact", userController.sendMessage);
router.post("/settings", userController.updateSettings);

module.exports = router;