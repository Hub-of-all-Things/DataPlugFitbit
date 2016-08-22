var PRODUCTION = process.env.NODE_ENV === 'production';
var TEST = process.env.NODE_ENV === 'test';

var config = {};
config.currentEnv = process.env.NODE_ENV || 'development';

config.webServer = {
  host: process.env.HOST || 'localhost',
  port: normalizePort(process.env.PORT || 3000),
};

config.mongodb = {
  host: process.env.MONGODB_HOST || 'localhost',
  port: process.env.MONGODB_PORT || 27017,
  db: 'data_plug_fb'
};

config.hat = {
  username: process.env.HAT_USER,
  password: process.env.HAT_PASSWORD
};

config.protocol = process.env.SECURE === 'true' ? 'https' : 'http';

config.updateService = {
  repeatInterval: 60 * 1000,
  dbCheckInterval: 2 * 60 * 1000
}

if (TEST) config.webServer.port = 5525;

const protocol = process.env.SECURE === 'true' ? 'https' : 'http';

config.webServerURL = config.protocol + '://' + config.webServer.host;

if (!PRODUCTION) config.webServerURL += ':' + config.webServer.port;

config.dbURL = 'mongodb://' + config.mongodb.host + ':' + config.mongodb.port +
'/' + config.mongodb.db + '_' + config.currentEnv;

module.exports = config;

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}