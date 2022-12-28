const router = require('express').Router()
const { renderAccountSettings, changeUsername, changePassword, deleteAccount } = require('../controllers/account-settings-controller')

router.get('/', renderAccountSettings)
router.post('/change-username', changeUsername)
router.post('/change-password', changePassword)
router.delete('/delete-account', deleteAccount)

module.exports = router