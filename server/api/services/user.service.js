const dbConnection = require("../database/postgres.connection");
const redisConnection = require("../database/redis.connection");
const { promisify } = require("util");
const getAsync = promisify(redisConnection.hgetall).bind(redisConnection);
const satellite = require("satellite.js");
const satelliteService = require("./satellite.service");

/**
 * Get all visible satellites for specific location
 * 
 * @param {Coords} coords lat and lng for location to get satellite visibility
 */
exports.getBrightestSatellites = async () => {
  const sql = `
    SELECT s.number, s.name, s.orbital_period
    FROM satellites s 
    JOIN satellite_categories sc on s.id = sc.satellite_id
    WHERE sc.category_id = 3
    ORDER by s.number asc;
  `;
  return  await dbConnection.query(sql);
}

exports.getVisibleSatellites = async (coords, satellites) => {
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


