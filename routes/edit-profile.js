const router = require('express').Router()
const { updateAvatar, updateBio } = require('../controllers/edit-profile-controller')

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './avatars/uploaded-avatars')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({
        storage: storage,
        fileFilter: function(req, file, cb) {
            if (file.mimetype.slice(0, 5) !== 'image') return cb(null, false)
            else return cb(null, true)    
        } 
    })

router.post('/update-avatar', upload.single('upload_avatar'), updateAvatar)
router.post('/update-bio', updateBio)

module.exports = router