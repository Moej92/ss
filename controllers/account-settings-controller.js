const bcrypt = require('bcrypt')
const { User } = require('../models/user')

const renderAccountSettings = async (req, res) => {
    const { id: main_userID, username: main_username, avatar: main_avatar } = req.user
    
    const receivedNotifications = await User.findReceivedNotifications(main_userID)
    const sentNotifications = await User.findSentNotifications(main_userID) 

    const nameErr = req.flash('name_err')[0]
    const passwordErr = req.flash('password_err')[0]

    return res.render(
        process.cwd() + '/views/pug/account-settings.pug',
        { 
            main_username, 
            main_avatar, 
            sentNotifications,
            receivedNotifications,
            nameErr,
            passwordErr
        }
    )
} 

const changeUsername = async (req, res) => {
    const { _id } = req.user
    const { new_username } = req.body
    
    const doc = await User.findOne({ username: new_username })
    if (doc) req.flash('name_err', new_username + ' has already been taken') 
    else await User.findByIdAndUpdate(_id, { username: new_username })

    return res.redirect('/account-settings')
}

const changePassword = async (req, res) => {
    const { _id } = req.user
    const { current_password, new_password } = req.body

    const userDoc = await User.findById(_id)
    const userStoredPassword = userDoc.password

    bcrypt.compare(current_password, userStoredPassword, (err, response) => {
        if (err) return console.error('change password err', err)
        if (!response) {
            req.flash('password_err', 'Incorrect password')
        } else {
            bcrypt.hash(new_password, 12, async (err, hash) => {
                if (err) return console.error('change password err', err)
                userDoc.password = hash
                await userDoc.save()
            })
        }
        return res.redirect('/account-settings')
    })
}

const deleteAccount = async (req, res) => {

}

module.exports = { renderAccountSettings, changeUsername, changePassword, deleteAccount }