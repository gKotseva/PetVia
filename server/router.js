const router = require('express').Router()

const customerController = require('./controllers/customer')
const salonController = require('./controllers/salon')
const authController = require('./controllers/auth')
const sharedController = require('./controllers/shared')
const scheduleController = require('./controllers/schedule')
const testController = require('./controllers/testController')

router.use('/api/auth', authController)
router.use('/api/customer', customerController)
router.use('/api/salon', salonController)
router.use('/api/shared', sharedController)
router.use('/api/schedule', scheduleController)
router.use('/api/test', testController)

module.exports = router