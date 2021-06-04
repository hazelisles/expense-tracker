const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require("../../config/mongoose")
const Record = require('../record')
const User = require('../user')
const { record } = require('./seeds.json')
const { user } = require('./seeds.json')

db.once('open', async () => {
  try {
    const pass = await Promise.all(Array.from({ length: 2 }, (value, i) => {
      return bcrypt.hash(user[i].password, 10)
    }))
    await Promise.all(Array.from({ length: 2 }, async (v, i) => {
      try {
        let ur = await User.create({ name: user[i].name, email: user[i].email, password: pass[i] })
        let records
        for (let x = 5 * [i]; x < 5 * [i + 1]; x++) {
          records = Object.assign(record[x], { userId: ur._id })
          await Record.create(records)
        }
      } catch (err) {
        console.log(err)
      }
    }))
    console.log('Done!')
    process.exit()
  } catch (err) {
    console.warn(err)
  }
})