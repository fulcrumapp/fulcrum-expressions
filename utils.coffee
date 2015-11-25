_ = require('underscore')

repeatableValueElementsCache = {}
repeatableValueElementsByKeyCache = {}
repeatableValueElementsByDataNameCache = {}

class Utils
  @DATE_REGEX: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/

  @toArray = (arrayLike) ->
    Array::slice.call arrayLike, 0

  @flattenElements = (elements, recurseRepeatables=true, assignParent=false, parent=undefined) ->
    _.tap [], (flat) ->
      _.each elements, (element) ->
        element.parent = parent if assignParent

        flat.push(element)

        recurse = true
        recurse = false if not recurseRepeatables and element.type is 'Repeatable'

        if recurse and element.elements
          children = Utils.flattenElements(element.elements, recurseRepeatables, assignParent, element)

          Array.prototype.push.apply(flat, children)

  @nearestRepeatable: (element) ->
    iterator = element

    while iterator
      return iterator if iterator.type is 'Repeatable'

      iterator = iterator.parent

    null

  @valueForElement: (element, value) ->
    if Utils.isNumericElement(element)
      Utils.numberValue(value)
    else if Utils.isDateElement(element)
      Utils.dateValue(value)
    else
      value

  @isNumericElement: (element) ->
    element.numeric or element.display?.style is 'number' or element.display?.style is 'currency'

  @isDateElement: (element) ->
    element.type is 'DateTimeField' or element.type is 'DateField'

  @dateValue: (value) ->
    if value and value.length <= 10
      new Date("#{value.replace(/-/g, '/')} 00:00:00")
    else
      value

  @numberValue: (value) ->
    value ||= undefined

    if value? then Number(value) else undefined

  @repeatableValueElements: (repeatable) ->
    key = repeatable.key

    if repeatableValueElementsCache[key]
      cached =
        all: repeatableValueElementsCache[key]
        byKey: repeatableValueElementsByKeyCache[key]
        byDataName: repeatableValueElementsByDataNameCache[key]

      return cached

    elements = Utils.flattenElements(repeatable.elements, false)

    repeatableValueElementsCache[key] = all = elements
    repeatableValueElementsByKeyCache[key] = byKey = {}
    repeatableValueElementsByDataNameCache[key] = byDataName = {}

    for element in elements
      byKey[element.key] = element
      byDataName[element.data_name] = element

    { all: all, byKey: byKey, byDataName: byDataName }

  @repeatableValues: (repeatable, items, dataName) ->
    return null unless _.isArray(items)

    {byDataName} = Utils.repeatableValueElements(repeatable)

    element = byDataName[dataName]

    return null unless element

    values = _.map items, (item) ->
      Utils.valueForElement(element, item.form_values[element.key])

    values

  @formatMachineDate: (date) ->
    return null unless date? and not isNaN(date.getTime())
    "#{RIGHT('000' + date.getFullYear(), 4)}-#{RIGHT('0' + (date.getMonth() + 1), 2)}-#{RIGHT('0' + date.getDate(), 2)}"

  @makeValue: (element, value) ->
    return null unless value?
    converter = Utils.converters[element.type]

    if converter?
      converter(value)
    else
      null

  @makeChoiceValue: (choices, others) ->
    { choice_values: choices ? [], other_values: others ? [] }

  @isSetValueSupported: (type) ->
    Utils.converters[type]?

  @converters:
    TextField: (value) ->
      return null unless value?
      value.toString()

    CalculatedField: (value) ->
      Utils.converters.TextField(value)

    HyperlinkField: (value) ->
      Utils.converters.TextField(value)

    YesNoField: (value) ->
      Utils.converters.TextField(value)

    BarcodeField: (value) ->
      Utils.converters.TextField(value)

    DateTimeField: (value) ->
      return null unless value?

      date = DATEVALUE(value)

      return null unless date?

      FORMAT('%s-%s-%s',
        date.getFullYear(),
        LPAD(date.getMonth() + 1, 2, '0'),
        LPAD(date.getDate(), 2, '0'))

    DateField: (value) ->
      Utils.converters.DateTimeField(value)

    TimeField: (value) ->
      return null unless _.isString(value)

      return null if value.length isnt 5
      return null if value[2] isnt ':'

      parts = value.split(':')

      hour = NUM(parts[0])
      minute = NUM(parts[1])

      return null if hour > 23 or hour < 0
      return null if minute > 59 or minute < 0

      FORMAT('%s:%s',
        LPAD(hour, 2, '0'),
        LPAD(minute, 2, '0'))

    ChoiceField: (value) ->
      choices = null

      switch true
        when _.isArray(value)
          choices = _.map(_.compact(value), (v) -> v.toString())

        when _.isString(value) and value.length isnt 0
          choices = [ value ]

        when _.isNumber(value)
          choices = [ value.toString() ]

        when _.isObject(value) and _.isArray(value.choice_values)
          choices = _.map(_.compact(value.choice_values), (v) -> v.toString())

      return null unless _.isArray(choices)

      Utils.makeChoiceValue(choices, [])

    ClassificationField: (value) ->
      Utils.converters.ChoiceField(value)

    AddressField: (value) ->
      return null unless _.isObject(value)

      address =
        sub_thoroughfare: value.sub_thoroughfare?.toString() ? null
        thoroughfare: value.thoroughfare?.toString() ? null
        suite: value.suite?.toString() ? null
        locality: value.locality?.toString() ? null
        sub_admin_area: value.sub_admin_area?.toString() ? null
        admin_area: value.admin_area?.toString() ? null
        postal_code: value.postal_code?.toString() ? null
        country: value.country?.toString() ? null

      address

module.exports = Utils
