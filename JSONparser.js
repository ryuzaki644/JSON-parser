var numberParser = function (input, numPattern = /^[-+]?(\d+(\.\d*)?|\.\d+)([e][+-]?\d+)?/) {
  input = input.trim()
  if (input.match(numPattern)) {
    return [parseFloat(input.match(numPattern)[0]), input.slice(input.match(numPattern)[0].length)]
  }
  return null
}

var stringParser = function (input) {
  input = input.trim()
  if (input.startsWith('"') === false) return null
  var end = input.slice(1).indexOf('"')
  return [input.slice(1, end + 1), input.slice(end + 2)]
}

var booleanParser = function (input) {
  input = input.trim()
  if (input.startsWith('true')) {
    return [true, input.slice(4)]
  }
  if (input.startsWith('false')) {
    return [false, input.slice(5)]
  }
  return null
}

var nullParser = function (input) {
  input = input.trim()
  if (input.startsWith('null')) {
    return [null, input.slice(4)]
  }
  return null
}

var commaParser = function (input) {
  input = input.trim()
  if (input.startsWith(',')) {
    return [',', input.slice(1)]
  }
  return null
}

var colonParser = function (input) {
  input = input.trim()
  if (input.startsWith(':') === true) {
    return [null, input.slice(1)]
  }
  return null
}

var arrayParser = function (input) {
  if (input.startsWith('[') === false) return null
  input = input.slice(1)
  var array = []
  var result, comma
  while (true) {
    input = input.trim()
    result = valueParser(input)
    // console.log(result)
    if (result === null) return null
    array.push(result[0])
    input = result[1].trim()
    comma = commaParser(input)
    if (comma === null) break
    input = comma[1]
  }
  input = input.trim()
  if (input.startsWith(']') === true) {
    return [array, input.slice(1)]
  }
  return null
}

var objectParser = function (input) {
  input = input.trim()
  var coma, res, key, value
  if (input.startsWith('{') === false) return null
  input = input.slice(1)
  var object = {}
  while (input) {
    res = stringParser(input.trim())
    if (res === null) break
    key = res[0]
    value = (res[1]).trim()
    value = colonParser(value)
    if (value === null) {
      return null
    }
    value = (value[1]).trim()
    value = valueParser(value)
    if (value === null) return null
    object[key] = value[0]
    input = value[1]
    coma = commaParser(input)
    if (coma === null) break
    input = coma[1]
  }
  if (input.startsWith('}') === true) {
    return [object, input.slice(1)]
  }
  return null
}

var anyOneParserFactory = function (...parsers) {
  return function (input) {
    return parsers.reduce(function (accum, parser) {
      if (accum === null) {
        return parser(input)
      } else return accum
    },
    null)
  }
}

var valueParser = anyOneParserFactory(nullParser, booleanParser, numberParser, stringParser, arrayParser, objectParser)

var inp = require('fs').readFileSync('./example.json').toString()
var out = valueParser(inp)

if (out === null) {
  console.log('INVALID JSON')
} else {
  console.log(JSON.stringify(out[0], null, 2))
}
