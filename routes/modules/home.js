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
    const years = await Records.aggregate([{ $match: { userId } }, { $project: { "year": { $year: "$date" } } }, { $group: { "_id": "$year" } }, { $project: { "year": { "$toString": "$_id" } } }, { $sort: { "_id": 1 } }
    ])
    const category = await Categories.find().lean()
    const totalAmount = totalamount(record)
    return res.render('index', { record, category, totalAmount, months, years })
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
    const { theMonth } = selection
    return res.render('index', { record, category, totalAmount, months, theMonth })
  } catch (err) {
    console.log(err)
  }
})

router.get('/search', async (req, res) => {
  try {
    const theCategory = req.query.category
    const theMonth = req.query.month
    const theYear = req.query.year
    const userId = req.user._id
    const months = await Records.aggregate([{ $match: { userId } }, { $project: { "month": { $month: "$date" } } }, { $group: { "_id": "$month" } }, { $project: { "month": { "$toString": "$_id" } } }, { $sort: { "_id": 1 } }
    ])
    const years = await Records.aggregate([{ $match: { userId } }, { $project: { "year": { $year: "$date" } } }, { $group: { "_id": "$year" } }, { $project: { "year": { "$toString": "$_id" } } }, { $sort: { "_id": 1 } }
    ])
    let record
    if (theCategory && theMonth && theYear) {
      record = await Records.aggregate([{ $match: { userId } }, { $addFields: { "month": { $month: '$date' }, "year": { $year: '$date' } } }, { "$project": { name: 1, date: 1, category: 1, amount: 1, merchant: 1, "month": { "$toString": "$month" }, "year": { "$toString": "$year" } } }, { $match: { $and: [{ category: `${theCategory}` }, { month: `${theMonth}` }, { year: `${theYear}` }] } }, { $sort: { "date": -1 } }])
    } else if (theCategory && theMonth) {
      record = await Records.aggregate([{ $match: { userId } }, { $addFields: { "month": { $month: '$date' } } }, { "$project": { name: 1, date: 1, category: 1, amount: 1, merchant: 1, "month": { "$toString": "$month" } } }, { $match: { $and: [{ category: `${theCategory}` }, { month: `${theMonth}` }] } }, { $sort: { "date": -1 } }])
    } else if (theMonth && theYear) {
      record = await Records.aggregate([{ $match: { userId } }, { $addFields: { "month": { $month: '$date' }, "year": { $year: '$date' } } }, { "$project": { name: 1, date: 1, category: 1, amount: 1, merchant: 1, "month": { "$toString": "$month" }, "year": { "$toString": "$year" } } }, { $match: { $and: [{ month: `${theMonth}` }, { year: `${theYear}` }] } }, { $sort: { "date": -1 } }])
    } else if (theCategory && theYear) {
      record = await Records.aggregate([{ $match: { userId } }, { $addFields: { "year": { $year: '$date' } } }, { "$project": { name: 1, date: 1, category: 1, amount: 1, merchant: 1, "year": { "$toString": "$year" } } }, { $match: { $and: [{ category: `${theCategory}` }, { year: `${theYear}` }] } }, { $sort: { "date": -1 } }])
    } else if (theCategory) {
      record = await Records.aggregate([{ $match: { $and: [{ userId }, { category: `${theCategory}` }] } }, { $sort: { "date": -1 } }])
    } else if (theMonth) {
      record = await Records.aggregate([{ $match: { userId } }, { $addFields: { "month": { $month: '$date' } } }, { "$project": { name: 1, date: 1, category: 1, amount: 1, merchant: 1, "month": { "$toString": "$month" } } }, { $match: { month: `${theMonth}` } }, { $sort: { "date": -1 } }])
    } else if (theYear) {
      record = await Records.aggregate([{ $match: { userId } }, { $addFields: { "year": { $year: '$date' } } }, { "$project": { name: 1, date: 1, category: 1, amount: 1, merchant: 1, "year": { "$toString": "$year" } } }, { $match: { year: `${theYear}` } }, { $sort: { "date": -1 } }])
    }
    const category = await Categories.find().lean()
    const totalAmount = totalamount(record)
    return res.render('index', { record, category, totalAmount, theCategory, months, theMonth, years, theYear })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router