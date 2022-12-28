const { User } = require('../models/user.js')
const fs = require('fs')

const updateAvatar = async (req, res) => {
    const { username } = req.user
    const { file } = req

    if (!file) {
        req.flash('file_err', 'Uploaded file must be an Image File')
        return res.redirect('/profile')
    }
    const userDoc = await User.findOne({ username }).exec()
    const userAvatar = userDoc.avatar.slice(1)
    
    userDoc.avatar = '/uploaded-avatars/' + file.originalname
    const updatedDoc = await userDoc.save()

    if (userAvatar.split('/')[0] === 'uploaded-avatars') {
        fs.unlink(process.cwd() + '/avatars/' + userAvatar, (err) => {
            if (err) console.error('avatar error: ', err)
            else console.log('successfuly deleted') 
        })
    }
    return res.redirect('/profile')
}

const updateBio = async (req, res) => {
    const { username } = req.user
    const { bio } = req.body

    if (!bio || !bio.trim()) return res.redirect('/profile')

    const userDoc = await User.findOne({ username }).exec()
    userDoc.bio = bio
    await userDoc.save()
    return res.redirect('/profile')
}

module.exports = { updateAvatar, updateBio }