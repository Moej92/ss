const { User } = require('../models/user')

const allFriends = async (username) => {
    const friendsDocs = await User.find( { friends: username }).lean().exec()
    const friendsData = friendsDocs.map(doc => ({
        username: doc.username,
        avatar: doc.avatar,
        bio: doc.bio
    }))
    return friendsData
}

const getAllFriends = async (req, res) => {
    const { id: main_userID, username: main_username, avatar: main_avatar } = req.user
    
    const receivedNotifications = await User.findReceivedNotifications(main_userID)
    const sentNotifications = await User.findSentNotifications(main_userID) 

    let friends;
    if (!req.params.username) {
        friends = await allFriends(main_username)    
    } else {
        friends = await allFriends(req.params.username)
    }
    return res.render(
        process.cwd() + '/views/pug/friends.pug', 
        { 
            main_username, 
            main_avatar, 
            friends, 
            sentNotifications,
            receivedNotifications
        }
    )
}

module.exports = { getAllFriends }