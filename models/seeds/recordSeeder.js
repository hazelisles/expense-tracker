const db = require("../../config/mongoose")
const Record = require('../record')
const { record } = require('./seeds.json')

db.once('open', () => {
  Record.create(record)
    .then(() => {
      console.log('Record created!')
      return db.close()
    })
    .then(() => console.log('Database connection closed'))
    .catch(error => console.log(error))
})