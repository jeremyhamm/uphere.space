// Imports
const client = require("../database/redis.connection");
const satellite = require("satellite.js");
const satelliteService = require("../services/satellite.service");

/**
 * Get satellite track for n minutes
 * 
 * @param  {Object} req request object
 * @param  {Object} res response object
 * @return {JSON}       satellite track
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
 * @return {JSON}       satellite location details
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
      let satelliteHeight = req.cookies.settings && req.cookies.settings.units === 'metric' ? positionGd.height : satelliteService.convertUnits(positionGd.height);
      let satelliteSpeed = req.cookies.settings && req.cookies.settings.units === 'metric' ? velocityEci : satelliteService.convertVelocity(velocityEci);
      
      // Get user visibility
      let visibility = null;
      if (req.cookies.location) {
        const coords = JSON.parse(req.cookies.location);
        const location = {
          'latitude': coords.latitude,
          'longitude': coords.longitude
        }
        visibility = satelliteService.getVisibility(positionEcf, location);
      } else if (req.query.lat && req.query.lng) {
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
        'footprint_radius': satelliteService.getVisibleFootprint(positionGd.height),
        'temp': JSON.parse(req.cookies.settings) || "N/A"
      };
      
      // Add track if request is from app
      if (!req.query.lat || !req.query.lng) {
        currentLocation.track = satelliteService.getOrbit(satrec, (req.query.period || 90));
      }

      return res.status(200).json(currentLocation);
    }
  });
};

/**
 * Get icon for satellite type
 * 
 * @param  {Object} req request object
 * @param  {Object} res response object
 * @return {JSON}       satellite list
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
 * @param  {Object} req request object
 * @param  {Object} res response object
 * @return {JSON}      category list
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
 * @param  {Object} req request object
 * @param  {Object} res response object
 * @return {JSON}       country list
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
 * @param  {Object} req request object
 * @param  {Object} res response object
 * @return {JSON}       most viewed satellite data
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
 * @param  {Object} req request object
 * @param  {Object} res response object
 * @return {JSON}       most viewed satellite data
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
 * @param  {Object} req request object
 * @param  {Object} res response object
 * @return {JSON}      satellite pass for current location
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

    // Only calculate visible passes for ISS
    if (satrec.satnum !== '25544') {
      return res.sendStatus(400); 
    }

    let passes = [];
    const passTime = new Date();
    
    for (let i = 0; i <= 1440; i++) {
      let finalTime = passTime.setTime(passTime.getTime() + 1000 * 60);

      const positionAndVelocity = satellite.propagate(satrec, passTime);
      const positionEci = positionAndVelocity.position;
      const positionEcf = satellite.eciToEcf(positionEci, passTime);
      
      const gmst = satellite.gstime(passTime);
      const positionGd = satellite.eciToGeodetic(positionEci, gmst);

      // Get user visibility
      let visibility = {
        "azimuth": null,
        "elevation": null,
        "date": null
      };
      if (req.cookies.location) {
        const coords = JSON.parse(req.cookies.location);
        const observerGd = {
          longitude: satellite.degreesToRadians(-117.1366),
          latitude: satellite.degreesToRadians(32.7794),
          height: 0
        };
        const lookAngles = satellite.ecfToLookAngles(observerGd, positionEcf);
        visibility.azimuth = lookAngles.azimuth * 180 / Math.PI;
        visibility.elevation = lookAngles.elevation * 180 / Math.PI;
        visibility.date = new Date(finalTime);
        visibility.height = positionGd.height;
      }

      if (visibility.elevation > 0) {
        const magnitude = satelliteService.calculateMagnitude(visibility);
        passes.push(visibility);
      }
    }

    return res.status(200).json(passes);
  });
};