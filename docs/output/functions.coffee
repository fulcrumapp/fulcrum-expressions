class window.ExpressionFunctions
  @FUNCTIONS: [
    { identifier: "ABS", description: "Returns the absolute value of a number." }
    { identifier: "ACOS", description: "Returns the inverse cosine of a value, in radians." }
    { identifier: "ACOSH", description: "Returns the inverse hyperbolic cosine of a number." }
    { identifier: "AND", description: "Returns true if all of the provided arguments are logically true, and false if any of the provided arguments are logically false." }
    { identifier: "AVERAGE", description: "Returns the numerical average value in a dataset, ignoring text." }
    { identifier: "CEILING", description: "Rounds a number up to the nearest integer multiple of specified significance." }
    { identifier: "CHAR", description: "Convert a number into a character according to the current Unicode table." }
    { identifier: "CLEAN", description: "Returns the text with the non-printable ASCII characters removed." }
    { identifier: "COALESCE", description: "Returns the first parameter whose value exists" }
    { identifier: "CODE", description: "Returns the numeric Unicode map value of the first character in the string provided." }
    { identifier: "COMPACT", description: "Description" }
    { identifier: "CONCATENATE", description: "Returns the concatenation of multiple values." }
    { identifier: "COS", description: "Returns the cosine of a value, in radians." }
    { identifier: "COSH", description: "Returns the hyperbolic cosine of a number." }
    { identifier: "COUNT", description: "Returns a count of the number of numeric values in a dataset." }
    { identifier: "COUNTA", description: "Returns a count of the number of values in a dataset." }
    { identifier: "COUNTBLANK", description: "Returns the number of blank values in a dataset." }
    { identifier: "COUNTRY", description: "Description" }
    { identifier: "CURRENCYCODE", description: "Description" }
    { identifier: "CURRENCYSYMBOL", description: "Description" }
    { identifier: "DATE", description: "Converts a provided year, month, and day into a date." }
    { identifier: "DATEADD", description: "Adds a number of days to a given date" }
    { identifier: "DATEVALUE", description: "Converts a provided date string in a known format to a date value." }
    { identifier: "DAY", description: "Returns the day of the month that a specific date falls on, in numeric format." }
    { identifier: "DAYS360", description: "Returns the difference between two days based on the 360 day year used in some financial interest calculations." }
    { identifier: "DECIMALSEPARATOR", description: "Description" }
    { identifier: "DEGREES", description: "Converts an angle value in radians to degrees." }
    { identifier: "DOLLAR", description: "Formats a number into the locale-specific currency format." }
    { identifier: "EVEN", description: "Returns number rounded up to the nearest even integer." }
    { identifier: "EXACT", description: "Tests whether two strings are identical." }
    { identifier: "EXP", description: "Returns Euler's number, e (~2.718) raised to a power." }
    { identifier: "FACT", description: "Returns the factorial of a number." }
    { identifier: "FACTDOUBLE", description: "Returns the double factorial of a number." }
    { identifier: "FALSE", description: "Returns the boolean value `false`." }
    { identifier: "FIND", description: "Returns the position at which a string is first found within text, case-sensitive." }
    { identifier: "FIXED", description: "Formats a number with a fixed number of decimal places." }
    { identifier: "FLOOR", description: "Rounds a number down to the nearest integer multiple of specified significance." }
    { identifier: "FORMATNUMBER", description: "Description" }
    { identifier: "GCD", description: "Returns the greatest common divisor of one or more integers." }
    { identifier: "GROUPINGSEPARATOR", description: "Description" }
    { identifier: "GROUPINGSIZE", description: "Description" }
    { identifier: "HASOTHER", description: "Description" }
    { identifier: "IF", description: "Description" }
    { identifier: "IFERROR", description: "Description" }
    { identifier: "INT", description: "Rounds a number down to the nearest integer that is less than or equal to it." }
    { identifier: "ISBLANK", description: "Checks whether the field's value is empty." }
    { identifier: "ISERR", description: "Description" }
    { identifier: "ISERROR", description: "Description" }
    { identifier: "ISEVEN", description: "Checks whether the provided value is an even number." }
    { identifier: "ISLOGICAL", description: "Checks whether a value is `true` or `false`." }
    { identifier: "ISNAN", description: "Description" }
    { identifier: "ISNONTEXT", description: "Tests whether a value is non-textual." }
    { identifier: "ISNUMBER", description: "Tests whether a value is a number." }
    { identifier: "ISODD", description: "Checks whether the provided value is an odd number." }
    { identifier: "ISTEXT", description: "Checks whether a value is text." }
    { identifier: "LANGUAGE", description: "Description" }
    { identifier: "LATITUDE", description: "Returns the latitude of the current feature (record or repeatable item)." }
    { identifier: "LCM", description: "Returns the least common multiple of one or more integers." }
    { identifier: "LEFT", description: "Returns a substring from the beginning of a given string." }
    { identifier: "LEN", description: "Returns the length of a string value." }
    { identifier: "LN", description: "Returns the the logarithm of a number, base `e` (Euler's number)." }
    { identifier: "LOCALE", description: "Description" }
    { identifier: "LOG", description: "Returns the the logarithm of a number given a base." }
    { identifier: "LOG10", description: "Returns the the logarithm of a number, base 10." }
    { identifier: "LONGITUDE", description: "Returns the longitude of the current feature (record or repeatable item)" }
    { identifier: "LOWER", description: "Converts a specified string to lowercase." }
    { identifier: "MATCH", description: "Returns the relative position of an item in a range that matches a specified value." }
    { identifier: "MAX", description: "Returns the maximum value in a given set of values." }
    { identifier: "MAXA", description: "Returns the maximum numeric value in a given set of values." }
    { identifier: "MEDIAN", description: "Returns the median value in a set of numeric values." }
    { identifier: "MEMOIZED_FACT", description: "Description" }
    { identifier: "MEMOIZED_FACTDOUBLE", description: "Description" }
    { identifier: "MID", description: "Returns a segment of a string value." }
    { identifier: "MIN", description: "Returns the minimum value in a given set of values." }
    { identifier: "MINA", description: "Returns the minimum numeric value in a given set of values." }
    { identifier: "MOD", description: "Returns the result of the modulo operator, the remainder after a division operation." }
    { identifier: "MONTH", description: "Returns the month of a given date." }
    { identifier: "N", description: "Returns the value provided as a number." }
    { identifier: "NOT", description: "Returns the opposite of a logical value - `NOT(true)` returns `false`; `NOT(false)` returns `true`." }
    { identifier: "NUM", description: "Description" }
    { identifier: "NUMS", description: "Description" }
    { identifier: "ODD", description: "Rounds a number up to the nearest odd integer." }
    { identifier: "ONCE", description: "Description" }
    { identifier: "OR", description: "Returns `true` if any of the provided arguments are logically true, and `false` if all of the provided arguments are logically false." }
    { identifier: "OTHER", description: "Description" }
    { identifier: "PI", description: "Returns the value of Pi to 15 decimal places." }
    { identifier: "POWER", description: "Returns a number raised to a power." }
    { identifier: "PRECISION", description: "Description" }
    { identifier: "PRODUCT", description: "Returns the result of multiplying a series of numbers together." }
    { identifier: "PROPER", description: "Capitalizes each word in a string (title case)." }
    { identifier: "QUOTIENT", description: "Returns the result of dividing one number by another." }
    { identifier: "RADIANS", description: "Converts a number of degrees to radians." }
    { identifier: "RAND", description: "Returns a random number between 0 and 1." }
    { identifier: "RANDBETWEEN", description: "Returns a random integer between two values." }
    { identifier: "REPEATABLEVALUES", description: "Return a specific field from multiple repeatable items" }
    { identifier: "REPEATABLESUM", description: "Return the sum of a specific numeric field across multiple repeatable items" }
    { identifier: "REPLACE", description: "Replaces a piece of a text string with a different string." }
    { identifier: "RIGHT", description: "Returns a substring from the end of a given string." }
    { identifier: "ROUND", description: "Rounds a number to a specified number of decimal places according to standard rounding rules." }
    { identifier: "ROUNDDOWN", description: "Rounds a number down to a desired number of decimal places." }
    { identifier: "ROUNDUP", description: "Rounds a number up to a desired number of decimal places." }
    { identifier: "SEARCH", description: "Returns the position at which a specified string is first found within a block of text. Ignores case." }
    { identifier: "SELECTED", description: "Description" }
    { identifier: "SIGN", description: "Returns the sign of a given input number. `-1` if negative, `1` if positive, `0` if zero." }
    { identifier: "SIN", description: "Returns the sine of a value, in radians." }
    { identifier: "SINH", description: "Returns the hyperbolic sine of a number" }
    { identifier: "SQRT", description: "Calculates the square root of a given number." }
    { identifier: "SQRTPI", description: "Calculates the square root of the product of Pi and a given number." }
    { identifier: "STATUS", description: "Returns the current record status" }
    { identifier: "SUBSTITUTE", description: "Description" }
    { identifier: "SUM", description: "Description" }
    { identifier: "SUMSQ", description: "Description" }
    { identifier: "T", description: "Description" }
    { identifier: "TIMEZONE", description: "Description" }
    { identifier: "TRIM", description: "Description" }
    { identifier: "TRUE", description: "Description" }
    { identifier: "UPPER", description: "Description" }
    { identifier: "VALUE", description: "Description" }
    { identifier: "VERSIONINFO", description: "Returns version information about the app." }
    { identifier: "YEAR", description: "Returns the year of a given date." }
    { identifier: "X_ISNEW", description: "Returns a boolean indicating whether the current feature (record or repeatable item) is new. It returns false if it's being updated." }
    { identifier: "X_ISUPDATE", description: "Returns a boolean indicating whether the current feature (record or repeatable item) is being updated. It returns false if it's a new record." }
  ]