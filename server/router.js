const router = require('express').Router()

const userController = require('./controllers/userController')
const salonController = require('./controllers/salonController')
const authController = require('./controllers/authController')
const sharedController = require('./controllers/sharedController')

router.use('/api/auth', authController)
router.use('/api/user', userController)
router.use('/api/salon', salonController)
router.use('/api/shared', sharedController)

module.exports = router