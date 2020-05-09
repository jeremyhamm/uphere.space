const request = require("request-promise");
const nodemailer = require("nodemailer");
const userService = require("../services/user.service");

/**
 * Get current location by IP
 * 
 * @param  {Object} req request object
 * @param  {Object} res response object
 * @return {JSON}       json location information
 */
exports.getLocationByIp = async(req, res) => {
  if (process.env.NODE_ENV === 'development') {
    return res.status(200);
  }
  //const ip = `76.167.235.86`;
  //const url = `${process.env.IP_DATA_URL}/${ip}?api-key=${process.env.IP_DATA_API_KEY}`;
  const ip = req.clientIp;
  const url = `${process.env.IP_API_URL}/${ip}`;
  try {
    let response = await request.get(url);
    let jsonparse = JSON.parse(response);
    const location = {
      latitude: jsonparse.lat,
      longitude: jsonparse.lon
    };
    return res
      .status(200)
      .cookie("location", JSON.stringify(location), {
        expires: new Date(Date.now() + (365 * 3600000)), 
        domain: ".uphere.space", 
        path: "/",
        sameSite: 'lax',
        secure: true, 
        httpOnly: true 
      })
      .json(jsonparse);
  } catch(error) {
    console.log(error.error);
    return res.sendStatus(error.statusCode);
  }
};

/**
 * Get satellites visible to user
 * 
 * @param  {Object}   req request object
 * @param  {Object}   res response object
 * @return {Response}     http response
 */
exports.getVisibleSatellites = (req, res) => {
  if ( req.cookies.location || ( req.lat && req.lng ) ) {
    const coords = req.cookies.location || { "lat": req.lat, "lng": req.lng };
    userService.getVisibleSatellites(coords);
  } else {
    return res.sendStatus(400);
  }
}

/**
 * Send message from contact form
 * 
 * @param  {Object}   req request object
 * @param  {Object}   res response object
 * @return {Response}     http response
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