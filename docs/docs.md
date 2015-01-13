##ABS

Returns the absolute value of a number.

### Parameters
`value` : Number (required) - The number of which to return the absolute value.

### Returns
Number - the absolute value of the `value` parameter 

### Examples
```
// returns 1
ABS(-1)
```

```
// returns 42
ABS(42)
```


##ACOS

Returns the inverse cosine of a value, in radians.
Use the {@link DEGREES} function to convert the result of {@link DEGREES} into degrees.

### Parameters
`value` : Number (required) - The value for which to calculate the inverse cosine. Must be between -1 and 1, inclusive.

### Returns
Number

### Examples
```
// returns 0.6435011087932843
ACOS(0.8)
```


##ACOSH

Returns the inverse hyperbolic cosine of a number.

Related:
{@link TANH}

### Parameters
`value` : Number (required) - The value for which to calculate the inverse hyperbolic cosine. Must be greater than or equal to 1.

### Returns
Number

### Examples
```
// returns 2.6339157938496336
ACOSH(7)
```


##AND

Returns true if all of the provided arguments are logically true, and false if any of the provided arguments are logically false.

### Parameters
`var_args_expressions` : * (required) - An expression or reference that represents some logical value, i.e. TRUE or FALSE, or an expression that can be converted to a logical value.

### Returns
Boolean

### Examples
```
// returns false
AND(1, 0, false)
```

```
// returns true
AND(3 + 3 == 6, 10 + 2 == 12)
```


##AVERAGE

Returns the numerical average value in a dataset, ignoring text.

### Parameters
`var_args_values` : Number (required) - values to use when calculating the average value.

### Returns
Number

### Examples
```
// returns 2
AVERAGE(1, 2, 3)
```


##CEILING

Rounds a number up to the nearest integer multiple of specified significance.

### Parameters
`value` : Number (required) - The value to round up to the nearest integer multiple of factor.

`factor` : Number (optional)  [default = 1] - The number to whose multiples value will be rounded.

### Returns
Number

### Examples
```
// returns 139.9
CEILING(139.85, 0.1)
```

```
// returns 140
CEILING(139.001)
```


##CHAR

Convert a number into a character according to the current Unicode table.

### Parameters
`number` : Number (required) - The number of the character to look up from the current Unicode table in decimal format.

### Returns
String

### Examples
```
// returns A
CHAR(65)
```

```
// returns Թ
CHAR(1337)
```


##CLEAN

Returns the text with the non-printable ASCII characters removed.

### Parameters
`text` : String (required) - The text whose non-printable characters are to be removed.

### Returns
String

### Examples
```
// returns Test
CLEAN('Test' + CHAR(31))
```


##CODE

Returns the numeric Unicode map value of the first character in the string provided.

### Parameters
`text` : String (required) - The string whose first character's Unicode map value will be returned.

### Returns
Number

### Examples
```
// returns 84
CODE('Test')
```


##COMPACT

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
COMPACT()
```


##CONCATENATE

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
CONCATENATE()
```


##CONFIG

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
CONFIG()
```


##CONFIGURE

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
CONFIGURE()
```


##COS

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
COS()
```


##COSH

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
COSH()
```


##COUNT

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
COUNT()
```


##COUNTA

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
COUNTA()
```


##COUNTBLANK

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
COUNTBLANK()
```


##COUNTRY

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
COUNTRY()
```


##CURRENCYCODE

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
CURRENCYCODE()
```


##CURRENCYSYMBOL

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
CURRENCYSYMBOL()
```


##DATE

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
DATE()
```


##DATEVALUE

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
DATEVALUE()
```


##DAY

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
DAY()
```


##DAYS360

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
DAYS360()
```


##DECIMALSEPARATOR

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
DECIMALSEPARATOR()
```


##DEGREES

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
DEGREES()
```


##DOLLAR

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
DOLLAR()
```


##EVEN

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
EVEN()
```


##EXACT

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
EXACT()
```


##EXP

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
EXP()
```


##FACT

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
FACT()
```


##FACTDOUBLE

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
FACTDOUBLE()
```


##FALSE

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
FALSE()
```


##FIND

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
FIND()
```


##FIXED

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
FIXED()
```


##FLOOR

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
FLOOR()
```


##FORMATNUMBER

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
FORMATNUMBER()
```


##GCD

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
GCD()
```


##GROUPINGSEPARATOR

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
GROUPINGSEPARATOR()
```


##GROUPINGSIZE

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
GROUPINGSIZE()
```


##HASERROR

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
HASERROR()
```


##HASOTHER

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
HASOTHER()
```


##IF

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
IF()
```


##IFERROR

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
IFERROR()
```


##INT

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
INT()
```


##ISBLANK

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
ISBLANK()
```


##ISERR

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
ISERR()
```


##ISERROR

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
ISERROR()
```


##ISEVEN

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
ISEVEN()
```


##ISLOGICAL

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
ISLOGICAL()
```


##ISNAN

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
ISNAN()
```


##ISNEW

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
ISNEW()
```


##ISNONTEXT

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
ISNONTEXT()
```


##ISNUMBER

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
ISNUMBER()
```


##ISODD

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
ISODD()
```


##ISTEXT

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
ISTEXT()
```


##ISUPDATE

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
ISUPDATE()
```


##LANGUAGE

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
LANGUAGE()
```


##LCM

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
LCM()
```


##LEFT

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
LEFT()
```


##LEN

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
LEN()
```


##LN

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
LN()
```


##LOCALE

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
LOCALE()
```


##LOG

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
LOG()
```


##LOG10

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
LOG10()
```


##LOWER

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
LOWER()
```


##MATCH

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
MATCH()
```


##MATH_FUNC

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
MATH_FUNC()
```


##MAX

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
MAX()
```


##MAXA

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
MAXA()
```


##MEDIAN

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
MEDIAN()
```


##MEMOIZED_FACT

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
MEMOIZED_FACT()
```


##MEMOIZED_FACTDOUBLE

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
MEMOIZED_FACTDOUBLE()
```


##MID

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
MID()
```


##MIN

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
MIN()
```


##MINA

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
MINA()
```


##MOD

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
MOD()
```


##N

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
N()
```


##NOT

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
NOT()
```


##NOT_IMPLEMENTED

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
NOT_IMPLEMENTED()
```


##NO_VALUE

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
NO_VALUE()
```


##NUM

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
NUM()
```


##NUMS

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
NUMS()
```


##ODD

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
ODD()
```


##ONCE

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
ONCE()
```


##OR

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
OR()
```


##OTHER

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
OTHER()
```


##PI

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
PI()
```


##POWER

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
POWER()
```


##PRECISION

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
PRECISION()
```


##PRODUCT

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
PRODUCT()
```


##PROPER

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
PROPER()
```


##QUOTIENT

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
QUOTIENT()
```


##RADIANS

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
RADIANS()
```


##RAND

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
RAND()
```


##RANDBETWEEN

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
RANDBETWEEN()
```


##REPLACE

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
REPLACE()
```


##RESETCONFIG

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
RESETCONFIG()
```


##RIGHT

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
RIGHT()
```


##ROUND

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
ROUND()
```


##ROUNDDOWN

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
ROUNDDOWN()
```


##ROUNDUP

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
ROUNDUP()
```


##SEARCH

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
SEARCH()
```


##SELECTED

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
SELECTED()
```


##SIGN

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
SIGN()
```


##SIN

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
SIN()
```


##SINH

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
SINH()
```


##SQRT

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
SQRT()
```


##SQRTPI

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
SQRTPI()
```


##SUBSTITUTE

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
SUBSTITUTE()
```


##SUM

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
SUM()
```


##SUMSQ

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
SUMSQ()
```


##T

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
T()
```


##TIMEZONE

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
TIMEZONE()
```


##TRIM

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
TRIM()
```


##TRUE

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
TRUE()
```


##UPPER

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
UPPER()
```


##VALUE

Description

### Parameters
`value` : Number (required) - argument

### Returns
Number

### Examples
```
// returns VALUE
VALUE()
```


##VERSIONINFO

Returns version information about the app.

### Parameters
No parameters

### Returns
String

### Examples
```
// returns Apple iPhone6,2 iOS 8.1 Fulcrum 2.7.0 2162
VERSIONINFO()
```
