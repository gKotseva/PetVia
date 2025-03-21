const router = require('express').Router()

const userController = require('./controllers/userController')
const salonController = require('./controllers/salonController')
const authController = require('./controllers/authController')

router.use('/api/auth', authController)
router.use('/api/users', userController)
router.use('/api/salon', salonController)

module.exports = router