// Entry point for utils - points to the TypeScript utilities
// This replaces the old utils.coffee for requiring in tests

// Export the utilities from the TypeScript implementation
module.exports = {
  flattenElements: require("./dist/ts/util/flatten-elements.js").default,
  nearestRepeatable: require("./dist/ts/util/nearest-repeatable.js").default,
  valueForElement: require("./dist/ts/util/value-for-element.js").default,
  isNumericElement: require("./dist/ts/util/is-numeric-element.js").default,
  isDateElement: require("./dist/ts/util/is-date-element.js").default,
  dateValue: require("./dist/ts/util/date-value.js").default,
  numberValue: require("./dist/ts/util/number-value.js").default,
  repeatableValueElements: require("./dist/ts/util/repeatable-value-elements.js").default,
  converters: require("./dist/ts/util/converters.js").converters,
  toArray: (arrayLike) => Array.prototype.slice.call(arrayLike, 0)
};