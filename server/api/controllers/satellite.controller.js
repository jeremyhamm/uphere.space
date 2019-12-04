// Redis
const redis = require("redis");
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  tls: true
});

// Postgres
const connection = require("../database/postgres.connection");

// Satellite js
const satellite = require("satellite.js");

// Services
const satelliteService = require("../services/satellite.service");

/**
 * Get current location of selected satellite
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {JSON} satellite location details
 */
exports.getSatelliteLocation = (req, res) => {
  client.hgetall(req.params.satellite, (error, result) => {           
    if (error) {
      res.status(400);
    }
    
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
    const heightMi = satelliteService.convertUnits(positionGd.height);

    // Get user visibility
    let visibility = {
      "azimuth": null,
      "elevation": null
    };
    if (req.cookies.location) {
      const coords = JSON.parse(req.cookies.location);
      const observerGd = {
        longitude: satellite.degreesToRadians(coords.longitude),
        latitude: satellite.degreesToRadians(coords.latitude),
        height: 0.370
      };
      const lookAngles = satellite.ecfToLookAngles(observerGd, positionEcf);
      visibility.azimuth = lookAngles.azimuth * 180 / Math.PI;
      visibility.elevation = lookAngles.elevation * 180 / Math.PI;
    }

    // Format return data
    const geoJson = {
      "geometry": {
        "type": "Point", 
        "coordinates": [satellite.degreesLong(positionGd.longitude), satellite.degreesLat(positionGd.latitude)]
      }, 
      "type": "Feature", 
      "properties": {
        "name": req.params.satellite,
        "height": heightMi,
        "speed": satelliteService.convertVelocity(velocityEci),
        "visibility": visibility,
        "footprint_radius": satelliteService.getVisibleFootprint(positionGd.height),
        "track": satelliteService.getTrack(satrec)
      }
    };

    return res.status(200).json(geoJson);
  });
};

/**
 * Get icon for satellite type
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {JSON} satellite list
 */
exports.getSatelliteDetails = (req, res) => {
  satelliteService.getDetailsByName(req.params.satellite)
    .then(results => {
      
      // Add satellite view
      satelliteService.saveView(req.params.satellite);

      return res.status(200).json(results);
    })
    .catch(error => {
      return res.status(400).json(error);
    });
};

/**
 * Get complete list of categories
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {JSON} category list
 */
exports.getCategoryList = async (req, res) => {
  
  // Format query
  const sql = `
    SELECT *
    FROM categories
    ORDER BY name ASC;
  `;

  // Get data
  await connection.query(sql)
    .then(results => {
      return res.status(200).json(results);
    })
    .catch(error => {
      return res.status(400).json(error);
    });
};

/**
 * Get complete list of countries who have launched satellites
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {JSON} country list
 */
exports.getCountryList = async (req, res) => {
  await connection.query(`SELECT * FROM countries`)
    .then(results => {
      return res.status(200).json(results);
    })
    .catch(error => {
      return res.status(400).json(error);
    });
};

/**
 * Get all trackable satellites
 */
exports.getSatelliteList = (req, res) => {
  satelliteService.getSatellites(req.query)
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      return res.status(400).json(error);
    });
};

/**
 * Get most viewed satellites
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {JSON} most viewed satellite data
 */
exports.getTopList = (req, res) => {
  satelliteService.getMostViewed()
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(() => {
      return res.status(400);
    });
};

/**
 * Get visible passes for x days
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {JSON} satellite pass for current location
 */
exports.getVisiblePasses = (req, res) => {
  client.hgetall(req.params.satellite, (error, result) => {        
    if (error) {
      res.status(400);
    }
    
    // TLE data
    const tleLine1 = result.tle1;
    const tleLine2 = result.tle2;
    const satrec = satellite.twoline2satrec(tleLine1, tleLine2);

    let passes = [];
    const passTime = new Date();
    for (let i = 0; i <= 14400; i++) {
      passTime.setMinutes(passTime.getMinutes() + 1);

      console.log(passTime);

      const positionAndVelocity = satellite.propagate(satrec, passTime);
      const positionEci = positionAndVelocity.position;
      const positionEcf = satellite.eciToEcf(positionEci, passTime);

      // Get user visibility
      let visibility = {
        "azimuth": null,
        "elevation": null,
        "date": null
      };
      //if (req.cookies.location) {
        //const coords = JSON.parse(req.cookies.location);
      const observerGd = {
        longitude: satellite.degreesToRadians(-117.1366),
        latitude: satellite.degreesToRadians(32.7794),
        height: 0
      };
      const lookAngles = satellite.ecfToLookAngles(observerGd, positionEcf);
      visibility.azimuth = lookAngles.azimuth * 180 / Math.PI;
      visibility.elevation = lookAngles.elevation * 180 / Math.PI;
      visibility.date = passTime;
      // }
      if (visibility.elevation > 0) {
        passes.push(visibility);
      }
    }

    return res.status(200).json(passes);
  });
};