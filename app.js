const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const Records = require('./models/record')
const Categories = require('./models/category')
require('./config/mongoose')
const totalamount = require('./sum')

app.engine('hbs', exphbs({ defaultLayout: 'main' , extname: '.hbs', helpers: {
  getcn: function(category, categories) {
    const cn = categories.find(c => c.category === category)
    return cn.category_cn
  },
  getIcon: function(category, categories) {
    const icon = categories.find(c => c.category === category)
    return icon.categoryIcon
  }
}
}))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  // ~ 開頭表示直接執行這個 function，結尾有 ()
  ~async function getData() {
    const record = await Records.find().lean().sort({ date: 'desc' })
    const category = await Categories.find().lean()
    const totalAmount = totalamount(record)
    return res.render('index', { record, category, totalAmount })
  }();
})

app.get('/create', (req, res) => {
  return res.render('new')
})

app.post('/', (req, res) => {
  return Records.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/:id/edit', (req, res) => {
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

app.put('/:id', (req, res) => {
  const { id } = req.params
  return Records.findById(id)
    .then(r => {
      r = Object.assign(r, req.body)
      return r.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.delete('/records/:id', (req, res) => {
  const { id } = req.params
  return Records.findById(id)
    .then(r => r.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


app.listen(3000, (req, res) => {
  console.log('App is now listening on http://localhost:3000')
})