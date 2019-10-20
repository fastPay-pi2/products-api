const { validationResult } = require('express-validator')
const handlers = require('../utils/handlers')
const db = require('../db/db')
const tableName = 'item'
const idField = 'rfid'

const insert = (request, response) => {
  const validation = validationResult(request)
  const errors = validation.errors
  if (errors.length > 0) {
    return response.status(422).json({ errors: errors })
  } else {
    db.insert(tableName, request.body).then(result => handlers.handleResponse(result, response))
  }
}

const update = (request, response) => {
  var id = request.params.id
  db.update(tableName, request.body, idField, id).then(result => {
    handlers.handleResponse(result, response)
  })
}

const getAll = (request, response) => {
  db.selectAll(tableName).then(result => handlers.handleResponse(result, response))
}

const getById = (request, response) => {
  var id = request.params.id
  db.selectOne(tableName, id).then(result => handlers.handleResponse(result, response))
}

const removeById = (request, response) => {
  var id = request.params.id
  db.removeOne(tableName, idField, id).then(result => handlers.handleResponse(result, response))
}

const getBeautifulItems = (request, response) => {
  const rfids = request.body.rfids

  if (!rfids) {
    return response.status(400).json({ msg: "Missing list with RFIDs" })
  }

  beautifulHandle(rfids).then(result => {
    if (result.error){
      response.status(400).json({ error: result.error})
    } else {
      response.status(200).json(result)
    }
  })
}

async function beautifulHandle(rfids) {
  var result = {
    items: []
  }

  try {
    for (const rfid of rfids) {
      await db.selectBeautifulItems(rfid).then(data => {
        if (data.error) {
          console.log(data.error)
        } else {
          if (data.res.rows.length > 0) {
            result.items.push(data.res.rows[0])
          } else {
            console.log(`There is no item with the id ${rfid}`)
          }
        }
      })
    }
  } catch (error) {
    return { error: 'Invalid data for RFIDS'}
  }

  return result.items
}

module.exports = {
  getAll,
  getById,
  getBeautifulItems,
  insert,
  update,
  removeById
}
