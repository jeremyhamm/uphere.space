require('dotenv').config();

// Init
const app = require('express')();
const http = require('http').createServer(app);
const cors = require('cors');
const bodyParser = require('body-parser');
const prerender = require('prerender-node');
const cookieParser = require('cookie-parser');

// Prerender.io
prerender.crawlerUserAgents.push('googlebot');
prerender.crawlerUserAgents.push('bingbot');
prerender.crawlerUserAgents.push('yandex');
app.use(prerender
  .set('prerenderToken', process.env.PRERENDER_IO_TOKEN)
  .set('forwardHeaders', true)
  //.set('host', 'https://uphere.space')
  .blacklisted('^/api')
);

// Helmet
const helmet = require('helmet');
app.use(helmet());

// CORS
app.use(cors());
app.options(process.env.APP_URL, cors());

// Cookie Parser
app.use(cookieParser())

// API
const satelliteRoutes = require('./routes/satellite.route');
const userRoutes = require('./routes/user.route');

// App
app.use(bodyParser.json());
app.use('/api/satellite', satelliteRoutes);
app.use('/api/user', userRoutes);

// Running...
http.listen(process.env.NODE_PORT, function(){
  console.log('listening on: ' + process.env.NODE_PORT);
});