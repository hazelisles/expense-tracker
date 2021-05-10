const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/expense',  { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => console.log('MongoDB error!'))

db.once('open', () => console.log('MongoDB Connected!'))

module.exports = db