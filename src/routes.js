const express = require('express')
const routes = express.Router();

const db = require('./db/db')

routes.get('/', (req, res) => {
    return res.json({
        'message': 'A gnt vai usar pg msm'
    })
})

routes.get('/product', db.getAll)
routes.get('/product/1', db.getById)
routes.post('/product/', db.insert)

// routes.post('/devs', (req, res) => {
//     console.log(req.body)
//     console.log ('req = ', req.complete)
//     return res.json({
//         'myResponse': true
//     })
// })

module.exports = routes