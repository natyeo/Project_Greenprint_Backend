const dotenv = require('dotenv');
dotenv.config()

module.exports = {
  google_key: process.env.GOOGLE_KEY,
  google_key_embed_maps: process.env.GOOGLE_KEY_EMBED_MAPS,
  carbon_key: process.env.CARBON_KEY,
  mongo_atlas_key: process.env.MONGO_ATLAS_KEY,
  brighter_planet_key: process.env.BRIGHTER_PLANET_KEY,
  port: process.env.PORT,
  secretOrKey: "secret"
};
