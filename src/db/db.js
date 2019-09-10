const Pool = require('pg').Pool
const queries = require('./queries')
const pool = new Pool({
  user: 'user',
  host: 'database',
  database: 'db',
  password: 'pass',
  port: 5432,
})

const getAll = (request, response) => {
    tableName = request.path.replace('/', '')
    pool.query(queries.SELECT_ALL(tableName), (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getById = (request, response) => {
    tableName = request.path.replace('/', '').replace('_by_id', '')
    pool.query(queries.SELECT_ONE(tableName, request.query.id), (error, results) => {
        if (error) {
            response.status(404).json({message: tableName.toUpperCase() + ' not found'})
            // throw error
        }
        response.status(200).json(results.rows)
    })
}

const insert = (request, response) => {
    tableName = request.path.split('/').join('')
    // queries.INSERT(tableName, request.body)
    // return response.json({message: 'ok'})
    pool.query(queries.INSERT(tableName, request.body), (error, results) => {
        if (error) {
            throw error
        }
        //results.rows
        response.status(200).json({message: tableName.toUpperCase() + ' successfully added'})
    })
}

module.exports = {
    getAll,
    getById,
    insert
}