const express = require('express');
const router = express.Router();

// Get user IP as middleware
const requestIp = require('request-ip');
router.use(requestIp.mw());

// Authentication middleware
const authentication = require('../middleware/authentication');

// Controller
const userController = require('../controllers/user.controller');

// Misc Routes
router.get('/location', userController.getLocationByIp);
router.get('/visible', userController.getVisibleSatellites);
router.post('/contact', userController.sendMessage);

// Authentication Routes
router.post('/signin/google', userController.googleSignin);
router.get('/signin/google/redirect', userController.googleSigninRedirect);

// User Routes
router.get('/details', authentication.authenticateToken, userController.getUserDetails);

module.exports = router;