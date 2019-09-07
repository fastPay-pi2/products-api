const Pool = require('pg').Pool
const queries = require('./queries')
const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'db',
  password: 'pass',
  port: 5432,
})

const getAll = (request, response) => {
    pool.query(queries.SELECT_ALL(getParams(request)), (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getById = (request, response) => {
    pool.query(queries.SELECT_ONE(getParams(request)), (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const insert = (request, response) => {
    queries.INSERT(getParams(request), request.body)
    return response.json({status: 'ok'})
    pool.query(queries.INSERT(getParams(request), request.body), (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getParams = (request) => {
    var path = request.route.path
    var params = path.split('/')
    params.shift()

    return params
}

module.exports = {
    getAll,
    getById,
    insert
}