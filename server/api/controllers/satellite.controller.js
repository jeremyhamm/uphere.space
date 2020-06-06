// Imports
const client = require("../database/redis.connection");
const satellite = require("satellite.js");
const SunCalc = require('suncalc');
const satelliteService = require("../services/satellite.service");
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

/**
 * Get satellite track for n minutes
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {Response} satellite track
 */
exports.getSatelliteOrbit = (req, res) => {
  client.hgetall(req.params.satellite, (error, result) => {
    if (error || !result) {
      return res.sendStatus(404);
    } else {
      // TLE data
      const tleLine1 = result.tle1;
      const tleLine2 = result.tle2;
      const satrec = satellite.twoline2satrec(tleLine1, tleLine2);
      const track = satelliteService.getOrbit(satrec, req.query.period);
      
      return res.status(200).json(track);
    }
  });
}

/**
 * Get current location of selected satellite
 * 
 * @param  {Object} req request object
 * @param  {Object} res response object
 * 
 * @return {Response} satellite location details
 */
exports.getSatelliteLocation = (req, res) => {
  client.hgetall(req.params.satellite, (error, result) => {           
    if (error || !result) {
      return res.sendStatus(404);
    } else {

      // TLE data
      const tleLine1 = result.tle1;
      const tleLine2 = result.tle2;
      const satrec = satellite.twoline2satrec(tleLine1, tleLine2);
      
      // Get current position/velocity data
      const now = new Date();
      const positionAndVelocity = satellite.propagate(satrec, now);
      const positionEci = positionAndVelocity.position;
      const velocityEci = positionAndVelocity.velocity;
      const gmst = satellite.gstime(now);
      const positionEcf = satellite.eciToEcf(positionEci, gmst);
      const positionGd = satellite.eciToGeodetic(positionEci, gmst);
      
      // Get current telemetry
      const units = req.query.units || 'imperial';
      let satelliteHeight = units === 'metric' ? positionGd.height : satelliteService.convertUnits(positionGd.height);
      let satelliteSpeed = satelliteService.convertVelocity(velocityEci, units);
      
      // Get user visibility
      let visibility = null;
      if (req.query.lat && req.query.lng) {
        const location = {
          'latitude': req.query.lat,
          'longitude': req.query.lng
        }
        visibility = satelliteService.getVisibility(positionEcf, location);
      }

      // Format return data
      const currentLocation = {
        'coordinates': [satellite.degreesLong(positionGd.longitude), satellite.degreesLat(positionGd.latitude)],
        'norad_id': req.params.satellite,
        'height': satelliteHeight,
        'speed': satelliteSpeed,
        'visibility': visibility,
        'footprint_radius': satelliteService.getVisibleFootprint(positionGd.height)
      };

      return res.status(200).json(currentLocation);
    }
  });
};

/**
 * Get icon for satellite type
 * 
 * @param  {Object} req request object
 * @param  {Object} res response object
 * 
 * @return {Response} satellite list
 */
exports.getSatelliteDetails = async (req, res) => {
  try {
    const response = await satelliteService.getDetailsByNumber(req.params.satellite);
    
    // Add satellite view
    satelliteService.saveView(req.params.satellite);
          
    return res.status(200).json(response);
  } 
  catch(e) {
    return res.sendStatus(404);
  }
};

/**
 * Get complete list of categories
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {Response} category list
 */
exports.getCategoryList = async (req, res) => {
  try {
    const results = await satelliteService.getCategoryList(req.query.sort);
    return res.status(200).json(results);
  }
  catch(e) {
    return res.sendStatus(404);
  }
};

/**
 * Get complete list of countries who have launched satellites
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {Response} country list
 */
exports.getCountryList = async (req, res) => {
  try {
    const results = await satelliteService.getCountryList();
    return res.status(200).json(results);
  }
  catch(e) {
    return res.sendStatus(404);
  }
};

/**
 * Get all trackable satellites
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {Response} most viewed satellite data
 */
exports.getSatelliteList = async (req, res) => {
  try {
    const results = await satelliteService.getSatellites(req.query);
    return res.status(200).json(results);
  }
  catch(e) {
    return res.sendStatus(404);
  }
};

/**
 * Get most viewed satellites
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {Response} most viewed satellite data
 */
exports.getTopList = async (req, res) => {
  try {
    const results = await satelliteService.getMostViewed(req.query);
    return res.status(200).json(results);
  }
  catch(e) {
    return res.sendStatus(404);
  }
};

/**
 * Get visible passes for x days
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {Response} satellite pass for current location
 */
exports.getVisiblePasses = (req, res) => {
  client.hgetall(req.params.satellite, (error, result) => {        
    if (error) {
      return res.sendStatus(400);
    }
    
    // TLE data
    const tleLine1 = result.tle1;
    const tleLine2 = result.tle2;
    const satrec = satellite.twoline2satrec(tleLine1, tleLine2);

    let passes = [];

    // 1440 min === 1 day
    for (let i = 0; i <= 14400; i++) {
      const passTime = dayjs().add(i, 'minutes').utc().toDate()
      const positionAndVelocity = satellite.propagate(satrec, passTime);
      const positionEci = positionAndVelocity.position;
      const positionEcf = satellite.eciToEcf(positionEci, new Date());
      const gmst = satellite.gstime(new Date());
      const positionGd = satellite.eciToGeodetic(positionEci, gmst);

      // Get user visibility
      let visibility = {
        "azimuth": null,
        "elevation": null,
        "date": null
      };

      // Check for both lng & lat
      if (req.query.lng && req.query.lat) {
        const coords = {
          "lng": req.query.lng,
          "lat": req.query.lat
        };
        const observerGd = {
          longitude: satellite.degreesToRadians(coords.lng),
          latitude: satellite.degreesToRadians(coords.lat),
          height: 0
        };
        const lookAngles = satellite.ecfToLookAngles(observerGd, positionEcf);
        visibility.azimuth = lookAngles.azimuth * 180 / Math.PI;
        visibility.elevation = lookAngles.elevation * 180 / Math.PI;
        visibility.date = passTime;
        visibility.height = positionGd.height;

        if (visibility.elevation > 0) {
          
          // Get position of sun relative to coords
          const sunPosition = SunCalc.getPosition(passTime, coords.lng, coords.lat);
          visibility.sunPosition = sunPosition;
          
          // Calculate satellite magnitude
          const magnitude = satelliteService.calculateMagnitude(visibility);
          visibility.magnitude = magnitude;

          passes.push(visibility);
        }

      } else {
        return res.status(400).send('Must include both longitude and latitude');
      }
    }

    const filteredPasses = satelliteService.extractValidPasses(passes);

    return res.status(200).json(filteredPasses);
  });
};

/**
 * Get satellite launch sites
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {Response} satellite launch sites
 */
exports.getLaunchSites = async (req, res) => {
  try {
    const results = await satelliteService.launchSites();
    return res.status(200).json(results);
  }
  catch(e) {
    return res.sendStatus(404);
  }
}