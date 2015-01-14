_ = require('underscore')

repeatableValueElementsCache = {}
repeatableValueElementsByKeyCache = {}
repeatableValueElementsByDataNameCache = {}

class Utils
  @toArray = (arrayLike) ->
    Array::slice.call arrayLike, 0

  @flattenElements = (elements, recurseRepeatables=true) ->
    _.tap [], (flat) ->
      _.each elements, (element) ->
        flat.push(element)

        recurse = true
        recurse = false if not recurseRepeatables and element.type is 'Repeatable'

        if recurse and element.elements
          children = Utils.flattenElements(element.elements)

          Array.prototype.push.apply(flat, children)

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

    isNumeric = element.numeric or element.format is 'number'

    values = _.map items, (item) ->
      if element.numeric or element.format is 'number'
        Number(item.form_values[element.key])
      else
        item.form_values[element.key]

    values

module.exports = Utils
