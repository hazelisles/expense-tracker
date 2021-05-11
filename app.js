const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

app.engine('hbs', exphbs({ defaultLayout: 'main' , extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => {
  return res.render('index')
})

app.get('/create', (req, res) => {
  return res.render('new')
})

app.listen(3000, (req, res) => {
  console.log('App is now listening on http://localhost:3000')
})