const productSchema = {
  name: {
    isString: true,
    errorMessage: 'invalid name'
  },
  image: {
    isString: true,
    errorMessage: 'invalid image'
  },
  price: {
    isFloat: true,
    errorMessage: 'invalid price'
  },
  idSubcategory: {
    isInt: true,
    errorMessage: 'invalid id for subcategory'
  },
  brand: {
    optional: true,
    errorMessage: 'invalid brand'
  }
}

const itemSchema = {
  rfid: {
    isString: true,
    errorMessage: 'invalid rfid'
  },
  expirationDate: {
    isString: true,
    errorMessage: 'invalid date'
  },
  idProduct: {
    isInt: true,
    errorMessage: 'invalid product'
  }
}

const categorySchema = {
  name: {
    isString: true,
    errorMessage: 'invalid name'
  }
}

const subcategorySchema = {
  name: {
    isString: true,
    errorMessage: 'invalid name'
  },
  idCategory: {
    isInt: true,
    errorMessage: 'invalid id for category'
  }
}

const productSchemaPut = {
  name: {
    isString: true,
    optional: true,
    errorMessage: 'invalid name'
  },
  image: {
    isString: true,
    optional: true,
    errorMessage: 'invalid image'
  },
  price: {
    isFloat: true,
    optional: true,
    errorMessage: 'invalid price'
  },
  idSubcategory: {
    isInt: true,
    errorMessage: 'invalid id for subcategory'
  },
  brand: {
    optional: true,
    errorMessage: 'invalid brand'
  }
}

const itemSchemaPut = {
  rfid: {
    isInt: true,
    optional: true,
    errorMessage: 'invalid rfid'
  },
  expirationDate: {
    isString: true,
    optional: true,
    errorMessage: 'invalid date'
  },
  idProduct: {
    isInt: true,
    errorMessage: 'invalid product'
  }
}

module.exports = {
  productSchema,
  itemSchema,
  categorySchema,
  subcategorySchema,
  productSchemaPut,
  itemSchemaPut
}
