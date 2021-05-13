const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main' , extname: '.hbs', helpers: {
  getCn: function(category, categories) {
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
app.use(routes)

app.listen(PORT, (req, res) => {
  console.log(`App is now listening on http://localhost:${PORT}`)
})