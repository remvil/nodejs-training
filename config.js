const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  expressPort: process.env.SRV_PORT || 6969,
  mongoDBhost: process.env.MDBHOST || 'localhost',
  mongoDBport: process.env.MDBPORT || 27017,
  author: process.env.AUTHOR || 'noone'
};
