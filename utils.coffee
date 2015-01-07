_ = require('underscore')

class Utils
  @toArray = (arrayLike) ->
    Array::slice.call arrayLike, 0

  @flattenElements = (elements) ->
    _.tap [], (flat) ->
      _.each elements, (element) ->
        flat.push(element)

        if element.elements
          children = Utils.flattenElements(element.elements)

          Array.prototype.push.apply(flat, children)

module.exports = Utils
