require("dotenv").config();

// Init
const app = require("express")();
const http = require("http").createServer(app);
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Helmet
const helmet = require("helmet");
app.use(helmet());

// CORS
app.use(cors());
app.options(process.env.APP_URL, cors());

// Cookie Parser
app.use(cookieParser());

// API
const satelliteRoutes = require("./routes/satellite.route");
const userRoutes = require("./routes/user.route");

// App
app.use(bodyParser.json());
app.use("/api/satellite", satelliteRoutes);
app.use("/api/user", userRoutes);

// Running...
http.listen(process.env.NODE_PORT, function(){
  console.log("listening on: " + process.env.NODE_PORT);
});