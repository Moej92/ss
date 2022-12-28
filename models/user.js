const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    created_on: { type: Date, default: Date.now() },
    avatar: { type: String, default: '/default-avatar.jpg'},
    bio: { type: String, default: 'Hey there am using Socialcom'},
    friends: [{
        friendID: { type: String, required: true},
        lastChat: { type: Date },
    }],
    notifications: { type: [ Object ], default: [] },
    sent_requests: { type: [ String ], default: [] },
    received_requests: { type: [ String ], defaule: [] },
    chats: { type: [ Object ], defaule: []} 
})

userSchema.statics.findUserDoc = async function(queryStr) {
    try {
        if (queryStr.match(/^[0-9a-fA-F]{24}$/)) {
            // console.log('by ID')
            return await this.findById(queryStr).lean().exec()
        } else {
            // console.log('by username')
            return await this.findOne({ username: queryStr }).lean().exec()
        }
    } catch(e) {
        console.error(e)
    }
}

userSchema.statics.findFriends = async function(id, limit, main_userID) {
    try {
        const friendsDocs = await this.find({ 'friends.friendID': id  })
            .limit(limit)
            .sort({ 'friends.lastChat': -1 }).lean().exec()
        // console.log(friendsDocs)
        return friendsDocs.map(doc => {
            return ({ 
                id: doc._id.toString(),
                username: doc.username, 
                avatar: doc.avatar, 
                bio: doc.bio,
                isFriend: doc.friends.some(friend => friend.friendID === main_userID) ? true : false 
            })
        })
    } catch(e) {
        console.error(e)
    }
}

userSchema.statics.findSentNotifications = async function(main_userID) {
    const docs = await this.find({ received_requests: main_userID }).lean().exec()

    if (docs) {
        const sent_notifications = docs.map(doc => {
            const notification_idx = doc.notifications.findIndex(n => n.id === main_userID.toString())
            return ({
                username: doc.username, 
                avatar: doc.avatar, 
                date: doc.notifications[notification_idx].date.toLocaleDateString()
            })
        })
        return sent_notifications
    }
}

userSchema.statics.findReceivedNotifications = async function(main_userID) {
    const docs = await this.find({ sent_requests: main_userID }).lean().exec()
    const { notifications } = await this.findById(main_userID)

    if (docs) {
        const received_notifications_data = docs.map(doc => {
            const notification_idx = notifications.findIndex(n => n.id === doc._id.toString())
            return ({
                id: doc._id.toString(), 
                username: doc.username, 
                avatar: doc.avatar,
                date: notifications[notification_idx].date.toLocaleDateString(),
                unread: notifications[notification_idx].unread
            })
        })
        return received_notifications_data.reverse()
    }
}

userSchema.statics.findSuggestedFriends = async function(main_userID, limit) {
    const suggestedDocs = await this.find(
        { 
            _id: { $ne: main_userID },
            'friends.friendID': { $ne: main_userID },
            received_requests: { $nin: main_userID }
        }
    ).limit(limit).lean().exec()
    return suggestedDocs.map(doc => ({
        username: doc.username,
        avatar: doc.avatar,
        bio: doc.bio
    }))
}

const User = mongoose.model('User', userSchema)

module.exports = { User }