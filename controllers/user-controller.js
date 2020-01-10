const User = require('../models/user-model')

createTravel = (req, res) => {
    const body = req.body

    const user = new User(body)

    if (!user) {
        return res.status(400).json({ success: false, error: err })
    }

    user
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'Route imported!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Route not imported!',
            })
        })
}

getTravels = async (req, res) => {
    await User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `History routes not found` })
        }
        return res.status(200).json({ success: true, data: users })
    }).catch(err => console.log(err))
}

module.exports = {
    createTravel,
    getTravels,
}
