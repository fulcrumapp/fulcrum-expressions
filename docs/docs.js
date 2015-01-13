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
 * Use the {@link DEGREES} function to convert the result of {@link DEGREES} into degrees.
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
 *
 * Related:
 * {@link TANH}
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
 * @param {...*} var_args_expressions An expression or reference that represents some logical value, i.e. TRUE or FALSE, or an expression that can be converted to a logical value.
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
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * COMPACT()
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
 * @param {Number} value The value for which to calculate the cosine. Must be between -1 and 1, inclusive.
 * @returns {Number}
 * @example
 * // returns 0.15425144988758382
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
 * // returns VALUE
 * COSH()
 */
function COSH() {}


////COUNT

/**
 * COUNT
 * Returns a count of the number of numeric values in a dataset.
 * @param {...Number} var_args_values Value to include in the count.
 * @returns {String}
 * @example
 * // returns VALUE
 * COUNT()
 */
function COUNT() {}


////COUNTA

/**
 * COUNTA
 * Returns a count of the number of values in a dataset.
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * COUNTA()
 */
function COUNTA() {}


////COUNTBLANK

/**
 * COUNTBLANK
 * Returns the number of blank values in a dataset.
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * COUNTBLANK()
 */
function COUNTBLANK() {}


////COUNTRY

/**
 * COUNTRY
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * COUNTRY()
 */
function COUNTRY() {}


////CURRENCYCODE

/**
 * CURRENCYCODE
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * CURRENCYCODE()
 */
function CURRENCYCODE() {}


////CURRENCYSYMBOL

/**
 * CURRENCYSYMBOL
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * CURRENCYSYMBOL()
 */
function CURRENCYSYMBOL() {}


////DATE

/**
 * DATE
 * Converts a provided year, month, and day into a date.
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * DATE()
 */
function DATE() {}


////DATEVALUE

/**
 * DATEVALUE
 * Converts a provided date string in a known format to a date value.
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * DATEVALUE()
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


////DAYS360

/**
 * DAYS360
 * Returns the difference between two days based on the 360 day year used in some financial interest calculations.
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * DAYS360()
 */
function DAYS360() {}


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
 * @param {...Number} var_args_values Value to consider to calculate greatest common divisor.
 * @returns {Number}
 * @example
 * // returns 1
 * GCD(5, 9)
 * @example
 * // returns 7
 * GCD(14, 21, 42)
 */
function GCD() {}


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
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * ISEVEN()
 */
function ISEVEN() {}


////ISLOGICAL

/**
 * ISLOGICAL
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * ISLOGICAL()
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


////ISNEW

/**
 * ISNEW
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * ISNEW()
 */
function ISNEW() {}


////ISNONTEXT

/**
 * ISNONTEXT
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * ISNONTEXT()
 */
function ISNONTEXT() {}


////ISNUMBER

/**
 * ISNUMBER
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * ISNUMBER()
 */
function ISNUMBER() {}


////ISODD

/**
 * ISODD
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * ISODD()
 */
function ISODD() {}


////ISTEXT

/**
 * ISTEXT
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * ISTEXT()
 */
function ISTEXT() {}


////ISUPDATE

/**
 * ISUPDATE
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * ISUPDATE()
 */
function ISUPDATE() {}


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
 * Returns the latitude of the current feature (record or repeatable item)
 * @returns {Number}
 * @example
 * // returns 27.770756908186286
 * LATITUDE()
 */
function LATITUDE() {}


////LCM

/**
 * LCM
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * LCM()
 */
function LCM() {}


////LEFT

/**
 * LEFT
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * LEFT()
 */
function LEFT() {}


////LEN

/**
 * LEN
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * LEN()
 */
function LEN() {}


////LN

/**
 * LN
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * LN()
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
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * LOG()
 */
function LOG() {}


////LOG10

/**
 * LOG10
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * LOG10()
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
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * LOWER()
 */
function LOWER() {}


////MATCH

/**
 * MATCH
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * MATCH()
 */
function MATCH() {}


////MAX

/**
 * MAX
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * MAX()
 */
function MAX() {}


////MAXA

/**
 * MAXA
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * MAXA()
 */
function MAXA() {}


////MEDIAN

/**
 * MEDIAN
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * MEDIAN()
 */
function MEDIAN() {}


////MEMOIZED_FACT

/**
 * MEMOIZED_FACT
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * MEMOIZED_FACT()
 */
function MEMOIZED_FACT() {}


////MEMOIZED_FACTDOUBLE

/**
 * MEMOIZED_FACTDOUBLE
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * MEMOIZED_FACTDOUBLE()
 */
function MEMOIZED_FACTDOUBLE() {}


////MID

/**
 * MID
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * MID()
 */
function MID() {}


////MIN

/**
 * MIN
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * MIN()
 */
function MIN() {}


////MINA

/**
 * MINA
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * MINA()
 */
function MINA() {}


////MOD

/**
 * MOD
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * MOD()
 */
function MOD() {}


////N

/**
 * N
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * N()
 */
function N() {}


////NOT

/**
 * NOT
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * NOT()
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
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * ODD()
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
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * OR()
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
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * PI()
 */
function PI() {}


////POWER

/**
 * POWER
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * POWER()
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
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * PRODUCT()
 */
function PRODUCT() {}


////PROPER

/**
 * PROPER
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * PROPER()
 */
function PROPER() {}


////QUOTIENT

/**
 * QUOTIENT
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * QUOTIENT()
 */
function QUOTIENT() {}


////RADIANS

/**
 * RADIANS
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * RADIANS()
 */
function RADIANS() {}


////RAND

/**
 * RAND
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * RAND()
 */
function RAND() {}


////RANDBETWEEN

/**
 * RANDBETWEEN
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * RANDBETWEEN()
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
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * REPLACE()
 */
function REPLACE() {}


////RIGHT

/**
 * RIGHT
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * RIGHT()
 */
function RIGHT() {}


////ROUND

/**
 * ROUND
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * ROUND()
 */
function ROUND() {}


////ROUNDDOWN

/**
 * ROUNDDOWN
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * ROUNDDOWN()
 */
function ROUNDDOWN() {}


////ROUNDUP

/**
 * ROUNDUP
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * ROUNDUP()
 */
function ROUNDUP() {}


////SEARCH

/**
 * SEARCH
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * SEARCH()
 */
function SEARCH() {}


////SELECTED

/**
 * SELECTED
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * SELECTED()
 */
function SELECTED() {}


////SIGN

/**
 * SIGN
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * SIGN()
 */
function SIGN() {}


////SIN

/**
 * SIN
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * SIN()
 */
function SIN() {}


////SINH

/**
 * SINH
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * SINH()
 */
function SINH() {}


////SQRT

/**
 * SQRT
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * SQRT()
 */
function SQRT() {}


////SQRTPI

/**
 * SQRTPI
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * SQRTPI()
 */
function SQRTPI() {}


////STATUS

/**
 * STATUS
 * Returns the current record status
 * @returns {String}
 * @example
 * // returns approved
 * STATUS()
 */
function STATUS() {}


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
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * SUM()
 */
function SUM() {}


////SUMSQ

/**
 * SUMSQ
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * SUMSQ()
 */
function SUMSQ() {}


////T

/**
 * T
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * T()
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
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * TRIM()
 */
function TRIM() {}


////TRUE

/**
 * TRUE
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * TRUE()
 */
function TRUE() {}


////UPPER

/**
 * UPPER
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * UPPER()
 */
function UPPER() {}


////VALUE

/**
 * VALUE
 * Description
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns VALUE
 * VALUE()
 */
function VALUE() {}


////VERSIONINFO

/**
 * VERSIONINFO
 * Returns version information about the app.
 * @returns {String}
 * @example
 * // returns Apple iPhone6,2 iOS 8.1 Fulcrum 2.7.0 2162
 * VERSIONINFO()
 */
function VERSIONINFO() {}
