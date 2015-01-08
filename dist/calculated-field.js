(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var MATH_FUNC, State, Utils, exports, toArray, _;

_ = require('underscore');

_.str = require('underscore.string');

_.mixin(_.str.exports());

Utils = require('./utils');

toArray = Utils.toArray;

State = {};

exports = {};

exports.CONFIGURE = function(state) {
  return State = state;
};

exports.NO_VALUE = null;

exports.NOT_IMPLEMENTED = function() {
  throw new Error('Not Implemented');
};

exports.MATH_FUNC = MATH_FUNC = function(mathFunction) {
  return function() {
    return mathFunction.apply(Math, toArray(arguments).map(NUM));
  };
};

exports.NUMS = function() {
  return toArray(arguments).map(NUM);
};

exports.NUM = function(value) {
  if (isNaN(value)) {
    return NaN;
  }
  return parseFloat(value);
};

exports.N = function(value) {
  if (_.isNumber(value)) {
    return value;
  }
  if (value === true) {
    return 1;
  }
  if (value === false) {
    return 0;
  }
  return 0;
};

exports.HASERROR = function() {
  var n;
  n = arguments.length;
  while (n--) {
    if (arguments[n] instanceof Error) {
      return true;
    }
  }
  return false;
};

exports.ISNAN = function(number) {
  return _.isNaN(NUM(number));
};

exports.PRECISION = function(number) {
  var parts;
  number = NUM(number);
  if (ISNAN(number)) {
    return NaN;
  }
  parts = (number + '').split('.');
  if (parts.length < 2) {
    return 0;
  }
  return parts[1].length;
};

exports.ABS = MATH_FUNC(Math.abs);

exports.ACOS = MATH_FUNC(Math.acos);

exports.ACOSH = MATH_FUNC(Math.acosh);

exports.AND = function() {
  return _.find(toArray(arguments), function(item) {
    return !item;
  }) === void 0;
};

exports.AVERAGE = function() {
  var args;
  args = toArray(arguments);
  if (args.length === 0) {
    return NaN;
  }
  return _.inject(args, (function(memo, arg) {
    return memo + +arg;
  }), 0) / args.length;
};

exports.ROUND = function(number, digits) {
  if (digits == null) {
    digits = 0;
  }
  number = NUM(number);
  digits = NUM(digits);
  return Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits);
};

exports.CEILING = function(number, significance) {
  var precision;
  if (significance == null) {
    significance = 1;
  }
  significance || (significance = 1);
  significance = ABS(significance);
  number = NUM(number);
  significance = NUM(significance);
  if (isNaN(number) || isNaN(significance)) {
    return NaN;
  }
  if (significance === 0) {
    return 0;
  }
  precision = PRECISION(significance);
  if (number >= 0) {
    return ROUND(Math.ceil(number / significance) * significance, precision);
  } else {
    return -ROUND(Math.floor(Math.abs(number) / significance) * significance, precision);
  }
};

exports.FLOOR = function(number, significance) {
  var precision;
  significance || (significance = 1);
  significance = ABS(significance);
  number = NUM(number);
  significance = NUM(significance);
  if (isNaN(number) || isNaN(significance)) {
    return NaN;
  }
  if (significance === 0) {
    return 0;
  }
  precision = PRECISION(significance);
  if (number >= 0) {
    return ROUND(Math.floor(number / significance) * significance, precision);
  } else {
    return -ROUND(Math.ceil(Math.abs(number) / significance) * significance, precision);
  }
};

exports.CHAR = function(number) {
  number = NUM(number);
  if (number instanceof Error) {
    return number;
  }
  return String.fromCharCode(number);
};

exports.CLEAN_REGEX = /[\x00\x08\x0B\x0C\x0E-\x1F]/g;

exports.CLEAN = function(text) {
  text = text || '';
  return text.replace(CLEAN_REGEX, '');
};

exports.CODE = function(string) {
  if (typeof string === 'number') {
    string = string.toString();
  }
  if (typeof string !== 'string') {
    return NaN;
  }
  return (string || '').charCodeAt(0);
};

exports.CONCATENATE = function() {
  var strings;
  strings = _.map(toArray(arguments), function(arg) {
    switch (typeof arg) {
      case 'string':
        return arg;
      case 'number':
        return arg + '';
      default:
        return '';
    }
  });
  return strings.join('');
};

exports.COS = MATH_FUNC(Math.cos);

exports.COSH = MATH_FUNC(Math.cosh);

exports.COMPACT = function(value) {
  if (!_.isArray(value)) {
    return void 0;
  }
  return _.filter(value, function(item) {
    return item !== void 0 && item !== null;
  });
};

exports.COUNT = function(value) {
  if (_.isArray(value)) {
    return COMPACT(value).length;
  }
  return NaN;
};

exports.COUNTA = function() {
  return COUNT(toArray(arguments));
};

exports.COUNTBLANK = function(value) {
  var results;
  if (!_.isArray(value)) {
    return NaN;
  }
  results = _.filter(value, function(item) {
    switch (true) {
      case item === void 0 || item === null:
        return true;
      case _.isArray(item):
        return item.length === 0;
      case typeof item === 'string':
        return _.isBlank(item);
      default:
        return false;
    }
  });
  return results.length;
};

exports.DATE = function() {
  return NOT_IMPLEMENTED();
};

exports.DATEVALUE = function() {
  return NOT_IMPLEMENTED();
};

exports.DAY = function() {
  return NOT_IMPLEMENTED();
};

exports.DAYS360 = function() {
  return NOT_IMPLEMENTED();
};

exports.DEGREES = function(value) {
  value = NUM(value);
  if (!_.isNumber(value)) {
    return NaN;
  }
  return 180.0 * value / Math.PI;
};

exports.DOLLAR = function(value, decimals) {
  if (decimals == null) {
    decimals = 2;
  }
  return NOT_IMPLEMENTED();
};

exports.EVEN = function(value) {
  value = NUM(value);
  if (!_.isNumber(value)) {
    return NaN;
  }
  return CEILING(value, -2, -1);
};

exports.EXACT = function(value1, value2) {
  return _.isEqual(value1, value2);
};

exports.EXP = MATH_FUNC(Math.exp);

exports.MEMOIZED_FACT = [];

exports.FACT = function(value) {
  var n;
  value = NUM(value);
  if (isNaN(value)) {
    return NaN;
  }
  if (value < 0) {
    return NaN;
  }
  n = Math.floor(value);
  if (n === 0 || n === 1) {
    return 1;
  } else if (MEMOIZED_FACT[n] > 0) {
    return MEMOIZED_FACT[n];
  } else {
    MEMOIZED_FACT[n] = FACT(n - 1) * n;
    return MEMOIZED_FACT[n];
  }
};

exports.MEMOIZED_FACTDOUBLE = [];

exports.FACTDOUBLE = function(value) {
  var n;
  value = NUM(value);
  if (isNaN(value)) {
    return NaN;
  }
  if (value < 0) {
    return NaN;
  }
  n = Math.floor(value);
  if (n <= 1) {
    return 1;
  } else if (MEMOIZED_FACTDOUBLE[n] > 0) {
    return MEMOIZED_FACTDOUBLE[n];
  } else {
    MEMOIZED_FACTDOUBLE[n] = FACTDOUBLE(n - 2) * n;
    return MEMOIZED_FACTDOUBLE[n];
  }
};

exports.FALSE = function() {
  return false;
};

exports.FIND = function(needle, haystack, position) {
  var index;
  position = NUM(position);
  if (isNaN(position)) {
    position = 0;
  }
  if (!(haystack && haystack.indexOf)) {
    return NO_VALUE;
  }
  if (_.isArray(needle)) {
    return NO_VALUE;
  }
  index = haystack.indexOf(needle, position - 1);
  if (index < 0) {
    return NO_VALUE;
  }
  return index + 1;
};

exports.FIXED = function(number, decimals, suppressGroupingSeparator) {
  var fractionPart, groupingMax, groupingSeparator, groupingSize, index, integerPart, integerString, machineDecimalSeparator, machineValue, parts, power, scaled, thisIntegerPart, zeroPadding;
  if (decimals == null) {
    decimals = 2;
  }
  if (suppressGroupingSeparator == null) {
    suppressGroupingSeparator = false;
  }
  number = NUM(number);
  decimals = NUM(decimals);
  if (isNaN(decimals)) {
    decimals = 2;
  }
  decimals = MAX(decimals, 0);
  decimals = MIN(decimals, 20);
  if (isNaN(number)) {
    return NO_VALUE;
  }
  if (isNaN(decimals)) {
    return NO_VALUE;
  }
  suppressGroupingSeparator = !!suppressGroupingSeparator;
  power = Math.pow(10, decimals);
  scaled = parseInt(number * power);
  machineDecimalSeparator = '.';
  machineValue = number.toFixed(decimals);
  index = machineValue.indexOf(machineDecimalSeparator);
  if (!(index > -1)) {
    return machineValue;
  }
  integerPart = parseInt(machineValue.substring(0, index));
  fractionPart = machineValue.substring(index + 1, machineValue.length);
  integerString = '';
  groupingSize = GROUPINGSIZE();
  groupingMax = Math.pow(10, groupingSize);
  if (suppressGroupingSeparator || integerPart < groupingMax) {
    integerString = integerPart.toString();
  } else {
    groupingSeparator = GROUPINGSEPARATOR();
    parts = [];
    while (integerPart >= groupingMax) {
      thisIntegerPart = Math.floor(integerPart % groupingMax);
      zeroPadding = new Array(groupingSize + 1).join('0');
      parts.push(RIGHT(zeroPadding + thisIntegerPart.toString(), groupingSize));
      integerPart = Math.floor(integerPart / groupingMax);
    }
    if (integerPart > 0) {
      parts.push(integerPart.toString());
    }
    integerString = parts.reverse().join(groupingSeparator);
  }
  if (decimals < 1) {
    return integerString;
  } else {
    return integerString + DECIMALSEPARATOR() + fractionPart.toString();
  }
};

exports.GROUPINGSIZE = function() {
  return State.groupingSize || 3;
};

exports.DECIMALSEPARATOR = function() {
  return State.decimalSeparator || '.';
};

exports.GROUPINGSEPARATOR = function() {
  return State.groupingSeparator || ',';
};

exports.GCD = function() {
  var count, i, num, numbers, result, _i, _ref;
  numbers = toArray(arguments).map(NUM);
  count = numbers.length;
  if (numbers.length === 0) {
    return NaN;
  }
  if (numbers[0] < 0) {
    return NaN;
  }
  result = numbers[0];
  for (i = _i = 1, _ref = count - 1; _i <= _ref; i = _i += 1) {
    if (numbers[i] < 0) {
      return NaN;
    }
    num = numbers[i];
    while (result && num) {
      if (result > num) {
        result %= num;
      } else {
        num %= result;
      }
    }
    result += num;
  }
  return result;
};

exports.IF = function(test, trueValue, falseValue) {
  if (test) {
    return trueValue;
  } else {
    return falseValue;
  }
};

exports.IFERROR = function(value, errorValue) {
  if (ISERR(value)) {
    return errorValue;
  } else {
    return value;
  }
};

exports.INT = exports.FLOOR;

exports.ISBLANK = function(value) {
  var choice, hasChoice, hasEither, hasOthers, others;
  if (value === null) {
    return true;
  }
  if (value === void 0) {
    return true;
  }
  if (_.isNaN(value)) {
    return true;
  }
  if (_.isBoolean(value)) {
    return false;
  }
  if (_.isNumber(value)) {
    return false;
  }
  if (_.isDate(value)) {
    return false;
  }
  if (_.isString(value)) {
    return _.isBlank(value);
  }
  if (_.isArray(value)) {
    return value.length === 0;
  }
  if (value && (value.choice_values || value.choice_values === null || value.other_values || value.other_values === null)) {
    choice = value.choice_values;
    others = value.other_values;
    hasChoice = _.isArray(choice) && choice.length > 0;
    hasOthers = _.isArray(others) && others.length > 0;
    hasEither = hasChoice || hasOthers;
    return !hasEither;
  }
  return Object.keys(value).length === 0;
};

exports.ISERR = function(value) {
  if (value === NO_VALUE) {
    return true;
  }
  if (value === void 0) {
    return true;
  }
  if (value === null) {
    return true;
  }
  if (isNaN(value)) {
    return true;
  }
  if (value instanceof Error) {
    return true;
  }
  return false;
};

exports.ISERROR = function(value) {
  return ISERR(value);
};

exports.ISLOGICAL = function(value) {
  return _.isBoolean(value);
};

exports.ISNONTEXT = function(value) {
  return !_.isString(value);
};

exports.ISNUMBER = function(value) {
  return _.isNumber(value);
};

exports.ISODD = function(value) {
  value = NUM(value);
  if (!_.isNumber(value)) {
    return false;
  }
  if (isNaN(value)) {
    return false;
  }
  return (Math.floor(Math.abs(value)) & 1) === 1;
};

exports.ISEVEN = function(value) {
  value = NUM(value);
  if (!_.isNumber(value)) {
    return false;
  }
  if (isNaN(value)) {
    return false;
  }
  return (Math.floor(Math.abs(value)) & 1) === 0;
};

exports.ISTEXT = function(value) {
  return _.isString(value);
};

exports.LCM = function() {
  var a, b, c, count, i, numbers, _i, _ref;
  numbers = toArray(arguments).map(function(num) {
    return INT(num);
  });
  count = numbers.length;
  a = Math.abs(numbers[0]);
  for (i = _i = 1, _ref = count - 1; _i <= _ref; i = _i += 1) {
    b = Math.abs(numbers[i]);
    c = a;
    if (isNaN(b)) {
      return NaN;
    }
    while (a && b) {
      if (a > b) {
        a %= b;
      } else {
        b %= a;
      }
    }
    a = Math.abs(c * numbers[i]) / (a + b);
  }
  return a;
};

exports.LEFT = function(value, numberOfCharacters) {
  if (numberOfCharacters == null) {
    numberOfCharacters = 1;
  }
  numberOfCharacters || (numberOfCharacters = 1);
  numberOfCharacters = FLOOR(numberOfCharacters);
  if (value === void 0) {
    return NO_VALUE;
  }
  if (value === null) {
    return NO_VALUE;
  }
  if (_.isObject(value)) {
    return NO_VALUE;
  }
  if (numberOfCharacters < 0) {
    return NO_VALUE;
  }
  if (isNaN(numberOfCharacters)) {
    return NO_VALUE;
  }
  value = value.toString();
  return value.substring(0, numberOfCharacters);
};

exports.LEN = function(value) {
  if (value === void 0) {
    return NO_VALUE;
  }
  if (value === null) {
    return NO_VALUE;
  }
  if (_.isObject(value)) {
    return NO_VALUE;
  }
  return value.toString().length;
};

exports.LN = MATH_FUNC(Math.log);

exports.LOG = function(value, base) {
  value = NUM(value);
  base = NUM(base || 10);
  if (base === void 0) {
    return NaN;
  }
  if (base === null) {
    return NaN;
  }
  if (isNaN(base)) {
    return NaN;
  }
  return Math.log(value) / Math.log(base);
};

exports.LOG10 = function(value) {
  return LOG(value, 10);
};

exports.LOWER = function(value) {
  if (value === void 0) {
    return NO_VALUE;
  }
  if (value === null) {
    return NO_VALUE;
  }
  if (_.isArray(value)) {
    return NO_VALUE;
  }
  if (_.isObject(value)) {
    return NO_VALUE;
  }
  return value.toString().toLowerCase();
};

exports.MATCH = function() {
  return NOT_IMPLEMENTED();
};

exports.MAX = function() {
  var hasNaN, numbers;
  numbers = _.flatten(toArray(arguments));
  numbers = _.map(numbers, NUM);
  if (numbers.length === 0) {
    return NO_VALUE;
  }
  hasNaN = _.some(numbers, isNaN);
  if (hasNaN) {
    return NO_VALUE;
  }
  return Math.max.apply(Math, numbers);
};

exports.MAXA = function() {
  if (arguments.length < 1) {
    return NO_VALUE;
  }
  if (!_.isArray(arguments[0])) {
    return NO_VALUE;
  }
  return MAX.apply(null, arguments[0]);
};

exports.MEDIAN = function() {
  return NOT_IMPLEMENTED();
};

exports.MIN = function() {
  var hasNaN, numbers;
  numbers = _.flatten(toArray(arguments));
  numbers = _.map(numbers, NUM);
  if (numbers.length === 0) {
    return NO_VALUE;
  }
  hasNaN = _.some(numbers, isNaN);
  if (hasNaN) {
    return NO_VALUE;
  }
  return Math.min.apply(Math, numbers);
};

exports.MINA = function() {
  if (arguments.length < 1) {
    return NO_VALUE;
  }
  if (!_.isArray(arguments[0])) {
    return NO_VALUE;
  }
  return MIN.apply(null, arguments[0]);
};

exports.MID = function(value, startPosition, numberOfCharacters) {
  startPosition = FLOOR(startPosition);
  numberOfCharacters = FLOOR(numberOfCharacters);
  if (value === void 0) {
    return NO_VALUE;
  }
  if (value === null) {
    return NO_VALUE;
  }
  if (_.isObject(value)) {
    return NO_VALUE;
  }
  if (startPosition < 1) {
    return NO_VALUE;
  }
  if (isNaN(startPosition)) {
    return NO_VALUE;
  }
  if (numberOfCharacters < 0) {
    return NO_VALUE;
  }
  if (isNaN(numberOfCharacters)) {
    return NO_VALUE;
  }
  value = value.toString();
  return value.substr(startPosition - 1, numberOfCharacters);
};

exports.MOD = function(number, divisor) {
  var modulus;
  number = NUM(number);
  divisor = NUM(divisor);
  if (isNaN(number)) {
    return NaN;
  }
  if (isNaN(divisor)) {
    return NaN;
  }
  if (divisor === 0) {
    return NaN;
  }
  modulus = Math.abs(number % divisor);
  if (divisor > 0) {
    return modulus;
  } else {
    return -modulus;
  }
};

exports.NOT = function(value) {
  return !value;
};

exports.ODD = function(value) {
  var temp;
  value = NUM(value);
  if (!_.isNumber(value)) {
    return NaN;
  }
  temp = Math.ceil(Math.abs(value));
  temp = temp & 1 ? temp : temp + 1;
  if (value >= 0) {
    return temp;
  } else {
    return -temp;
  }
};

exports.OR = function() {
  return _.find(toArray(arguments), function(item) {
    return item;
  }) !== void 0;
};

exports.PI = function() {
  return Math.PI;
};

exports.POWER = function(number, power) {
  number = NUM(number);
  power = NUM(power);
  if (isNaN(number)) {
    return NaN;
  }
  if (isNaN(power)) {
    return NaN;
  }
  return Math.pow(number, power);
};

exports.PRODUCT = function() {
  var hasNaN, numbers;
  numbers = toArray(arguments).map(NUM);
  if (numbers.length === 0) {
    return NaN;
  }
  hasNaN = _.some(numbers, isNaN);
  if (hasNaN) {
    return NaN;
  }
  return _.inject(numbers, (function(memo, number) {
    return memo *= number;
  }), 1);
};

exports.PROPER = function(value) {
  if (value === void 0) {
    return NO_VALUE;
  }
  if (value === null) {
    return NO_VALUE;
  }
  if (_.isArray(value)) {
    return NO_VALUE;
  }
  if (_.isObject(value)) {
    return NO_VALUE;
  }
  return _.titleize(value.toString());
};

exports.QUOTIENT = function(numerator, denominator) {
  numerator = NUM(numerator);
  denominator = NUM(denominator);
  if (isNaN(numerator)) {
    return NaN;
  }
  if (isNaN(denominator)) {
    return NaN;
  }
  if (denominator === 0) {
    return NaN;
  }
  return parseInt(numerator / denominator, 10);
};

exports.RADIANS = function(degrees) {
  degrees = NUM(degrees);
  return (degrees / 180.0) * Math.PI;
};

exports.RAND = function() {
  return Math.random();
};

exports.RANDBETWEEN = function(low, high) {
  low = NUM(low);
  high = NUM(high);
  if (isNaN(low)) {
    return NaN;
  }
  if (isNaN(high)) {
    return NaN;
  }
  return low + Math.ceil((high - low + 1) * Math.random()) - 1;
};

exports.REPLACE = function(value, startPosition, numberOfCharacters, replacement) {
  var prefix, suffix;
  startPosition = FLOOR(startPosition);
  numberOfCharacters = FLOOR(numberOfCharacters);
  if (arguments.length < 4) {
    return NO_VALUE;
  }
  if (value === void 0) {
    return NO_VALUE;
  }
  if (value === null) {
    return NO_VALUE;
  }
  if (_.isObject(value)) {
    return NO_VALUE;
  }
  if (startPosition < 1) {
    return NO_VALUE;
  }
  if (isNaN(startPosition)) {
    return NO_VALUE;
  }
  if (numberOfCharacters < 0) {
    return NO_VALUE;
  }
  if (isNaN(numberOfCharacters)) {
    return NO_VALUE;
  }
  value = value.toString();
  prefix = value.substr(0, startPosition - 1);
  suffix = value.substr(startPosition - 1 + numberOfCharacters);
  return prefix + replacement + suffix;
};

exports.RIGHT = function(value, numberOfCharacters) {
  numberOfCharacters || (numberOfCharacters = 1);
  numberOfCharacters = FLOOR(numberOfCharacters);
  if (value === void 0) {
    return NO_VALUE;
  }
  if (value === null) {
    return NO_VALUE;
  }
  if (_.isObject(value)) {
    return NO_VALUE;
  }
  if (numberOfCharacters < 0) {
    return NO_VALUE;
  }
  if (isNaN(numberOfCharacters)) {
    return NO_VALUE;
  }
  value = value.toString();
  return value.substring(value.length - numberOfCharacters);
};

exports.ROUNDDOWN = function(number, digits) {
  var sign;
  if (digits == null) {
    digits = 0;
  }
  number = NUM(number);
  digits = NUM(digits);
  sign = number > 0 ? 1 : -1;
  return sign * (Math.floor(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits);
};

exports.ROUNDUP = function(number, digits) {
  var sign;
  if (digits == null) {
    digits = 0;
  }
  number = NUM(number);
  digits = NUM(digits);
  sign = number > 0 ? 1 : -1;
  return sign * (Math.ceil(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits);
};

exports.SEARCH = function(needle, haystack, startPosition) {
  var index;
  startPosition || (startPosition = 1);
  startPosition = NUM(startPosition);
  if (isNaN(startPosition)) {
    startPosition = 1;
  }
  if (_.isNumber(haystack)) {
    haystack = haystack.toString();
  }
  if (_.isNumber(needle)) {
    needle = needle.toString();
  }
  if (!_.isString(needle)) {
    return NO_VALUE;
  }
  if (!_.isString(haystack)) {
    return NO_VALUE;
  }
  if (needle === '') {
    return 1;
  }
  index = haystack.toLowerCase().indexOf(needle.toLowerCase(), startPosition - 1);
  if (index < 0) {
    return NO_VALUE;
  }
  return index + 1;
};

exports.SIGN = function(number) {
  number = NUM(number);
  if (isNaN(number)) {
    return NaN;
  }
  switch (true) {
    case number > 0:
      return 1;
    case number < 0:
      return -1;
    case number === 0:
      return 0;
  }
};

exports.SIN = MATH_FUNC(Math.sin);

exports.SINH = MATH_FUNC(Math.sinh);

exports.SQRT = MATH_FUNC(Math.sqrt);

exports.SQRTPI = function(number) {
  return SQRT(NUM(number) * Math.PI);
};

exports.SUBSTITUTE = function(text, oldText, newText, occurrence) {
  var count, index, invalid, prefix, suffix;
  occurrence = FLOOR(occurrence);
  if (arguments.length < 3) {
    return NO_VALUE;
  }
  if (occurrence < 0) {
    return NO_VALUE;
  }
  invalid = !text || !_.isString(oldText) || !_.isString(newText);
  if (invalid) {
    return NO_VALUE;
  }
  if (_.isArray(text)) {
    return text;
  }
  if (text.indexOf(oldText) < 0) {
    return text;
  }
  text = text.toString();
  oldText = oldText.toString();
  newText = newText.toString();
  if (isNaN(occurrence)) {
    return text.replace(new RegExp(oldText, 'g'), newText);
  } else {
    index = text.indexOf(oldText, index);
    count = 1;
    while (index >= 0) {
      if (count === occurrence) {
        prefix = text.substring(0, index);
        suffix = text.substring(index + oldText.length);
        return prefix + newText + suffix;
      }
      index = text.indexOf(oldText, index + 1);
      count++;
    }
    return text;
  }
};

exports.SUM = function() {
  var hasNaN, numbers;
  numbers = toArray(arguments).map(NUM);
  if (numbers.length === 0) {
    return NaN;
  }
  hasNaN = _.some(numbers, isNaN);
  if (hasNaN) {
    return NaN;
  }
  return _.inject(numbers, (function(memo, number) {
    return memo += number;
  }), 0);
};

exports.SUMSQ = function() {
  var hasNaN, numbers;
  numbers = toArray(arguments).map(NUM);
  if (numbers.length === 0) {
    return NaN;
  }
  hasNaN = _.some(numbers, isNaN);
  if (hasNaN) {
    return NaN;
  }
  return _.inject(numbers, (function(memo, number) {
    return memo += number * number;
  }), 0);
};

exports.T = function(value) {
  if (_.isUndefined(value)) {
    return '';
  }
  if (_.isNull(value)) {
    return '';
  }
  return value.toString();
};

exports.TRIM = function(value) {
  return _.trim(value);
};

exports.TRUE = function(value) {
  return true;
};

exports.UPPER = function(value) {
  if (value === void 0) {
    return NO_VALUE;
  }
  if (value === null) {
    return NO_VALUE;
  }
  if (_.isArray(value)) {
    return NO_VALUE;
  }
  if (_.isObject(value)) {
    return NO_VALUE;
  }
  return value.toString().toUpperCase();
};

exports.VALUE = function(value) {
  return NOT_IMPLEMENTED();
};

exports.ISNEW = function() {
  return NOT_IMPLEMENTED();
};

exports.ISUPDATE = function() {
  return NOT_IMPLEMENTED();
};

exports.GETSTATE = function() {
  return State;
};

exports.HASOTHER = function(value) {
  return !!(value && value.other_values && _.isArray(value.other_values) && value.other_values.length > 0);
};

exports.OTHER = function(value) {
  if (!exports.HASOTHER(value)) {
    return NO_VALUE;
  }
  return value.other_values[0];
};

exports.SELECTED = function(value, choice) {
  if (ISBLANK(value)) {
    return false;
  }
  if (!choice) {
    return false;
  }
  if (_.isArray(choice)) {
    return (choice.filter(function(item) {
      return !SELECTED(value, item);
    })).length === 0;
  }
  if (value && value.choice_values) {
    if (_.contains(value.choice_values, choice)) {
      return true;
    }
  }
  if (value && value.other_values) {
    if (_.contains(value.other_values, choice)) {
      return true;
    }
  }
  return false;
};

module.exports = exports;



},{"./utils":5,"underscore":3,"underscore.string":2}],2:[function(require,module,exports){
//  Underscore.string
//  (c) 2010 Esa-Matti Suuronen <esa-matti aet suuronen dot org>
//  Underscore.string is freely distributable under the terms of the MIT license.
//  Documentation: https://github.com/epeli/underscore.string
//  Some code is borrowed from MooTools and Alexandru Marasteanu.
//  Version '2.4.0'

!function(root, String){
  'use strict';

  // Defining helper functions.

  var nativeTrim = String.prototype.trim;
  var nativeTrimRight = String.prototype.trimRight;
  var nativeTrimLeft = String.prototype.trimLeft;

  var parseNumber = function(source) { return source * 1 || 0; };

  var strRepeat = function(str, qty){
    if (qty < 1) return '';
    var result = '';
    while (qty > 0) {
      if (qty & 1) result += str;
      qty >>= 1, str += str;
    }
    return result;
  };

  var slice = [].slice;

  var defaultToWhiteSpace = function(characters) {
    if (characters == null)
      return '\\s';
    else if (characters.source)
      return characters.source;
    else
      return '[' + _s.escapeRegExp(characters) + ']';
  };

  // Helper for toBoolean
  function boolMatch(s, matchers) {
    var i, matcher, down = s.toLowerCase();
    matchers = [].concat(matchers);
    for (i = 0; i < matchers.length; i += 1) {
      matcher = matchers[i];
      if (!matcher) continue;
      if (matcher.test && matcher.test(s)) return true;
      if (matcher.toLowerCase() === down) return true;
    }
  }

  var escapeChars = {
    lt: '<',
    gt: '>',
    quot: '"',
    amp: '&',
    apos: "'"
  };

  var reversedEscapeChars = {};
  for(var key in escapeChars) reversedEscapeChars[escapeChars[key]] = key;
  reversedEscapeChars["'"] = '#39';

  // sprintf() for JavaScript 0.7-beta1
  // http://www.diveintojavascript.com/projects/javascript-sprintf
  //
  // Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com>
  // All rights reserved.

  var sprintf = (function() {
    function get_type(variable) {
      return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
    }

    var str_repeat = strRepeat;

    var str_format = function() {
      if (!str_format.cache.hasOwnProperty(arguments[0])) {
        str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
      }
      return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
    };

    str_format.format = function(parse_tree, argv) {
      var cursor = 1, tree_length = parse_tree.length, node_type = '', arg, output = [], i, k, match, pad, pad_character, pad_length;
      for (i = 0; i < tree_length; i++) {
        node_type = get_type(parse_tree[i]);
        if (node_type === 'string') {
          output.push(parse_tree[i]);
        }
        else if (node_type === 'array') {
          match = parse_tree[i]; // convenience purposes only
          if (match[2]) { // keyword argument
            arg = argv[cursor];
            for (k = 0; k < match[2].length; k++) {
              if (!arg.hasOwnProperty(match[2][k])) {
                throw new Error(sprintf('[_.sprintf] property "%s" does not exist', match[2][k]));
              }
              arg = arg[match[2][k]];
            }
          } else if (match[1]) { // positional argument (explicit)
            arg = argv[match[1]];
          }
          else { // positional argument (implicit)
            arg = argv[cursor++];
          }

          if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
            throw new Error(sprintf('[_.sprintf] expecting number but found %s', get_type(arg)));
          }
          switch (match[8]) {
            case 'b': arg = arg.toString(2); break;
            case 'c': arg = String.fromCharCode(arg); break;
            case 'd': arg = parseInt(arg, 10); break;
            case 'e': arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential(); break;
            case 'f': arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg); break;
            case 'o': arg = arg.toString(8); break;
            case 's': arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg); break;
            case 'u': arg = Math.abs(arg); break;
            case 'x': arg = arg.toString(16); break;
            case 'X': arg = arg.toString(16).toUpperCase(); break;
          }
          arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+'+ arg : arg);
          pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
          pad_length = match[6] - String(arg).length;
          pad = match[6] ? str_repeat(pad_character, pad_length) : '';
          output.push(match[5] ? arg + pad : pad + arg);
        }
      }
      return output.join('');
    };

    str_format.cache = {};

    str_format.parse = function(fmt) {
      var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
      while (_fmt) {
        if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
          parse_tree.push(match[0]);
        }
        else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
          parse_tree.push('%');
        }
        else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
          if (match[2]) {
            arg_names |= 1;
            var field_list = [], replacement_field = match[2], field_match = [];
            if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
              field_list.push(field_match[1]);
              while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1]);
                }
                else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1]);
                }
                else {
                  throw new Error('[_.sprintf] huh?');
                }
              }
            }
            else {
              throw new Error('[_.sprintf] huh?');
            }
            match[2] = field_list;
          }
          else {
            arg_names |= 2;
          }
          if (arg_names === 3) {
            throw new Error('[_.sprintf] mixing positional and named placeholders is not (yet) supported');
          }
          parse_tree.push(match);
        }
        else {
          throw new Error('[_.sprintf] huh?');
        }
        _fmt = _fmt.substring(match[0].length);
      }
      return parse_tree;
    };

    return str_format;
  })();



  // Defining underscore.string

  var _s = {

    VERSION: '2.4.0',

    isBlank: function(str){
      if (str == null) str = '';
      return (/^\s*$/).test(str);
    },

    stripTags: function(str){
      if (str == null) return '';
      return String(str).replace(/<\/?[^>]+>/g, '');
    },

    capitalize : function(str){
      str = str == null ? '' : String(str);
      return str.charAt(0).toUpperCase() + str.slice(1);
    },

    chop: function(str, step){
      if (str == null) return [];
      str = String(str);
      step = ~~step;
      return step > 0 ? str.match(new RegExp('.{1,' + step + '}', 'g')) : [str];
    },

    clean: function(str){
      return _s.strip(str).replace(/\s+/g, ' ');
    },

    count: function(str, substr){
      if (str == null || substr == null) return 0;

      str = String(str);
      substr = String(substr);

      var count = 0,
        pos = 0,
        length = substr.length;

      while (true) {
        pos = str.indexOf(substr, pos);
        if (pos === -1) break;
        count++;
        pos += length;
      }

      return count;
    },

    chars: function(str) {
      if (str == null) return [];
      return String(str).split('');
    },

    swapCase: function(str) {
      if (str == null) return '';
      return String(str).replace(/\S/g, function(c){
        return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
      });
    },

    escapeHTML: function(str) {
      if (str == null) return '';
      return String(str).replace(/[&<>"']/g, function(m){ return '&' + reversedEscapeChars[m] + ';'; });
    },

    unescapeHTML: function(str) {
      if (str == null) return '';
      return String(str).replace(/\&([^;]+);/g, function(entity, entityCode){
        var match;

        if (entityCode in escapeChars) {
          return escapeChars[entityCode];
        } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
          return String.fromCharCode(parseInt(match[1], 16));
        } else if (match = entityCode.match(/^#(\d+)$/)) {
          return String.fromCharCode(~~match[1]);
        } else {
          return entity;
        }
      });
    },

    escapeRegExp: function(str){
      if (str == null) return '';
      return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
    },

    splice: function(str, i, howmany, substr){
      var arr = _s.chars(str);
      arr.splice(~~i, ~~howmany, substr);
      return arr.join('');
    },

    insert: function(str, i, substr){
      return _s.splice(str, i, 0, substr);
    },

    include: function(str, needle){
      if (needle === '') return true;
      if (str == null) return false;
      return String(str).indexOf(needle) !== -1;
    },

    join: function() {
      var args = slice.call(arguments),
        separator = args.shift();

      if (separator == null) separator = '';

      return args.join(separator);
    },

    lines: function(str) {
      if (str == null) return [];
      return String(str).split("\n");
    },

    reverse: function(str){
      return _s.chars(str).reverse().join('');
    },

    startsWith: function(str, starts){
      if (starts === '') return true;
      if (str == null || starts == null) return false;
      str = String(str); starts = String(starts);
      return str.length >= starts.length && str.slice(0, starts.length) === starts;
    },

    endsWith: function(str, ends){
      if (ends === '') return true;
      if (str == null || ends == null) return false;
      str = String(str); ends = String(ends);
      return str.length >= ends.length && str.slice(str.length - ends.length) === ends;
    },

    succ: function(str){
      if (str == null) return '';
      str = String(str);
      return str.slice(0, -1) + String.fromCharCode(str.charCodeAt(str.length-1) + 1);
    },

    titleize: function(str){
      if (str == null) return '';
      str  = String(str).toLowerCase();
      return str.replace(/(?:^|\s|-)\S/g, function(c){ return c.toUpperCase(); });
    },

    camelize: function(str){
      return _s.trim(str).replace(/[-_\s]+(.)?/g, function(match, c){ return c ? c.toUpperCase() : ""; });
    },

    underscored: function(str){
      return _s.trim(str).replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
    },

    dasherize: function(str){
      return _s.trim(str).replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
    },

    classify: function(str){
      return _s.capitalize(_s.camelize(String(str).replace(/[\W_]/g, ' ')).replace(/\s/g, ''));
    },

    humanize: function(str){
      return _s.capitalize(_s.underscored(str).replace(/_id$/,'').replace(/_/g, ' '));
    },

    trim: function(str, characters){
      if (str == null) return '';
      if (!characters && nativeTrim) return nativeTrim.call(str);
      characters = defaultToWhiteSpace(characters);
      return String(str).replace(new RegExp('^' + characters + '+|' + characters + '+$', 'g'), '');
    },

    ltrim: function(str, characters){
      if (str == null) return '';
      if (!characters && nativeTrimLeft) return nativeTrimLeft.call(str);
      characters = defaultToWhiteSpace(characters);
      return String(str).replace(new RegExp('^' + characters + '+'), '');
    },

    rtrim: function(str, characters){
      if (str == null) return '';
      if (!characters && nativeTrimRight) return nativeTrimRight.call(str);
      characters = defaultToWhiteSpace(characters);
      return String(str).replace(new RegExp(characters + '+$'), '');
    },

    truncate: function(str, length, truncateStr){
      if (str == null) return '';
      str = String(str); truncateStr = truncateStr || '...';
      length = ~~length;
      return str.length > length ? str.slice(0, length) + truncateStr : str;
    },

    /**
     * _s.prune: a more elegant version of truncate
     * prune extra chars, never leaving a half-chopped word.
     * @author github.com/rwz
     */
    prune: function(str, length, pruneStr){
      if (str == null) return '';

      str = String(str); length = ~~length;
      pruneStr = pruneStr != null ? String(pruneStr) : '...';

      if (str.length <= length) return str;

      var tmpl = function(c){ return c.toUpperCase() !== c.toLowerCase() ? 'A' : ' '; },
        template = str.slice(0, length+1).replace(/.(?=\W*\w*$)/g, tmpl); // 'Hello, world' -> 'HellAA AAAAA'

      if (template.slice(template.length-2).match(/\w\w/))
        template = template.replace(/\s*\S+$/, '');
      else
        template = _s.rtrim(template.slice(0, template.length-1));

      return (template+pruneStr).length > str.length ? str : str.slice(0, template.length)+pruneStr;
    },

    words: function(str, delimiter) {
      if (_s.isBlank(str)) return [];
      return _s.trim(str, delimiter).split(delimiter || /\s+/);
    },

    pad: function(str, length, padStr, type) {
      str = str == null ? '' : String(str);
      length = ~~length;

      var padlen  = 0;

      if (!padStr)
        padStr = ' ';
      else if (padStr.length > 1)
        padStr = padStr.charAt(0);

      switch(type) {
        case 'right':
          padlen = length - str.length;
          return str + strRepeat(padStr, padlen);
        case 'both':
          padlen = length - str.length;
          return strRepeat(padStr, Math.ceil(padlen/2)) + str
                  + strRepeat(padStr, Math.floor(padlen/2));
        default: // 'left'
          padlen = length - str.length;
          return strRepeat(padStr, padlen) + str;
        }
    },

    lpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr);
    },

    rpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr, 'right');
    },

    lrpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr, 'both');
    },

    sprintf: sprintf,

    vsprintf: function(fmt, argv){
      argv.unshift(fmt);
      return sprintf.apply(null, argv);
    },

    toNumber: function(str, decimals) {
      if (!str) return 0;
      str = _s.trim(str);
      if (!str.match(/^-?\d+(?:\.\d+)?$/)) return NaN;
      return parseNumber(parseNumber(str).toFixed(~~decimals));
    },

    numberFormat : function(number, dec, dsep, tsep) {
      if (isNaN(number) || number == null) return '';

      number = number.toFixed(~~dec);
      tsep = typeof tsep == 'string' ? tsep : ',';

      var parts = number.split('.'), fnums = parts[0],
        decimals = parts[1] ? (dsep || '.') + parts[1] : '';

      return fnums.replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + tsep) + decimals;
    },

    strRight: function(str, sep){
      if (str == null) return '';
      str = String(str); sep = sep != null ? String(sep) : sep;
      var pos = !sep ? -1 : str.indexOf(sep);
      return ~pos ? str.slice(pos+sep.length, str.length) : str;
    },

    strRightBack: function(str, sep){
      if (str == null) return '';
      str = String(str); sep = sep != null ? String(sep) : sep;
      var pos = !sep ? -1 : str.lastIndexOf(sep);
      return ~pos ? str.slice(pos+sep.length, str.length) : str;
    },

    strLeft: function(str, sep){
      if (str == null) return '';
      str = String(str); sep = sep != null ? String(sep) : sep;
      var pos = !sep ? -1 : str.indexOf(sep);
      return ~pos ? str.slice(0, pos) : str;
    },

    strLeftBack: function(str, sep){
      if (str == null) return '';
      str += ''; sep = sep != null ? ''+sep : sep;
      var pos = str.lastIndexOf(sep);
      return ~pos ? str.slice(0, pos) : str;
    },

    toSentence: function(array, separator, lastSeparator, serial) {
      separator = separator || ', ';
      lastSeparator = lastSeparator || ' and ';
      var a = array.slice(), lastMember = a.pop();

      if (array.length > 2 && serial) lastSeparator = _s.rtrim(separator) + lastSeparator;

      return a.length ? a.join(separator) + lastSeparator + lastMember : lastMember;
    },

    toSentenceSerial: function() {
      var args = slice.call(arguments);
      args[3] = true;
      return _s.toSentence.apply(_s, args);
    },

    slugify: function(str) {
      if (str == null) return '';

      var from  = "ąàáäâãåæăćęèéëêìíïîłńòóöôõøśșțùúüûñçżź",
          to    = "aaaaaaaaaceeeeeiiiilnoooooosstuuuunczz",
          regex = new RegExp(defaultToWhiteSpace(from), 'g');

      str = String(str).toLowerCase().replace(regex, function(c){
        var index = from.indexOf(c);
        return to.charAt(index) || '-';
      });

      return _s.dasherize(str.replace(/[^\w\s-]/g, ''));
    },

    surround: function(str, wrapper) {
      return [wrapper, str, wrapper].join('');
    },

    quote: function(str, quoteChar) {
      return _s.surround(str, quoteChar || '"');
    },

    unquote: function(str, quoteChar) {
      quoteChar = quoteChar || '"';
      if (str[0] === quoteChar && str[str.length-1] === quoteChar)
        return str.slice(1,str.length-1);
      else return str;
    },

    exports: function() {
      var result = {};

      for (var prop in this) {
        if (!this.hasOwnProperty(prop) || prop.match(/^(?:include|contains|reverse)$/)) continue;
        result[prop] = this[prop];
      }

      return result;
    },

    repeat: function(str, qty, separator){
      if (str == null) return '';

      qty = ~~qty;

      // using faster implementation if separator is not needed;
      if (separator == null) return strRepeat(String(str), qty);

      // this one is about 300x slower in Google Chrome
      for (var repeat = []; qty > 0; repeat[--qty] = str) {}
      return repeat.join(separator);
    },

    naturalCmp: function(str1, str2){
      if (str1 == str2) return 0;
      if (!str1) return -1;
      if (!str2) return 1;

      var cmpRegex = /(\.\d+)|(\d+)|(\D+)/g,
        tokens1 = String(str1).toLowerCase().match(cmpRegex),
        tokens2 = String(str2).toLowerCase().match(cmpRegex),
        count = Math.min(tokens1.length, tokens2.length);

      for(var i = 0; i < count; i++) {
        var a = tokens1[i], b = tokens2[i];

        if (a !== b){
          var num1 = parseInt(a, 10);
          if (!isNaN(num1)){
            var num2 = parseInt(b, 10);
            if (!isNaN(num2) && num1 - num2)
              return num1 - num2;
          }
          return a < b ? -1 : 1;
        }
      }

      if (tokens1.length === tokens2.length)
        return tokens1.length - tokens2.length;

      return str1 < str2 ? -1 : 1;
    },

    levenshtein: function(str1, str2) {
      if (str1 == null && str2 == null) return 0;
      if (str1 == null) return String(str2).length;
      if (str2 == null) return String(str1).length;

      str1 = String(str1); str2 = String(str2);

      var current = [], prev, value;

      for (var i = 0; i <= str2.length; i++)
        for (var j = 0; j <= str1.length; j++) {
          if (i && j)
            if (str1.charAt(j - 1) === str2.charAt(i - 1))
              value = prev;
            else
              value = Math.min(current[j], current[j - 1], prev) + 1;
          else
            value = i + j;

          prev = current[j];
          current[j] = value;
        }

      return current.pop();
    },

    toBoolean: function(str, trueValues, falseValues) {
      if (typeof str === "number") str = "" + str;
      if (typeof str !== "string") return !!str;
      str = _s.trim(str);
      if (boolMatch(str, trueValues || ["true", "1"])) return true;
      if (boolMatch(str, falseValues || ["false", "0"])) return false;
    }
  };

  // Aliases

  _s.strip    = _s.trim;
  _s.lstrip   = _s.ltrim;
  _s.rstrip   = _s.rtrim;
  _s.center   = _s.lrpad;
  _s.rjust    = _s.lpad;
  _s.ljust    = _s.rpad;
  _s.contains = _s.include;
  _s.q        = _s.quote;
  _s.toBool   = _s.toBoolean;

  // Exporting

  // CommonJS module is defined
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports)
      module.exports = _s;

    exports._s = _s;
  }

  // Register as a named module with AMD.
  if (typeof define === 'function' && define.amd)
    define('underscore.string', [], function(){ return _s; });


  // Integrate with Underscore.js if defined
  // or create our own underscore object.
  root._ = root._ || {};
  root._.string = root._.str = _s;
}(this, String);

},{}],3:[function(require,module,exports){
//     Underscore.js 1.7.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.7.0';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var createCallback = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  _.iteratee = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return createCallback(value, context, argCount);
    if (_.isObject(value)) return _.matches(value);
    return _.property(value);
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    if (obj == null) return obj;
    iteratee = createCallback(iteratee, context);
    var i, length = obj.length;
    if (length === +length) {
      for (i = 0; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    if (obj == null) return [];
    iteratee = _.iteratee(iteratee, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length),
        currentKey;
    for (var index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index = 0, currentKey;
    if (arguments.length < 3) {
      if (!length) throw new TypeError(reduceError);
      memo = obj[keys ? keys[index++] : index++];
    }
    for (; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== + obj.length && _.keys(obj),
        index = (keys || obj).length,
        currentKey;
    if (arguments.length < 3) {
      if (!index) throw new TypeError(reduceError);
      memo = obj[keys ? keys[--index] : --index];
    }
    while (index--) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    predicate = _.iteratee(predicate, context);
    _.some(obj, function(value, index, list) {
      if (predicate(value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    predicate = _.iteratee(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(_.iteratee(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    if (obj == null) return true;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    if (obj == null) return false;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (obj.length !== +obj.length) obj = _.values(obj);
    return _.indexOf(obj, target) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = obj && obj.length === +obj.length ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = low + high >>> 1;
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return obj.length === +obj.length ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = _.iteratee(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    for (var i = 0, length = input.length; i < length; i++) {
      var value = input[i];
      if (!_.isArray(value) && !_.isArguments(value)) {
        if (!strict) output.push(value);
      } else if (shallow) {
        push.apply(output, value);
      } else {
        flatten(value, shallow, strict, output);
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (array == null) return [];
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = _.iteratee(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = array.length; i < length; i++) {
      var value = array[i];
      if (isSorted) {
        if (!i || seen !== value) result.push(value);
        seen = value;
      } else if (iteratee) {
        var computed = iteratee(value, i, array);
        if (_.indexOf(seen, computed) < 0) {
          seen.push(computed);
          result.push(value);
        }
      } else if (_.indexOf(result, value) < 0) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true, []));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    if (array == null) return [];
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = array.length; i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(slice.call(arguments, 1), true, true, []);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function(array) {
    if (array == null) return [];
    var length = _.max(arguments, 'length').length;
    var results = Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var idx = array.length;
    if (typeof from == 'number') {
      idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
    }
    while (--idx >= 0) if (array[idx] === item) return idx;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var Ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    args = slice.call(arguments, 2);
    bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      Ctor.prototype = func.prototype;
      var self = new Ctor;
      Ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (_.isObject(result)) return result;
      return self;
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = hasher ? hasher.apply(this, arguments) : key;
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed before being called N times.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      } else {
        func = null;
      }
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    if (!_.isObject(obj)) return obj;
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (hasOwnProperty.call(source, prop)) {
            obj[prop] = source[prop];
        }
      }
    }
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj, iteratee, context) {
    var result = {}, key;
    if (obj == null) return result;
    if (_.isFunction(iteratee)) {
      iteratee = createCallback(iteratee, context);
      for (key in obj) {
        var value = obj[key];
        if (iteratee(value, key, obj)) result[key] = value;
      }
    } else {
      var keys = concat.apply([], slice.call(arguments, 1));
      obj = new Object(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        key = keys[i];
        if (key in obj) result[key] = obj[key];
      }
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(concat.apply([], slice.call(arguments, 1)), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    if (!_.isObject(obj)) return obj;
    for (var i = 1, length = arguments.length; i < length; i++) {
      var source = arguments[i];
      for (var prop in source) {
        if (obj[prop] === void 0) obj[prop] = source[prop];
      }
    }
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (
      aCtor !== bCtor &&
      // Handle Object.create(x) cases
      'constructor' in a && 'constructor' in b &&
      !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
        _.isFunction(bCtor) && bCtor instanceof bCtor)
    ) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size, result;
    // Recursively compare objects and arrays.
    if (className === '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size === b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      size = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      result = _.keys(b).length === size;
      if (result) {
        while (size--) {
          // Deep compare each member
          key = keys[size];
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around an IE 11 bug.
  if (typeof /./ !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    var pairs = _.pairs(attrs), length = pairs.length;
    return function(obj) {
      if (obj == null) return !length;
      obj = new Object(obj);
      for (var i = 0; i < length; i++) {
        var pair = pairs[i], key = pair[0];
        if (pair[1] !== obj[key] || !(key in obj)) return false;
      }
      return true;
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = createCallback(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? object[property]() : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));

},{}],4:[function(require,module,exports){
var Runtime, Utils, functions, _;

_ = require('underscore');

functions = require('./functions');

Utils = require('./utils');

Runtime = (function() {
  function Runtime() {
    this.setupGlobal();
    this.setupFunctions();
  }

  Runtime.defaultLocale = 'en-US';

  Runtime.defaultCurrencyCode = 'USD';

  Runtime.defaultCurrencySymbol = '$';

  Runtime.prototype.global = null;

  Runtime.prototype.expressions = [];

  Runtime.prototype.form = {};

  Runtime.prototype.values = {};

  Runtime.prototype.customVariables = {};

  Runtime.prototype.locale = Runtime.defaultLocale;

  Runtime.prototype.currencyCode = Runtime.defaultCurrencyCode;

  Runtime.prototype.currencySymbol = Runtime.defaultCurrencySymbol;

  Runtime.prototype.variables = {};

  Runtime.prototype.results = [];

  Runtime.prototype.dataNames = {};

  Runtime.prototype.elements = [];

  Runtime.prototype.elementsByKey = {};

  Runtime.prototype.elementsByDataName = {};

  Runtime.prototype.extraVariableNames = ['locale', 'decimalSeparator', 'groupingSeparator', 'currencySymbol', 'currencyCode', 'country', 'deviceIdentifier', 'deviceModel', 'deviceManufacturer', 'platform', 'platformVersion', 'application', 'applicationVersion', 'applicationBuild', 'recordStatus', 'recordSystemCreatedAt', 'recordSystemUpdatedAt', 'recordClientCreatedAt', 'recordClientUpdatedAt', 'recordProject', 'recordProjectName', 'recordGeometry', 'recordAltitude', 'recordVerticalAccuracy', 'recordHorizontalAccuracy', 'createdAt', 'updatedAt', 'geometry'];

  Runtime.prototype.setupValues = function() {
    var key, name, names, state, value, _i, _len, _ref;
    state = this.variables = {};
    names = this.dataNames;
    for (key in names) {
      state["$" + names[key]] = null;
    }
    for (key in this.values) {
      value = this.values[key];
      if (this.elementsByKey[key].numeric) {
        state["$" + this.dataNames[key]] = Number(value);
      } else {
        state["$" + this.dataNames[key]] = value;
      }
    }
    _ref = this.extraVariableNames;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      name = _ref[_i];
      state["$$" + name] = this[name];
    }
    for (name in this.customVariables) {
      state["" + name] = this.customVariables[name];
    }
    return functions.CONFIGURE(state);
  };

  Runtime.prototype.prepare = function() {
    this.elements = Utils.flattenElements(this.form.elements);
    return _.each(this.elements, (function(_this) {
      return function(element) {
        _this.elementsByKey[element.key] = element;
        _this.elementsByDataName[element.data_name] = element;
        return _this.dataNames[element.key] = element.data_name;
      };
    })(this));
  };

  Runtime.prototype.evaluate = function() {
    this.setupValues();
    return this.results = _.map(this.expressions, (function(_this) {
      return function(context) {
        return _this.evaluateExpression(context);
      };
    })(this));
  };

  Runtime.prototype.evaluateExpression = function(context) {
    var evalResult, ex, rawValue, stringValue, thisVariableName, variables;
    variables = this.variables;
    thisVariableName = "$" + context.dataName;
    try {
      stringValue = rawValue = variables[thisVariableName] = variables.$$result = void 0;
      if (context.expression && context.expression.length > 0) {
        evalResult = void 0;
        with (variables) { evalResult = eval(context.expression) };
        rawValue = this.coalesce(variables[thisVariableName], variables.$$result, evalResult);
        stringValue = variables[thisVariableName] = this.formatValue(rawValue);
      }
      return this.createResult(context.key, rawValue, stringValue, null);
    } catch (_error) {
      ex = _error;
      console.log("JS ERROR : " + context.dataName + " : " + (ex.toString()));
      variables[thisVariableName] = void 0;
      return this.createResult(context.key, null, null, ex.toString());
    }
  };

  Runtime.prototype.coalesce = function() {
    return _.find(Utils.toArray(arguments), function(argument) {
      return !_.isUndefined(argument);
    });
  };

  Runtime.prototype.createResult = function(key, rawValue, stringValue, err) {
    if (err) {
      err = err.toString();
    } else if (_.isUndefined(rawValue)) {
      err = '[Undefined]';
    } else if (_.isNaN(rawValue)) {
      err = '[Not a Number]';
    } else if (_.isFunction(rawValue)) {
      err = '[Function]';
    } else if (_.isArray(rawValue)) {
      err = '[Array]';
    } else if (_.isObject(rawValue)) {
      err = '[Object]';
    }
    return {
      key: key,
      value: stringValue,
      error: err
    };
  };

  Runtime.prototype.formatValue = function(value) {
    if (_.isUndefined(value)) {
      value = null;
    } else if (_.isNull(value)) {
      value = null;
    } else if (_.isNumber(value)) {
      value = value;
    } else if (_.isDate(value)) {
      value = value.toString();
    } else if (_.isArray(value)) {
      value = value.map(this.formatValue).join(', ');
    } else if (_.isRegExp(value)) {
      value = value.toString();
    } else if (_.isFunction(value)) {
      value = null;
    } else if (_.isNaN(value)) {
      value = null;
    }
    return value;
  };

  Runtime.prototype.setupGlobal = function() {
    var e;
    this.global = void 0;
    try {
      this.global = Function("return this")();
    } catch (_error) {
      e = _error;
      this.global = window;
    }
    this.global.$$runtime = this;
    this.global.$$prepare = this.prepare.bind(this);
    return this.global.$$evaluate = this.evaluate.bind(this);
  };

  Runtime.prototype.setupFunctions = function() {
    var exportName, _results;
    this.functions || (this.functions = {});
    _results = [];
    for (exportName in functions) {
      _results.push(this.global[exportName] = this.functions[exportName] = functions[exportName]);
    }
    return _results;
  };

  return Runtime;

})();

module.exports = new Runtime;



},{"./functions":1,"./utils":5,"underscore":3}],5:[function(require,module,exports){
var Utils, _;

_ = require('underscore');

Utils = (function() {
  function Utils() {}

  Utils.toArray = function(arrayLike) {
    return Array.prototype.slice.call(arrayLike, 0);
  };

  Utils.flattenElements = function(elements) {
    return _.tap([], function(flat) {
      return _.each(elements, function(element) {
        var children;
        flat.push(element);
        if (element.elements) {
          children = Utils.flattenElements(element.elements);
          return Array.prototype.push.apply(flat, children);
        }
      });
    });
  };

  return Utils;

})();

module.exports = Utils;



},{"underscore":3}]},{},[4]);
