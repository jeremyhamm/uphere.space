const dbConnection = require("../database/postgres.connection");
const redisConnection = require("../database/redis.connection");
const { promisify } = require("util");
const getAsync = promisify(redisConnection.hgetall).bind(redisConnection);
const satellite = require("satellite.js");
const satelliteService = require("./satellite.service");
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

/**
 * Get brightest satellites for visibility test
 * 
 * @return {Array} currently visible satellites relative to coords
 */
const getBrightestSatellites = async () => {
  const sql = `
    SELECT s.number, s.name, s.orbital_period
    FROM satellites s 
    JOIN satellite_categories sc on s.id = sc.satellite_id
    WHERE sc.category_id = 3
    ORDER by s.number asc;
  `;
  return await dbConnection.query(sql);
}

/**
 * Get all visible satellites for specific location
 * 
 * @param {Coords} coords lat and lng for location to get satellite visibility
 * 
 * @return {Array} currently visible satellites relative to coords
 */
const getVisibleSatellites = async (coords, satellites) => {
  const visibleSatellites = [];
  for (const item of satellites) {
    const result = await getAsync(item.number);
      
    // TLE data
    const tleLine1 = result.tle1;
    const tleLine2 = result.tle2;
    const satrec = satellite.twoline2satrec(tleLine1, tleLine2);
    
    // Get current position & visibility
    const now = new Date();
    const positionAndVelocity = satellite.propagate(satrec, now);
    const positionEci = positionAndVelocity.position;
    const gmst = satellite.gstime(now);
    const positionEcf = satellite.eciToEcf(positionEci, gmst);
    const positionGd = satellite.eciToGeodetic(positionEci, gmst);
    const visibility = satelliteService.getVisibility(positionEcf, coords);
    if (visibility.elevation > 0 ) {
      visibleSatellites.push({
        'name': item.name,
        'number': item.number,
        'coordinates': [satellite.degreesLong(positionGd.longitude), satellite.degreesLat(positionGd.latitude)]
        //'orbit': satelliteService.getOrbit(satrec, item.orbital_period)
      });
    }
  }

  return visibleSatellites;
}

/**
 * Find user by email
 * 
 * @param {String} email users email
 * 
 * @return {Array}
 */
const findUser = async (email) => {
  const sql = `
    SELECT *
    FROM users
    WHERE email = $1;
  `;
  return await dbConnection.query(sql, [email]);
}

/**
 * Format profile data for saving new user
 * 
 * @param {Object} data profile data from oauth provider
 * 
 * @return {Object} formatted profile data
 */
const formatProfileData = (data, provider) => {
  switch(provider) {
    case 'google':
      return [ data.email, data.given_name, data.family_name, data.picture, data.id, 'google', data.locale, dayjs().toISOString() ];
    case 'facebook':
      return [ data.email, data.given_name, data.family_name, data.picture, data.id, 'google', data.locale, dayjs().toISOString() ]; 
  }
}

/**
 * Create new user
 * 
 * @param {Object} profile user data
 * 
 * @return {Array}
 */
const createUser = async (profile, provider) => {
  const userData = formatProfileData(profile, provider);
  try {
    const sql = `
      INSERT INTO users(email, first_name, last_name, picture, provider_id, provider_name, locale, created_at)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
    `;
    return await dbConnection.one(sql, userData);
  }
  catch(error) {
    console.error(error);
  }
}

module.exports = {
  getBrightestSatellites,
  getVisibleSatellites,
  findUser,
  createUser
}


