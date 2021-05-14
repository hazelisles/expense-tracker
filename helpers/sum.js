function totalAmount(records) {
  records.map(a => a.amount)
    .reduce((x, y) => {
      return x + y
    }, 0)
}

module.exports = totalAmount