const Pool = require('pg').Pool
const queries = require('./queries')
const { validationResult } = require('express-validator')
require('dotenv/config')

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT
})

const getAll = (request, response) => {
    const tableName = request.path.split('/')
    tableName.shift()
    pool.query(queries.SELECT_ALL(tableName[0]), (error, results) => {
        if (error) {
            response.status(500).json({
                error: 'Internal server error'
            })
        } else{
            response.status(200).json(results.rows)
        }
    })
}

const getById = (request, response) => {
    const requestUrl = request.path.split('/')
    const tableName = requestUrl[requestUrl.length - 2]
    pool.query(
        queries.SELECT_ONE(tableName, request.params.id),
        (error, results) => {
            if (error) {
                response.status(404).json({ message: tableName.toUpperCase() + ' not found' })
            }
            response.status(200).json(results.rows)
        }
    )
}
    
// TODO change others requests to don't throw error
const insert = (request, response) => {
    const tableName = request.path.split('/').join('')
    
    const validation = validationResult(request)
    const errors = validation.errors
    if (errors.length > 0) {
        return response.status(422).json({ errors: errors })
    }
    
    pool.query(queries.INSERT(tableName, request.body), (error, results) => {
        if (error) {
            response.status(400).json({ message: 'Error when inserting on DB' })
        } else {
            response.status(200).json({
                message: tableName.toUpperCase() + ' successfully added'
            })
        }
    })
}
    
const update = (request, response) => {
    const requestUrl = request.path.split('/')
    const tableName = requestUrl[requestUrl.length - 2]
    pool.query(
        queries.UPDATE(tableName, request.body, 'id', request.params.id),
        (error, results) => {
            if (error) {
                response.json({ error: error})
            }
            response.status(200).json({
                message: tableName.toUpperCase() + ' successfully updated'
            })
        }
    )
}
        
const remove = (request, response) => {
    const requestUrl = request.path.split('/')
    const tableName = requestUrl[requestUrl.length - 2]
    pool.query(
        queries.REMOVE(tableName, 'id', request.params.id),
        (error, results) => {
            if (error) {
                response.status(404).json({
                    message: tableName.toUpperCase() + ' not found'
                })
            }
            response.status(200).json({
                message: tableName.toUpperCase() + ' successfully removed'
            })
        }
    )
}
            
const updateItem = (request, response) => {
    const requestUrl = request.path.split('/')
    const tableName = requestUrl[requestUrl.length - 2]
    pool.query(
        queries.UPDATE(tableName, request.body, 'rfid', request.params.id),
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json({
                message: tableName.toUpperCase() + ' successfully updated'
            })
        }
    )
}
                
const removeItem = (request, response) => {
    const requestUrl = request.path.split('/')
    const tableName = requestUrl[requestUrl.length - 2]
    pool.query(
        queries.REMOVE(tableName, request.params.id, 'rfid'),
        (error, results) => {
            if (error) {
                response.status(404).json({
                    message: tableName.toUpperCase() + ' not found'
                })
            }
            response.status(200).json({
                message: tableName.toUpperCase() + ' successfully removed'
            })
        }
    )
}
                    
const getBeautifulItems = (request, response) => {
    const requestUrl = request.path.split('/')
    const tableName = requestUrl[requestUrl.length - 2]
    const rfids = request.body.rfids
    
    try {
        beautifulHandle(rfids).then(result => {
            response.status(200).json(result)
        })            
    } catch (error) {
        response.status(400).json({error: 'RFIDS are missing'})
    }
}

async function beautifulHandle(rfids){
    var result = {
        'items': [],
    }

    try{
        for (const rfid of rfids) {
            try{
                res = await pool.query(
                    queries.SELECT_BEAUTIFUL_ITEMS(rfid)
                )
                if (res.rows[0]) {
                    result.items.push(res.rows[0])
                } else {
                    console.log(`Could not find a product to the RFID ${rfid}`)
                }
            } catch (err) {
                console.log(err.message)
            }
        }
        return result
    } catch (err) {
        console.log(err.message)
        return result
    }
}

module.exports = {
    getAll,
    getById,
    getBeautifulItems,
    insert,
    update,
    remove,
    updateItem,
    removeItem
}
                        