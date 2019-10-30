const handleResponse = (result, response) => {
  if (result.error) {
    response.status(400).json({ error: result.error })
  } else if (result.res.rowCount > 0) {
    if (result.message) {
      response.status(200).json({ msg: result.message })
    } else {
      response.status(200).json(result.res.rows)
    }
  } else {
    response.status(404).json({ msg: 'Not Found' })
  }
}

module.exports = {
  handleResponse
}
