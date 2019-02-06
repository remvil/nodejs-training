const winston = require('winston');
const config = require('config');
const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

app.listen(config.get('ListeningPort'), () =>{
  winston.info(`Vidly run and listening on port ${config.get('ListeningPort')} ...`);
});