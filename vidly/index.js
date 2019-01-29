const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');

const express = require('express');
const app = express();
const { expressPort } = require('../config');
const { mongoDBport } = require('../config');
const { mongoDBhost } = require('../config');

mongoose.connect(`mongodb://${mongoDBhost}:${mongoDBport}/vidly`, {useNewUrlParser: true})
  .then(() => console.log(`Connected to MongoDB at mongodb://${mongoDBhost}:${mongoDBport} ...`))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);

app.listen(expressPort, () =>{
  console.log(`Vidly run and listening on ${expressPort}..`);
})
