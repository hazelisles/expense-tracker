const moment = require('moment')

function getDate(date) {
  let start, end
  switch (date) {
    case 'today':
      start = moment().startOf('day')
      end = moment().endOf('day')
      return { start, end }
    case 'yesterday':
      start = moment().startOf('day').subtract(1, 'days')
      end = moment().endOf('day').subtract(1, 'days')
      return { start, end }
    case 'thism':
      start = moment().startOf('month')
      end = moment().endOf('month')
      return { start, end }
    case 'lastm':
      start = moment().startOf('month').subtract(1, 'months')
      end = moment().endOf('month').subtract(1, 'months')
      return { start, end }
  }
}

module.exports = getDate