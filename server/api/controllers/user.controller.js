const request = require("request-promise");
const nodemailer = require("nodemailer");
const userService = require("../services/user.service");

/**
 * Get current location by IP
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {JSON} json location information
 */
exports.getLocationByIp = async(req, res) => {
  if (process.env.NODE_ENV === 'development') {
    return res.status(200);
  }
  //const ip = '157.230.146.22';
  const ip = req.clientIp;
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
 * @return {Response} http response
 */
exports.getVisibleSatellites = async (req, res) => {
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
 * @return {Response} http response
 */
exports.sendMessage = async (req, res) => {
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