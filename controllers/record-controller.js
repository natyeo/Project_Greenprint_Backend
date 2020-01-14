const Record = require('../models/record-model')
const User = require('../models/user-model')
createRecord = (req, res) => {
    const body = req.body
    // console.log(req.body)

    const record = new Record(body)

    if (!record) {
        return res.status(400).json({ success: false, error: err })
    }

    record
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: record._id,
                message: 'Record imported!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Record not imported!',
            })
        })
}

getRecordById = async (req, res) => {
    await Record.findOne({ _id: req.params.id }, (err, record) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!record) {
            return res
                .status(404)
                .json({ success: false, error: `Travel record not found` })
        }
        return res.status(200).json({ success: true, data: record })
    }).catch(err => console.log(err))
}



getRecords = async (req, res) => {
    await Record.find({}, (err, records) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!records.length) {
            return res
                .status(404)
                .json({ success: false, error: `History record not found` })
        }
        return res.status(200).json({ success: true, data: records })
    }).catch(err => console.log(err))
}


getRecordByUser = async (req, res) => {
  console.log(req.params)
    await Record.find({ user: req.params.user_id }, (err, record) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!record) {
            return res
                .status(404)
                .json({ success: false, error: `Travel record not found for this user` })
        }
        return res.status(200).json({ success: true, data: record })
    }).catch(err => console.log(err))

  }

module.exports = {
    createRecord,
    getRecords,
    getRecordById,
    getRecordByUser
}
