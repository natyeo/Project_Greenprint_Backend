const { mongo_atlas_key } = require("../config");


const mongoose = require("mongoose");
mongoose.connect(mongo_atlas_key, { useNewUrlParser: true }).catch(e => {
  console.error("Connection error", e.message);
});

const db = mongoose.connection;

module.exports = db;
