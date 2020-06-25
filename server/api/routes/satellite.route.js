const express = require("express");
const router = express.Router();
const rapidAPiMiddleware = require('../middleware/rapidapi');

// Controller
const satelliteController = require("../controllers/satellite.controller");

// Misc
router.get("/top", rapidAPiMiddleware, satelliteController.getTopList);

// List
router.get("/list", rapidAPiMiddleware, satelliteController.getSatelliteList);
router.get("/list/categories", rapidAPiMiddleware, satelliteController.getCategoryList);
router.get("/list/countries", rapidAPiMiddleware, satelliteController.getCountryList);
router.get("/list/launch-sites", rapidAPiMiddleware, satelliteController.getLaunchSites);

// Satellite
router.get("/:satellite/details", rapidAPiMiddleware, satelliteController.getSatelliteDetails);
router.get("/:satellite/orbit", rapidAPiMiddleware, satelliteController.getSatelliteOrbit);
router.get("/:satellite/location", rapidAPiMiddleware, satelliteController.getSatelliteLocation);
router.get("/:satellite/passes", rapidAPiMiddleware, satelliteController.getVisiblePasses);

module.exports = router;