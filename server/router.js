const router = require('express').Router()

const userController = require('./controllers/userController')
const salonController = require('./controllers/salonController')

router.use('/api/users', userController)
router.use('/api/salon', salonController)

module.exports = router