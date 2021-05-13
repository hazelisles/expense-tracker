const express = require('express')
const router = express.Router()
const Records = require('../../models/record')
const Categories = require('../../models/category')

router.post('/', (req, res) => {
  return Records.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const { id } = req.params
  ~async function get_data() {
    const record = await Records.findById(id).lean()
    const category = await Categories.find().lean()
    return res.render('edit', { record, category })
  }();
  // 下方.then().catch()寫法
  // let category = {}
  // Categories.find().lean()
  //   .then(c => category = c)
  //   .then(() => {
  //     Records.findById(id).lean()
  //       .then(record => res.render('edit', { record, category }))
  //       .catch(error => console.log(error))
  //   })
  //   .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  return Records.findById(id)
    .then(r => {
      r = Object.assign(r, req.body)
      return r.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  return Records.findById(id)
    .then(r => r.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router