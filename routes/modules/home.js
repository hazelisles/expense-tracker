const express = require('express')
const router = express.Router()
const Records = require('../../models/record')
const Categories = require('../../models/category')
const totalamount = require('../../helpers/sum')
const getdate = require('../../helpers/date')
const moment = require('moment')
const getDate = require('../../helpers/date')

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

router.get('/quicksort', async (req, res) => {
  try {
    const userId = req.user._id
    const selection = getDate(req.query.date)
    const record = await Records.find({ userId, date: { $gte: selection.start, $lt: selection.end } }).lean().sort({ date: 'desc' })
    const category = await Categories.find().lean()
    const totalAmount = totalamount(record)
    return res.render('index', { record, category, totalAmount })
  } catch (err) {
    console.log(err)
  }
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
  }
})

module.exports = router