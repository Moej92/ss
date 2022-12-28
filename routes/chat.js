const router = require('express').Router()
const { renderChatPage } = require('../controllers/chat-controller')
const { ensureAuthenticated } = require('../auth/ensureAuthenticated')

router.get('/', ensureAuthenticated, renderChatPage)
router.get('/:id', ensureAuthenticated, renderChatPage)

module.exports = router