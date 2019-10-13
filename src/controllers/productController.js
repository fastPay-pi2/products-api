const { validationResult } = require('express-validator')
const db = require('./newdb')
const tableName = 'product'
const idField = 'id'

const insert = (request, response) => {
  const validation = validationResult(request)
  const errors = validation.errors
  if (errors.length > 0) {
    return response.status(422).json({ errors: errors })
  } else {
    db.insert(tableName, request.body).then(result => handleResponse(result, response))
  }
}

const update = (request, response) => {
  id = request.params.id
  db.update(tableName, request.body, idField, id).then(result => handleResponse(result, response))
}

const getAll = (request, response) => {
  db.selectAll(tableName).then(result => handleResponse(result, response))
}

const getById = (request, response) => {
  id = request.params.id
  db.selectOne(tableName, id).then(result => handleResponse(result, response))
}

const removeById = (request, response) => {
  id = request.params.id
  db.removeOne(tableName, idField, id).then(result => handleResponse(result, response))
}

function handleResponse(result, response) {
  if (result.error) {
    response.status(500).json(result.error)
  } else if (result.res.rowCount > 0) {
    if (result.message) {
      response.status(200).json({ msg: result.message })
    } else {
      response.status(200).json(result.res.rows)
    }
  } else {
    response.status(404).json({ msg: 'Not Found' })
  }
}

module.exports = {
  getAll,
  getById,
  insert,
  update,
  removeById
}
