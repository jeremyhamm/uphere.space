const express = require('express');
const router = express.Router();

// Get user IP as middleware
const requestIp = require('request-ip');
router.use(requestIp.mw());

// Controller
const userController = require('../controllers/user.controller');

// Routes
router.get('/location', userController.getLocationByIp);
router.get('/visible', userController.getVisibleSatellites);
router.post('/contact', userController.sendMessage);

// Authentication Routes
router.post('/signin/google', userController.googleSignin);
router.get('/signin/google/redirect', userController.googleSigninRedirect);

module.exports = router;