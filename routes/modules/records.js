const express = require('express')
const router = express.Router()
const Records = require('../../models/record')
const Categories = require('../../models/category')

router.post('/', (req, res) => {
  const record = Object.assign(req.body, { userId: req.user._id })
  return Records.create(record)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const record = await Records.findOne({ _id, userId }).lean()
    const category = await Categories.find().lean()
    return res.render('edit', { record, category })
  } catch (err) {
    console.warn(err)
  }
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Records.findOne({ _id, userId })
    .then(r => {
      r = Object.assign(r, req.body)
      return r.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Records.findOne({ _id, userId })
    .then(r => r.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router