const express = require('express')
const router = express.Router()
const Records = require('../../models/record')
const Categories = require('../../models/category')
const totalamount = require('../../helpers/sum')
const getDate = require('../../helpers/date')

router.get('/', async (req, res) => {
  try {
    const userId = req.user._id
    const record = await Records.find({ userId }).lean().sort({ date: 'desc' })
    const months = await Records.aggregate([{ $match: { userId } },
    { $project: { "month": { "$month": "$date" } } },
    { $group: { "_id": "$month" } }, { $project: { "month": { "$toString": "$_id" } } }, { $sort: { "_id": 1 } }
    ])
    const category = await Categories.find().lean()
    const totalAmount = totalamount(record)
    return res.render('index', { record, category, totalAmount, months })
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
    const months = await Records.aggregate([{ $match: { userId } },
    { $project: { "month": { "$month": "$date" } } },
    { $group: { "_id": "$month" } }, { $project: { "month": { "$toString": "$_id" } } }, { $sort: { "_id": 1 } }
    ])
    const category = await Categories.find().lean()
    const totalAmount = totalamount(record)
    return res.render('index', { record, category, totalAmount, months })
  } catch (err) {
    console.log(err)
  }
})

router.get('/search', async (req, res) => {
  const theCategory = req.query.category
  const theMonth = req.query.month
  const userId = req.user._id
  const months = await Records.aggregate([{ $match: { userId } }, { $project: { "month": { "$month": "$date" } } }, { $group: { "_id": "$month" } }, { $project: { "month": { "$toString": "$_id" } } }, { $sort: { "_id": 1 } }
  ])
  let record
  if (theCategory && theMonth) {
    record = await Records.aggregate([{ $match: { userId } }, { $addFields: { "month": { $month: '$date' } } }, { "$project": { name: 1, date: 1, category: 1, amount: 1, merchant: 1, "month": { "$toString": "$month" } } }, { $match: { $and: [{ category: `${theCategory}` }, { month: `${theMonth}` }] } }, { $sort: { "date": -1 } }])
  } else if (theCategory) {
    record = await Records.aggregate([{ $match: { $and: [{ userId }, { category: `${theCategory}` }] } }, { $sort: { "date": -1 } }])
  } else if (theMonth) {
    record = await Records.aggregate([{ $match: { userId } }, { $addFields: { "month": { $month: '$date' } } }, { "$project": { name: 1, date: 1, category: 1, amount: 1, merchant: 1, "month": { "$toString": "$month" } } }, { $match: { month: `${theMonth}` } }, { $sort: { "date": -1 } }])
  }
  const category = await Categories.find().lean()
  const totalAmount = totalamount(record)
  return res.render('index', { record, category, totalAmount, theCategory, months, theMonth })
})

module.exports = router