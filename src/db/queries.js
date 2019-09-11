const SELECT_ALL = (tableName) => {
    return 'SELECT * FROM ' + tableName + ';'
}

const UPDATE = (tableName, json, id_field, id) => {
    // console.log(tableName +  column + id)
    attributes = createUpdateString(json)
    return 'UPDATE ' + tableName + ' SET ' +  attributes + ' WHERE '+ id_field + ' = ' + id + ";"
}

const REMOVE = (tableName, id, id_field) => {
    // console.log(tableName +  column + id)
    return 'DELETE FROM ' + tableName + ' WHERE ' + id_field + ' = ' + id + ';'
}

const SELECT_ONE = (tableName, id) => {
    param = 'id'
    if (tableName == 'item')
        param = 'rfid'
    return 'SELECT * FROM ' + tableName + ' WHERE ' + param  + ' = ' + id + ';'
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


const createUpdateString = (json) => {
    str = ""
    for (key in json){
        str += " " + key + " = '" + json[key] + "'" +","
    }
    str = str.substring(0, str.length -1);
    return str;
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
    INSERT,
    UPDATE,
    REMOVE
}