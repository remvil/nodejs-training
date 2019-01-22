const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  mongoDBhost: process.env.MDBHOST || 'localhost',
  mongoDBport: process.env.MDBPORT || 27017,
  author: process.env.AUTHOR || 'noone'
};
