const { User } = require('../models/user.js')

const notificationRead = async (req, res) => {
    const { main_username, notification_userid } = req.body
    console.log(main_username, notification_userid)
    await User.findOneAndUpdate(
        { username: main_username, 'notifications.id': notification_userid},
        { $set: { 'notifications.$.unread': false } }
    )
    return res.json({ requested: true })
}

module.exports = { notificationRead }