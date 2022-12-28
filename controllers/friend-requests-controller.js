const { User } = require('../models/user.js')

const addFriend = async (main_userID, main_username, requested_userID) => {
    const main_user_doc = await User.findById(main_userID)
    await main_user_doc.updateOne({ $push: { sent_requests: requested_userID }})
    await User.findByIdAndUpdate(
        requested_userID,
        {
            $push: {
                received_requests: main_userID,
                notifications: { 
                    date: new Date(), 
                    id: main_userID,
                    unread: true
                }
            }
        }
    )
}

const cancelRequest = async (main_userID, requested_userID) => {
    await User.findByIdAndUpdate(
        main_userID,
        { $pull: { sent_requests: requested_userID }}
    )
    await User.findByIdAndUpdate(
        requested_userID,
        {
            $pull: {
                received_requests: main_userID,
                notifications: { id: main_userID }
            }
        }
    )
}

const confirmFriendRequest = async (main_userID, requested_userID) => {
    await User.findByIdAndUpdate(
        main_userID,
        {
            $push: { friends: { friendID: requested_userID } },
            $pull: {
                received_requests: requested_userID,
                notifications: { id: requested_userID }
            }
        }
    )
    await User.findByIdAndUpdate(
        requested_userID,
        {
            $push: { friends: { friendID: main_userID } },
            $pull: { sent_requests: main_userID }
        }
    )
}

const rejectFriendRequest = async (main_userID, requested_userID) => {
    await User.findByIdAndUpdate(
        main_userID,
        {
            $pull: {
                received_requests: requested_userID,
                notifications: { id: requested_userID }
            }
        }
    )
    await User.findByIdAndUpdate(requested_userID, { $pull: { sent_requests: main_userID } } )
}

const removeFriend = async (main_userID, friendID) => {
    await User.findByIdAndUpdate(main_userID, { $pull: { friends: { friendID } } } )
    await User.findByIdAndUpdate(friendID, { $pull: { friends: { friendID } } } )
}

const handleRequest = async (req, res) => {
    const { url: request_url } = req
    const { main_userID, main_username, requested_userID, requested_username } = req.body

    switch(request_url) {
        case '/add-friend':
            await addFriend(main_userID, main_username, requested_userID)
            break;
        case '/cancel-request':
            await cancelRequest(main_userID, requested_userID)
            break;
        case '/confirm-request':
            await confirmFriendRequest(main_userID, requested_userID)
            break;
        case '/reject-request':
            await rejectFriendRequest(main_userID, requested_userID)
            break;
        case '/remove-friend':
            await removeFriend(main_userID, requested_userID)
            break;
    }

    return res.redirect('/profile/' + requested_username)
}

module.exports = { handleRequest }