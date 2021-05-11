const db = require("../../config/mongoose")
const Record = require('../record')
const { record } = require('./seeds.json')

db.once('open', () => {
  for (let i = 0; i < record.length; i++) {
    Record.create(record[i])
  }
  console.log('Record created!')
})