const sqlStringCreator = require('../utils/sqlStringCreator')

const SELECT_ALL = tableName => {
  return `SELECT * FROM ${tableName};`
}

const SELECT_BEAUTIFUL_ITEMS = rfid => {
  return `SELECT p.name as productName, p.brand as productBrand, p.image as productImage,
          p.price as productPrice, p.id as productId, c.name as categoryName, s.name as subcategoryName, i.rfid
          FROM PRODUCT p, CATEGORY c, SUBCATEGORY s, ITEM i
          WHERE i.rfid = '${rfid}' AND p.id = i.idproduct AND c.id = s.idcategory
          AND s.id = p.idsubcategory;`
}

const UPDATE = (tableName, json, idField, id) => {
  const attributes = sqlStringCreator.createUpdateString(json)
  return `UPDATE ${tableName} SET ${attributes} WHERE ${idField} = '${id}';`
}

const REMOVE = (tableName, idField, id) => {
  return `DELETE FROM ${tableName} WHERE ${idField} = '${id}';`
}

const REMOVE_LIST = (tableName, idField, ids) => {
  ids = sqlStringCreator.createStringFromArray(ids)
  return `DELETE FROM ${tableName} WHERE ${idField} IN ${ids};`
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
  values = sqlStringCreator.createStringFromArray(values)

  return `INSERT INTO ${tableName} ${attributes} VALUES ${values};`
}

module.exports = {
  SELECT_ALL,
  SELECT_ONE,
  INSERT,
  SELECT_BEAUTIFUL_ITEMS,
  UPDATE,
  REMOVE,
  REMOVE_LIST
}
