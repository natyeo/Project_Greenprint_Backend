const express = require('express')

const RecordController = require('../controllers/record-controller')

const router = express.Router()

router.post('/record', RecordController.createRecord)
router.get('/records', RecordController.getRecords)
router.get('/record/:id', RecordController.getRecordById)


module.exports = router
