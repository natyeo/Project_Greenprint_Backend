const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Record = new Schema({
    mode: { type: String, required: true },
    distance: { type: Number, required: true },
    carbon: { type: Number, required: true},
       user: { type: mongoose.Types.ObjectId, ref: 'User' },
  });

module.exports = mongoose.model("record", Record);
