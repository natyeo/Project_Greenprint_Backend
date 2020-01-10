const express = require('express')

const UserCtroller = require('../controllers/user-controller')

const router = express.Router()

router.post('/travel', UserCtroller.createTravel)
router.get('/travels', UserCtroller.getTravels)

module.exports = router
