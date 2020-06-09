const request = require("request-promise");
const nodemailer = require("nodemailer");
const userService = require("../services/user.service");
const {OAuth2Client} = require('google-auth-library');
const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

/**
 * Get current location by IP
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {JSON} json location information
 */
const getLocationByIp = async(req, res) => {
  let ip;
  if (process.env.NODE_ENV === 'development') {
    ip = '157.230.146.22';
  } else {
    ip = req.clientIp;
  }
  const url = `${process.env.IP_API_URL}/${ip}`;
  try {
    let response = await request.get(url);
    let jsonparse = JSON.parse(response);
    return res
      .status(200)
      .json(jsonparse);
  } catch(error) {
    return res.sendStatus(400);
  }
};

/**
 * Get satellites visible to user
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {Response} http response
 */
const getVisibleSatellites = async (req, res) => {
  if ( req.query.lat && req.query.lng ) {
    const coords = { "latitude": req.query.lat, "longitude": req.query.lng };
    const satellites = await userService.getBrightestSatellites();
    userService.getVisibleSatellites(coords, satellites).then(results => {
      if (results) {
        return res.status(200).json(results);
      } else {
        return res.sendStatus(200);
      }
    }).catch(err => {
      console.log(err);
      return res.status(400);
    });
  } else {
    return res.sendStatus(400);
  }
}

/**
 * Send message from contact form
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {Response} http response
 */
const sendMessage = async (req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_USERNAME,
      pass: process.env.ZOHO_PASSWORD
    }
  });

  // Configure message details
  const message = {
    from: process.env.ZOHO_USERNAME,
    to: process.env.ZOHO_EMAIL,
    replyTo: req.body.email,
    subject: "Hello from " + req.body.name,
    text: req.body.message
  };

  await transporter.sendMail(message, (error) => {
    if (error) {
      return res.sendStatus(400);
    } else {
      return res.sendStatus(200);
    }
  });
};

/**
 * Authenticate with Google
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {Response} http response
 */
const googleSignin = (req, res) => {
  // Generate the url that will be used for the consent dialog.
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]      
  });

  return res.status(200).json(authorizeUrl);
};

/**
 * Redirect url for Google oauth2
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {Response} http response
 */
const googleSigninRedirect = async (req, res) => {
  const code = req.query.code;
  const scope = req.query.scope;

  const r = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(r.tokens);

  console.log(r);
}

module.exports = {
  getLocationByIp,
  getVisibleSatellites,
  sendMessage,
  googleSignin,
  googleSigninRedirect
}