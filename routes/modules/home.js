const express = require('express')
const router = express.Router()
const Records = require('../../models/record')
const Categories = require('../../models/category')
const totalamount = require('../../helpers/sum')
const getdate = require('../../helpers/date')

router.get('/', async (req, res) => {
  try {
    const userId = req.user._id
    const record = await Records.find({ userId }).lean().sort({ date: 'desc' })
    const category = await Categories.find().lean()
    const totalAmount = totalamount(record)
    return res.render('index', { record, category, totalAmount })
  } catch (err) {
    console.warn(err)
  }
})

router.get('/create', (req, res) => {
  return res.render('new')
})

router.get('/search', (req, res) => {
  if (req.query.category) {
    const theCategory = req.query.category
    const userId = req.user._id
    ~async function () {
      const record = await Records.find({ userId, "category": `${theCategory}` }).lean().sort({ date: 'desc' })
      const category = await Categories.find().lean()
      const totalAmount = totalamount(record)
      return res.render('index', { record, category, totalAmount, theCategory })
    }();
  } else if (req.query.date) {
    const today = getdate('today')
    const thism = new RegExp('^' + getdate('thism'))
    const lastm = new RegExp('^' + getdate('lastm'))
    ~async function () {
      let record
      if (req.query.date === 'today') {
        record = await Records.find({ userId, "date": `${today}` }).lean()
      } else if (req.query.date === 'thism') {
        record = await Records.find({ userId, "date": { $regex: thism } }).lean().sort({ date: 'desc' })
      } else {
        record = await Records.find({ userId, "date": { $regex: lastm } }).lean().sort({ date: 'desc' })
      }
      const category = await Categories.find().lean()
      const totalAmount = totalamount(record)
      return res.render('index', { record, category, totalAmount })
    }();
  }
})

module.exports = router