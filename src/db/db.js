const Pool = require('pg').Pool
const queries = require('./queries')
require('dotenv/config')

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT
})

/*
General functions
*/

async function insert(tableName, body) {
  try {
    var res = await pool.query(queries.INSERT(tableName, body))
    return { res: res, message: `${tableName.toUpperCase()} successfully added` }
  } catch (error) {
    console.log(error.message)
    return { error: error.message }
  }
}

async function update(tableName, body, idField, id) {
  try {
    var res = await pool.query(queries.UPDATE(tableName, body, idField, id))
    return { res: res, message: `${tableName.toUpperCase()} successfully updated` }
  } catch (error) {
    console.log(error.message)
    return { error: error.message }
  }
}

async function selectAll(tableName) {
  try {
    var res = await pool.query(queries.SELECT_ALL(tableName))
    return { res: res }
  } catch (error) {
    console.log(error.message)
    return { error: error.message }
  }
}

async function selectOne(tableName, id) {
  try {
    var res = await pool.query(queries.SELECT_ONE(tableName, id))
    return { res: res }
  } catch (error) {
    console.log(error.message)
    return { error: error.message }
  }
}

async function removeOne(tableName, idField, id) {
  try {
    var res = await pool.query(queries.REMOVE(tableName, idField, id))
    return { res: res, message: `${tableName.toUpperCase()} successfully removed` }
  } catch (error) {
    console.log(error.message)
    return { error: error.message }
  }
}

async function removeByList(tableName, idField, ids) {
  try {
    var res = await pool.query(queries.REMOVE_LIST(tableName, idField, ids))
    return { res: res, message: `${tableName.toUpperCase()} successfully removed` }
  } catch (error) {
    console.log(error.message)
    return { error: error.message }
  }
}

/* ============================================================================== */

/*
Custom functions
*/

async function selectBeautifulItems(rfid) {
  try {
    var res = await pool.query(queries.SELECT_BEAUTIFUL_ITEMS(rfid))
    return { res: res }
  } catch (error) {
    console.log(error.message)
    return { error: error.message }
  }
}

module.exports = {
  insert,
  update,
  selectAll,
  selectOne,
  selectBeautifulItems,
  removeOne,
  removeByList
}
