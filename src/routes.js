const express = require('express')
const { checkSchema } = require('express-validator')
const routes = express.Router()

const db = require('./db/db')
const controllers = require('./controllers')
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

routes.get('/product', controllers.productController.getAll)
routes.get('/product/:id', controllers.productController.getById)
routes.post('/product/', checkSchema(schemas.productSchema), controllers.productController.insert)
routes.put('/product/:id', checkSchema(schemas.productSchemaPut), controllers.productController.update)
routes.delete('/product/:id', controllers.productController.removeById)

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

routes.get('/category', controllers.categoryController.getAll)
routes.get('/category/:id', controllers.categoryController.getById)
routes.post('/category/', checkSchema(schemas.categorySchema), controllers.categoryController.insert)
routes.put('/category/:id', checkSchema(schemas.categorySchema), controllers.categoryController.update)
routes.delete('/category/:id', controllers.categoryController.removeById)

/*
SUBCATEGORY ENDPOINTS
*/

routes.get('/subcategory', controllers.subcategoryController.getAll)
routes.get('/subcategory/:id', controllers.subcategoryController.getById)
routes.post('/subcategory/', checkSchema(schemas.subcategorySchema), controllers.subcategoryController.insert)
routes.put('/subcategory/:id', checkSchema(schemas.subcategorySchema), controllers.subcategoryController.update)
routes.delete('/subcategory/:id', controllers.subcategoryController.removeById)

module.exports = routes
