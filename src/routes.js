const express = require('express')
const { checkSchema } = require('express-validator')
const routes = express.Router()

const db = require('./db/db')
const schemas = require('./db/schemas')

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
routes.post('/product/', checkSchema(schemas.productSchema), db.insert)
routes.put('/product/:id', checkSchema(schemas.productSchemaPut), db.update)
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
routes.get('/beautifulitems', db.getBeautifulItems)
routes.post('/item/', checkSchema(schemas.itemSchema), db.insert)
routes.put('/item/:id', checkSchema(schemas.itemSchemaPut), db.updateItem)
routes.delete('/item/:id', db.removeItem)

/*
CATEGORY ENDPOINTS
*/

routes.get('/category', db.getAll)
routes.post('/category/', checkSchema(schemas.categorySchema), db.insert)

/*
SUBCATEGORY ENDPOINTS
*/

routes.get('/subcategory', db.getAll)
routes.post('/subcategory/', checkSchema(schemas.subcategorySchema), db.insert)

module.exports = routes
