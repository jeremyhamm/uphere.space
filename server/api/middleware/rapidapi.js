const whitelist = require('../static/ip-whitelist');

/**
 * Validate Rapid API key from client
 * 
 * @param  {String} key client api key
 * @return {Boolean}
 */
const headerValidation = (key) => {
  return key === process.env.RAPID_API_SECRET ? true : false;
}

/**
 * Validate client api against whitelist
 * 
 * @param  {String} ip client ip
 * @return {Boolean}
 */
const ipValidation = (ip) => {
  return whitelist.includes(ip) || false;
}

/**
 * Validate Rapid API key against secret
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const rapidApiValidation = (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    return next();
  }

  // Run validations
  if (
    headerValidation(req.headers['x-rapidapi-proxy-secret']) &&
    ipValidation(req.headers['cf-connecting-ip'])
  ) {
    return next();
  } else {
    return res.sendStatus(403);
  }
}

module.exports = rapidApiValidation;