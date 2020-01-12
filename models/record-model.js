const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Record = new Schema({
  model: { type: String, required: true },
  distance: { type: Number, required: true },
  carbon: { type: Number, required: true },
  user: [{type: mongoose.Types.ObjectId, ref: 'users'}]
});

module.exports = mongoose.model('Record', Record);
