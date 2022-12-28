const { User } = require('../models/user')

const renderChatPage = async (req, res) => {
    const { id } = req.params
    const chatFriends  = await User.findFriends(req.user._id, 30, req.user.id)
    if (!id) return res.redirect('/chat/' + chatFriends[0].id)
    const sentNotifications = await User.findSentNotifications(req.user._id)
    const receivedNotifications = await User.findReceivedNotifications(req.user._id)
    
    // console.log(chatFriends)
    return res.render(
        process.cwd() + '/views/pug/chat.pug', 
        {   
            main_userID: req.user._id,
            main_username: req.user.username, 
            main_avatar: req.user.avatar, 
            sentNotifications,
            receivedNotifications,
            chatFriends
        }    
    )
}

module.exports = { renderChatPage }