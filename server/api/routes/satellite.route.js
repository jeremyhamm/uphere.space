const express = require("express");
const router = express.Router();

// Controller
const satelliteController = require("../controllers/satellite.controller");

// Misc
router.get("/top", satelliteController.getTopList);

// List
router.get("/list", satelliteController.getSatelliteList);
router.get("/list/categories", satelliteController.getCategoryList);
router.get("/list/countries", satelliteController.getCountryList);

// Satellite
router.get("/:satellite/details", satelliteController.getSatelliteDetails);
router.get("/:satellite/location", satelliteController.getSatelliteLocation);
router.get("/:satellite/passes", satelliteController.getVisiblePasses);

module.exports = router;