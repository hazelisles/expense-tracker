function totalAmount(records) {
  const arrayAmount = records.map(a => a.amount)
  return arrayAmount.reduce((x, y) => x + y)
}

module.exports = totalAmount