const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const app = express();


console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);

// Express Configuration
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
// https://www.npmjs.com/package/helmet
// Helmet helps secure Express apps by setting various HTTP headers.
// It's best to use Helmet early in your middleware stack so that its headers are sure to be set.
app.use(helmet());

// Call the Router module
app.use('/api/courses', courses);
app.use('/', home);

// Configuration using config package
console.log("Application Name: " + config.get('name'));
console.log("Mail Server: " + config.get('mail.host'));
console.log("Mail Passwd: " + config.get('mail.password'));

if(app.get('env') === 'development'){
  app.use(morgan('tiny'));
  console.log('Morgan enabled...');
}

app.use(logger);

const port = process.env.PORT || 3000
app.listen(port, () =>  console.log(`Listen on port ${port}...`));
