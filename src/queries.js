const Pool = require('pg').Pool
const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'db',
  password: 'pass',
  port: 5432,
})

const getProducts = (request, response) => {
    pool.query('SELECT * FROM PRODUCT', (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getProducts
}