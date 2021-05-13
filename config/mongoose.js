const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/expense'
mongoose.connect(MONGODB_URI,  { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(error => handleError(error))

const db = mongoose.connection

db.on('error', () => console.log('MongoDB error!'))

db.once('open', () => console.log('MongoDB Connected!'))

module.exports = db