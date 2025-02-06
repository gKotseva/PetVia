const router = require('express').Router()

const userController = require('./controllers/userController')

router.use('/api/users', userController)

module.exports = router