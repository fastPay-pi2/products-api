const SELECT_ALL = (tableName) => {
    return 'SELECT * FROM ' + tableName
}

const SELECT_ONE = (params) => {
    tableName = params[0]
    id = params[1]

    return 'SELECT * FROM ' + tableName + ' WHERE id = ' + id
}

const INSERT = (params, json) => {
    tableName = params[0]

    attributes = Object.keys(json)
    values = Object.values(json)
    // first = attributes[0]
    // attributes.shift()

    // strAttribute = first
    // attributes.forEach(element => {
        // strAttribute += ', ' + element
    // });

    attributes = createString(attributes)
    values = createString(values)

    console.log(attributes)
    console.log(values)

    // return 'INSERT INTO ' + tableName + ' ' + attributes + ' VALUES ' + values
}

// creates string in SQL format to insert
const createString = (array) => {
    str = '('
    first = array[0]
    first = isFloat(first) ? first : ('"' + first + '"')
    
    str += first
    array.shift()
    array.forEach(element => {
        if (!isFloat(element)){
            element = '"' + element + '"'
        }
        str += ', ' + element        
    });
    str += ')'

    return str
}

const isFloat = (str) => {
    return isNaN(parseFloat(str)) ? false : true
}

module.exports = {
    SELECT_ALL,
    SELECT_ONE,
    INSERT
}