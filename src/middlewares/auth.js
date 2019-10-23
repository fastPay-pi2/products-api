const axios = require('axios')
const baseUrl = 'http://authentication_app:3001/check'

module.exports = async(req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  var config = {
    headers: { Authorization: authHeader }
  }

  try {
    await axios.get(baseUrl, config)

    return next()
  } catch (err) {
    return res.status(401).json({ error: err })
  }
}
