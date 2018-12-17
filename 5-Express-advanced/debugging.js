const debug = require('debug')('app:*n');
const morgan = require('morgan');
const express = require('express');
const app = express();

// Works with export NODE_ENV=development
if(app.get('env') === 'development'){
  app.use(morgan('tiny'));
  debug('Morgan Enabled...');
}

// Db work..
debug('Connected to the database...');
// Works with DEBUG=app:db nodemon debugging.js
// or DEBUG=app:startup nodemon debugging.js

const port = process.env.PORT || 3000
app.listen(port, () =>  console.log(`Listen on port ${port}...`));
