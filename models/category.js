const mongoose = require('mongoose')
const { Schema } = mongoose
const categoriesSchema = new Schema({
  category: {
    type: String,
    required: true
  },
  categoryIcon: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Category', categoriesSchema)
