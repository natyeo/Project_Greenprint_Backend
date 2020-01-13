const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  google_key: process.env.GOOGLE_KEY,
  carbon_key: process.env.CARBON_KEY,
  climateneutral_key: process.env.CLIMATENEUTRAL_KEY,
  port: process.env.PORT
};
