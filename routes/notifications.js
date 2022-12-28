const router = require('express').Router()

const { notificationRead } = require('../controllers/notifications-controller')

router.put('/', notificationRead)

module.exports = router