const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Record = new Schema(
    {
        model: { type: String, required: true },
        distance: { type: Number, required: true },
        carbon: { type: Number, required: true },
    },
)

module.exports = mongoose.model('record', Record)
