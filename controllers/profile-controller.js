const { User } = require('../models/user')

const getProfileInfo = (userDoc, profile) => {
    const { _id, username, avatar, bio } = userDoc
    return { _id, username, avatar, bio, profile }
}

const getUserProfile = async (req, res) => {
    let friends,
        profileInfo;

    const sentNotifications = await User.findSentNotifications(req.user._id)
    const receivedNotifications = await User.findReceivedNotifications(req.user._id)
    
    const suggestedFriends = await User.findSuggestedFriends(req.user._id, 10)

    if (!req.params.username) {
        const main_userDoc = await User.findUserDoc(req.user.id)
        profileInfo = getProfileInfo(main_userDoc, 'main user profile')
        friends = await User.findFriends(req.user._id, 10, req.user.id)
    } else {
        if (req.params.username === req.user.username) return res.redirect('/profile')

        const userDoc = await User.findUserDoc(req.params.username)
        if (!userDoc) profileInfo = null
        else {
            let profile;
            if (userDoc.received_requests.includes(req.user.id)) {
                profile = 'sent friend request profile'
            }
            else if (req.user.received_requests.includes(userDoc._id)) {
                profile = 'received friend request profile'
            }
            else if (
                req.user.friends.some(friend => friend.friendID === userDoc._id.toString()) && 
                userDoc.friends.some(friend => friend.friendID === req.user.id)
            ) {
                profile = 'friend profile'
            } 
            else profile = 'non friend profile'

            friends = await User.findFriends(userDoc._id, null, req.user.id)
            profileInfo = getProfileInfo(userDoc, profile)
        }   
    }

    return res.render(
        process.cwd() + '/views/pug/profile.pug', 
        { 
            main_userID: req.user._id,
            main_username: req.user.username, 
            main_avatar: req.user.avatar, 
            profileInfo, 
            friends,
            sentNotifications,
            receivedNotifications,
            suggestedFriends
        }
    )

}

module.exports = { getUserProfile }

