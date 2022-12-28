const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    users: [{
        user: { type: mongoose.Schema.Types.ObjectId, required: true }
    }],
    message: { type: String, required: true },
    sender: { type: String }
})

let Chat = mongoose.model('Chat', chatSchema)

module.exports = { Chat }