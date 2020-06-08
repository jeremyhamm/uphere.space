require("dotenv").config();

// Init
const app = require("express")();
const http = require("http").createServer(app);
const cookieParser = require('cookie-parser');
const cors = require("cors");
const bodyParser = require("body-parser");

// Cookie Parser
app.use(cookieParser());

// Compression
const compression = require('compression');
app.use(compression());

// Helmet
const helmet = require("helmet");
app.use(helmet());

// CORS
app.use(cors());
app.options(process.env.APP_URL, cors());

// API
const satelliteRoutes = require("./routes/satellite.route");
const userRoutes = require("./routes/user.route");

// App
app.use(bodyParser.json());
app.use("/api/satellite", satelliteRoutes);
app.use("/api/user", userRoutes);

// 404
app.use("*", (req, res) => {
  res.status(404).send("This is not the endpoint you are looking for");
});

// Running...
http.listen(process.env.NODE_PORT, function(){
  console.log("listening on: " + process.env.NODE_PORT);
});