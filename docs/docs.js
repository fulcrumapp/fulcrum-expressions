////ABS

/**
 * ABS
 * Returns the absolute value of a number.
 * @param {Number} value The number of which to return the absolute value.
 * @returns {Number} the absolute value of the `value` parameter
 * @example
 * // returns 1
 * ABS(-1)
 * @example
 * // returns 42
 * ABS(42)
 */
function ABS() {}


////ACOS

/**
 * ACOS
 * Returns the inverse cosine of a value, in radians.
 * @param {Number} value The value for which to calculate the inverse cosine. Must be between -1 and 1, inclusive.
 * @returns {Number}
 * @example
 * // returns 0.6435011087932843
 * ACOS(0.8)
 */
function ACOS() {}


////ACOSH

/**
 * ACOSH
 * Returns the inverse hyperbolic cosine of a number.
 * @param {Number} value The value for which to calculate the inverse hyperbolic cosine. Must be greater than or equal to 1.
 * @returns {Number}
 * @example
 * // returns 2.6339157938496336
 * ACOSH(7)
 */
function ACOSH() {}


////AND

/**
 * AND
 * Returns true if all of the provided arguments are logically true, and false if any of the provided arguments are logically false.
 * @param {...*} var_args_expressions An expression or reference that represents some logical value, i.e. `true` or `false`, or an expression that can be converted to a logical value.
 * @returns {Boolean}
 * @example
 * // returns false
 * AND(1, 0, false)
 * @example
 * // returns true
 * AND(3 + 3 == 6, 10 + 2 == 12)
 */
function AND() {}


////AVERAGE

/**
 * AVERAGE
 * Returns the numerical average value in a dataset, ignoring text.
 * @param {...Number} var_args_values values to use when calculating the average value.
 * @returns {Number}
 * @example
 * // returns 2
 * AVERAGE(1, 2, 3)
 */
function AVERAGE() {}


////CEILING

/**
 * CEILING
 * Rounds a number up to the nearest integer multiple of specified significance.
 * @param {Number} value The value to round up to the nearest integer multiple of factor.
 * @param {Number} [factor=1] The number to whose multiples value will be rounded.
 * @returns {Number}
 * @example
 * // returns 139.9
 * CEILING(139.85, 0.1)
 * @example
 * // returns 140
 * CEILING(139.001)
 */
function CEILING() {}


////CHAR

/**
 * CHAR
 * Convert a number into a character according to the current Unicode table.
 * @param {Number} number The number of the character to look up from the current Unicode table in decimal format.
 * @returns {String}
 * @example
 * // returns A
 * CHAR(65)
 * @example
 * // returns Թ
 * CHAR(1337)
 */
function CHAR() {}


////CLEAN

/**
 * CLEAN
 * Returns the text with the non-printable ASCII characters removed.
 * @param {String} text The text whose non-printable characters are to be removed.
 * @returns {String}
 * @example
 * // returns Test
 * CLEAN('Test' + CHAR(31))
 */
function CLEAN() {}


////COALESCE

/**
 * COALESCE
 * Returns the first parameter whose value exists
 * @param {...*} parameters The value to return if it exists
 * @returns {*} The first parameter that exists
 * @example
 * // returns Test
 * COALESCE(null, null, 'Test', 1)
 * @example
 * // returns 1
 * COALESCE(1, null, null)
 * @example
 * // returns undefined
 * COALESCE(null, null, null)
 */
function COALESCE() {}


////CODE

/**
 * CODE
 * Returns the numeric Unicode map value of the first character in the string provided.
 * @param {String} text The string whose first character's Unicode map value will be returned.
 * @returns {Number}
 * @example
 * // returns 84
 * CODE('Test')
 */
function CODE() {}


////COMPACT

/**
 * COMPACT
 * Removes empty items from an array
 * @param {Array} value an array of items
 * @returns {Array}
 * @example
 * // returns [1,2,3]
 * COMPACT([null, 1, undefined, null, 2, 3])
 */
function COMPACT() {}


////CONCATENATE

/**
 * CONCATENATE
 * Returns the concatenation of multiple values.
 * @param {...String} var_args_values Strings to append in sequence.
 * @returns {String}
 * @example
 * // returns This is a sentence.
 * CONCATENATE("This ", "is ", "a ", "sentence.")
 * @example
 * // returns 42311
 * CONCATENATE(42, 31, 1)
 * @example
 * // returns Age is 42
 * CONCATENATE("Age ", "is ", 42)
 */
function CONCATENATE() {}


////COS

/**
 * COS
 * Returns the cosine of a value, in radians.
 * @param {Number} value The value for which to calculate the cosine.
 * @returns {Number}
 * @example
 * // returns 0.15425144988758405
 * COS(30)
 */
function COS() {}


////COSH

/**
 * COSH
 * Returns the hyperbolic cosine of a number.
 * @param {Number} value The real number for which to calculate the hyperbolic cosine.
 * @returns {Number}
 * @example
 * // returns 1.5430806348152437
 * COSH(1)
 */
function COSH() {}


////COUNT

/**
 * COUNT
 * Returns a count of the number of *numeric* values in a dataset.
 * @param {Array} values an array of numbers
 * @returns {Number} the count of numeric values in the array
 * @example
 * // returns 5
 * COUNT([11, 22, 33, 44, 55])
 * @example
 * // returns 0
 * // since it only counts numeric arguments
 * COUNT(['a', 'b', 'c', 'd', 'e'])
 */
function COUNT() {}


////COUNTA

/**
 * COUNTA
 * Returns a count of values in a dataset.
 * @param {Array} value an array of values
 * @returns {Number} the count of items in the array
 * @example
 * // returns 5
 * COUNTA([11, 22, 33, 44, 55])
 * @example
 * // returns 5
 * // since it counts all arguments
 * COUNTA(['a', 'b', 'c', 'd', 'e'])
 */
function COUNTA() {}


////COUNTBLANK

/**
 * COUNTBLANK
 * Returns the number of blank values in a dataset.
 * @param {Array} value an array of items
 * @returns {Number} the number of blank items in the array
 * @example
 * // returns 3
 * // since null and '' are blank values
 * COUNTBLANK([null, null, '', 1])
 */
function COUNTBLANK() {}


////COUNTRY

/**
 * COUNTRY
 * Returns the current country according to the device locale settings
 * @returns {String} The country code of the current locale
 * @example
 * // returns US
 * COUNTRY()
 */
function COUNTRY() {}


////CURRENCYCODE

/**
 * CURRENCYCODE
 * Returns the currency code for the current device locale
 * @returns {String} the ISO 4217 currency code according to the current device settings
 * @example
 * // returns USD
 * CURRENCYCODE()
 */
function CURRENCYCODE() {}


////CURRENCYSYMBOL

/**
 * CURRENCYSYMBOL
 * Returns the currency symbol for the current device locale
 * @returns {String} the currency symbol
 * @example
 * // returns $
 * CURRENCYSYMBOL()
 */
function CURRENCYSYMBOL() {}


////DATE

/**
 * DATE
 * Converts a provided year, month, and day into a date.
 * @param {Number} year year
 * @param {Number} month month
 * @param {Number} day day
 * @returns {Date}
 * @example
 * // returns 2015-12-16
 * DATE(2015, 12, 16)
 */
function DATE() {}


////DATEADD

/**
 * DATEADD
 * Adds a number of days to a given date
 * @param {Date} date date
 * @param {Number} days the number of days to add
 * @returns {Date}
 * @example
 * // returns 2015-01-11
 * DATEADD('2015-01-01', 10)
 * @example
 * // returns 2015-05-01
 * DATEADD('2015-01-31', 90)
 */
function DATEADD() {}


////DATEVALUE

/**
 * DATEVALUE
 * Converts a provided date string in a known format to a date value.
 * @param {String} value a string containing a date
 * @returns {Date}
 * @example
 * // returns 2015-01-01
 * DATEVALUE('2015-01-01')
 */
function DATEVALUE() {}


////DAY

/**
 * DAY
 * Returns the day of the month that a specific date falls on, in numeric format.
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * DAY()
 */
function DAY() {}


////DECIMALSEPARATOR

/**
 * DECIMALSEPARATOR
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * DECIMALSEPARATOR()
 */
function DECIMALSEPARATOR() {}


////DEGREES

/**
 * DEGREES
 * Converts an angle value in radians to degrees.
 * @param {Number} value Number in radians.
 * @returns {Number}
 * @example
 * // returns 57.29577951308232
 * DEGREES(1)
 */
function DEGREES() {}


////DOLLAR

/**
 * DOLLAR
 * Formats a number into the locale-specific currency format.
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * DOLLAR()
 */
function DOLLAR() {}


////EVEN

/**
 * EVEN
 * Returns number rounded up to the nearest even integer.
 * @param {Number} value Number to round.
 * @returns {Number}
 * @example
 * // returns 6
 * EVEN(5.2)
 * @example
 * // returns 530
 * EVEN(528.2172814)
 */
function EVEN() {}


////EXACT

/**
 * EXACT
 * Tests whether two strings are identical.
 * @param {String} value First string to compare.
 * @param {String} value Second string to compare.
 * @returns {Boolean}
 * @example
 * // returns true
 * EXACT("String 1", "String 1")
 * @example
 * // returns false
 * EXACT("String 1", "Another String")
 * @example
 * // returns true
 * EXACT(4,4)
 */
function EXACT() {}


////EXP

/**
 * EXP
 * Returns Euler's number, e (~2.718) raised to a power.
 * @param {Number} value Power to which to raise `e`.
 * @returns {Number}
 * @example
 * // returns 20.085536923187668
 * EXP(3)
 */
function EXP() {}


////FACT

/**
 * FACT
 * Returns the factorial of a number.
 * @param {Number} value The value for which to calculate the factorial.
 * @returns {Number}
 * @example
 * // returns 120
 * FACT(5)
 */
function FACT() {}


////FACTDOUBLE

/**
 * FACTDOUBLE
 * Returns the double factorial of a number.
 * @param {Number} value The value for which to calculate the double factorial.
 * @returns {Number}
 * @example
 * // returns 15
 * FACTDOUBLE(5)
 */
function FACTDOUBLE() {}


////FALSE

/**
 * FALSE
 * Returns the boolean value `false`.
 * @returns {Boolean}
 * @example
 * // returns false
 * FALSE()
 */
function FALSE() {}


////FIND

/**
 * FIND
 * Returns the position at which a string is first found within text, case-sensitive.
 * @param {String} search_for String to search for within `text_to_search`.
 * @param {String} text_to_search Text to search for the first instance of `search_for`.
 * @param {Number} starting_at argument Position index to begin the search.
 * @returns {Number}
 * @example
 * // returns 15
 * FIND("haystack", "Needle in the haystack")
 */
function FIND() {}


////FIXED

/**
 * FIXED
 * Formats a number with a fixed number of decimal places.
 * @param {Number} value Number to format.
 * @param {Number} number_of_places Number of decimal places to display in the result.
 * @param {Boolean} value Whether or not to suppress the thousands separator.
 * @returns {String}
 * @example
 * // returns 3000.14
 * FIXED(3000.141592, 2, true)
 * @example
 * // returns 6,276.222
 * FIXED(6276.22241, 3, false)
 */
function FIXED() {}


////FLOOR

/**
 * FLOOR
 * Rounds a number down to the nearest integer multiple of specified significance.
 * @param {Number} value Number to round down.
 * @param {Number} significance The number to whose multiples `value` will be rounded.
 * @returns {Number}
 * @example
 * // returns 126
 * FLOOR(126.25, 1)
 * @example
 * // returns 120
 * FLOOR(126.25, 10)
 */
function FLOOR() {}


////FORMATNUMBER

/**
 * FORMATNUMBER
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * FORMATNUMBER()
 */
function FORMATNUMBER() {}


////GCD

/**
 * GCD
 * Returns the greatest common divisor of one or more integers.
 * @param {...Number} var_args_values Value(s) to consider to calculate the greatest common divisor.
 * @returns {Number}
 * @example
 * // returns 1
 * GCD(5, 9)
 * @example
 * // returns 7
 * GCD(14, 21, 42)
 */
function GCD() {}


////GETRESULT

/**
 * GETRESULT
 * Returns the current result value for the current expression
 * @returns {*} the current result value
 * @example
 * // returns 1
 * SETRESULT(1)
 * GETRESULT()
 */
function GETRESULT() {}


////GROUPINGSEPARATOR

/**
 * GROUPINGSEPARATOR
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * GROUPINGSEPARATOR()
 */
function GROUPINGSEPARATOR() {}


////GROUPINGSIZE

/**
 * GROUPINGSIZE
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * GROUPINGSIZE()
 */
function GROUPINGSIZE() {}


////HASOTHER

/**
 * HASOTHER
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * HASOTHER()
 */
function HASOTHER() {}


////IF

/**
 * IF
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * IF()
 */
function IF() {}


////IFERROR

/**
 * IFERROR
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * IFERROR()
 */
function IFERROR() {}


////INSPECT

/**
 * INSPECT
 * Returns the string representation of a value. This function is useful for troubleshooting expressions.
 * @param {Number} value The value to inspect
 * @returns {String}
 * @example
 * // returns [ 1, 2, 3 ]
 * INSPECT([1, 2, 3])
 */
function INSPECT() {}


////INT

/**
 * INT
 * Rounds a number down to the nearest integer that is less than or equal to it.
 * @param {Number} value Value to round down to the nearest integer.
 * @returns {Number}
 * @example
 * // returns 34
 * INT(34.24)
 * @example
 * // returns -11
 * INT(-10.49)
 */
function INT() {}


////ISBLANK

/**
 * ISBLANK
 * Checks whether the field's value is empty.
 * @param {String} value Field value to check.
 * @returns {Boolean}
 * @example
 * // returns true
 * ISBLANK("")
 * @example
 * // returns false
 * ISBLANK("Test")
 */
function ISBLANK() {}


////ISERR

/**
 * ISERR
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * ISERR()
 */
function ISERR() {}


////ISERROR

/**
 * ISERROR
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * ISERROR()
 */
function ISERROR() {}


////ISEVEN

/**
 * ISEVEN
 * Checks whether the provided value is an even number.
 * @param {Number} value The value to be verified as even.
 * @returns {Boolean}
 * @example
 * // returns true
 * ISEVEN(4)
 * @example
 * // returns false
 * ISEVEN(5)
 * @example
 * // returns true
 * ISEVEN(4.12)
 */
function ISEVEN() {}


////ISLOGICAL

/**
 * ISLOGICAL
 * Checks whether a value is `true` or `false`.
 * @param {String} value The value to be verified as `true` or `false`.
 * @returns {Boolean}
 * @example
 * // returns true
 * ISLOGICAL(true)
 * @example
 * // returns false
 * ISLOGICAL("Text")
 */
function ISLOGICAL() {}


////ISNAN

/**
 * ISNAN
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * ISNAN()
 */
function ISNAN() {}


////ISNONTEXT

/**
 * ISNONTEXT
 * Tests whether a value is non-textual.
 * @param {String} value The value to test as non-text.
 * @returns {Boolean}
 * @example
 * // returns true
 * ISNONTEXT(4)
 * @example
 * // returns false
 * ISNONTEXT("Some text")
 */
function ISNONTEXT() {}


////ISNUMBER

/**
 * ISNUMBER
 * Tests whether a value is a number.
 * @param {Number} value The value to be verified as a number.
 * @returns {Boolean}
 * @example
 * // returns true
 * ISNUMBER(10)
 * @example
 * // returns false
 * ISNUMBER("Some text")
 */
function ISNUMBER() {}


////ISODD


/**
 * ISODD
 * Checks whether the provided value is an odd number.
 * @param {Number} value The value to be verified as odd.
 * @returns {Boolean}
 * @example
 * // returns false
 * ISODD(4)
 * @example
 * // returns true
 * ISODD(5)
 * @example
 * // returns true
 * ISODD(3.12)
 */
function ISODD() {}


////ISSELECTED

/**
 * ISSELECTED
 * Checks whether a given choice is selected for a choice field or classification field
 * @param {*} value The choice field, classification field to check for a value being selected
 * @param {String} choice The choice value to check for
 * @returns {Boolean}
 * @example
 * // returns true
 * // $choice_field has Red, Green, and Blue selected
 * ISSELECTED($choice_field, 'Red')
 * @example
 * // returns false
 * // $choice_field has Red, Green, and Blue selected
 * ISSELECTED($choice_field, 'Orange')
 */
function ISSELECTED() {}


////ISTEXT

/**
 * ISTEXT
 * Checks whether a value is text.
 * @param {String} value The value to test as text.
 * @returns {Boolean}
 * @example
 * // returns true
 * ISTEXT("Text")
 * @example
 * // returns false
 * ISTEXT(4)
 */
function ISTEXT() {}


////LANGUAGE

/**
 * LANGUAGE
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * LANGUAGE()
 */
function LANGUAGE() {}


////LATITUDE

/**
 * LATITUDE
 * Returns the latitude of the current feature (record or repeatable item).
 * @returns {Number}
 * @example
 * // returns 27.770756908186286
 * LATITUDE()
 */
function LATITUDE() {}


////LCM

/**
 * LCM
 * Returns the least common multiple of one or more integers.
 * @param {...Number} var_args_values Value(s) to consider to calculate the least common multiple.
 * @returns {Number}
 * @example
 * // returns 10
 * LCM(2, 5)
 * @example
 * // returns 660
 * LCM(5, 22, 12)
 */
function LCM() {}


////LEFT

/**
 * LEFT
 * Returns a substring from the beginning of a given string.
 * @param {String} value The string value from which the left portion will be returned.
 * @param {Number} [number_of_characters=1] The number of characters to return from the left side of the string.
 * @returns {String}
 * @example
 * // returns Ful
 * LEFT("Fulcrum", 3)
 * @example
 * // returns F
 * LEFT("Fulcrum")
 */
function LEFT() {}


////LEN

/**
 * LEN
 * Returns the length of a string value.
 * @param {String} value The string from which to return the length.
 * @returns {Number}
 * @example
 * // returns 30
 * LEN("Fulcrum is for data collection")
 */
function LEN() {}


////LN

/**
 * LN
 * Returns the the logarithm of a number, base `e` (Euler's number).
 * @param {Number} value The value for which to calculate the logarithm, base `e`. Must be a positive number.
 * @returns {Number}
 * @example
 * // returns 1.6094379124341003
 * LN(5)
 * @example
 * // returns NaN
 * LN("Test")
 */
function LN() {}


////LOCALE

/**
 * LOCALE
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * LOCALE()
 */
function LOCALE() {}


////LOG

/**
 * LOG
 * Returns the the logarithm of a number given a base.
 * @param {Number} value The value for which to calculate the logarithm given `base`.
 * @param {Number} [base=10] The base to use for the logarithm calculation.
 * @returns {Number}
 * @example
 * // returns 2.8613531161467867
 * LOG(100, 5)
 * @example
 * // returns 2
 * LOG(100)
 */
function LOG() {}


////LOG10

/**
 * LOG10
 * Returns the the logarithm of a number, base 10.
 * @param {Number} value The value for which to calculate the logarithm, base 10.
 * @returns {Number}
 * @example
 * // returns 2
 * LOG10(100)
 * @example
 * // returns 1.6989700043360185
 * LOG10(50)
 */
function LOG10() {}


////LONGITUDE

/**
 * LONGITUDE
 * Returns the longitude of the current feature (record or repeatable item)
 * @returns {Number}
 * @example
 * // returns -82.63814896345139
 * LONGITUDE()
 */
function LONGITUDE() {}


////LOWER

/**
 * LOWER
 * Converts a specified string to lowercase.
 * @param {String} value The string to convert to lowercase.
 * @returns {String}
 * @example
 * // returns empire state building
 * LOWER("Empire State Building")
 */
function LOWER() {}


////MAX

/**
 * MAX
 * Returns the maximum value in a given set of values.
 * @param {...Number} var_args_values Values in which to find the maximum value.
 * @returns {Number}
 * @example
 * // returns 322
 * MAX(3, 1, 322, 76)
 */
function MAX() {}


////MAXA

/**
 * MAXA
 * Returns the maximum numeric value in a given set of values.
 * @param {...Number} var_args_values Values in which to find the maximum numeric value.
 * @returns {Number}
 * @example
 * // returns 10
 * MAXA([3, 4, -6, '10'])
 */
function MAXA() {}


////MEDIAN

/**
 * MEDIAN
 * Returns the median value in a set of numeric values.
 * @param {...Number} var_args_values Values in which to find the median value.
 * @returns {Number}
 * @example
 * // returns 15
 * MEDIAN(15,2,9,67,22)
 * @example
 * // returns 4
 * MEDIAN(1,10,4)
 */
function MEDIAN() {}


////MID

/**
 * MID
 * Returns a segment of a string value.
 * @param {String} value The string to extract a segment from.
 * @param {Number} start_position Index from the left of the string from which to begin extracting. First character is index `1`.
 * @param {Number} number_of_characters Number of characters to extract.
 * @returns {String}
 * @example
 * // returns iOS
 * MID("Fulcrum for iOS", 13, 3)
 */
function MID() {}


////MIN

/**
 * MIN
 * Returns the minimum value in a given set of values.
 * @param {...Number} var_args_values Values in which to find the minimum value.
 * @returns {Number}
 * @example
 * // returns 1
 * MIN(3, 1, 322, 76)
 */
function MIN() {}


////MINA

/**
 * MINA
 * Returns the minimum numeric value in a given set of values.
 * @param {...Number} var_args_values Values in which to find the minumum numeric value.
 * @returns {Number}
 * @example
 * // returns -6
 * MINA([3, 4, -6, '10'])
 */
function MINA() {}


////MOD

/**
 * MOD
 * Returns the result of the modulo operator, the remainder after a division operation.
 * @param {Number} dividend The number to be divided to find the remainder.
 * @param {Number} divisor The number to divide by.
 * @returns {Number}
 * @example
 * // returns 1
 * MOD(10, 3)
 * @example
 * // returns 0
 * MOD(10, 10)
 */
function MOD() {}


////MONTH

/**
 * MONTH
 * Returns the month of a given date.
 * @param {Date} date a date
 * @returns {Number}
 * @example
 * // returns 12
 * MONTH("2015/12/16")
 */
function MONTH() {}


////N

/**
 * N
 * Returns the value provided as a number.
 * @param {Number} value The value to be converted to a number.
 * @returns {Number}
 * @example
 * // returns 10
 * N(10)
 * @example
 * // returns 1
 * N(true)
 */
function N() {}


////NOT

/**
 * NOT
 * Returns the opposite of a logical value - `NOT(true)` returns `false`; `NOT(false)` returns `true`.
 * @param {Boolean} value The expression or value representing a logical value (`true` or `false`).
 * @returns {Boolean}
 * @example
 * // returns true
 * NOT(false)
 * @example
 * // returns false
 * NOT(5)
 */
function NOT() {}


////NUM

/**
 * NUM
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * NUM()
 */
function NUM() {}


////NUMS

/**
 * NUMS
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * NUMS()
 */
function NUMS() {}


////ODD

/**
 * ODD
 * Rounds a number up to the nearest odd integer.
 * @param {Number} value The number to round to the nearest odd integer.
 * @returns {Number}
 * @example
 * // returns 5
 * ODD(4.22)
 */
function ODD() {}


////ONCE

/**
 * ONCE
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * ONCE()
 */
function ONCE() {}


////OR

/**
 * OR
 * Returns `true` if any of the provided arguments are logically true, and `false` if all of the provided arguments are logically false.
 * @param {...*} var_args_expressions An expression or reference that represents some logical value, i.e. `true` or `false`, or an expression that can be converted to a logical value.
 * @returns {Boolean}
 * @example
 * // returns true
 * OR(true, true, false)
 * @example
 * // returns false
 * OR(ISEVEN(5),ISODD(6))
 */
function OR() {}


////OTHER

/**
 * OTHER
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * OTHER()
 */
function OTHER() {}


////PI

/**
 * PI
 * Returns the value of Pi to 15 decimal places.
 * @returns {Number}
 * @example
 * // returns 3.141592653589793
 * PI()
 */
function PI() {}


////POWER

/**
 * POWER
 * Returns a number raised to a power.
 * @param {Number} base The number to be raised to the `exponent` power.
 * @param {Number} exponent The exponent to raise `base` to.
 * @returns {Number}
 * @example
 * // returns 390625
 * POWER(5, 8)
 * @example
 * // returns 3.1622776601683795
 * POWER(10, 0.5)
 */
function POWER() {}


////PRECISION

/**
 * PRECISION
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * PRECISION()
 */
function PRECISION() {}


////PRODUCT

/**
 * PRODUCT
 * Returns the result of multiplying a series of numbers together.
 * @param {...Number} var_args_values Values to multiply together.
 * @returns {Number}
 * @example
 * // returns 216
 * PRODUCT(4, 18, 3)
 * @example
 * // returns 0
 * PRODUCT(23, 5, 0)
 */
function PRODUCT() {}


////PROPER

/**
 * PROPER
 * Capitalizes each word in a string (title case).
 * @param {String} value String to capitalize words within.
 * @returns {String}
 * @example
 * // returns Fulcrum Mobile Data Collection
 * PROPER("fulcrum mobile data collection")
 */
function PROPER() {}


////QUOTIENT

/**
 * QUOTIENT
 * Returns the result of dividing one number by another.
 * @param {Number} dividend The number to divide.
 * @param {Number} divisor The number to be divided by.
 * @returns {Number}
 * @example
 * // returns 6
 * QUOTIENT(30, 5)
 * @example
 * // returns 0
 * QUOTIENT(0, 10)
 * @example
 * // returns NaN
 * QUOTIENT(45, 0)
 */
function QUOTIENT() {}


////RADIANS

/**
 * RADIANS
 * Converts a number of degrees to radians.
 * @param {Number} value The number of degrees to be converted.
 * @returns {Number}
 * @example
 * // returns 0.5235987755982988
 * RADIANS(30)
 */
function RADIANS() {}


////RAND

/**
 * RAND
 * Returns a random number between 0 and 1.
 * @returns {Number}
 * @example
 * // returns true
 * RAND() > 0
 */
function RAND() {}


////RANDBETWEEN

/**
 * RANDBETWEEN
 * Returns a random integer between two values.
 * @param {Number} value Low value of the range.
 * @param {Number} value High value of the range.
 * @returns {Number}
 * @example
 * // returns true
 * 4 < RANDBETWEEN(4, 9) < 9
 */
function RANDBETWEEN() {}


////REPEATABLEVALUES

/**
 * REPEATABLEVALUES
 * Return a specific field from multiple repeatable items
 * @param {Object} repeatableVariable The repeatable field variable
 * @param {String} repeatableDataName The data name of the repeatable field for `repeatableVariable`
 * @param {String} dataName The data name of the field to extract from each repeatable item
 * @returns {Array} An array of values of the `dataName` field from each item
 * @example
 * // returns [1,2,3]
 * REPEATABLEVALUES($repeatable_field, 'items', 'cost')
 */
function REPEATABLEVALUES() {}


////REPEATABLESUM

/**
 * REPEATABLESUM
 * Return the sum of a specific numeric field across multiple repeatable items
 * @param {Object} repeatableVariable The repeatable field variable
 * @param {String} repeatableDataName The data name of the repeatable field for `repeatableVariable`
 * @param {String} dataName The data name of the field to extract from each repeatable item
 * @returns {Number} The sum of the `dataName` field within each repeatable item
 * @example
 * // returns 6
 * REPEATABLESUM($repeatable_field, 'items', 'cost')
 */
function REPEATABLESUM() {}


////REPLACE

/**
 * REPLACE
 * Replaces a piece of a text string with a different string.
 * @param {String} text A piece of text to be searched.
 * @param {Number} start_position Position within the string to begin the search.
 * @param {Number} num_characters Number of characters in original string to be replaced.
 * @param {String} replacement String to replace `num_characters` with.
 * @returns {String}
 * @example
 * // returns Fulcrum is a great platform
 * REPLACE("Fulcrum is a good platform", 14, 4, "great")
 */
function REPLACE() {}


////RIGHT

/**
 * RIGHT
 * Returns a substring from the end of a given string.
 * @param {String} value The string value from which the right portion will be returned.
 * @param {Number} [number_of_characters=1] The number of characters to return from the right side of the string.
 * @returns {String}
 * @example
 * // returns crum
 * RIGHT("Fulcrum", 4)
 * @example
 * // returns m
 * RIGHT("Fulcrum")
 */
function RIGHT() {}


////ROUND

/**
 * ROUND
 * Rounds a number to a specified number of decimal places according to standard rounding rules.
 * @param {Number} value The value to be rounded to `places`.
 * @param {Number} places The number of decimal places to which to round `value`.
 * @returns {Number}
 * @example
 * // returns 179.8
 * ROUND(179.848, 1)
 * @example
 * // returns 900
 * ROUND(918.268, -2)
 */
function ROUND() {}


////ROUNDDOWN

/**
 * ROUNDDOWN
 * Rounds a number down to a desired number of decimal places.
 * @param {Number} value The value to round down.
 * @param {Number} places The number of places to which to round down.
 * @returns {Number}
 * @example
 * // returns 156.82
 * ROUNDDOWN(156.826, 2)
 * @example
 * // returns 156
 * ROUNDDOWN(156.826, 0)
 */
function ROUNDDOWN() {}


////ROUNDUP

/**
 * ROUNDUP
 * Rounds a number up to a desired number of decimal places.
 * @param {Number} value The value to round up.
 * @param {Number} places The number of places to which to round up.
 * @returns {Number}
 * @example
 * // returns 156.83
 * ROUNDUP(156.826, 2)
 * @example
 * // returns 157
 * ROUNDUP(156.826, 0)
 */
function ROUNDUP() {}


////SEARCH

/**
 * SEARCH
 * Returns the position at which a specified string is first found within a block of text. Ignores case.
 * @param {String} search_for String to search for within `text_to_search`.
 * @param {String} text_to_search Text to search for the first instance of `search_for`.
 * @param {Number} starting_at argument Position index to begin the search.
 * @returns {Number}
 * @example
 * // returns 37
 * SEARCH("collect", "Data analysts love Fulcrum for data collection needs", 12)
 */
function SEARCH() {}


////SETRESULT

/**
 * SETRESULT
 * Sets the current result value for the current expression. This is useful in multiline expressions to set the result value.
 * @param {*} value the value to set as the result of the expression
 * @returns {*} the current result value after the value has been set
 * @example
 * // returns 1
 * SETRESULT(1)
 */
function SETRESULT() {}


////SHOWERRORS

/**
 * SHOWERRORS
 * Description
 * @param {Boolean} [show=true] Show full error messages. This can help diagnose problems in expressions on the mobile device.
 * @returns {Boolean}
 * @example
 * // returns true
 * SHOWERRORS()
 */
function SHOWERRORS() {}


////SIGN

/**
 * SIGN
 * Returns the sign of a given input number. `-1` if negative, `1` if positive, `0` if zero.
 * @param {Number} value The value to return the sign of.
 * @returns {Number}
 * @example
 * // returns 1
 * SIGN(43)
 * @example
 * // returns -1
 * SIGN(-3)
 */
function SIGN() {}


////SIN

/**
 * SIN
 * Returns the sine of a value, in radians.
 * @param {Number} value The value for which to calculate the sine.
 * @returns {Number}
 * @example
 * // returns -0.9880316240928618
 * SIN(30)
 */
function SIN() {}


////SINH

/**
 * SINH
 * Returns the hyperbolic sine of a number
 * @param {Number} value The value for which to calculate the hyperbolic sine.
 * @returns {Number}
 * @example
 * // returns 1.1752011936438014
 * SINH(1)
 */
function SINH() {}


////SQRT

/**
 * SQRT
 * Calculates the square root of a given number.
 * @param {Number} value The number for which to calculate the square root.
 * @returns {Number}
 * @example
 * // returns 2.23606797749979
 * SQRT(5)
 * @example
 * // returns NaN
 * SQRT(-9)
 */
function SQRT() {}


////SQRTPI

/**
 * SQRTPI
 * Calculates the square root of the product of Pi and a given number.
 * @param {Number} value The value to multiply with Pi and return the square root.
 * @returns {Number}
 * @example
 * // returns 4.3416075273496055
 * SQRTPI(6)
 */
function SQRTPI() {}


////STATUS

/**
 * STATUS
 * Returns the current record status value.
 * @returns {String}
 * @example
 * // returns approved
 * STATUS()
 */
function STATUS() {}


////STATUSLABEL

/**
 * STATUSLABEL
 * Returns the current record status label.
 * @returns {String}
 * @example
 * // returns Approved
 * STATUSLABEL()
 */
function STATUSLABEL() {}


////SUBSTITUTE

/**
 * SUBSTITUTE
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * SUBSTITUTE()
 */
function SUBSTITUTE() {}


////SUM

/**
 * SUM
 * Calculates the sum of a range of values.
 * @param {...Number} var_args_values Values to add together.
 * @returns {Number}
 * @example
 * // returns 219
 * SUM(4, 10, 22, 183)
 */
function SUM() {}


////SUMSQ

/**
 * SUMSQ
 * Calculates the sum of the squares of a range of values.
 * @param {Number} var_args_values Values to square and sum.
 * @returns {Number}
 * @example
 * // returns 50
 * SUMSQ(3, 4, 5)
 */
function SUMSQ() {}


////T

/**
 * T
 * Returns string as text.
 * @param {String} value The string to convert to text.
 * @returns {String}
 * @example
 * // returns Fulcrum
 * T("Fulcrum")
 */
function T() {}


////TIMEZONE

/**
 * TIMEZONE
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * TIMEZONE()
 */
function TIMEZONE() {}


////TRIM

/**
 * TRIM
 * Strips the leading and trailing spaces from a string.
 * @param {String} value argument
 * @returns {String}
 * @example
 * // returns Fulcrum is cross-platform
 * TRIM("  Fulcrum is cross-platform ")
 */
function TRIM() {}


////TRUE

/**
 * TRUE
 * Returns the boolean value `true`.
 * @returns {Boolean}
 * @example
 * // returns true
 * TRUE()
 */
function TRUE() {}


////TYPEOF

/**
 * TYPEOF
 * Returns the type of a value
 * @param {*} value A value to get the type of
 * @returns {String} The type of the value
 * @example
 * // returns string
 * TYPEOF('test')
 * @example
 * // returns number
 * TYPEOF(1)
 * @example
 * // returns boolean
 * TYPEOF(true)
 * @example
 * // returns null
 * TYPEOF(null)
 * @example
 * // returns date
 * TYPEOF(new Date)
 * @example
 * // returns object
 * TYPEOF({ name: 'Test' })
 * @example
 * // returns array
 * TYPEOF([1, 2, 3])
 */
function TYPEOF() {}


////UPPER

/**
 * UPPER
 * Converts a specified string to uppercase.
 * @param {String} value The string to convert to uppercase.
 * @returns {String}
 * @example
 * // returns EMPIRE STATE BUILDING
 * UPPER("Empire State Building")
 */
function UPPER() {}


////VERSIONINFO

/**
 * VERSIONINFO
 * Returns version information about the app.
 * @returns {String}
 * @example
 * // returns Apple iPhone6,2, iOS 8.1, Fulcrum 2.7.0 2162
 * VERSIONINFO()
 */
function VERSIONINFO() {}


////YEAR

/**
 * YEAR
 * Returns the year of a given date.
 * @param {Date} date a date
 * @returns {Number}
 * @example
 * // returns 2015
 * YEAR("2015/1/1")
 */
function YEAR() {}


////X_ISNEW

/**
 * X_ISNEW
 * Returns a boolean indicating whether the current feature (record or repeatable item) is new. It returns false if it's being updated.
 * @returns {Boolean}
 * @example
 * // returns true
 * X_ISNEW()
 */
function X_ISNEW() {}


////X_ISUPDATE

/**
 * X_ISUPDATE
 * Returns a boolean indicating whether the current feature (record or repeatable item) is being updated. It returns false if it's a new record.
 * @returns {Boolean}
 * @example
 * // returns false
 * X_ISUPDATE()
 */
function X_ISUPDATE() {}
