const db = require("../../config/mongoose")
const Category = require('../category')
const { category } = require('./seeds.json')

db.once('open', () => {
  Category.create(category)
    .then(() => {
      console.log('Category created!')
      return db.close()
    }).then(() => console.log('Database connection closed'))
})