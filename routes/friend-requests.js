const router = require('express').Router()

const { handleRequest } = require('../controllers/friend-requests-controller') 
const { ensureAuthenticated } = require('../auth/ensureAuthenticated')

router.post('/add-friend', ensureAuthenticated, handleRequest)
router.post('/remove-friend', ensureAuthenticated, handleRequest)
router.post('/cancel-request', ensureAuthenticated, handleRequest)
router.post('/confirm-request', ensureAuthenticated, handleRequest)
router.post('/reject-request', ensureAuthenticated, handleRequest)

module.exports = router