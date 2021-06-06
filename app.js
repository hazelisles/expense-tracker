const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const moment = require('moment')
const usePassport = require('./config/passport')
const routes = require('./routes')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const PORT = process.env.PORT
require('./config/mongoose')

app.engine('hbs', exphbs({
  defaultLayout: 'main', extname: '.hbs', helpers: {
    getCn: function (category, categories) {
      const cn = categories.find(c => c.category === category)
      return cn.category_cn
    },
    getIcon: function (category, categories) {
      const icon = categories.find(c => c.category === category)
      return icon.categoryIcon
    },
    showDate: function (date) {
      return moment(date).format('YYYY-MM-DD ( ddd )')
    },
    valueDate: function (date) {
      return moment(date).format('YYYY-MM-DD')
    },
    eq: function (v1, v2) { return v1 === v2 }
  }
}))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.email = req.flash('email')
  res.locals.error_msg = req.flash('error_msg')
  next()
})
app.use(routes)

app.listen(PORT, (req, res) => {
  console.log(`App is now listening on http://localhost:${PORT}`)
})