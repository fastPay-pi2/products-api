const SELECT_ALL = (tableName) => {
    return 'SELECT * FROM ' + tableName + ';'
}

const SELECT_ONE = (tableName, id) => {
    return 'SELECT * FROM ' + tableName + ' WHERE id = ' + id + ';'
}

const INSERT = (tableName, json) => {

    attributes = Object.keys(json)
    attributes = '(' + attributes + ')'
    values = Object.values(json)
    values = createString(values)

    // console.log(attributes)
    // console.log(values)

    return 'INSERT INTO ' + tableName + ' ' + attributes + ' VALUES ' + values + ';'
}

// creates string in SQL format to insert
const createString = (array) => {
    str = '('
    first = array[0]
    first = isFloat(first) ? first : ('\'' + first + '\'')
    
    str += first
    array.shift()
    array.forEach(element => {
        if (!isFloat(element) || isDate(String(element))){
            element = '\'' + element + '\''
        }
        str += ', ' + element        
    });
    str += ')'

    return str
}

const isFloat = (str) => {
    console.log('str = ', str)
    console.log(isNaN(parseFloat(str)))
    return isNaN(parseFloat(str)) ? false : true
}


// TODO - verificação decente
const isDate = (str) => {
    return str.search('-') > 0 ? true : false
}

module.exports = {
    SELECT_ALL,
    SELECT_ONE,
    INSERT
}