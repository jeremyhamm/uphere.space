const redis = require("redis");

let client = null;
if (process.env.NODE_ENV === 'development') {
  client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  });
} else {
  client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    tls: true
  });
}

module.exports = client;