const axios = require('axios')
baseUrl = 'http://app/check'
// axios.defaults.baseURL = 'http://localhost:3001/'

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' })
  }
  console.log('authHeader = ', authHeader)
  const [, token] = authHeader.split(' ')

  // var config = {
  //   headers: {'Authorization': authHeader}
  // }
  // var bodyParameters = {
  //   key:
  // }
  // axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

  try {
    console.log('token = ', token)
    axios.post(
      baseUrl,
      {teste: 'teste'}
    ).then(result => {
      console.log(result)
    })
    // const decoded = await promisify(jwt.verify)(token, authConfig.secret)

    // req.userId = decoded.id

    return next()
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' })
  }
}
