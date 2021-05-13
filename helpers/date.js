function getDate(date) {
  const DATE = date
  const Today = new Date();
  const y = Today.getFullYear();
  let m = Today.getMonth()+1;
  let lm = Today.getMonth()
  if (m < 10) {
    m = `0${m}`
  }
  if (lm < 10) {
    lm = `0${lm}`
  }
  let d = Today.getDate();
  if (d < 10) {
    d = `0${d}`
  }
  switch (DATE) {
    case 'today':
      return `${y}-${m}-${d}`
    case 'thism':
      return `${y}-${m}`
    case 'lastm':
      return `${y}-${lm}`
  }
}

module.exports = getDate