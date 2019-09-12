const express = require('express')
const { checkSchema } = require('express-validator')
const routes = express.Router()

const db = require('./db/db')

routes.get('/', (req, res) => {
  return res.json({
    message: 'A gnt vai usar pg msm'
  })
})

/*
PRODUCT ENDPOINTS

JSON format:
{
  "name": "product 4",
  "image": "image 4",
  "price": 8000.234
}
*/

routes.get('/product', db.getAll)
routes.get('/product/:id', db.getById)
routes.post('/product/', checkSchema({
  name: {
    isString: true,
    errorMessage: 'invalid name',
  },
  image: {
    isString:  true,
    errorMessage: 'invalid image'
  },
  price: {
    isFloat: true,
    errorMessage: 'invalid price'
  }
}), db.insert)
routes.put('/product/:id', db.update)
routes.delete('/product/:id', db.remove)

/*
ITEM ENDPOINTS

JSON format:
{
  "rfid": "1",
  "expirationDate": "2019-12-26",
  "idProduct": 1
}
*/

routes.get('/item', db.getAll)
routes.get('/item/:id', db.getById)
routes.post('/item/', db.insert)
routes.put('/item/:id', db.updateItem)
routes.delete('/item/:id', db.removeItem)

module.exports = routes
