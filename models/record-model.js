const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Record = new Schema({
  model: { type: String, required: true },
  distance: { type: Number, required: true },
  carbon: { type: Number, required: true },
  profile: [{type: Schema.Types.ObjectId, ref: 'user'}]
});

module.exports = mongoose.model(Record, 'profile')
