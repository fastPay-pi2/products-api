const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const server = express()

const logMiddleware = function(req, res, next) {
  console.log(
    `HOST: ${req.headers.host} | URL: ${req.url} | METHOD: ${req.method}`
  )
  return next()
}

server.use(cors())
server.use(express.json())
server.use(logMiddleware)
server.use(routes)

server.listen(3000)
