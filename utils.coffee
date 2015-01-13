_ = require('underscore')

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

module.exports = Utils
