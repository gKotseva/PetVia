const express = require('express')
const routes = require('./router')
const cors = require('cors');

const app = express()
const PORT = 8888

app.use(cors({ origin: 'https://petvia-front.onrender.com' }));

app.use(express.json())
app.use('/', routes)

app.listen(PORT, console.log(`Server is listening on port: ${PORT}`))