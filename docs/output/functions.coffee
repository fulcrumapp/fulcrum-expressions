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
    { identifier: "ISEVEN", description: "Description" }
    { identifier: "ISLOGICAL", description: "Description" }
    { identifier: "ISNAN", description: "Description" }
    { identifier: "ISNONTEXT", description: "Description" }
    { identifier: "ISNUMBER", description: "Description" }
    { identifier: "ISODD", description: "Description" }
    { identifier: "ISTEXT", description: "Description" }
    { identifier: "LANGUAGE", description: "Description" }
    { identifier: "LATITUDE", description: "Returns the latitude of the current feature (record or repeatable item)" }
    { identifier: "LCM", description: "Description" }
    { identifier: "LEFT", description: "Description" }
    { identifier: "LEN", description: "Description" }
    { identifier: "LN", description: "Description" }
    { identifier: "LOCALE", description: "Description" }
    { identifier: "LOG", description: "Description" }
    { identifier: "LOG10", description: "Description" }
    { identifier: "LONGITUDE", description: "Returns the longitude of the current feature (record or repeatable item)" }
    { identifier: "LOWER", description: "Description" }
    { identifier: "MATCH", description: "Description" }
    { identifier: "MAX", description: "Description" }
    { identifier: "MAXA", description: "Description" }
    { identifier: "MEDIAN", description: "Description" }
    { identifier: "MEMOIZED_FACT", description: "Description" }
    { identifier: "MEMOIZED_FACTDOUBLE", description: "Description" }
    { identifier: "MID", description: "Description" }
    { identifier: "MIN", description: "Description" }
    { identifier: "MINA", description: "Description" }
    { identifier: "MOD", description: "Description" }
    { identifier: "MONTH", description: "Returns the month of a given date." }
    { identifier: "N", description: "Description" }
    { identifier: "NOT", description: "Description" }
    { identifier: "NUM", description: "Description" }
    { identifier: "NUMS", description: "Description" }
    { identifier: "ODD", description: "Description" }
    { identifier: "ONCE", description: "Description" }
    { identifier: "OR", description: "Description" }
    { identifier: "OTHER", description: "Description" }
    { identifier: "PI", description: "Description" }
    { identifier: "POWER", description: "Description" }
    { identifier: "PRECISION", description: "Description" }
    { identifier: "PRODUCT", description: "Description" }
    { identifier: "PROPER", description: "Description" }
    { identifier: "QUOTIENT", description: "Description" }
    { identifier: "RADIANS", description: "Description" }
    { identifier: "RAND", description: "Description" }
    { identifier: "RANDBETWEEN", description: "Description" }
    { identifier: "REPEATABLEVALUES", description: "Return a specific field from multiple repeatable items" }
    { identifier: "REPEATABLESUM", description: "Return the sum of a specific numeric field across multiple repeatable items" }
    { identifier: "REPLACE", description: "Description" }
    { identifier: "RIGHT", description: "Description" }
    { identifier: "ROUND", description: "Description" }
    { identifier: "ROUNDDOWN", description: "Description" }
    { identifier: "ROUNDUP", description: "Description" }
    { identifier: "SEARCH", description: "Description" }
    { identifier: "SELECTED", description: "Description" }
    { identifier: "SIGN", description: "Description" }
    { identifier: "SIN", description: "Description" }
    { identifier: "SINH", description: "Returns the hyperbolic sine of a number" }
    { identifier: "SQRT", description: "Description" }
    { identifier: "SQRTPI", description: "Description" }
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