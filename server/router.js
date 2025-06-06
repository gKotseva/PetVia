const router = require('express').Router()

const userController = require('./controllers/customer')
const salonController = require('./controllers/salon')
const authController = require('./controllers/auth')
const sharedController = require('./controllers/shared')
const calendarController = require('./controllers/schedule')
const testController = require('./controllers/testController')

router.use('/api/auth', authController)
router.use('/api/user', userController)
router.use('/api/salon', salonController)
router.use('/api/shared', sharedController)
router.use('/api/schedule', calendarController)
router.use('/api/test', testController)

module.exports = router