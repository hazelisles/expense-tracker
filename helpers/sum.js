function totalAmount(records) {
  const amount = records.map(a => a.amount).reduce((x, y) => x + y, 0)
  return amount
}

module.exports = totalAmount