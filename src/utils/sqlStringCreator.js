const createUpdateString = json => {
  let str = ''
  for (const key in json) {
    str += ' ' + key + " = '" + json[key] + "'" + ','
  }
  str = str.substring(0, str.length - 1)
  return str
}

const createStringFromArray = array => {
  let str = '('

  str += "'" + array[0] + "'"
  array.shift()
  array.forEach(element => {
    str += ', ' + "'" + element + "'"
  })
  str += ')'

  return str
}

module.exports = {
  createStringFromArray,
  createUpdateString
}
