const router = require('express').Router()
const { getAllFriends } = require('../controllers/friends-controller')

router.get('/friends', getAllFriends)
router.get('/:username/friends', getAllFriends)

module.exports = router