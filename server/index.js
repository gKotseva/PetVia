const express = require('express')

const app = express()
const PORT = 8888

app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(PORT, console.log(`Server is listening on port: ${PORT}`))