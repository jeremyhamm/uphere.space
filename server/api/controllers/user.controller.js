const request = require("request-promise");
const nodemailer = require("nodemailer");

/**
 * Get current location by IP
 * 
 * @param  {Object} req request object
 * @param  {Object} res response object
 * @return {JSON}       json location information
 */
exports.getLocationByIp = async(req, res) => {
  //const ip = '134.209.63.38';
  const ip = req.clientIp;
  const url = process.env.IP_DATA_URL + "/" + ip + "?api-key=" + process.env.IP_DATA_API_KEY;
  try {
    let response = await request.get(url);
    let jsonparse = JSON.parse(response);
    const location = {
      latitude: jsonparse.latitude,
      longitude: jsonparse.longitude
    };
    return res
      .status(200)
      .cookie("location", JSON.stringify(location), {
        expires: new Date(Date.now() + (365 * 3600000)), 
        domain: "uphere.space", 
        path: "/", 
        secure: true, 
        httpOnly: true 
      })
      .json(jsonparse);
  } catch(error) {
    return res.sendStatus(error.statusCode);
  }
};

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

/**
 * Send message from contact form
 * 
 * @param {Object}   req request object
 * @param {Object}   res response object
* @return {Response}     http response
 */
exports.updateSettings = (req, res) => {
  const settings = req.body;
  return res
    ..sendStatus(200)
    .cookie("settings", JSON.stringify(settings), {
      expires: new Date(Date.now() + (365 * 3600000)), 
      domain: "uphere.space", 
      path: "/", 
      secure: true, 
      httpOnly: true 
    });
}