const express = require('express')
const { checkSchema } = require('express-validator')
const routes = express.Router()

const authMiddleware = require('./middlewares/auth')
const controllers = require('./controllers')
const schemas = require('./db/schemas')

routes.use(authMiddleware)

routes.get('/', (req, res) => {
  return res.json({
    message: 'A gnt vai usar pg msm'
  })
})

/*
PRODUCT ENDPOINTS

JSON format:
{
	"name": "Super product for test",
	"image": "2",
	"price": "123",
	"idSubcategory": 60,
	"brand": "my cheap brand"
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
  "rfid": "EO-QQ-QQ-QQ-QQ-QQ-FF",
  "expirationDate": "2019-12-26",
  "idProduct": 1
}
*/

routes.get('/item', controllers.itemController.getAll)
routes.get('/item/:id', controllers.itemController.getById)
routes.get('/beautifulitems', controllers.itemController.getBeautifulItems)
routes.post('/item/', checkSchema(schemas.itemSchema),controllers.itemController.insert)
routes.put('/item/:id', checkSchema(schemas.itemSchemaPut), controllers.itemController.update)
routes.delete('/item/:id', controllers.itemController.removeById)

/*
CATEGORY ENDPOINTS

JSON format:
{
	"name": "Super category for test"
}
*/

routes.get('/category', controllers.categoryController.getAll)
routes.get('/category/:id', controllers.categoryController.getById)
routes.post('/category/', checkSchema(schemas.categorySchema), controllers.categoryController.insert)
routes.put('/category/:id', checkSchema(schemas.categorySchema), controllers.categoryController.update)
routes.delete('/category/:id', controllers.categoryController.removeById)

/*
SUBCATEGORY ENDPOINTS

JSON format:
{
	"idCategory": 14,
	"name": "Super subcategory for test"
}
*/

routes.get('/subcategory', controllers.subcategoryController.getAll)
routes.get('/subcategory/:id', controllers.subcategoryController.getById)
routes.post('/subcategory/', checkSchema(schemas.subcategorySchema), controllers.subcategoryController.insert)
routes.put('/subcategory/:id', checkSchema(schemas.subcategorySchema), controllers.subcategoryController.update)
routes.delete('/subcategory/:id', controllers.subcategoryController.removeById)

module.exports = routes
