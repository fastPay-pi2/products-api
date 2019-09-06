const express = require('express')

const routes = express.Router();


const db = require('./queries')


routes.get('/', (req, res) => {
    // r = req.query.name
    return res.json({
        'message': 'A gnt vai usar pg msm'
    })
})

routes.get('/products', db.getProducts)

// routes.post('/devs', (req, res) => {
//     console.log(req.body)
//     console.log ('req = ', req.complete)
//     return res.json({
//         'myResponse': true
//     })
// })

module.exports = routes