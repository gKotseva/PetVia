const router = require('express').Router()

const userController = require('./controllers/userController')
const salonController = require('./controllers/salonController')
const authController = require('./controllers/authController')
const sharedController = require('./controllers/sharedController')
const calendarController = require('./controllers/calendarController')

router.use('/api/auth', authController)
router.use('/api/user', userController)
router.use('/api/salon', salonController)
router.use('/api/shared', sharedController)
router.use('/api/calendar', calendarController)

module.exports = router