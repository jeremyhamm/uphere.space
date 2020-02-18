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
 * @param   {Object} velocityEci velocity
 * @returns {Int}                Converted velocity
 */
exports.convertVelocitytoMPH = (velocityEci) => {
  return Math.sqrt((velocityEci.x * velocityEci.x) + (velocityEci.y * velocityEci.y) + (velocityEci.z * velocityEci.z)) * 2236.9362920544;
};

/**
 * Convert Euclidean vector km/s to km/h
 * (https://en.wikipedia.org/wiki/Euclidean_vector)
 * 
 * @param   {Object} velocityEci velocity
 * @returns {Int}                Converted velocity
 */
exports.convertVelocitytoKPH = (velocityEci) => {
  return velocityEci * 3600;
};

/**
 * Calculate radius of visible footprint on earth surface in meters
 * 
 * @param  {Int} height of satellite
 * @return {Int}        radius of visible sphere
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
 * @param  {Object} satrec current satellite track
 * @return {Object}        tracklist
 */
exports.getOrbit = (satrec, period) => {
  let trackList = [];
  for (let i = -1; i <= period; i++) {
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

exports.getVisibility = (positionEcf, location) => {
  let visibility = {
    "azimuth": null,
    "elevation": null
  };
  const observerGd = {
    longitude: satellite.degreesToRadians(location.longitude),
    latitude: satellite.degreesToRadians(location.latitude),
    height: 0.370
  };
  const lookAngles = satellite.ecfToLookAngles(observerGd, positionEcf);
  visibility.azimuth = lookAngles.azimuth * 180 / Math.PI;
  visibility.elevation = lookAngles.elevation * 180 / Math.PI;

  return visibility;
}

/**
 * Convert km to mi
 * 
 * @param  {Number} val number in kilometers to convert to miles
 * @return {Number}     converted units
 */
exports.convertUnits = (val) => {
  return val * 0.621371;
};

/**
 * Get total number of satellites in DB (for pagination)
 * 
 * @return {Array} total count of satellites
 */
exports.getSatelliteTotal = async () => {
  return await connection.one("SELECT count(s.id) FROM satellites s");
};

/**
 * Get satellite details by number
 * 
 * @param  {String} number satellite number for query param
 * @return {Array}
 */
exports.getDetailsByNumber = async (number) => {
  const satellite = await connection.one(`
    SELECT name, number, type, country, intldes, orbital_period, launch_date, description 
    FROM satellites 
    WHERE number = $1`,
    [number]
  );

  const links = await connection.query(`
    SELECT link_name, link_url 
    FROM satellite_links
    WHERE satellite_number = $1`,
    [number]
  );

  satellite.links = [];
  if (links) {
    satellite.links = links;
  }

  return satellite;
};

/**
 * Get list of satellites and corresponding categories
 * 
 * @param  {Object} params query params
 * @return {Array}         satellite list
 */
exports.getSatellites = async (params) => {
  const sql_params = {
    limit: process.env.APP_LIST_RESULTS,
    offset: process.env.APP_LIST_RESULTS * (params.page - 1),
    text: params.text ? params.text.toUpperCase() : null,
    categories: params.categories || null,
    country: params.country || null,
    sort: params.sort || null
  };

  let sql =
    "SELECT s.name, s.number, s.classification, s.launch_date, s.country, s.type, s.size, s.orbital_period, s.intldes, c.name as category_name ";
    if (sql_params.sort === "popular") {
      sql += ", COALESCE(views.count, 0) as count";
    }
    sql += " FROM satellites s" +
    " LEFT JOIN satellite_categories sc on s.id = sc.satellite_id" +
    " LEFT JOIN categories c ON sc.category_id = c.id";

  if (sql_params.sort === "popular") {
    sql += `
        LEFT JOIN (
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
  if (sql_params.country) {
    sql += " AND s.country = $5";
  }
  if (sql_params.sort) {
    sql += utils.formatSortQuery(sql_params.sort);
  }

  sql += " LIMIT $1" +
      " OFFSET $2";

  // Get data
  return await connection.task(async t => {
    let satellites = await t.query(sql, [sql_params.limit, sql_params.offset, sql_params.text, sql_params.categories, sql_params.country]);
    
    // Format data
    return utils.formatSatelliteCategory(satellites);
  });
};

/**
 * Get the most viewed satellites
 * 
 * @return {Array} list of satellites
 */
exports.getMostViewed = async (params) => {
  const sql = `
    SELECT s.id, s.name, s.number, s.classification, s.launch_date, s.country, s.type, s.size, s.orbital_period, s.intldes, c.name as category_Name, views.count
    FROM satellites s
    JOIN (
      SELECT v.satellite_id, COUNT(v.id) as count
      FROM views v
      WHERE v.date >= (NOW() - interval '${params.days} day')
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
    let satellites = await t.query(sql, params);
    
    // Format data
    return utils.formatSatelliteCategory(satellites);
  });
};

/**
 * Save satellite view
 * 
 * @param {String} name satellite name to save view for
 * @return {Void}
 */
exports.saveView = (number) => {
  const sql = `
    INSERT INTO views(satellite_id, date)
    SELECT id as satellite_id, CURRENT_TIMESTAMP as date
    FROM satellites
    WHERE number = $1
    RETURNING id
  `;
  connection.one(sql, [number]);   
};

/**
 * Get complete category list
 * 
 * @param  {String} sort direction to sort list
 * @return {Array}       category list
 */
exports.getCategoryList = async () => {
  return await connection.query(`SELECT * FROM categories ORDER BY name ASC`);  
};

/**
 * Get complete country list
 * 
 * @return {Array} country list
 */
exports.getCountryList = async () => {
  return await connection.query(`SELECT * FROM countries`);  
};

/**
 * Calculate satellite magnitude for visible pass
 * 
 * @param {Object} visibility azimuth and elevation properties
 * @return
 */
exports.calculateMagnitude = (visibility) => {
  const distanceToSatellite = visibility.height; //This is in KM
  const phaseAngleDegrees = visibility.elevation; //Angle from sun->satellite->observer
  const pa = phaseAngleDegrees * 0.0174533; //Convert the phase angle to radians
  const intrinsicMagnitude = -1.8; //-1.8 is std. mag for iss


  const term_1 = intrinsicMagnitude;
  const term_2 = 5.0 * Math.log10(distanceToSatellite / 1000.0);

  const arg = Math.sin(pa) + (Math.PI - pa) * Math.cos(pa);
  const term_3 = -2.5 * Math.log10(arg);

  return term_1 + term_2 + term_3;
}