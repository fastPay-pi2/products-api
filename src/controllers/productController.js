const { validationResult } = require('express-validator')
const handlers = require('../utils/handlers')
const db = require('../db/db')
const tableName = 'product'
const idField = 'id'

const insert = (request, response) => {
  const validation = validationResult(request)
  const errors = validation.errors
  if (errors.length > 0) {
    return response.status(422).json({ errors: errors })
  } else {
    db.insert(tableName, request.body).then(result => handlers.handleResponse(result, response))
  }
}

// Escolher qual tipo deixar
const update = (request, response) => {
  var id = request.params.id
  db.update(tableName, request.body, idField, id).then(result => {
    handlers.handleResponse(result, response)
  })
}

const getAll = (request, response) => {
  db.selectAll(tableName).then(result => handlers.handleResponse(result, response))
}

const getBeautifulProduct = (request, response) => {
  db.selectAll(tableName).then(result =>
     handlers.handleBeautifulProduct(result, response))
}

const getById = (request, response) => {
  var id = request.params.id
  db.selectOne(tableName, id).then(result => handlers.handleResponse(result, response))
}

const removeById = (request, response) => {
  var id = request.params.id
  db.removeOne(tableName, idField, id).then(result => handlers.handleResponse(result, response))
}

module.exports = {
  getAll,
  getBeautifulProduct,
  getById,
  insert,
  update,
  removeById
}
