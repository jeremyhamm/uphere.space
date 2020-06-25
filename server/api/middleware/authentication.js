const jwt = require("jsonwebtoken");

/**
 * Validate auth token
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.APP_JWT_PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.userId = decoded.user;
    next();
  });
}

module.exports = {
  authenticateToken
}