// Postgres
const connection = require("../database/postgres.connection");

// Satellite.js
const satellite = require("satellite.js");

// Utils
const utils = require("./utils.service");

/**
 * Convert Euclidean vector (km/s) to mph
 * (https://en.wikipedia.org/wiki/Euclidean_vector)
 * 
 * @param   {Object} velocityEci  velocity
 * @returns {Int}                 Converted velocity
 */
exports.convertVelocity = (velocityEci) => {
  return Math.sqrt((velocityEci.x * velocityEci.x) + (velocityEci.y * velocityEci.y) + (velocityEci.z * velocityEci.z)) * 2236.9362920544;
};

/**
 * Calculate radius of visible footprint on earth surface in meters
 * 
 * @param   {Int} height  of satellite
 * @return  {Int}         radius of visible sphere
 */
exports.getVisibleFootprint = (height) => {
  const tangent = Math.sqrt(height * (height + 2 * 6371));
  const centerAngle = Math.asin(tangent / (6371 + height));
  const footPrintRadius = 6371 * centerAngle;
  return (footPrintRadius * 1000);
};

/**
 * Get future satellite track
 * 
 * @param {Object} satrec current satellite track
 */
exports.getTrack = (satrec) => {
  let trackList = [];
  for (let i = -1; i <= 92; i++) {
    const trackProjection = new Date();
    trackProjection.setMinutes(trackProjection.getMinutes() + i);
    const positionAndVelocity = satellite.propagate(satrec, trackProjection);
    const positionEci = positionAndVelocity.position;
    const gmst = satellite.gstime(trackProjection);
    const positionGd = satellite.eciToGeodetic(positionEci, gmst);
    const latitude = satellite.degreesLat(positionGd.latitude);
    const longitude = satellite.degreesLong(positionGd.longitude);   
    trackList.push({
      "lat": latitude,
      "lng": longitude
    });
  }
  return trackList;
};

/**
 * Convert km to mi
 * 
 * @param  {Number} val number in kilometers to convert to miles
 * @return {Number}
 */
exports.convertUnits = (val) => {
  return val * 0.621371;
};

/**
 * Get total number of satellites in DB (for pagination)
 * 
 * @return {Array}
 */
exports.getSatelliteTotal = async () => {
  return await connection.one("SELECT count(s.id) FROM satellites s");
};

/**
 * Get satellite details by name
 * 
 * @param   {String} satellite name
 * @return  {Array}
 */
exports.getDetailsByName = async (name) => {
  return await connection.one("SELECT number, type, country, intldes FROM satellites WHERE name = $1 LIMIT 1", [name]);
};

/**
 * Get list of satellites and corresponding categories
 * 
 * @param  {Object} params query params
 * @return {Array}
 */
exports.getSatellites = async (params) => {
  const sql_params = {
    limit: process.env.APP_LIST_RESULTS,
    offset: process.env.APP_LIST_RESULTS * (params.page - 1),
    text: params.text ? params.text.toUpperCase() : null,
    categories: params.categories || null,
    sort: params.sort || null
  };

  let sql =
    "SELECT s.name, s.number, s.classification, s.launch_date, s.country, s.type, s.size, s.orbital_period, s.intldes, c.name as category_Name" +
    " FROM satellites s" +
    " LEFT JOIN satellite_categories sc on s.id = sc.satellite_id" +
    " LEFT JOIN categories c ON sc.category_id = c.id";

  if (sql_params.sort === "popular") {
    sql += `
        JOIN (
          SELECT v.satellite_id, COUNT(v.id) as count
          FROM views v
          GROUP BY v.satellite_id
        ) views ON s.id = views.satellite_id
      `;
  }

  sql += " WHERE s.active";
  if (sql_params.text) {
    sql += " AND document_vectors @@ plainto_tsquery($3)";
  }
  if (sql_params.categories) {
    sql += " AND c.name IN ($4:csv)";
  }
  if (sql_params.sort) {
    sql += utils.formatSortQuery(sql_params.sort);
  } else {
    sql += " ORDER BY s.id ASC";
  }
  sql += " LIMIT $1" +
      " OFFSET $2";

  // Get data
  return await connection.task(async t => {
    let satellites = await t.query(sql, [sql_params.limit, sql_params.offset, sql_params.text, sql_params.categories]);
    
    // Format data
    return utils.formatSatelliteCategory(satellites);
  });
};

/**
 * Get the most viewed satellites
 * 
 * @return {Array} list of satellites
 */
exports.getMostViewed = async () => {
  const sql = `
    SELECT s.id, s.name, s.number, s.classification, s.launch_date, s.country, s.type, s.size, s.orbital_period, s.intldes, c.name as category_Name, views.count
    FROM satellites s
    JOIN (
      SELECT v.satellite_id, COUNT(v.id) as count
      FROM views v
      GROUP BY v.satellite_id
      ORDER BY count DESC
      LIMIT 6
    ) views ON s.id = views.satellite_id
    LEFT JOIN satellite_categories sc on s.id = sc.satellite_id
    LEFT JOIN categories c ON sc.category_id = c.id
    WHERE s.active
    ORDER by views.count DESC;
  `;
  
  // Get data
  return await connection.task(async t => {
    let satellites = await t.query(sql);
    
    // Format data
    return utils.formatSatelliteCategory(satellites);
  });
};

/**
 * Save satellite view
 * 
 * @param   {String} name satellite name to save view for
 * @return  {Void}
 */
exports.saveView = (name) => {
  const sql = `
    INSERT INTO views(satellite_id, date)
    SELECT id as satellite_id, CURRENT_TIMESTAMP as date
    FROM satellites
    WHERE name = $1
    RETURNING id
  `;
  connection.one(sql, [name]);   
};