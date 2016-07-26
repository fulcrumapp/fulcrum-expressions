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


////ARRAY

/**
 * ARRAY
 * Returns an array from its arguments, combining and flattening multiple arrays into a single array. It always returns an array regardless of the types and formats of the arguments.
 * @param {...*} var_args_expressions Arrays or values to create an array from
 * @returns {Array}
 * @example
 * // returns [1,2,3]
 * ARRAY(1, 2, 3)
 * @example
 * // returns [1,2,3]
 * ARRAY([1, 2, 3])
 * @example
 * // returns [1,2,3,4,5,6,7,8]
 * ARRAY([1, 2, 3, [4, 5], [6, [7, 8]]])
 * @example
 * // returns []
 * ARRAY()
 * @example
 * // returns []
 * ARRAY([])
 * @example
 * // returns [1,2,3,4]
 * ARRAY(ARRAY(ARRAY([1, 2, ARRAY(3, 4)])))
 */
function ARRAY() {}


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
 * // returns "A"
 * CHAR(65)
 * @example
 * // returns "Թ"
 * CHAR(1337)
 */
function CHAR() {}


////CHOICEVALUE

/**
 * CHOICEVALUE
 * Returns the selected value for a choice field or classification field
 * @param {Object} field The choice field or classification field
 * @returns {String} the selected value
 * @example
 * // returns "Red"
 * CHOICEVALUE($choice_field)
 */
function CHOICEVALUE() {}


////CHOICEVALUES

/**
 * CHOICEVALUES
 * Returns the selected values for a choice field or classification field
 * @param {Object} field The choice field or classification field
 * @returns {String} the selected value
 * @example
 * // returns ["Red","Green","Blue"]
 * CHOICEVALUES($choice_field)
 */
function CHOICEVALUES() {}


////CLEAN

/**
 * CLEAN
 * Returns the text with the non-printable ASCII characters removed.
 * @param {String} text The text whose non-printable characters are to be removed.
 * @returns {String}
 * @example
 * // returns "Test"
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
 * // returns "Test"
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
 *
 * **NOTE:** This can only be used on fields that store the values as a string. Fields like choice fields and classification sets store the values in an array. Please refer [this example](/expressions/examples/combine-arrays/) for combining arrays.
 * @param {...String} var_args_values Strings to append in sequence.
 * @returns {String}
 * @example
 * // returns "This is a sentence."
 * CONCATENATE("This ", "is ", "a ", "sentence.")
 * @example
 * // returns "42311"
 * CONCATENATE(42, 31, 1)
 * @example
 * // returns "Age is 42"
 * CONCATENATE("Age ", "is ", 42)
 */
function CONCATENATE() {}


////CONCAT

/**
 * CONCAT
 * Returns the concatenation of multiple values. Alias for CONCATENATE()
 *
 * **NOTE:** This can only be used on fields that store the values as a string. Fields like choice fields and classification sets store the values in an array.
 * @param {...String} var_args_values Strings to append in sequence.
 * @returns {String}
 * @example
 * // returns "This is a sentence."
 * CONCAT("This ", "is ", "a ", "sentence.")
 * @example
 * // returns "42311"
 * CONCAT(42, 31, 1)
 * @example
 * // returns "Age is 42"
 * CONCAT("Age ", "is ", 42)
 */
function CONCAT() {}


////CONTAINS

/**
 * CONTAINS
 * Determines whether an array or string contains a given value
 * @param {Array|String} haystack The array of values or string to check
 * @param {String} needle The value to look for
 * @param {Number} fromIndex The starting index to use
 * @returns {Boolean} true if the value is found
 * @example
 * // returns true
 * CONTAINS("abcd", "a")
 * @example
 * // returns true
 * CONTAINS(['a', 'b', 'c', 'd'], 'b')
 * @example
 * // returns false
 * CONTAINS("abcd", "e")
 */
function CONTAINS() {}


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
 * // returns "US"
 * COUNTRY()
 */
function COUNTRY() {}


////CURRENCYCODE

/**
 * CURRENCYCODE
 * Returns the currency code for the current device locale
 * @returns {String} the ISO 4217 currency code according to the current device settings
 * @example
 * // returns "USD"
 * CURRENCYCODE()
 */
function CURRENCYCODE() {}


////CURRENCYSYMBOL

/**
 * CURRENCYSYMBOL
 * Returns the currency symbol for the current device locale
 * @returns {String} the currency symbol
 * @example
 * // returns "$"
 * CURRENCYSYMBOL()
 */
function CURRENCYSYMBOL() {}


////DATANAMES

/**
 * DATANAMES
 * Returns the data names of the form fields
 * @param {String} [type=null] Optional field type
 * @returns {Array}
 * @example
 * // returns ["name","items","cost"]
 * DATANAMES()
 * @example
 * // returns ["items"]
 * DATANAMES('Repeatable')
 */
function DATANAMES() {}


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
 * @param {Date} value a date to extract the day from
 * @returns {Number}
 * @example
 * // returns 31
 * DAY('2015-12-31')
 */
function DAY() {}


////DECIMALSEPARATOR

/**
 * DECIMALSEPARATOR
 * Returns the current decimal separator given the current device locale
 * @returns {String} the current decimal separator
 * @example
 * // returns "."
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


////DESCRIPTION

/**
 * DESCRIPTION
 * Returns the description of a given field
 * @param {String} field the Data Name of the field
 * @returns {*} the field description
 * @example
 * // returns "Enter the name"
 * DESCRIPTION('name')
 */
function DESCRIPTION() {}


////DOLLAR

/**
 * DOLLAR
 * Formats a number into a locale-specific currency format. This function is useful when including a currency amount in a longer piece of text. To display just a currency in a calculated field, it's recommended to set the display type of the calculated field to 'Currency' and just return a number in the expression. When the display type of the calculated field is set to currency, the number is automatically displayed as a formatted currency.
 * @param {Number} value a dollar amount
 * @param {Number} [decimals=2] the number of decimal places (default is 2)
 * @param {String} [currency=locale default] the currency code to display (e.g. USD, EUR, or AUD)
 * @param {String} [language=locale default] the language locale used to format the currency. (e.g. en-US, pt-BR, or en-GB)
 * @returns {String} formatted currency
 * @example
 * // returns "$1,234.57"
 * DOLLAR(1234.567)
 * @example
 * // returns "1 234,57 $US"
 * // USD formatted in French
 * DOLLAR(1234.567, 2, 'USD', 'fr-FR')
 * @example
 * // returns "€1.234,57"
 * // Euro formatted in Portuguese
 * DOLLAR(1234.567, 2, 'EUR', 'pt-BR')
 */
function DOLLAR() {}


////EMAIL

/**
 * EMAIL
 * Returns the email address of the current user
 * @returns {String}
 * @example
 * // returns "test@example.com"
 * EMAIL()
 */
function EMAIL() {}


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


////EXISTS

/**
 * EXISTS
 * Tests whether a value exists
 * @param {...Object} var_args_values The value(s) to check for existence
 * @returns {Boolean}
 * @example
 * // returns true
 * EXISTS(1)
 * @example
 * // returns false
 * EXISTS(null)
 * @example
 * // returns false
 * EXISTS([])
 */
function EXISTS() {}


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


////FIELDTYPE

/**
 * FIELDTYPE
 * Returns the field type of a field by its data name
 * @param {String} dataName The data name of the field
 * @returns {String}
 * @example
 * // returns "Repeatable"
 * FIELDTYPE('items')
 * @example
 * // returns "TextField"
 * FIELDTYPE('name')
 */
function FIELDTYPE() {}


////FIND

/**
 * FIND
 * Returns the position at which a string is first found within text, case-sensitive.
 * @param {String} search_for String to search for within `text_to_search`.
 * @param {String} text_to_search Text to search for the first instance of `search_for`.
 * @param {Number} starting_at argument Position index to begin the search.
 * @returns {Number}
 * @example
 * // returns 5
 * FIND("needle", "the needle is in the haystack")
 */
function FIND() {}


////FIRST

/**
 * FIRST
 * Returns the first N items from an array or string
 * @param {Array} array an array object
 * @param {Number} [count=1] The number of items to return
 * @returns {Object}
 * @example
 * // returns 1
 * FIRST([1, 2, 3])
 * @example
 * // returns ["a","b"]
 * FIRST(['a', 'b', 'c'], 2)
 * @example
 * // returns "a"
 * FIRST('abc')
 * @example
 * // returns ["a","b"]
 * FIRST('abc', 2)
 */
function FIRST() {}


////FIXED

/**
 * FIXED
 * Formats a number with a fixed number of decimal places.
 * @param {Number} value Number to format.
 * @param {Number} number_of_places Number of decimal places to display in the result.
 * @param {Boolean} value Whether or not to suppress the thousands separator.
 * @returns {String}
 * @example
 * // returns "3000.14"
 * FIXED(3000.141592, 2, true)
 * @example
 * // returns "6,276.222"
 * FIXED(6276.22241, 3, false)
 */
function FIXED() {}


////FLATTEN

/**
 * FLATTEN
 * Flatten nested arrays into a flat array
 * @param {Array} value Array to flatten
 * @returns {Array}
 * @example
 * // returns [1,2,3]
 * FLATTEN([[1, 2, 3]])
 * @example
 * // returns [1,2,3,4,5,6]
 * FLATTEN([[1, 2, 3], [4, 5, 6]])
 */
function FLATTEN() {}


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


////FORMAT

/**
 * FORMAT
 * Formats a string
 * @param {String} value string format. Use %s for strings and %d for numbers.
 * @param {...*} var_args_values Value(s) to substitute into the format string
 * @returns {String} formatted string
 * @example
 * // returns "The pole height is 20 meters and has 3 issues detected."
 * FORMAT('The pole height is %d meters and has %d issues detected.', 20, 3)
 * @example
 * // returns "11/11/2015 12:30:30"
 * FORMAT('%s/%s/%s %s:%s:%s', 11, 11, 2015, 12, 30, 30)
 */
function FORMAT() {}


////FORMATNUMBER

/**
 * FORMATNUMBER
 * Formats a number in a given locale. This function is useful when including a number in a longer piece of text. To display just a number in a calculated field, it's recommended to set the display type of the calculated field to 'Number' and just return a number in the expression. When the display type of the calculated field is set to 'Number', the number is automatically displayed as a formatted number.
 * @param {Number} value argument
 * @param {String} [language=locale default] the BCP 47 language identifier to use when formatting the number. e.g. `en-US`, `fr-FR`, `en-AU` or `pt-BR`
 * @returns {String} formatted number as text
 * @example
 * // returns "1,234.568"
 * FORMATNUMBER(1234.56789999)
 * @example
 * // returns "1 234,568"
 * FORMATNUMBER(1234.56789999, 'fr-FR')
 * @example
 * // returns "1.234,568"
 * FORMATNUMBER(1234.56789999, 'pt-BR')
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


////GROUP

/**
 * GROUP
 * Returns the sorted values within an array
 * @param {Array} values The values to sort
 * @param {Function} [callback] A transform function to use when sorting objects
 * @returns {Array}
 * @example
 * // returns {"red":["red"],"green":["green","green"],"blue":["blue"]}
 * GROUP(['red', 'green', 'green', 'blue'])
 * @example
 * // returns {"1":[1,1,1],"2":[2],"3":[3]}
 * GROUP([1, 1, 1, 2, 3])
 */
function GROUP() {}


////GROUPINGSEPARATOR

/**
 * GROUPINGSEPARATOR
 * Returns the currency thousands separator for the current device locale
 * @returns {String}
 * @example
 * // returns ","
 * GROUPINGSEPARATOR()
 */
function GROUPINGSEPARATOR() {}


////GROUPINGSIZE

/**
 * GROUPINGSIZE
 * Returns the number of digits between the grouping separators for numbers in the current device locale. e.g. 3 if the current locale uses a thousands separator
 * @returns {Number} The number of digits used for the grouping separator.
 * @example
 * // returns 3
 * GROUPINGSIZE()
 */
function GROUPINGSIZE() {}


////HASOTHER

/**
 * HASOTHER
 * Tests whether a choice field or classification field has an 'Other' value entered
 * @param {Object} field the choice field or classification to test
 * @returns {Boolean}
 * @example
 * // returns false
 * HASOTHER($choice_field)
 */
function HASOTHER() {}


////IF

/**
 * IF
 * Returns one value if a logical expression is true and another if it is false.
 * @param {*} value logical expression
 * @param {*} value_if_true The value to return if the expression is true
 * @param {*} value_if_false The value to return if the expression is false
 * @returns {*}
 * @example
 * // returns "1 is less than 3"
 * IF(1 > 3, '1 is greater than 3', '1 is less than 3')
 * @example
 * // returns "Red is selected"
 * IF(ISSELECTED($choice_field, 'Red'), 'Red is selected', 'Red is not selected')
 */
function IF() {}


////IFERROR

/**
 * IFERROR
 * Returns the first argument if it is not an error value, otherwise returns the second argument if present, or a blank if the second argument is absent.
 * @param {*} value value
 * @param {*} value_if_error the value to return if the first value is an error
 * @returns {*}
 * @example
 * // returns 1
 * IFERROR(new Error('This is an error'), 1)
 */
function IFERROR() {}


////INSPECT

/**
 * INSPECT
 * Returns the string representation of a value. This function is useful for troubleshooting expressions.
 * @param {Number} value The value to inspect
 * @returns {String}
 * @example
 * // returns "[ 1, 2, 3 ]"
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
 * Checks whether the value is an error
 * @param {*} value a value
 * @returns {Boolean}
 * @example
 * // returns true
 * ISERR(new Error)
 * @example
 * // returns false
 * ISERR(1)
 */
function ISERR() {}


////ISERROR

/**
 * ISERROR
 * Checks whether the value is an error
 * @param {Number} value a value
 * @returns {Boolean}
 * @example
 * // returns true
 * ISERROR(new Error)
 * @example
 * // returns false
 * ISERROR(1)
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
 * Test whether a value is not a number
 * @param {Number} value a value
 * @returns {Boolean}
 * @example
 * // returns true
 * ISNAN(NaN)
 * @example
 * // returns true
 * ISNAN('aaa' / 7)
 * @example
 * // returns false
 * ISNAN(7)
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


////LABEL

/**
 * LABEL
 * Returns the label of a given field
 * @param {String} field the Data Name of the field
 * @returns {*} the label of the field
 * @example
 * // returns "Name"
 * LABEL('name')
 */
function LABEL() {}


////LANGUAGE

/**
 * LANGUAGE
 * Returns the language code for the current device locale
 * @returns {String} the BCP 47 language code
 * @example
 * // returns "en-US"
 * LANGUAGE()
 */
function LANGUAGE() {}


////LAST

/**
 * LAST
 * Returns the last N items from an array or string
 * @param {Array} array an array object
 * @param {Number} [count=1] The number of items to return
 * @returns {Object}
 * @example
 * // returns 3
 * LAST([1, 2, 3])
 * @example
 * // returns ["b","c"]
 * LAST(['a', 'b', 'c'], 2)
 * @example
 * // returns "c"
 * LAST('abc')
 * @example
 * // returns ["b","c"]
 * LAST('abc', 2)
 */
function LAST() {}


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
 * // returns "Ful"
 * LEFT("Fulcrum", 3)
 * @example
 * // returns "F"
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
 * Returns the current locale code
 * @returns {String} the current locale
 * @example
 * // returns "en_US"
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
 * // returns "empire state building"
 * LOWER("Empire State Building")
 */
function LOWER() {}


////LPAD

/**
 * LPAD
 * Pads a string on the left side
 * @param {String} value The string to pad
 * @param {Number} count The number of characters to pad
 * @param {String} [character=' '] The character to use for padding
 * @returns {String}
 * @example
 * // returns "0002"
 * LPAD('2', 4, '0')
 * @example
 * // returns "000002"
 * LPAD('2', 6, '0')
 */
function LPAD() {}


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
 * // returns "iOS"
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
 * Converts any value to a number
 * @param {*} value a value to convert to a number
 * @returns {Number}
 * @example
 * // returns 12
 * NUM('12')
 * @example
 * // returns 12
 * NUM(12)
 * @example
 * // returns NaN
 * NUM('a')
 */
function NUM() {}


////NUMS

/**
 * NUMS
 * Converts multiple parameters to an array of numbers
 * @param {...*} var_args_values the values to convert to numbers
 * @returns {Number}
 * @example
 * // returns [1,2,3]
 * NUMS('1' ,'2', '3')
 * @example
 * // returns [1,2,null]
 * NUMS('1' ,'2', 'a')
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
 * Returns a value once, given the current value. This is useful to perform a calculation only once, the first time it's evaluated.
 * @param {Number} value argument
 * @returns {Number}
 * @example
 * // returns "Apple iPhone6,2, iOS 8.1, Fulcrum 2.7.0 2162"
 * ONCE(VERSIONINFO())
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
 * Returns the current 'Other' value for a choice field or classification field
 * @param {Object} field The choice field or classification field variable
 * @returns {String} the current 'Other' value
 * @example
 * // returns undefined
 * OTHER($choice_field)
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


////PLUCK

/**
 * PLUCK
 * Extract property values from an object
 * @param {Array} array An array of objects to extract properties from
 * @param {String} property The property name to extract
 * @returns {Object}
 * @example
 * // returns [1,2,3]
 * var objects = [{name: 'one',   value: 1},
 *                {name: 'two',   value: 2},
 *                {name: 'three', value: 3}];
 * PLUCK(objects, 'value')
 */
function PLUCK() {}


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
 * Returns the precision of a number
 * @param {Number} value a number
 * @returns {Number} the number of decimal places
 * @example
 * // returns 3
 * PRECISION(1.333)
 * @example
 * // returns 1
 * PRECISION(1.3)
 * @example
 * // returns 0
 * PRECISION(1)
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


////PROJECTID

/**
 * PROJECTID
 * Returns the project ID of the record
 * @returns {String}
 * @example
 * // returns "88eb3511-13d8-4666-b188-8108019d0984"
 * PROJECTID()
 */
function PROJECTID() {}


////PROJECTNAME

/**
 * PROJECTNAME
 * Returns the project name of the record
 * @returns {String}
 * @example
 * // returns "Project X"
 * PROJECTNAME()
 */
function PROJECTNAME() {}


////PROPER

/**
 * PROPER
 * Capitalizes each word in a string (title case).
 * @param {String} value String to capitalize words within.
 * @returns {String}
 * @example
 * // returns "Fulcrum Mobile Data Collection"
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


////RECORDID

/**
 * RECORDID
 * Returns the ID of the current record. This function will always return the top level record ID even when used inside a repeatable. To get the repeatable item ID, use the `REPEATABLEID` function.
 * @returns {String} The ID of the current record
 * @example
 * // returns "96eb35f5-13d8-4666-b188-8108019d0984"
 * RECORDID()
 */
function RECORDID() {}


////REPEATABLEID

/**
 * REPEATABLEID
 * Returns the ID of the current repeatable item.
 * @returns {String} The ID of the current repeatable item
 * @example
 * // returns "859fdb06-4e7d-4bed-b1d2-af168db71522"
 * REPEATABLEID()
 */
function REPEATABLEID() {}


////REPEATABLENUMBER

/**
 * REPEATABLENUMBER
 * Returns the sequential number of a repeatable item.
 * @returns {Number} The ordinal of this repeatable item within the repeatable
 * @example
 * // returns 4
 * REPEATABLENUMBER()
 */
function REPEATABLENUMBER() {}


////REPEATABLEVALUES

/**
 * REPEATABLEVALUES
 * Return a specific field from multiple repeatable items
 * @param {Object} repeatableVariable The repeatable field variable
 * @param {String} dataName The data name of the field to extract from each repeatable item
 * @returns {Array} An array of values of the `dataName` field from each item
 * @example
 * // returns [1,2,3]
 * REPEATABLEVALUES($repeatable_field, 'cost')
 */
function REPEATABLEVALUES() {}


////REPEATABLESUM

/**
 * REPEATABLESUM
 * Return the sum of a specific numeric field across multiple repeatable items
 * @param {Object} repeatableVariable The repeatable field variable
 * @param {String} dataName The data name of the field to extract from each repeatable item
 * @returns {Number} The sum of the `dataName` field within each repeatable item
 * @example
 * // returns 6
 * REPEATABLESUM($repeatable_field, 'cost')
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
 * // returns "Data collection inspection"
 * // replaces 'survey' with 'inspection'
 * REPLACE("Data collection survey", 17, 6, "inspection")
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
 * // returns "DEFG"
 * RIGHT("ABCDEFG", 4)
 * @example
 * // returns "1"
 * RIGHT("000001")
 */
function RIGHT() {}


////ROLE

/**
 * ROLE
 * Returns the role name of the current user
 * @returns {String}
 * @example
 * // returns "Owner"
 * ROLE()
 */
function ROLE() {}


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


////RPAD

/**
 * RPAD
 * Pads a string on the right side
 * @param {String} value The string to pad
 * @param {Number} count The number of characters to pad
 * @param {String} [character=' '] The character to use for padding
 * @returns {String}
 * @example
 * // returns "2000"
 * RPAD('2', 4, '0')
 * @example
 * // returns "200000"
 * RPAD('2', 6, '0')
 */
function RPAD() {}


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
 * Enable verbose errors to displays in the app. This is useful for troubleshooting complex expressions.
 * @param {Boolean} [show=true] Show full error messages. This can help diagnose problems in expressions on the mobile device.
 * @returns {Boolean}
 * @example
 * // returns true
 * SHOWERRORS()
 */
function SHOWERRORS() {}


////SHUFFLE

/**
 * SHUFFLE
 * Randomizes an array of items
 * @param {Array} value an array of items to randomize
 * @returns {Array}
 * @example
 * // returns true
 * var items = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
 * INSPECT(SHUFFLE(items)) != INSPECT(items[0])
 */
function SHUFFLE() {}


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


////SORT

/**
 * SORT
 * Returns the sorted values within an array
 * @param {Array} values The values to sort
 * @param {Function} [callback] A transform function to use when sorting objects
 * @returns {Array}
 * @example
 * // returns [1,1,2,3,3]
 * SORT([1, 2, 3, 3, 1])
 * @example
 * // returns ["a","a","b","b","c"]
 * SORT(['a', 'c', 'b', 'a', 'b'])
 */
function SORT() {}


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
 * // returns "approved"
 * STATUS()
 */
function STATUS() {}


////STATUSLABEL

/**
 * STATUSLABEL
 * Returns the current record status label.
 * @returns {String}
 * @example
 * // returns "Approved"
 * STATUSLABEL()
 */
function STATUSLABEL() {}


////SUBSTITUTE

/**
 * SUBSTITUTE
 * Replaces existing text with new text in a string.
 * @param {String} text A text value to look in
 * @param {String} search_for A text value to replace
 * @param {String} replace_with A text value to replace it with
 * @param {String} occurrence The instance of the search text to replace (e.g. 4 will only replace the 4th instance)
 * @returns {String} the new text string
 * @example
 * // returns "The record data is stored in a record database"
 * // replaces all occurrences
 * SUBSTITUTE('The data is stored in a database', 'data', 'record data')
 * @example
 * // returns "The record data is stored in a database"
 * // replaces the first occurrence
 * SUBSTITUTE('The data is stored in a database', 'data', 'record data', 1)
 * @example
 * // returns "The data is stored in a record database"
 * // replaces the 2nd occurrence
 * SUBSTITUTE('The data is stored in a database', 'data', 'record data', 2)
 * @example
 * // returns "The dAtA is stored in A dAtAbAse"
 * SUBSTITUTE('The data is stored in a database', 'a', 'A')
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
 * // returns "Fulcrum"
 * T("Fulcrum")
 */
function T() {}


////TIMEADD

/**
 * TIMEADD
 * Adds an amount of time to a given time
 * @param {String} startTimeField The time field containing the start time
 * @param {Number} amount The amount of time to add to the given time (number of minutes or hours)
 * @param {String} [format='hours'] The format of the amount. Either `hours` (default) or `minutes`.
 * @returns {String} the new time value
 * @example
 * // returns "17:00"
 * TIMEADD('09:00', 8)
 * @example
 * // returns "09:00"
 * TIMEADD('17:00', -8)
 * @example
 * // returns "09:00"
 * TIMEADD('09:00', 48)
 * @example
 * // returns "17:30"
 * TIMEADD('16:00', 1.5)
 * @example
 * // returns "17:30"
 * TIMEADD('16:00', 90, 'minutes')
 * @example
 * // returns "14:30"
 * TIMEADD('16:00', -90, 'minutes')
 */
function TIMEADD() {}


////TIMEDIFF

/**
 * TIMEDIFF
 * Returns the difference between 2 time fields
 * @param {String} startTimeField The time field containing the start time
 * @param {String} endTimeField The time field containing the end time
 * @param {String} [format='hours'] The format of the output. Either `hours` (default) or `minutes`.
 * @returns {Number} The number of hours (default) or the number of minutes between the 2 specified times
 * @example
 * // returns 8
 * TIMEDIFF('09:00', '17:00')
 * @example
 * // returns 120
 * TIMEDIFF('09:00', '11:00', 'minutes')
 * @example
 * // returns 23
 * TIMEDIFF('02:00', '01:00')
 * @example
 * // returns "47 minutes"
 * // This returns the time elapsed in the format '__ hours __ minutes'
 * // (or '__ hours', '1 hour __ minutes', etc.)
 * // Other tests:
 * // start_time => '03:30', stop_stop => '04:30', returns '1 hour'
 * // start_time => '02:15', stop_stop => '03:16', returns '1 hour 1 minute'
 * // start_time => '01:00', stop_stop => '01:00', returns '24 hours'
 *
 * var time = TIMEDIFF('09:22', '10:09', 'minutes');
 * var hours = FLOOR((time / 60), 1);
 * var minutes = time % 60;
 *
 * if ( hours < 1 && minutes < 1 ) {
 *     SETRESULT('N/A');
 * }
 * else if ( hours == 1 && minutes < 1 ) {
 *     SETRESULT('1 hour');
 * }
 * else if ( hours > 1 && minutes < 1 ) {
 *     SETRESULT(hours + ' hours');
 * }
 * else if ( hours < 1 && minutes == 1 ) {
 *     SETRESULT('1 minute');
 * }
 * else if ( hours == 1 && minutes == 1 ) {
 *     SETRESULT('1 hour 1 minute');
 * }
 * else if ( hours > 1 && minutes == 1 ) {
 *     SETRESULT(hours + ' hours 1 minute');
 * }
 * else if ( hours < 1 && minutes > 1 ) {
 *     SETRESULT(minutes + ' minutes');
 * }
 * else if ( hours == 1 && minutes > 1 ) {
 *     SETRESULT('1 hour ' + minutes + ' minutes');
 * }
 * else if ( hours > 1 && minutes > 1 ) {
 *     SETRESULT(hours + ' hours ' + minutes + ' minutes');
 * }
 * else {
 *     SETRESULT('');
 * }
 */
function TIMEDIFF() {}


////TIMESTAMP

/**
 * TIMESTAMP
 * Returns a formatted timestamp
 * @returns {String}
 * @example
 * // returns "1982-12-16 03:24:00"
 * TIMESTAMP(new Date('December 16, 1982 03:24:00'))
 */
function TIMESTAMP() {}


////TIMEZONE

/**
 * TIMEZONE
 * Returns the timezone according to the current device settings
 * @returns {String}
 * @example
 * // returns "America/New_York"
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
 * // returns "Fulcrum is cross-platform"
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
 * // returns "string"
 * TYPEOF('test')
 * @example
 * // returns "number"
 * TYPEOF(1)
 * @example
 * // returns "boolean"
 * TYPEOF(true)
 * @example
 * // returns "null"
 * TYPEOF(null)
 * @example
 * // returns "date"
 * TYPEOF(new Date)
 * @example
 * // returns "object"
 * TYPEOF({ name: 'Test' })
 * @example
 * // returns "array"
 * TYPEOF([1, 2, 3])
 */
function TYPEOF() {}


////UNIQUE

/**
 * UNIQUE
 * Returns the unique values within an array
 * @param {Array} values The values to unique
 * @param {Function} [callback] A transform function to use when passing objects
 * @returns {Array}
 * @example
 * // returns [1,2,3]
 * UNIQUE([1, 2, 3, 3, 1])
 * @example
 * // returns ["blue","red","green"]
 * UNIQUE(['blue', 'red', 'red', 'green', 'blue'])
 */
function UNIQUE() {}


////UPPER

/**
 * UPPER
 * Converts a specified string to uppercase.
 * @param {String} value The string to convert to uppercase.
 * @returns {String}
 * @example
 * // returns "EMPIRE STATE BUILDING"
 * UPPER("Empire State Building")
 */
function UPPER() {}


////USERFULLNAME

/**
 * USERFULLNAME
 * Returns the full name of the current user
 * @returns {String}
 * @example
 * // returns "John Smith"
 * USERFULLNAME()
 */
function USERFULLNAME() {}


////VALUE

/**
 * VALUE
 * Returns the current value of a field given the field's data name
 * @param {String} field the Data Name of the field
 * @returns {*} the current field value
 * @example
 * // returns "Test Record"
 * VALUE('name')
 *
 * // identical to using $name
 */
function VALUE() {}


////VERSIONINFO

/**
 * VERSIONINFO
 * Returns version information about the app.
 * @returns {String}
 * @example
 * // returns "Apple iPhone6,2, iOS 8.1, Fulcrum 2.7.0 2162"
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
