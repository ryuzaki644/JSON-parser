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
