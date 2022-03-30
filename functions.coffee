_ = require('underscore')

_.str = require('underscore.string')

_.mixin(_.str.exports())

inspect = require('object-inspect')

qs = require('query-string')

encodeUrl = require('encodeurl')

Utils = require('./utils')

{format} = require('util')

toArray = Utils.toArray

Defaults =
  locale: 'en_US'
  language: 'en-US'
  country: 'US'
  currencyCode: 'USD'
  currencySymbol: '$'
  timeZone: 'UTC'
  decimalSeparator: '.'
  groupingSeparator: ','
  groupingSize: 3

Config = _.extend({}, Defaults)

exports = {}

exports.NO_VALUE = undefined

exports.ERROR = (message) ->
  throw new Error(message)

exports.MATH_FUNC = MATH_FUNC = (mathFunction) ->
  -> mathFunction.apply(Math, toArray(arguments).map(NUM))

exports.ABS = MATH_FUNC(Math.abs)

exports.ACOS = MATH_FUNC(Math.acos)

exports.ACOSH = (number) ->
  number = NUM(number)

  Math.log(number + Math.sqrt(number * number - 1))

exports.ALERT = ->
  title = null
  message = arguments[0]

  if arguments.length > 1
    title = arguments[0]
    message = arguments[1]

  result =
    type: 'message'
    title: if title? then title.toString() else null
    message: if message? then message.toString() else null

  $$runtime.results.push(result)

exports.ALTITUDE = ->
  NUM(CONFIG().recordAltitude)

exports.AND = ->
  _.find(toArray(arguments), (item) -> not item) is undefined

exports.APPLICATION = ->
  Config.application ? ''

exports.APPLICATIONBUILD = ->
  Config.applicationBuild ? ''

exports.APPLICATIONINFO = (separator=', ') ->
  _.compact([ APPLICATION(), APPLICATIONVERSION(), APPLICATIONBUILD() ]).join(separator)

exports.APPLICATIONVERSION = ->
  Config.applicationVersion ? ''

evaluateChoiceValueEquals = (choiceValues, matchValues) ->
  Array.isArray(choiceValues) and
    Array.isArray(matchValues) and
    choiceValues.length is matchValues.length and
    choiceValues.every((element) -> element in matchValues)

evaluateEquals = (field, value) ->
  result = switch FIELDTYPE(field)
    when 'ChoiceField', 'ClassificationField' then evaluateChoiceValueEquals(CHOICEVALUES(VALUE(field)), value)
    else VALUE(field) is value
  return result

evaluateCondition = ({ field, operator, value }) ->
  return false if not field or not operator
  result = switch operator
    when 'equals' then evaluateEquals(field, value)
    else false
  return result

performAction = (action) ->
  return if !action
  switch action.type
    when 'setvalue' then SETVALUE(action.field, action.value)

applyEffect = ({ actions, conditions }) ->
  return if not Array.isArray(actions) or not Array.isArray(conditions)
  actions.forEach(performAction) if conditions.every(evaluateCondition)

createApplyEffectCallback = (effect) ->
  return if !effect or !effect.event or !effect.event.name
  if effect.event.field
    ON(effect.event.name, effect.event.field, (event) -> applyEffect(effect))
  else
    ON(effect.event.name, (event) -> applyEffect(effect))

exports.APPLYFIELDEFFECTS = (fieldEffects) ->
  return if !fieldEffects or not Array.isArray(fieldEffects.effects)
  createApplyEffectCallback(effect) for effect in fieldEffects.effects

exports.ARRAY = ->
  FLATTEN(toArray(arguments))

exports.AVERAGE = ->
  args = ARRAY(toArray(arguments))
  return NaN if args.length is 0

  _.inject(args, ((memo, arg) -> memo + +arg), 0) / args.length

exports.CEILING = (number, significance = 1) ->
  significance ?= 1
  significance = ABS(significance)

  number = NUM(number)

  return NaN if isNaN(number) or isNaN(significance)

  return 0 if significance is 0

  precision = PRECISION(significance)

  if number >= 0
    ROUND(Math.ceil(number / significance) * significance, precision)
  else
    -ROUND(Math.floor(Math.abs(number) / significance) * significance, precision)

exports.CHAR = (number) ->
  number = NUM(number)
  String.fromCharCode number

exports.CHOICEVALUE = (field) ->
  values = CHOICEVALUES(field)

  return NO_VALUE unless _.isArray(values)
  return NO_VALUE if values.length is 0

  values[0]

exports.CHOICEVALUES = (field) ->
  return NO_VALUE unless field?.choice_values? or field?.other_values?

  return [] if ISBLANK(field)

  values = [].concat(field.choice_values).concat(field.other_values)

  _.compact(values)

CLEAN_REGEX = /[\x00\x08\x0B\x0C\x0E-\x1F]/g

exports.CLEAN = (text) ->
  text ?= ''
  text.replace CLEAN_REGEX, ''

exports.COALESCE = ->
  if arguments.length is 1 and _.isArray(arguments[0])
    COALESCE.apply(null, arguments[0])
  else
    (_.find toArray(arguments), (value) -> value?) ? NO_VALUE

exports.CODE = (string) ->
  string = string.toString() if _.isNumber(string)
  return NaN unless _.isString(string)
  (string ? '').charCodeAt(0)

# _.compact removes '' and 0 from the array, which is somewhat unexpected
exports.COMPACT = (value) ->
  return NO_VALUE unless _.isArray(value)

  _.filter value, (item) -> item?

exports.CONCATENATE = ->
  strings = _.map ARRAY(toArray(arguments)), (arg) ->
    switch true
      when _.isString(arg)
        arg
      when _.isNumber(arg)
        '' + arg
      else
        ''

  strings.join('')

exports.CONCAT = exports.CONCATENATE

exports.CONFIG = ->
  Config

exports.CONFIRM = ->
  title = null
  message = arguments[0]
  callback = arguments[1]

  if arguments.length > 2
    title = arguments[0]
    message = arguments[1]
    callback = arguments[2]

  buttons = ['Cancel', 'Okay']

  MESSAGEBOX(title: title, message: message, buttons: buttons, callback)

exports.CONFIGURE = (config, merge=true) ->
  if merge
    _.extend(Config, config)
  else
    Config = config

  Config

exports.CONTAINS = (haystack, needle, fromIndex=0) ->
  fromIndex = 0 unless _.isNumber(fromIndex)

  return false unless _.isString(haystack) or _.isArray(haystack)

  if _.isString(haystack)
    haystack.indexOf(needle.toString(), fromIndex) isnt -1
  else
    _.contains(haystack, needle, fromIndex)

exports.COS = MATH_FUNC(Math.cos)

exports.COSH = (number) ->
  number = NUM(number)

  exp = Math.exp(number)

  (exp + 1 / exp) / 2

exports.COUNT = (value) ->
  return NO_VALUE unless _.isArray(value)

  numbers = _.select COMPACT(value).map(NUM), ISNUMBER

  numbers.length

exports.COUNTA = (value) ->
  values = _.select ARRAY(toArray(arguments)), EXISTS
  values.length

exports.COUNTBLANK = (value) ->
  results = _.filter ARRAY(toArray(arguments)), (item) ->
    switch true
      when not item?
        true
      when _.isArray(item)
        item.length is 0
      when _.isString(item)
        _.isBlank(item)
      else
        false

  results.length

exports.COUNTRY = ->
  Config.country or Defaults.country

exports.CURRENCYCODE = ->
  Config.currencyCode or Defaults.currencyCode

exports.CURRENCYSYMBOL = ->
  Config.currencySymbol or Defaults.currencySymbol

exports.CURRENTLOCATION = ->
  $$runtime.currentLocation ? null

exports.DATANAMES = (type) ->
  elements =
    if type?
      _.filter $$runtime.elements, (e) -> e.type is type
    else
      $$runtime.elements

  elements.map (e) -> e.data_name

exports.DATE = (year, month, day) ->
  year = INT(year)
  month = INT(month)
  day = INT(day)

  return NO_VALUE if ISNAN(year) or ISNAN(month) or ISNAN(day)

  new Date("#{year}/#{month}/#{day} 00:00:00")

exports.DATEADD = (date, number, type='day') ->
  date = DATEVALUE(date)
  number = INT(number)

  return NO_VALUE unless date?
  return NO_VALUE if ISNAN(number)

  return NO_VALUE unless type is 'day'

  time = date.getTime()
  time += (number * (1000 * 60 * 60 * 24))

  new Date(time)

exports.DATEVALUE = (dateString, timeString) ->
  if _.isDate(dateString)
    year = dateString.getFullYear()
    month = LPAD(dateString.getMonth() + 1, 2, '0')
    day = LPAD(dateString.getDate(), 2, '0')

    dateString = year + '-' + month + '-' + day

  return NO_VALUE unless _.isString(dateString)

  timeString = '00:00:00' unless _.isString(timeString)
  timeString = timeString + ':00' if timeString.length is 5

  date = null

  if dateString.length <= 10
    dateString = dateString.replace(/-/g, '/')
    date = new Date(dateString + ' ' + timeString)
  else
    date = new Date(dateString)

  return NO_VALUE if ISNAN(date.getTime())

  date

exports.DAY = (date) ->
  date = DATEVALUE(date)

  return NO_VALUE unless date?

  date.getDate()

exports.DECIMALSEPARATOR = ->
  Config.decimalSeparator or Defaults.decimalSeparator

exports.DEGREES = (value) ->
  value = NUM(value)
  return NaN unless _.isNumber(value)
  180.0 * value / Math.PI

exports.DESCRIPTION = (dataName) ->
  field = FIELD(dataName)

  return unless field?

  field.description

exports.DEVICEINFO = (separator=', ') ->
  _.compact([ DEVICEMANUFACTURER(), DEVICEMODEL() ]).join(separator)

exports.DEVICEMODEL = ->
  Config.deviceModel ? ''

exports.DEVICEMANUFACTURER = ->
  Config.deviceManufacturer ? ''

exports.DOLLAR = (value, decimals=2, currency=null, language=null) ->
  decimals = NUM(decimals)
  decimals ?= 2
  decimals = 2 if ISNAN(decimals)

  value = NUM(value)

  return NO_VALUE unless _.isNumber(value)

  currency ?= CURRENCYCODE()
  language ?= LANGUAGE()

  options =
    style: 'currency'
    currency: currency
    minimumFractionDigits: decimals
    maximumFractionDigits: decimals

  FORMATNUMBER(value, language, options)

exports.EMAIL = ->
  CONFIG().userEmail ? NO_VALUE

exports.EVEN = (value) ->
  value = NUM(value)

  return NaN unless _.isNumber(value)

  CEILING(value, -2, -1)

exports.EXACT = (value1, value2) ->
  _.isEqual(value1, value2)

exports.EXISTS = (value) ->
  _.select(toArray(arguments).map(ISBLANK)).length is 0

exports.EXP = MATH_FUNC(Math.exp)

exports.FIELD = (dataName) ->
  element = $$runtime.elementsByDataName[dataName]

  return NO_VALUE unless element?

  element

exports.FIELDS = (dataName, options = {}) ->
  element = FIELD(dataName)

  options ?= {}
  options.repeatables ?= true
  options.sections ?= true

  return NO_VALUE unless element?
  return NO_VALUE unless element.elements?

  return Utils.flattenElements(element.elements, options.repeatables, false, null, options.sections)

exports.FIELDNAMES = (dataName, options = {}) ->
  fields = FIELDS(dataName, options)

  return NO_VALUE unless fields?

  fields.map (o) => o.data_name

exports.FIELDTYPE = (dataName) ->
  field = FIELD(dataName)

  return NO_VALUE unless field?

  field.type

exports.FIRST = (array, count) ->
  _.first(array, count)

exports.MEMOIZED_FACT = []

exports.FACT = (value) ->
  value = NUM(value)

  return NaN if ISNAN(value)
  return NaN if value < 0

  n = Math.floor(value)

  if n is 0 or n is 1
    1
  else if MEMOIZED_FACT[n] > 0
    MEMOIZED_FACT[n]
  else
    MEMOIZED_FACT[n] = FACT(n - 1) * n
    MEMOIZED_FACT[n]

exports.MEMOIZED_FACTDOUBLE = []

exports.FACTDOUBLE = (value) ->
  value = NUM(value)

  return NaN if ISNAN(value)
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
  position = 0 if ISNAN(position)

  return NO_VALUE unless haystack and haystack.indexOf
  return NO_VALUE if _.isArray(needle)

  index = haystack.indexOf(needle, position - 1)

  return NO_VALUE if index < 0

  index + 1

exports.FIXED = (number, decimals=2, suppressGroupingSeparator=false) ->
  number = NUM(number)
  decimals = NUM(decimals)
  decimals = 2 if ISNAN(decimals)
  decimals = MAX(decimals, 0)
  decimals = MIN(decimals, 20)

  return NO_VALUE if ISNAN(number)
  return NO_VALUE if ISNAN(decimals)

  suppressGroupingSeparator = !!suppressGroupingSeparator

  power = Math.pow(10, decimals)

  scaled = parseInt(number * power)

  machineDecimalSeparator = '.'

  machineValue = number.toFixed(decimals)

  index = machineValue.indexOf(machineDecimalSeparator)

  return machineValue unless index > -1

  integerPart = parseInt(machineValue.substring(0, index))
  fractionPart = machineValue.substring(index + 1, machineValue.length)

  integerString = ''

  groupingSize = GROUPINGSIZE()
  groupingMax = Math.pow(10, groupingSize)

  if suppressGroupingSeparator or integerPart < groupingMax
    integerString = integerPart.toString()
  else
    groupingSeparator = GROUPINGSEPARATOR()

    parts = []

    while integerPart >= groupingMax
      thisIntegerPart = Math.floor(integerPart % groupingMax)

      zeroPadding = new Array(groupingSize + 1).join('0')

      parts.push(RIGHT(zeroPadding + thisIntegerPart.toString(), groupingSize))

      integerPart = Math.floor(integerPart / groupingMax)

    if integerPart > 0
      parts.push(integerPart.toString())

    integerString = parts.reverse().join(groupingSeparator)

  if decimals < 1
    integerString
  else
    integerString + DECIMALSEPARATOR() + fractionPart.toString()

exports.FLATTEN = (value) ->
  return NO_VALUE unless _.isArray(value)

  _.flatten value

exports.FLOOR = (number, significance) ->
  significance ?= 1
  significance = ABS(significance)

  number = NUM(number)

  return NaN if ISNAN(number) or ISNAN(significance)

  return 0 if significance is 0

  precision = PRECISION(significance)

  if number >= 0
    ROUND(Math.floor(number / significance) * significance, precision)
  else
    -ROUND(Math.ceil(Math.abs(number) / significance) * significance, precision)

exports.FORM = ->
  $$runtime.form

exports.FORMAT = ->
  format.apply(null, arguments)

exports.FORMATADDRESS = (address, {partSeparator, lineSeparator} = {}) ->
  return NO_VALUE unless address?

  lineSeparator ?= '\n'
  partSeparator ?= ' '

  formatLine = (parts...) =>
    components = []

    for part in parts
      components.push(part) if EXISTS(part)

    components.join(partSeparator)

  line1 = formatLine(address.sub_thoroughfare, address.thoroughfare, address.suite and '#' + address.suite)
  line2 = formatLine(address.locality, address.admin_area, address.postal_code)
  line3 = formatLine(address.country)

  lines = []
  lines.push(line1) if EXISTS(line1)
  lines.push(line2) if EXISTS(line2)
  lines.push(line3) if EXISTS(line3)
  lines.join(lineSeparator)

exports.FORMATNUMBER = (number, language, options) ->
  number ?= NUM(number)
  language ?= LANGUAGE()

  options ?= {}

  style = 'decimal'
  style = 'currency' if options.style is 'currency'
  style = 'percent'  if options.style is 'percent'

  options.style = style

  if options.style is 'currency'
    options.currency ?= CURRENCYCODE()

  hasSignificantDigitsOption = _.isNumber(options.minimumSignificantDigits) or _.isNumber(options.maximumSignificantDigits)

  if hasSignificantDigitsOption
    options.minimumSignificantDigits ?= 1
    options.minimumSignificantDigits = NUM(options.minimumSignificantDigits)
    options.minimumSignificantDigits = MIN(MAX(options.minimumSignificantDigits, 1), 21)

    options.maximumSignificantDigits ?= options.minimumSignificantDigits
    options.maximumSignificantDigits = NUM(options.maximumSignificantDigits)
    options.maximumSignificantDigits = MIN(MAX(options.maximumSignificantDigits, 1), 21)
  else
    options.minimumIntegerDigits ?= 1
    options.minimumIntegerDigits = NUM(options.minimumIntegerDigits)
    options.minimumIntegerDigits = MIN(MAX(options.minimumIntegerDigits, 1), 21)

    options.minimumFractionDigits ?= if options.style is 'currency' then 2 else 0
    options.minimumFractionDigits = NUM(options.minimumFractionDigits)
    options.minimumFractionDigits = MIN(MAX(options.minimumFractionDigits, 0), 20)

    if options.style is 'currency'
      options.maximumFractionDigits ?= 2
    else if options.style is 'percent'
      options.maximumFractionDigits ?= MAX(options.minimumFractionDigits, 0)
    else
      options.maximumFractionDigits ?= MAX(options.minimumFractionDigits, 3)

    options.maximumFractionDigits = NUM(options.maximumFractionDigits)
    options.maximumFractionDigits = MIN(MAX(options.maximumFractionDigits, 0), 20)

  unless _.isBoolean(options.useGrouping)
    options.useGrouping = true

  HostFunctions.formatNumber(number, language, options)

exports.GCD = ->
  numbers = toArray(arguments).map(NUM)

  count = numbers.length

  return NaN if numbers.length is 0
  return NaN if numbers[0] < 0

  result = numbers[0]

  for i in [1..count - 1]
    return NaN if numbers[i] < 0

    num = numbers[i]

    while result and num
      if result > num
        result %= num
      else
        num %= result

    result += num

  result

exports.GETRESULT = ->
  $$runtime.$$result

exports.REQUEST = (options, callback) ->
  return ERROR('A callback must be provided to REQUEST') unless _.isFunction(callback)

  if _.isString(options)
    options = { url: options }

  options.method  ?= 'GET'
  options.headers ?= {}
  options.followRedirect ?= true

  return ERROR('A url must be provided to REQUEST') unless _.isString(options.url)

  if _.isObject(options.qs)
    queryString = qs.stringify(options.qs)

    if options.url.indexOf('?') < 0
      queryString = '?' + queryString

    options.url += queryString

    delete options.qs

  if options.json?
    options.headers['Content-Type'] = 'application/json'

    unless _.isString(options.json)
      options.body = JSON.stringify(options.json)

  options.method  = 'GET' unless _.isString(options.method)
  options.headers = {}    unless _.isObject(options.headers)
  options.body    = null  unless _.isString(options.body)
  options.followRedirect = !!options.followRedirect

  # Encode the entire URL. This allows sloppy inputs with partially encoded params
  # and prevents double encoding.
  options.url = encodeUrl(options.url)

  HostFunctions.httpRequest(JSON.stringify(options), callback)

exports.GROUP = ->
  args = ARRAY(toArray(arguments))

  return NO_VALUE if args.length is 0

  callback = null
  values = args

  if _.isFunction(_.last(args))
    callback = _.last(args)
    values = _.first(args, args.length - 1)

  _.groupBy(values, callback)

exports.GROUPINGSEPARATOR = ->
  Config.groupingSeparator or Defaults.groupingSeparator

exports.GROUPINGSIZE = ->
  Config.groupingSize or Defaults.groupingSize

exports.HASOTHER = (value) ->
  !!(value and
     value.other_values and
     _.isArray(value.other_values) and
     value.other_values.length > 0)

exports.IF = (test, trueValue, falseValue) ->
  value = falseValue
  if test
    value = trueValue

  if TYPEOF(value) == 'function'
    value = value()

  value

exports.IFERROR = (value, errorValue) ->
  if ISERR(value) then errorValue else value

exports.INSPECT = (value) ->
  inspect(value)

exports.INT = exports.FLOOR

exports.INVALID = ->
  key = null
  message = null

  if arguments.length > 1
    element = FIELD(arguments[0])

    key = element?.key or arguments[0].toString()

    message = arguments[1].toString()
  else if arguments.length is 1
    message = arguments[0].toString()

  result =
    type: 'validation'
    key: key
    message: message

  $$runtime.results.push(result)

exports.ISBLANK = (value) ->
  return true unless value?
  return true if _.isNaN(value)
  return false if _.isBoolean(value)
  return false if _.isNumber(value)
  return false if _.isDate(value)
  return false if _.isRegExp(value)
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
  return true unless value?
  return true if isNaN(value)
  return true if value instanceof Error
  false

exports.ISERROR = (value) ->
  ISERR(value)

exports.ISLOGICAL = (value) ->
  _.isBoolean(value)

exports.ISNAN = (value) ->
  not ISNUMBER(value)

exports.ISEVEN = (value) ->
  value = NUM(value)

  return false unless _.isNumber(value)
  return false if ISNAN(value)

  (Math.floor(Math.abs(value)) & 1) is 0

exports.ISLANDSCAPE = (media) ->
  return not ISPORTRAIT(media)

exports.ISMOBILE = ->
  CONTAINS(['iOS', 'Android'], PLATFORM())

exports.ISNEW = ->
  CONFIG().featureIsNew is true

exports.ISNONTEXT = (value) ->
  not _.isString(value)

exports.ISNUMBER = (value) ->
  _.isFinite(NUM(value))

exports.ISODD = (value) ->
  value = NUM(value)

  return false unless _.isNumber(value)
  return false if ISNAN(value)

  (Math.floor(Math.abs(value)) & 1) is 1

exports.ISPORTRAIT = (media) ->
  return NO_VALUE unless media?

  width = media.width
  height = media.height

  # photos
  if media.orientation is 6 or media.orientation is 8
    width = media.height
    height = media.width

  # videos
  if media.orientation is 90 or media.orientation is 270
    width = media.height
    height = media.width

  return width <= height

exports.ISROLE = ->
  CONTAINS(ARRAY(toArray(arguments)), ROLE())

exports.ISSELECTED = (value, choice) ->
  return false if ISBLANK(value)
  return false unless choice?

  if _.isArray(choice)
    return (choice.filter (item) -> not ISSELECTED(value, item)).length is 0

  if value and value.choice_values
    return true if _.contains(value.choice_values, choice)

  if value and value.other_values
    return true if _.contains(value.other_values, choice)

  false

exports.ISTEXT = (value) ->
  _.isString(value)

exports.ISUPDATE = ->
  not ISNEW()

exports.LABEL = (dataName) ->
  field = FIELD(dataName)

  return unless field?

  field.label

exports.LANGUAGE = ->
  Config.language or Defaults.language

exports.LAST = (array, count) ->
  _.last(array, count)

exports.LATITUDE = ->
  NUM(CONFIG().featureGeometry?.coordinates[1])

exports.LCM = ->
  numbers = ARRAY(toArray(arguments)).map (num) -> INT(num)

  count = numbers.length

  a = Math.abs(numbers[0])

  for i in [1..count - 1] by 1
    b = Math.abs(numbers[i])
    c = a

    return NaN if ISNAN(b)

    while a and b
      if a > b
        a %= b
      else
        b %= a

    a = Math.abs(c * numbers[i]) / (a + b)

  a

exports.LEFT = (value, numberOfCharacters = 1) ->
  numberOfCharacters ?= 1
  numberOfCharacters = FLOOR(numberOfCharacters)

  return NO_VALUE unless value?
  return NO_VALUE if _.isObject(value)
  return NO_VALUE if numberOfCharacters < 0
  return NO_VALUE if ISNAN(numberOfCharacters)

  value = value.toString()

  value.substring(0, numberOfCharacters)

exports.LEN = (value) ->
  return 0 unless value?
  return 0 if _.isNaN(value)

  result =
    switch true
      when _.isArray(value)
        value.length
      when _.isDate(value)
        value.toString().length
      when _.isString(value)
        value.length
      when _.isRegExp(value)
        value.toString().length
      when _.isObject(value)
        Object.keys(value).length
      else
        value.toString().length

  result ? 0

exports.LN = MATH_FUNC(Math.log)

exports.LOCALE = ->
  Config.locale or Defaults.locale

exports.LOG = (value, base) ->
  value = NUM(value)
  base = NUM(base ? 10)

  return NaN unless base?
  return NaN if isNaN(base)

  Math.log(value) / Math.log(base)

exports.LOG10 = (value) ->
  LOG(value, 10)

exports.LONGITUDE = ->
  NUM(CONFIG().featureGeometry?.coordinates[0])

exports.LOWER = (value) ->
  return NO_VALUE unless value?
  return NO_VALUE if _.isArray(value)
  return NO_VALUE if _.isObject(value)

  value.toString().toLowerCase()

exports.LPAD = (value, count, padding=' ') ->
  count  = FLOOR(count)
  value ?= ''
  value  = value.toString()

  return NO_VALUE unless _.isNumber(count)
  return NO_VALUE unless _.isString(padding)

  RIGHT(Array(count).join(padding) + value, count)

exports.MAX = ->
  numbers = ARRAY(toArray(arguments))
  numbers = _.map(numbers, NUM)

  return NO_VALUE if numbers.length is 0

  hasNaN = _.some(numbers, isNaN)

  return NO_VALUE if hasNaN

  Math.max.apply(Math, numbers)

exports.MAXA = exports.MAX

exports.MEDIAN = ->
  numbers = ARRAY(toArray(arguments))
  numbers = _.map(numbers, NUM)

  return NO_VALUE unless _.isArray(numbers)
  return NO_VALUE if numbers.length is 0

  hasNaN = _.some(numbers, isNaN)

  return NO_VALUE if hasNaN

  numbers.sort (a, b) -> a - b

  half = Math.floor(numbers.length / 2)

  if numbers.length % 2
    numbers[half]
  else
    (numbers[half - 1] + numbers[half]) / 2.0

exports.MESSAGEBOX = (options, callback) ->
  ERROR('options must be provided') unless options?
  ERROR('options.buttons must be an array') if options.buttons and not _.isArray(options.buttons)
  ERROR('options.validate must be a function') if options.validate and not _.isFunction(options.validate)
  ERROR('callback must be a function') if callback and not _.isFunction(callback)

  if options.buttons
    options.buttons = COMPACT(options.buttons).map (item) -> item.toString()

  options.buttons ?= ['Okay']

  if options.input?
    options.input = !!options.input

  callback ?= () ->

  payload =
    title: if options.title? then options.title.toString() else null
    message: if options.message? then options.message.toString() else null
    buttons: if options.buttons? then options.buttons else null
    input: if options.input? then options.input else null
    placeholder: if options.placeholder? then options.placeholder.toString() else null
    default: if options.default? then options.default.toString() else null

  validationWrapper = (result) =>
    if options.validate?
      errorMessage = options.validate(result)

      if _.isString(errorMessage)
        newOptions = Object.assign({}, options, {default: result.input})

        MESSAGEBOX({title: errorMessage}, (errorResult) =>
          MESSAGEBOX(newOptions, callback)
        )

        return

    callback(result)

  HostFunctions.messageBox(JSON.stringify(payload), validationWrapper)

exports.MID = (value, startPosition, numberOfCharacters) ->
  startPosition = FLOOR(startPosition)
  numberOfCharacters = FLOOR(numberOfCharacters)

  return NO_VALUE unless value?
  return NO_VALUE if _.isObject(value)
  return NO_VALUE if startPosition < 1
  return NO_VALUE if ISNAN(startPosition)
  return NO_VALUE if numberOfCharacters < 0
  return NO_VALUE if ISNAN(numberOfCharacters)

  value = value.toString()
  value.substr(startPosition - 1, numberOfCharacters)

exports.MIN = ->
  numbers = ARRAY(toArray(arguments))
  numbers = _.map(numbers, NUM)

  return NO_VALUE if numbers.length is 0

  hasNaN = _.some(numbers, isNaN)

  return NO_VALUE if hasNaN

  Math.min.apply(Math, numbers)

exports.MINA = exports.MIN

exports.MOD = (number, divisor) ->
  number = NUM(number)
  divisor = NUM(divisor)

  return NaN if isNaN(number)
  return NaN if isNaN(divisor)
  return NaN if divisor is 0

  modulus = Math.abs(number % divisor)

  if divisor > 0 then modulus else -modulus

exports.MONTH = (date) ->
  date = DATEVALUE(date)

  return NO_VALUE unless date?

  date.getMonth() + 1

exports.N = (value) ->
  return value if _.isNumber(value)
  return 1 if value is true
  return 0 if value is false
  0

exports.NOT = (value) ->
  not (value ? false)

exports.NUM = (value) ->
  return NaN if isNaN(value)
  parseFloat(value)

exports.NUMS = ->
  toArray(arguments).map(NUM)

exports.ODD = (value) ->
  value = NUM(value)

  return NaN unless _.isNumber(value)

  temp = Math.ceil(Math.abs(value))
  temp = if temp & 1 then temp else temp + 1

  if value >= 0 then temp else -temp

exports.OFF = ->
  args = arguments

  if arguments.length is 3
    [name, param, callback] = arguments
  else if arguments.length is 2 and _.isString(arguments[1])
    [name, param] = arguments
  else if arguments.length is 2 and _.isFunction(arguments[1])
    [name, callback] = arguments

  param ?= null

  ERROR('name must be a string') unless _.isString(name)
  ERROR('param must be a string') unless _.isString(param)
  ERROR('callback must be a function') if callback? and not _.isFunction(callback)

  $$runtime.removeHook(name, param, callback)

isMagicDataName = (name) ->
  return _.include(['@status', '@project', '@geometry', '@assignment'], name)

validateEventParams = (event, param) ->
  invariant = (v) ->
    if not v?
      ERROR(format('Invalid usage of ON(): "%s" is not a valid field for the "%s" event', param, event))

  switch event
    when 'change'
      return if isMagicDataName(param)

      invariant(FIELD(param))

    when 'click'
      field = FIELD(param)

      invariant(field?.type is 'HyperlinkField')

    when 'load-repeatable', 'new-repeatable', 'edit-repeatable', 'save-repeatable', 'validate-repeatable'
      field = FIELD(param)

      invariant(field?.type is 'Repeatable')

    when 'change-geometry'
      if param?
        field = FIELD(param)

        invariant(field?.type is 'Repeatable')

    when 'add-photo', 'remove-photo'
      field = FIELD(param)

      invariant(field?.type is 'PhotoField')

    when 'add-video', 'remove-video'
      field = FIELD(param)

      invariant(field?.type is 'VideoField')

    when 'add-audio', 'remove-audio'
      field = FIELD(param)

      invariant(field?.type is 'AudioField')

exports.ON = ->
  args = arguments

  if arguments.length is 3
    [name, param, callback] = arguments
  if arguments.length is 2
    [name, callback] = arguments

  param ?= null

  ERROR('name must be a string') unless _.isString(name)
  ERROR('param must be a string') if param? and not _.isString(param)
  ERROR('callback must be a function') unless _.isFunction(callback)

  validateEventParams(name, param)

  $$runtime.addHook(name, param, callback)

exports.ONCE = (value) ->
  $$runtime.$$currentValue ? value

exports.OPENURL = (value) ->
  return NO_VALUE unless _.isString(value)

  $$runtime.results.push(type: 'open', value: JSON.stringify(value))

exports.OR = ->
  _.find(toArray(arguments), (item) -> item) isnt undefined

exports.OTHER = (value) ->
  return NO_VALUE unless HASOTHER(value)
  return NO_VALUE if ISBLANK(value.other_values)
  return value.other_values[0]

exports.PI = ->
  Math.PI

exports.PLATFORM = ->
  Config.platform ? ''

exports.PLATFORMINFO = (separator=', ') ->
  _.compact([ PLATFORM(), PLATFORMVERSION() ]).join(separator)

exports.PLATFORMVERSION = ->
  Config.platformVersion ? ''

exports.PLUCK = (object, property) ->
  _.pluck(object, property)

exports.POWER = (number, power) ->
  number = NUM(number)
  power = NUM(power)

  return NaN if isNaN(number)
  return NaN if isNaN(power)

  Math.pow(number, power)

exports.PRECISION = (number) ->
  number = NUM(number)
  return NaN if ISNAN(number)

  parts = (number + '').split('.')

  return 0 if parts.length < 2

  parts[1].length

exports.PRODUCT = ->
  numbers = toArray(arguments).map(NUM)

  return NaN if numbers.length is 0

  hasNaN = _.some(numbers, isNaN)

  return NaN if hasNaN

  _.inject(numbers, ((memo, number) -> memo *= number), 1)

exports.PROGRESS = ->
  title = null
  message = arguments[0]

  if arguments.length > 1
    title = arguments[0]
    message = arguments[1]

  result =
    type: 'progress'
    title: if title? then title.toString() else null
    message: if message? then message.toString() else null

  $$runtime.results.push(result)

exports.PROJECTID = ->
  CONFIG().recordProject ? NO_VALUE

exports.PROJECTNAME = ->
  CONFIG().recordProjectName ? NO_VALUE

exports.PROMPT = ->
  title = null
  message = arguments[0]
  callback = arguments[1]

  if arguments.length > 2
    title = arguments[0]
    message = arguments[1]
    callback = arguments[2]

  buttons = ['Cancel', 'Okay']

  MESSAGEBOX(title: title, message: message, buttons: buttons, input: true, callback)

exports.PROPER = (value) ->
  return NO_VALUE unless value?
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

exports.RECORDID = ->
  CONFIG().recordID ? NO_VALUE

exports.REPEATABLEID = ->
  CONFIG().featureID ? NO_VALUE

exports.REPEATABLENUMBER = ->
  return NO_VALUE unless CONFIG().featureIndex?
  CONFIG().featureIndex + 1

exports.REPEATABLEVALUES = (repeatableValue, dataName) ->
  if _.isArray(dataName)
    if dataName.length is 1
      dataName = dataName[0]
    else
      repeatableDataName = dataName[0]
      restOfDataNames = dataName.slice(1)

      childValues = REPEATABLEVALUES(repeatableValue, repeatableDataName).map (item) =>
        REPEATABLEVALUES(item, restOfDataNames)

      return _.flatten(childValues)

  dataElement = $$runtime.elementsByDataName[dataName]

  return NO_VALUE unless dataElement

  repeatableElement = Utils.nearestRepeatable(dataElement)

  return NO_VALUE unless repeatableElement

  Utils.repeatableValues(repeatableElement, repeatableValue, dataName)

exports.REPEATABLESUM = (repeatableValue, dataName) ->
  SUM.apply(null, _.filter(REPEATABLEVALUES(repeatableValue, dataName)), ISNUMBER)

exports.REPLACE = (value, startPosition, numberOfCharacters, replacement) ->
  startPosition = FLOOR(startPosition)
  numberOfCharacters = FLOOR(numberOfCharacters)

  return NO_VALUE unless value?
  return NO_VALUE if arguments.length < 4
  return NO_VALUE if _.isObject(value)
  return NO_VALUE if startPosition < 1
  return NO_VALUE if ISNAN(startPosition)
  return NO_VALUE if numberOfCharacters < 0
  return NO_VALUE if ISNAN(numberOfCharacters)

  value = value.toString()

  prefix = value.substr(0, startPosition - 1)
  suffix = value.substr(startPosition - 1 + numberOfCharacters)

  prefix + replacement + suffix

exports.RESETCONFIG = ->
  Config = _.extend({}, Defaults)

exports.RIGHT = (value, numberOfCharacters) ->
  numberOfCharacters ?= 1
  numberOfCharacters = FLOOR(numberOfCharacters)

  return NO_VALUE unless value?
  return NO_VALUE if _.isObject(value)
  return NO_VALUE if numberOfCharacters < 0
  return NO_VALUE if ISNAN(numberOfCharacters)

  value = value.toString()
  value.substring(value.length - numberOfCharacters)

exports.ROLE = ->
  CONFIG().userRoleName ? NO_VALUE

exports.ROUND = (number, digits = 0) ->
  number = NUM(number)
  digits = NUM(digits)

  Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits)

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

exports.RPAD = (value, count, padding=' ') ->
  count  = FLOOR(count)
  value ?= ''
  value  = value.toString()

  return NO_VALUE unless _.isNumber(count)
  return NO_VALUE unless _.isString(padding)

  LEFT(value + Array(count).join(padding), count)

exports.SEARCH = (needle, haystack, startPosition) ->
  startPosition ?= 1
  startPosition = NUM(startPosition)
  startPosition = 1 if ISNAN(startPosition)

  haystack = haystack.toString() if _.isNumber(haystack)
  needle = needle.toString() if _.isNumber(needle)

  return NO_VALUE unless _.isString(needle)
  return NO_VALUE unless _.isString(haystack)

  return 1 if needle is ''

  index = haystack.toLowerCase().indexOf(needle.toLowerCase(), startPosition - 1)

  return NO_VALUE if index < 0

  index + 1

exports.SETASSIGNMENT = (user) ->
  ERROR('user must be a string') if user? and not _.isString(user)
  SETVALUE('@assignment', user)

exports.SETCHOICEFILTER = (dataName, value) ->
  filterValue = if value?
    _.chain([value]).flatten().compact().map(String).value()
  else
    null

  SETFORMATTRIBUTES(dataName, choice_filter: filterValue)

exports.SETCHOICES = (dataName, value) ->
  # TODO(zhm) throw some kind of error here if the param is wrong
  return NO_VALUE unless value is null or _.isArray(value)

  choices = null

  if value
    choices = []

    for choice in value
      switch true
        when _.isString(choice)
          choices.push(label: choice, value: choice)

        when _.isNumber(choice)
          choices.push(label: choice.toString(), value: choice.toString())

        when _.isArray(choice)
          if choice.length > 1
            choices.push(label: choice[0], value: choice[1])
          else if choice.length is 1
            choices.push(label: choice[0], value: choice[0])

        when _.isObject(choice)
          choices.push(label: choice.label, value: choice.value or choice.label)

     for choice in choices
       choice.label = choice.label.toString() if choice.label?
       choice.value = choice.value.toString() if choice.value?

  SETFORMATTRIBUTES(dataName, choices: choices)

CONFIGURATION_ATTRIBUTES = [
  'auto_populate_location'
  'auto_populate_minimum_accuracy'
  'photo_quality'
  'video_quality'
  'allow_photo_gallery'
  'allow_video_gallery'
  'allow_draft_records'
  'allow_manual_location'
  'warn_on_location_accuracy'
  'title'
]

exports.SETCONFIGURATION = (settings) ->
  for attributeName, value of settings
    continue unless _.contains(CONFIGURATION_ATTRIBUTES, attributeName)

    value = if value? then JSON.stringify(value) else null

    result =
      type: 'configure'
      attribute: attributeName.toString()
      value: value

    $$runtime.results.push(result)

isValidGeometry = (geometry) ->
  return true if not geometry?
  return false unless geometry.type is 'Point'
  return false unless _.isArray(geometry.coordinates) and geometry.coordinates.length is 2
  return false if _.some geometry.coordinates, (coord) -> not _.isNumber(coord) || _.isNaN(coord)
  true

exports.SETGEOMETRY = (geometry) ->
  ERROR('Geometry must be a valid GeoJSON value.') unless isValidGeometry(geometry)
  SETVALUE('@geometry', geometry)

exports.SETLOCATION = (latitude, longitude) ->
  if not latitude? or not longitude?
    latitude = null
    longitude = null

  geometry =
    if latitude? and longitude?
      { type: 'Point', coordinates: [ +longitude, +latitude ] }
    else
      null

  if not isValidGeometry(geometry)
    ERROR(format('Invalid latitude/longitude. SETLOCATION(%s, %s).', latitude, longitude))

  SETVALUE('@geometry', geometry)

exports.SETSTATUS = (status) ->
  ERROR('status must be a string') if status? and not _.isString(status)
  SETVALUE('@status', status)

exports.SETSTATUSHIDDEN = (value) ->
  SETHIDDEN('@status', value)

exports.SETSTATUSREADONLY = (value) ->
  SETREADONLY('@status', value)

exports.SETSTATUSFILTER = (value) ->
  SETCHOICEFILTER('@status', value)

exports.SETPROJECT = (project) ->
  ERROR('project must be a string') if project? and not _.isString(project)
  SETVALUE('@project', project)

exports.SETPROJECTHIDDEN = (value) ->
  SETHIDDEN('@project', value)

exports.SETPROJECTREADONLY = (value) ->
  SETREADONLY('@project', value)

exports.SETDESCRIPTION = (dataName, value) ->
  SETFORMATTRIBUTES(dataName, description: if value? then value.toString() else null)

exports.SETREADONLY = (dataName, value) ->
  SETFORMATTRIBUTES(dataName, disabled: if value? then !!value else null)

exports.SETDISABLED = exports.SETREADONLY

exports.SETHIDDEN = (dataName, value) ->
  SETFORMATTRIBUTES(dataName, hidden: if value? then !!value else null)

exports.SETLABEL = (dataName, value) ->
  SETFORMATTRIBUTES(dataName, label: if value? then value.toString() else null)

exports.SETMAXLENGTH = (dataName, value) ->
  SETFORMATTRIBUTES(dataName, max_length: if value? then +value else null)

exports.SETMINLENGTH = (dataName, value) ->
  SETFORMATTRIBUTES(dataName, min_length: if value? then +value else null)

exports.SETREQUIRED = (dataName, value) ->
  SETFORMATTRIBUTES(dataName, required: if value? then !!value else null)

exports.SETRESULT = (result) ->
  $$runtime.$$result = result

exports.SETTIMEOUT = (callback, timeout) ->
  HostFunctions.setTimeout(callback, timeout)

exports.CLEARTIMEOUT = (id) ->
  HostFunctions.clearTimeout(id)

exports.SETINTERVAL = (callback, interval) ->
  HostFunctions.setInterval(callback, interval)

exports.CLEARINTERVAL = (id) ->
  HostFunctions.clearInterval(id)

exports.SETVALUE = (dataName, value) ->
  element = FIELD(dataName)

  if element?
    # don't let the user accidentally blow out data in unsupported fields
    repeatableElement = $$runtime.elementsByKey[$$runtime.repeatable]

    containerElements =
      if $$runtime.repeatable
        $$runtime.elementsByKey[$$runtime.repeatable]?.elements
      else
        $$runtime.form.elements

    supported = Utils.isSetValueSupported(containerElements, element, element.type)

    if not supported
      ERROR(format("Setting the value of '%s' is not supported.", dataName))

    value =
      if value?
        Utils.makeValue(element, value)
      else
        null

  # TODO(zhm) guard well-known supported values in the else case
  # @project, @status, @geometry, etc
  # Force the types to be correct so we don't pass back an array for
  # the project or a number for the status, etc. The native apps
  # should never be handed back data with the wrong JS types.

  result =
    type: 'set-value'
    key: element?.key or dataName
    value: JSON.stringify(value)

  $$runtime.results.push(result)

FORM_ATTRIBUTES = [
  'label'
  'description'
  'required'
  'hidden'
  'disabled'
  'min_length'
  'max_length'
  'choices'
  'choice_filter'
  'media_gallery_enabled'
  'media_capture_enabled'
  'auto_sync_enabled'
  'auto_location_enabled'
  'auto_location_minimum_accuracy'
  'manual_location_enabled'
  'edit_locations_enabled'
  'edit_durations_enabled'
  'drafts_enabled'
  'photo_quality'
  'video_quality'
  'audio_quality'
]

exports.SETFORMATTRIBUTES = (dataName, attributes) ->
  if arguments.length is 1
    attributes = dataName
    dataName = '@form'

  element = FIELD(dataName)

  return NO_VALUE unless (element or dataName is '@status' or dataName is '@project' or dataName is '@form')

  for attributeName, value of attributes
    continue unless _.contains(FORM_ATTRIBUTES, attributeName)

    value = if value? then JSON.stringify(value) else null

    result =
      type: 'update-element'
      key: element?.key or dataName
      attribute: attributeName.toString()
      value: value

    $$runtime.results.push(result)

exports.SHOWERRORS = (showErrors=true) ->
  $$runtime.showErrors = showErrors

exports.SHUFFLE = (values) ->
  _.shuffle(toArray(values))

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

exports.SINH = (number) ->
  number = NUM(number)

  exp = Math.exp(number)

  (exp - 1 / exp) / 2

exports.SORT = ->
  args = ARRAY(toArray(arguments))

  return NO_VALUE if args.length is 0

  callback = null
  values = args

  if _.isFunction(_.last(args))
    callback = _.last(args)
    values = _.first(args, args.length - 1)

  _.sortBy(values, callback)

exports.SQRT = MATH_FUNC(Math.sqrt)

exports.SQRTPI = (number) ->
  SQRT(NUM(number) * Math.PI)

exports.STATUS = ->
  CONFIG().recordStatus ? NO_VALUE

exports.STATUSLABEL = ->
  status = CONFIG().recordStatus ? NO_VALUE
  if status
    $$runtime.statusesByValue[status] ? NO_VALUE
  else
    NO_VALUE

hostStorage = {}
hostStorageScope = 'default'

Object.defineProperty hostStorage, 'length',
  get: ->
    host.storageLength(hostStorageScope)
  configurable: false
  enumerable: false

hostStorage.key = (index) ->
  return null unless _.isNumber(+index)
  host.storageKey(hostStorageScope, +index)

hostStorage.getItem = (key) ->
  return null unless key?
  host.storageGetItem(hostStorageScope, key.toString())

hostStorage.setItem = (key, value) ->
  return null unless key?
  host.storageSetItem(hostStorageScope, key.toString(), if value? then value.toString() else null)

hostStorage.removeItem = (key) ->
  return null unless key?
  host.storageRemoveItem(hostStorageScope, key.toString())

hostStorage.clear = ->
  host.storageClear(hostStorageScope)

exports.STORAGE = (scope) ->
  localStorage ? hostStorage

exports.STRING = () ->
  values = ARRAY(toArray(arguments))

  strings = values.map (value) ->
    if _.isUndefined(value) or value is null
      null
    else if _.isString(value)
      value
    else if _.isNumber(value)
      value.toLocaleString()
    else if _.isNaN(value)
      null
    else if _.isFunction(value)
      null
    else if _.isArray(value)
      STRING(value)
    else if _.isDate(value)
      value.toLocaleString()
    else if value and value.choice_values
      STRING(CHOICEVALUES(value))
    else if value.photo_id
      value.photo_id
    else if value.video_id
      value.video_id
    else if value.audio_id
      value.audio_id
    else if value.signature_id
      value.signature_id
    else if value.record_id
      value.record_id
    else if value.id
      value.id
    else
      value.toString()

  COMPACT(strings).join(', ')

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
  numbers = ARRAY(toArray(arguments)).map(NUM)

  return NaN if numbers.length is 0

  hasNaN = _.some(numbers, isNaN)

  return NaN if hasNaN

  _.inject(numbers, ((memo, number) -> memo += number), 0)

exports.SUMSQ = ->
  numbers = ARRAY(toArray(arguments)).map(NUM)

  return NaN if numbers.length is 0

  hasNaN = _.some(numbers, isNaN)

  return NaN if hasNaN

  _.inject(numbers, ((memo, number) -> memo += (number * number)), 0)

exports.T = (value) ->
  return '' unless value?
  return value.toString()

exports.TIMEADD = (startTime, amount, format='hours') ->
  return NO_VALUE unless _.isString(startTime)

  return NO_VALUE unless _.contains(['hours', 'minutes'], format)

  return NO_VALUE if startTime.length isnt 5
  return NO_VALUE if startTime[2] isnt ':'

  time1 = startTime.split(':')

  beginHour = NUM(time1[0])
  beginMinute = NUM(time1[1])

  amount = NUM(amount)

  return NO_VALUE if beginHour > 23 or beginHour < 0
  return NO_VALUE if beginMinute > 59 or beginMinute < 0

  return NO_VALUE unless _.isNumber(amount)

  minutesToAdd =
    if format is 'hours'
      amount * 60
    else
      amount

  date = new Date(0)
  date.setHours(beginHour)
  date.setMinutes(beginMinute)

  time = date.getTime()
  time += (minutesToAdd * 60.0 * 1000.0)

  date = new Date(time)

  FORMAT('%s:%s',
    LPAD(date.getHours(), 2, '0'),
    LPAD(date.getMinutes(), 2, '0'))

exports.TIMEDIFF = (startTime, endTime, format='hours') ->
  return NO_VALUE unless _.isString(startTime) and _.isString(endTime)

  return NO_VALUE unless _.contains(['hours', 'minutes'], format)

  return NO_VALUE if startTime.length isnt 5
  return NO_VALUE if startTime[2] isnt ':'

  return NO_VALUE if endTime.length isnt 5
  return NO_VALUE if endTime[2] isnt ':'

  time1 = startTime.split(':')
  time2 = endTime.split(':')

  beginHour = NUM(time1[0])
  beginMinute = NUM(time1[1])

  endHour = NUM(time2[0])
  endMinute = NUM(time2[1])

  return NO_VALUE if beginHour > 23 or beginHour < 0
  return NO_VALUE if endHour > 23 or endHour < 0

  return NO_VALUE if beginMinute > 59 or beginMinute < 0
  return NO_VALUE if endMinute > 59 or endMinute < 0

  beginMinutes = (beginHour * 60) + beginMinute
  endMinutes = (endHour * 60) + endMinute

  totalMinutes = (endMinutes - beginMinutes)

  totalMinutes =
    if totalMinutes is 0
      1440
    else if totalMinutes > 0
      totalMinutes
    else
      1440 + totalMinutes

  if format is 'hours'
    totalMinutes / 60
  else
    totalMinutes

exports.TIMESTAMP = (date) ->
  date ?= new Date

  FORMAT('%s-%s-%s %s:%s:%s',
    date.getFullYear(),
    LPAD(date.getMonth() + 1, 2, '0'),
    LPAD(date.getDate(), 2, '0'),
    LPAD(date.getHours(), 2, '0'),
    LPAD(date.getMinutes(), 2, '0'),
    LPAD(date.getSeconds(), 2, '0'))

exports.TIMEZONE = ->
  Config.timeZone or Defaults.timeZone

exports.TRIM = (value) ->
  _.trim(value)

exports.TRUE = (value) ->
  true

exports.TYPEOF = (value) ->
  switch true
    when _.isUndefined(value)
      'undefined'
    when _.isNull(value)
      'null'
    when _.isNaN(value)
      'nan'
    when _.isNumber(value)
      'number'
    when _.isString(value)
      'string'
    when _.isBoolean(value)
      'boolean'
    when _.isDate(value)
      'date'
    when _.isArray(value)
      'array'
    when _.isRegExp(value)
      'regexp'
    when _.isFunction(value)
      'function'
    when _.isObject(value)
      'object'
    else
      'unknown'

exports.UNIQUE = ->
  args = ARRAY(toArray(arguments))

  return NO_VALUE if args.length is 0

  callback = null
  values = args

  if _.isFunction(_.last(args))
    callback = _.last(args)
    values = _.first(args, args.length - 1)

  _.uniq(values, false, callback)

exports.UPPER = (value) ->
  return NO_VALUE unless value?
  return NO_VALUE if _.isArray(value)
  return NO_VALUE if _.isObject(value)

  value.toString().toUpperCase()

exports.USERFULLNAME = ->
  CONFIG().userFullName ? NO_VALUE

exports.VALUE = (dataName) ->
  return NO_VALUE unless dataName?

  $$runtime.variables['$' + dataName]

exports.VERSIONINFO = (separator=', ') ->
  _.compact([ DEVICEINFO(' '), PLATFORMINFO(' '), APPLICATIONINFO(' ') ]).join(separator)

exports.YEAR = (date) ->
  date = DATEVALUE(date)

  return NO_VALUE unless date?

  date.getFullYear()

hostFunctionExists = (name) ->
  typeof $$runtime["$$#{name}"] is 'function'

hostFunctionCall = (name, args) ->
  $$runtime["$$#{name}"].apply($$runtime, args)

hostAsyncFunctionCall = (name, args, callback) ->
  $$runtime.invokeAsync $$runtime["$$#{name}"], args, callback

HostFunctions = exports.HostFunctions = host = {}

host.formatNumber = (number, language, options) ->
  if hostFunctionExists('formatNumber')
    hostFunctionCall('formatNumber', arguments)
  else if typeof(Intl) isnt 'undefined'
    nf = new Intl.NumberFormat(language, options)
    nf.format(number)
  else
    '' + number

host.httpRequest = (options, callback) ->
  args = [options]

  if hostFunctionExists('httpRequest')
    hostAsyncFunctionCall('httpRequest', args, callback)
  else
    callback(new Error('Not Supported'), null, null)

host.messageBox = (options, callback) ->
  args = [options]

  if hostFunctionExists('messageBox')
    hostAsyncFunctionCall('messageBox', args, callback)
  else
    callback(new Error('Not Supported'), null, null)

host.timeouts = {}
host.intervals = {}

host.nextTimeoutID = 0
host.nextIntervalID = 0

host.clearTimeout = (id) ->
  delete host.timeouts[id]

host.setTimeout = (callback, timeout) ->
  args = [timeout]

  if hostFunctionExists('setTimeout')
    id = ++host.nextTimeoutID

    wrapper = host.timeouts[id] = ->
      if host.timeouts[id]?
        delete host.timeouts[id]
        callback()

    hostAsyncFunctionCall('setTimeout', args, host.timeouts[id])

    return id

host.clearInterval = (id) ->
  if host.intervals[id]?
    host.clearTimeout(host.intervals[id])
    delete host.intervals[id]

host.setInterval = (callback, interval) ->
  if hostFunctionExists('setTimeout')
    id = ++host.nextIntervalID

    wrapper = ->
      if host.intervals[id]?
        host.intervals[id] = host.setTimeout(wrapper, interval)
        callback()

    host.intervals[id] = host.setTimeout(wrapper, interval)

    return id

# interface Storage {
#   readonly attribute unsigned long length;
#   DOMString? key(unsigned long index);
#   getter DOMString? getItem(DOMString key);
#   setter void setItem(DOMString key, DOMString value);
#   deleter void removeItem(DOMString key);
#   void clear();
# };

host.storageLength = (storage) ->
  return storage.length if 'length' in storage
  return hostFunctionCall('storageLength', arguments) if hostFunctionExists('storageLength')

host.storageKey = (storage, index) ->
  return storage.key(index) if 'key' in storage
  return hostFunctionCall('storageKey', arguments) if hostFunctionExists('storageKey')

host.storageGetItem = (storage, key) ->
  return storage.getItem(key) if 'getItem' in storage
  return hostFunctionCall('storageGetItem', arguments) if hostFunctionExists('storageGetItem')

host.storageSetItem = (storage, key, value) ->
  return storage.setItem(key, value) if 'setItem' in storage
  return hostFunctionCall('storageSetItem', arguments) if hostFunctionExists('storageSetItem')

host.storageRemoveItem = (storage, key) ->
  return storage.removeItem(key) if 'removeItem' in storage
  return hostFunctionCall('storageRemoveItem', arguments) if hostFunctionExists('storageRemoveItem')

host.storageClear = (storage) ->
  return storage.clear() if 'clear' in storage
  return hostFunctionCall('storageClear', arguments) if hostFunctionExists('storageClear')

module.exports = exports
