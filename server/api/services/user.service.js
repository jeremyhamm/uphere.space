const dbConnection = require("../database/postgres.connection");
const redisConnection = require("../database/redis.connection");

/**
 * Get all visible satellites for specific location
 * 
 * @param {Coords} coords lat and lng for location to get satellite visibility
 */
exports.getVisibleSatellites = async (coords) => {
  const sql = `
    SELECT s.number, s.name
    FROM satellites s 
    JOIN satellite_categories sc on s.id = sc.satellite_id
    WHERE sc.category_id = 3
    ORDER by s.number asc;
  `;
  let satellites = await dbConnection.query(sql);

  for (let i = 0; i < satellites.length; i++) {
    redisConnection.hgetall(satellites[i].number, (error, result) => {
      if (error || !result) {
        return error;
      }

    });
  }
}


