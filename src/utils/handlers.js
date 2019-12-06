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

const handleBeautifulProduct = (result, response) => {
  if (result.error) {
    response.status(400).json({ error: result.error })
  } else if (result.res.rowCount > 0) {
    if (result.message) {
      response.status(200).json({ msg: result.message })
    } else {
      var aux = {}
      var beautifulProducts = []
      const products = result.res.rows
      for (var product in products) {
        aux[products[product].idsubcategory] = 0
      }
      for (product in products) {
        if (aux[products[product].idsubcategory] < 4) {
          beautifulProducts.push(products[product])
          aux[products[product].idsubcategory] += 1
        }
      }
      response.status(200).json(beautifulProducts)
    }
  } else {
    response.status(404).json({ msg: 'Not Found' })
  }
}

module.exports = {
  handleResponse,
  handleBeautifulProduct
}
