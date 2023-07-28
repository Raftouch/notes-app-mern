const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hi there')
})

app.get('*', (req, res) => {
  res.send('404 page not found')
})

app.listen(port, () => console.log(`App listening on port ${port}`))
