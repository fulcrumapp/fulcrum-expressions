_ = require('underscore')

_.str = require('underscore.string')

_.mixin(_.str.exports())

Utils = require('./utils')

toArray = Utils.toArray

FunctionConfig =
  locale: null
  defaultLocale: null
  currencyCode: null

exports = {}

exports.NO_VALUE = null

exports.NOT_IMPLEMENTED = ->
  throw new Error('Not Implemented')

exports.MATH_FUNC = MATH_FUNC = (mathFunction) ->
  -> mathFunction.apply(Math, toArray(arguments).map(NUM))

exports.NUMS = ->
  toArray(arguments).map(NUM)

exports.NUM = (value) ->
  return NaN if isNaN(value)
  parseFloat(value)

exports.N = (value) ->
  return value if _.isNumber(value)
  return 1 if value is true
  return 0 if value is false
  0

exports.HASERROR = ->
  n = arguments.length

  while n--
    return true if arguments[n] instanceof Error

  false

exports.ISNAN = (number) ->
  _.isNaN(NUM(number))

exports.PRECISION = (number) ->
  number = NUM(number)
  return NaN if ISNAN(number)

  parts = (number + '').split('.')

  return 0 if parts.length < 2

  parts[1].length

exports.ABS = MATH_FUNC(Math.abs)

exports.ACOS = MATH_FUNC(Math.acos)

exports.ACOSH = MATH_FUNC(Math.acosh)

exports.AND = ->
  _.find(toArray(arguments), (item) -> not item) is undefined

exports.AVERAGE = ->
  args = toArray(arguments)
  return NaN  if args.length is 0
  _.inject(args, ((memo, arg) -> memo + +arg), 0) / args.length

exports.ROUND = (number, digits = 0) ->
  number = NUM(number)
  digits = NUM(digits)

  Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits)

exports.CEILING = (number, significance = 1) ->
  significance ||= 1
  significance = ABS(significance)

  number = NUM(number)
  significance = NUM(significance)

  return NaN if isNaN(number) or isNaN(significance)

  return 0 if significance is 0

  precision = PRECISION(significance)

  if number >= 0
    ROUND(Math.ceil(number / significance) * significance, precision)
  else
    -ROUND(Math.floor(Math.abs(number) / significance) * significance, precision)

exports.FLOOR = (number, significance) ->
  significance ||= 1
  significance = ABS(significance)

  number = NUM(number)
  significance = NUM(significance)

  return NaN if isNaN(number) or isNaN(significance)

  return 0 if significance is 0

  precision = PRECISION(significance)

  if number >= 0
    ROUND Math.floor(number / significance) * significance, precision
  else
    -ROUND(Math.ceil(Math.abs(number) / significance) * significance, precision)

exports.CHAR = (number) ->
  number = NUM(number)
  return number if number instanceof Error
  String.fromCharCode number

exports.CLEAN_REGEX = /[\x00\x08\x0B\x0C\x0E-\x1F]/g

exports.CLEAN = (text) ->
  text = text or ''
  text.replace CLEAN_REGEX, ''

exports.CODE = (string) ->
  string = string.toString() if typeof(string) is 'number'
  return NaN unless typeof(string) is 'string'
  (string or '').charCodeAt(0)

exports.CONCATENATE = ->
  strings = _.map toArray(arguments), (arg) ->
    switch typeof(arg)
      when 'string'
        arg
      when 'number'
        arg + ''
      else
        ''

  strings.join('')

exports.COS = MATH_FUNC(Math.cos)

exports.COSH = MATH_FUNC(Math.cosh)

# _.compact removes '' and 0 from the array, which is somewhat unexpected
exports.COMPACT = (value) ->
  return undefined unless _.isArray(value)

  _.filter value, (item) ->
    item isnt undefined and item isnt null

exports.COUNT = (value) ->
  return COMPACT(value).length if _.isArray(value)
  NaN

exports.COUNTA = ->
  COUNT(toArray(arguments))

exports.COUNTBLANK = (value) ->
  return NaN unless _.isArray(value)

  results = _.filter value, (item) ->
    switch true
      when item is undefined or item is null
        true
      when _.isArray(item)
        item.length is 0
      when typeof(item) is 'string'
        _.isBlank(item)
      else
        false

  results.length

exports.DATE = ->
  NOT_IMPLEMENTED()

exports.DATEVALUE = ->
  NOT_IMPLEMENTED()

exports.DAY = ->
  NOT_IMPLEMENTED()

exports.DAYS360 = ->
  NOT_IMPLEMENTED()

exports.DEGREES = (value) ->
  value = NUM(value)
  return NaN unless _.isNumber(value)
  180.0 * value / Math.PI

exports.DOLLAR = (value, decimals=2) ->
  NOT_IMPLEMENTED()

exports.EVEN = (value) ->
  value = NUM(value)

  return NaN unless _.isNumber(value)

  return CEILING(value, -2, -1)

exports.EXACT = (value1, value2) ->
  _.isEqual(value1, value2)

exports.EXP = MATH_FUNC(Math.exp)

exports.MEMOIZED_FACT = []

exports.FACT = (value) ->
  value = NUM(value)

  return NaN if isNaN(value)
  return NaN if value < 0

  n = Math.floor(value)

  if n is 0 || n is 1
    1
  else if MEMOIZED_FACT[n] > 0
    MEMOIZED_FACT[n]
  else
    MEMOIZED_FACT[n] = FACT(n - 1) * n
    MEMOIZED_FACT[n]

exports.MEMOIZED_FACTDOUBLE = []

exports.FACTDOUBLE = (value) ->
  value = NUM(value)

  return NaN if isNaN(value)
  return NaN if value < 0

  n = Math.floor(value)

  if n <= 1
    1
  else if MEMOIZED_FACTDOUBLE[n] > 0
    MEMOIZED_FACTDOUBLE[n]
  else
    MEMOIZED_FACTDOUBLE[n] = FACTDOUBLE(n - 2) * n
    MEMOIZED_FACTDOUBLE[n]

exports.FALSE = ->
  false

exports.FIND = (needle, haystack, position) ->
  position = NUM(position)
  position = 0 if isNaN(position)

  return NO_VALUE unless haystack and haystack.indexOf
  return NO_VALUE if _.isArray(needle)

  index = haystack.indexOf(needle, position - 1)

  return NO_VALUE if index < 0

  index + 1

exports.FIXED = (number, decimals, noCommas) ->
  # requires locale support
  NOT_IMPLEMENTED()


exports.GCD = ->
  numbers = toArray(arguments).map(NUM)

  count = numbers.length

  return NaN if numbers.length is 0
  return NaN if numbers[0] < 0

  result = numbers[0]

  for i in [1..count - 1] by 1
    return NaN if numbers[i] < 0

    num = numbers[i]

    while result and num
      if result > num
        result %= num
      else
        num %= result

    result += num

  result


exports.IF = (test, trueValue, falseValue) ->
  if test then trueValue else falseValue

exports.IFERROR = (value, errorValue) ->
  if ISERR(value) then errorValue else value

exports.INT = exports.FLOOR

exports.ISBLANK = (value) ->
  return true if value is null
  return true if value is undefined
  return true if _.isNaN(value)
  return false if _.isBoolean(value)
  return false if _.isNumber(value)
  return false if _.isDate(value)
  return _.isBlank(value) if _.isString(value)
  return value.length is 0 if _.isArray(value)

  if value and (value.choice_values or
                value.choice_values is null or
                value.other_values or
                value.other_values is null)

    choice = value.choice_values
    others = value.other_values

    hasChoice = _.isArray(choice) and choice.length > 0
    hasOthers = _.isArray(others) and others.length > 0
    hasEither = hasChoice or hasOthers

    return not hasEither

  Object.keys(value).length is 0

exports.ISERR = (value) ->
  return true if value is NO_VALUE
  return true if value is undefined
  return true if value is null
  return true if isNaN(value)
  return true if value instanceof Error
  false

exports.ISERROR = (value) ->
  ISERR(value)

exports.ISLOGICAL = (value) ->
  _.isBoolean(value)

exports.ISNONTEXT = (value) ->
  not _.isString(value)

exports.ISNUMBER = (value) ->
  _.isNumber(value)

exports.ISODD = (value) ->
  value = NUM(value)

  return false unless _.isNumber(value)
  return false if isNaN(value)

  (Math.floor(Math.abs(value)) & 1) is 1

exports.ISEVEN = (value) ->
  value = NUM(value)

  return false unless _.isNumber(value)
  return false if isNaN(value)

  (Math.floor(Math.abs(value)) & 1) is 0

exports.ISTEXT = (value) ->
  _.isString(value)

exports.LCM = ->
  numbers = toArray(arguments).map (num) -> INT(num)

  count = numbers.length

  a = Math.abs(numbers[0])

  for i in [1..count - 1] by 1
    b = Math.abs(numbers[i])
    c = a

    return NaN if isNaN(b)

    while a and b
      if a > b
        a %= b
      else
        b %= a

    a = Math.abs(c * numbers[i]) / (a + b)

  a

exports.LEFT = (value, numberOfCharacters = 1) ->
  numberOfCharacters ||= 1
  numberOfCharacters = FLOOR(numberOfCharacters)

  return NO_VALUE if value is undefined
  return NO_VALUE if value is null
  return NO_VALUE if _.isObject(value)
  return NO_VALUE if numberOfCharacters < 0
  return NO_VALUE if isNaN(numberOfCharacters)

  value = value.toString()

  value.substring(0, numberOfCharacters)

exports.LEN = (value) ->
  return NO_VALUE if value is undefined
  return NO_VALUE if value is null
  return NO_VALUE if _.isObject(value)

  value.toString().length

exports.LN = MATH_FUNC(Math.log)

exports.LOG = (value, base) ->
  value = NUM(value)
  base = NUM(base or 10)

  return NaN if base is undefined
  return NaN if base is null
  return NaN if isNaN(base)

  Math.log(value) / Math.log(base)

exports.LOG10 = (value) ->
  LOG(value, 10)

exports.LOWER = (value) ->
  return NO_VALUE if value is undefined
  return NO_VALUE if value is null
  return NO_VALUE if _.isArray(value)
  return NO_VALUE if _.isObject(value)

  value.toString().toLowerCase()

exports.MATCH = ->
  NOT_IMPLEMENTED()

exports.MAX = ->
  numbers = _.flatten(toArray(arguments))
  numbers = _.map(numbers, NUM)

  return NO_VALUE if numbers.length is 0

  hasNaN = _.some(numbers, isNaN)

  return NO_VALUE if hasNaN

  Math.max.apply(Math, numbers)

exports.MAXA = ->
  return NO_VALUE if arguments.length < 1
  return NO_VALUE unless _.isArray(arguments[0])

  MAX.apply(null, arguments[0])

exports.MEDIAN = ->
  NOT_IMPLEMENTED()

exports.MIN = ->
  numbers = _.flatten(toArray(arguments))
  numbers = _.map(numbers, NUM)

  return NO_VALUE if numbers.length is 0

  hasNaN = _.some(numbers, isNaN)

  return NO_VALUE if hasNaN

  Math.min.apply(Math, numbers)

exports.MINA = ->
  return NO_VALUE if arguments.length < 1
  return NO_VALUE unless _.isArray(arguments[0])

  MIN.apply(null, arguments[0])

exports.MID = (value, startPosition, numberOfCharacters) ->
  startPosition = FLOOR(startPosition)
  numberOfCharacters = FLOOR(numberOfCharacters)

  return NO_VALUE if value is undefined
  return NO_VALUE if value is null
  return NO_VALUE if _.isObject(value)
  return NO_VALUE if startPosition < 1
  return NO_VALUE if isNaN(startPosition)
  return NO_VALUE if numberOfCharacters < 0
  return NO_VALUE if isNaN(numberOfCharacters)

  value = value.toString()
  value.substr(startPosition - 1, numberOfCharacters)

exports.MOD = (number, divisor) ->
  number = NUM(number)
  divisor = NUM(divisor)

  return NaN if isNaN(number)
  return NaN if isNaN(divisor)
  return NaN if divisor is 0

  modulus = Math.abs(number % divisor)

  if divisor > 0 then modulus else -modulus

exports.NOT = (value) ->
  not value

exports.ODD = (value) ->
  value = NUM(value)

  return NaN unless _.isNumber(value)

  temp = Math.ceil(Math.abs(value))
  temp = if temp & 1 then temp else temp + 1

  if value >= 0 then temp else -temp

exports.OR = ->
  _.find(toArray(arguments), (item) -> item) isnt undefined

exports.PI = ->
  Math.PI

exports.POWER = (number, power) ->
  number = NUM(number)
  power = NUM(power)

  return NaN if isNaN(number)
  return NaN if isNaN(power)

  Math.pow(number, power)

exports.PRODUCT = ->
  numbers = toArray(arguments).map(NUM)

  return NaN if numbers.length is 0

  hasNaN = _.some(numbers, isNaN)

  return NaN if hasNaN

  _.inject(numbers, ((memo, number) -> memo *= number), 1)

exports.PROPER = (value) ->
  return NO_VALUE if value is undefined
  return NO_VALUE if value is null
  return NO_VALUE if _.isArray(value)
  return NO_VALUE if _.isObject(value)

  _.titleize(value.toString())

exports.QUOTIENT = (numerator, denominator) ->
  numerator = NUM(numerator)
  denominator = NUM(denominator)

  return NaN if isNaN(numerator)
  return NaN if isNaN(denominator)
  return NaN if denominator is 0

  parseInt(numerator / denominator, 10)

exports.RADIANS = (degrees) ->
  degrees = NUM(degrees)

  (degrees / 180.0) * Math.PI

exports.RAND = ->
  Math.random()

exports.RANDBETWEEN = (low, high) ->
  low = NUM(low)
  high = NUM(high)

  return NaN if isNaN(low)
  return NaN if isNaN(high)

  low + Math.ceil((high - low + 1) * Math.random()) - 1

exports.REPLACE = (value, startPosition, numberOfCharacters, replacement) ->
  startPosition = FLOOR(startPosition)
  numberOfCharacters = FLOOR(numberOfCharacters)

  return NO_VALUE if arguments.length < 4
  return NO_VALUE if value is undefined
  return NO_VALUE if value is null
  return NO_VALUE if _.isObject(value)
  return NO_VALUE if startPosition < 1
  return NO_VALUE if isNaN(startPosition)
  return NO_VALUE if numberOfCharacters < 0
  return NO_VALUE if isNaN(numberOfCharacters)

  value = value.toString()

  prefix = value.substr(0, startPosition - 1)
  suffix = value.substr(startPosition - 1 + numberOfCharacters)

  prefix + replacement + suffix

exports.RIGHT = (value, numberOfCharacters) ->
  numberOfCharacters ||= 1
  numberOfCharacters = FLOOR(numberOfCharacters)

  return NO_VALUE if value is undefined
  return NO_VALUE if value is null
  return NO_VALUE if _.isObject(value)
  return NO_VALUE if numberOfCharacters < 0
  return NO_VALUE if isNaN(numberOfCharacters)

  value = value.toString()
  value.substring(value.length - numberOfCharacters)

exports.ROUNDDOWN = (number, digits = 0) ->
  number = NUM(number)
  digits = NUM(digits)

  sign = if number > 0 then 1 else -1

  sign * (Math.floor(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits)

exports.ROUNDUP = (number, digits = 0) ->
  number = NUM(number)
  digits = NUM(digits)

  sign = if number > 0 then 1 else -1

  sign * (Math.ceil(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits)

exports.SEARCH = (needle, haystack, startPosition) ->
  startPosition ||= 1
  startPosition = NUM(startPosition)
  startPosition = 1 if isNaN(startPosition)

  haystack = haystack.toString() if _.isNumber(haystack)
  needle = needle.toString() if _.isNumber(needle)

  return NO_VALUE unless _.isString(needle)
  return NO_VALUE unless _.isString(haystack)

  return 1 if needle is ''

  index = haystack.toLowerCase().indexOf(needle.toLowerCase(), startPosition - 1)

  return NO_VALUE if index < 0

  index + 1

exports.SIGN = (number) ->
  number = NUM(number)

  return NaN if isNaN(number)

  switch true
    when number > 0
      1
    when number < 0
      -1
    when number is 0
      0

exports.SIN = MATH_FUNC(Math.sin)

exports.SINH = MATH_FUNC(Math.sinh)

exports.SQRT = MATH_FUNC(Math.sqrt)

exports.SQRTPI = (number) ->
  SQRT(NUM(number) * Math.PI)

exports.SUBSTITUTE = (text, oldText, newText, occurrence) ->
  occurrence = FLOOR(occurrence)

  return NO_VALUE if arguments.length < 3
  return NO_VALUE if occurrence < 0

  invalid = (!text or not _.isString(oldText) or not _.isString(newText))

  return NO_VALUE if invalid

  return text if _.isArray(text)
  return text if text.indexOf(oldText) < 0

  text = text.toString()
  oldText = oldText.toString()
  newText = newText.toString()

  if isNaN(occurrence)
    text.replace(new RegExp(oldText, 'g'), newText)
  else
    index = text.indexOf(oldText, index)
    count = 1

    while index >= 0
      if count is occurrence
        prefix = text.substring(0, index)
        suffix = text.substring(index + oldText.length)

        return prefix + newText + suffix

      index = text.indexOf(oldText, index + 1)

      count++

    text

exports.SUM = ->
  numbers = toArray(arguments).map(NUM)

  return NaN if numbers.length is 0

  hasNaN = _.some(numbers, isNaN)

  return NaN if hasNaN

  _.inject(numbers, ((memo, number) -> memo += number), 0)

exports.SUMSQ = ->
  numbers = toArray(arguments).map(NUM)

  return NaN if numbers.length is 0

  hasNaN = _.some(numbers, isNaN)

  return NaN if hasNaN

  _.inject(numbers, ((memo, number) -> memo += (number * number)), 0)

exports.T = (value) ->
  return '' if _.isUndefined(value)
  return '' if _.isNull(value)
  return value.toString()

exports.TRIM = (value) ->
  _.trim(value)

exports.TRUE = (value) ->
  true

exports.UPPER = (value) ->
  return NO_VALUE if value is undefined
  return NO_VALUE if value is null
  return NO_VALUE if _.isArray(value)
  return NO_VALUE if _.isObject(value)

  value.toString().toUpperCase()

exports.VALUE = (value) ->
  NOT_IMPLEMENTED()

exports.ISNEW = ->
  NOT_IMPLEMENTED()

exports.ISUPDATE = ->
  NOT_IMPLEMENTED()


# Fulcrum Functions

exports.HASOTHER = (value) ->
  !!(value and
     value.other_values and
     _.isArray(value.other_values) and
     value.other_values.length > 0)


# TODO(zhm) what should this return when there isn't an other value?
# undefined/null/''
exports.OTHER = (value) ->
  return NO_VALUE unless exports.HASOTHER(value)
  return value.other_values[0]

exports.SELECTED = (value, choice) ->
  return false if ISBLANK(value)
  return false unless choice

  if _.isArray(choice)
    return (choice.filter (item) -> not SELECTED(value, item)).length is 0

  if value and value.choice_values
    return true if _.contains(value.choice_values, choice)

  if value and value.other_values
    return true if _.contains(value.other_values, choice)

  false

module.exports = exports
