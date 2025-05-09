const express = require('express')
const routes = require('./router')

const app = express()
const PORT = 8888

app.use(express.json())
app.use('/', routes)

app.listen(PORT, console.log(`Server is listening on port: ${PORT}`))