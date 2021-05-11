const db = require("../../config/mongoose")
const Record = require('../category')
const { category } = require('./seeds.json')

db.once('open', () => {
  for (let i = 0; i < category.length; i++) {
    Category.create(category[i])
  }
  console.log('Category created!')
})