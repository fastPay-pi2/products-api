const SELECT_ALL = tableName => {
  console.log('tablename = ', tableName)
  return `SELECT * FROM ${tableName};`
}

const SELECT_BEAUTIFUL_ITEMS = rfid => {
  return `SELECT p.name as productName, p.brand as productBrand, p.image as productImage,
          p.price as productPrice, c.name as categoryName, s.name as subcategoryName, i.rfid 
          FROM PRODUCT p, CATEGORY c, SUBCATEGORY s, ITEM i 
          WHERE i.rfid = '${rfid}' AND p.id = i.idproduct AND c.id = s.idcategory 
          AND s.id = p.idsubcategory;`
}

const UPDATE = (tableName, json, idField, id) => {
  const attributes = createUpdateString(json)
  return `UPDATE ${tableName} SET ${attributes} WHERE ${idField} = '${id}';`
}

const REMOVE = (tableName, id, idField) => {
  return `DELETE FROM ${tableName} WHERE ${idField} = '${id}';`
}

const SELECT_ONE = (tableName, id) => {
  let param = 'id'
  if (tableName === 'item') param = 'rfid'
  return `SELECT * FROM ${tableName} WHERE ${param} = '${id}';`
}

const INSERT = (tableName, json) => {
  let attributes = Object.keys(json)
  attributes = '(' + attributes + ')'
  let values = Object.values(json)
  values = createString(values)

  return `INSERT INTO ${tableName} ${attributes} VALUES ${values};`
}

const createUpdateString = json => {
  let str = ''
  for (const key in json) {
    str += ' ' + key + " = '" + json[key] + "'" + ','
  }
  str = str.substring(0, str.length - 1)
  return str
}

const createString = array => {
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
  SELECT_ALL,
  SELECT_ONE,
  INSERT,
  SELECT_BEAUTIFUL_ITEMS,
  UPDATE,
  REMOVE
}
