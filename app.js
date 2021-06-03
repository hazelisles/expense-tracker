const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
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
    }
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
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
app.use(routes)

app.listen(PORT, (req, res) => {
  console.log(`App is now listening on http://localhost:${PORT}`)
})