const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const Records = require('./models/record')
const Categories = require('./models/category')
require('./config/mongoose')
const totalamount = require('./sum')

app.engine('hbs', exphbs({ defaultLayout: 'main' , extname: '.hbs', helpers: {
  getIcon: function(category, categories) {
    const icon = categories.find(c => c.category === category)
    return icon.categoryIcon
  }}
}))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

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

app.listen(3000, (req, res) => {
  console.log('App is now listening on http://localhost:3000')
})