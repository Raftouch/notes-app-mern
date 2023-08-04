const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL)

mongoose.connection.on('connected', () => console.log('Connected to MongoDB'))
mongoose.connection.on('error', (error) => {
  console.log('Error connecting to MongoDB', error)
  process.exit(1)
})

module.exports = mongoose
