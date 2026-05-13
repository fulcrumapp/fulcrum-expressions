import { describe, it, expect, beforeEach } from "vitest"
import { Runtime, functions } from "../src/index"

// Instantiate runtime to set up globals
const runtime = new Runtime()

// Load test fixtures
import variables from "./variables.json"

// Access global functions set up by Runtime
const g = globalThis as any
const CONFIGURE = g.CONFIGURE as (...args: any[]) => any
const RESETCONFIG = g.RESETCONFIG as () => void
const ABS = g.ABS as (v: any) => number
const ACOS = g.ACOS as (v: any) => number
const ACOSH = g.ACOSH as (v: any) => number
const AND = g.AND as (...args: any[]) => boolean
const ARRAY = g.ARRAY as (...args: any[]) => any[]
const AVERAGE = g.AVERAGE as (...args: any[]) => any
const CEILING = g.CEILING as (v: any, s?: any) => number
const CHAR = g.CHAR as (v: any) => string
const CHOICEVALUE = g.CHOICEVALUE as (v: any) => any
const CHOICEVALUES = g.CHOICEVALUES as (v: any) => any
const CLEAN = g.CLEAN as (v: any) => any
const COALESCE = g.COALESCE as (...args: any[]) => any
const CODE = g.CODE as (v: any) => number
const COMPACT = g.COMPACT as (v: any) => any
const CONCAT = g.CONCAT as (...args: any[]) => any
const CONCATENATE = g.CONCATENATE as (...args: any[]) => string
const COS = g.COS as (v: any) => number
const COSH = g.COSH as (v: any) => number
const COUNT = g.COUNT as (v: any) => any
const COUNTA = g.COUNTA as (v: any) => any
const COUNTBLANK = g.COUNTBLANK as (v: any) => any
const DATE = g.DATE as (...args: any[]) => any
const DATEADD = g.DATEADD as (...args: any[]) => any
const DATEVALUE = g.DATEVALUE as (v: any) => any
const DAY = g.DAY as (v: any) => any
const DEGREES = g.DEGREES as (v: any) => number
const ERROR = g.ERROR as (v: any) => never
const EVEN = g.EVEN as (v: any) => number
const EXACT = g.EXACT as (a: any, b: any) => boolean
const EXISTS = g.EXISTS as (v: any) => boolean
const EXP = g.EXP as (v: any) => number
const FACT = g.FACT as (v: any) => number
const FACTDOUBLE = g.FACTDOUBLE as (v: any) => number
const FALSE = g.FALSE as () => boolean
const FIRST = g.FIRST as (v: any) => any
const FIXED = g.FIXED as (...args: any[]) => any
const FLATTEN = g.FLATTEN as (v: any) => any
const FLOOR = g.FLOOR as (v: any, s?: any) => number
const FORMAT = g.FORMAT as (t: string, ...args: any[]) => string
const FORMATADDRESS = g.FORMATADDRESS as (v: any) => any
const FORMATNUMBER = g.FORMATNUMBER as (...args: any[]) => any
const GCD = g.GCD as (...args: any[]) => any
const GROUP = g.GROUP as (...args: any[]) => any
const HASOTHER = g.HASOTHER as (v: any) => boolean
const IF = g.IF as (t: any, a: any, b: any) => any
const IFERROR = g.IFERROR as (v: any, e: any) => any
const INSPECT = g.INSPECT as (v: any) => string
const INT = g.INT as (v: any) => number
const ISBLANK = g.ISBLANK as (v: any) => boolean
const ISERR = g.ISERR as (v: any) => boolean
const ISERROR = g.ISERROR as (v: any) => boolean
const ISEVEN = g.ISEVEN as (v: any) => boolean
const ISLOGICAL = g.ISLOGICAL as (v: any) => boolean
const ISNAN = g.ISNAN as (v: any) => boolean
const ISNONTEXT = g.ISNONTEXT as (v: any) => boolean
const ISNUMBER = g.ISNUMBER as (v: any) => boolean
const ISODD = g.ISODD as (v: any) => boolean
const ISTEXT = g.ISTEXT as (v: any) => boolean
const LAST = g.LAST as (v: any) => any
const LCM = g.LCM as (...args: any[]) => any
const LEFT = g.LEFT as (v: any, n?: any) => any
const LEN = g.LEN as (v: any) => any
const LN = g.LN as (v: any) => number
const LOG = g.LOG as (v: any, b?: any) => number
const LOG10 = g.LOG10 as (v: any) => number
const LOWER = g.LOWER as (v: any) => any
const LPAD = g.LPAD as (...args: any[]) => any
const MAX = g.MAX as (...args: any[]) => any
const MAXA = g.MAXA as (...args: any[]) => any
const MEDIAN = g.MEDIAN as (...args: any[]) => any
const MID = g.MID as (...args: any[]) => any
const MIN = g.MIN as (...args: any[]) => any
const MINA = g.MINA as (...args: any[]) => any
const MOD = g.MOD as (a: any, b: any) => number
const MONTH = g.MONTH as (v: any) => any
const N = g.N as (v: any) => number
const NOT = g.NOT as (v: any) => boolean
const NUM = g.NUM as (v: any) => number
const NUMS = g.NUMS as (...args: any[]) => number[]
const ODD = g.ODD as (v: any) => number
const OTHER = g.OTHER as (v: any) => any
const PI = g.PI as () => number
const PLUCK = g.PLUCK as (...args: any[]) => any
const POWER = g.POWER as (a: any, b: any) => number
const PRECISION = g.PRECISION as (v: any) => number
const PRODUCT = g.PRODUCT as (...args: any[]) => any
const PROPER = g.PROPER as (v: any) => any
const QUOTIENT = g.QUOTIENT as (a: any, b: any) => number
const RADIANS = g.RADIANS as (v: any) => number
const RAND = g.RAND as () => number
const RANDBETWEEN = g.RANDBETWEEN as (a: any, b: any) => number
const RIGHT = g.RIGHT as (v: any, n?: any) => any
const ROUND = g.ROUND as (v: any, d?: any) => number
const ROUNDDOWN = g.ROUNDDOWN as (v: any, d?: any) => number
const ROUNDUP = g.ROUNDUP as (v: any, d?: any) => number
const RPAD = g.RPAD as (...args: any[]) => any
const SEARCH = g.SEARCH as (...args: any[]) => any
const SHUFFLE = g.SHUFFLE as (v: any) => any
const SIGN = g.SIGN as (v: any) => number
const SIN = g.SIN as (v: any) => number
const SINH = g.SINH as (v: any) => number
const SORT = g.SORT as (...args: any[]) => any
const SQRT = g.SQRT as (v: any) => number
const SQRTPI = g.SQRTPI as (v: any) => number
const STRING = g.STRING as (v: any) => any
const SUBSTITUTE = g.SUBSTITUTE as (...args: any[]) => any
const SUM = g.SUM as (...args: any[]) => any
const SUMSQ = g.SUMSQ as (...args: any[]) => any
const T = g.T as (v: any) => any
const TIMEDIFF = g.TIMEDIFF as (...args: any[]) => any
const TIMESTAMP = g.TIMESTAMP as () => any
const TRIM = g.TRIM as (v: any) => any
const TRUE = g.TRUE as () => boolean
const TYPEOF = g.TYPEOF as (v: any) => string
const UNIQUE = g.UNIQUE as (v: any) => any
const UPPER = g.UPPER as (v: any) => any
const VALUE = g.VALUE as (v: any) => any
const YEAR = g.YEAR as (v: any) => any
const NO_VALUE = g.NO_VALUE

CONFIGURE(variables)

const resetConfig = () => {
  RESETCONFIG()
  runtime.values = (variables as any).values.form_values
  runtime.setupValues()
  ;(runtime as any).resetResults()
  CONFIGURE(variables)
}

runtime.form = (variables as any).form
runtime.values = (variables as any).values.form_values
runtime.prepare()

const roundDeep = (obj: any, precision = 10): any => {
  if (typeof obj === "number") {
    return parseFloat(obj.toFixed(precision))
  } else if (Array.isArray(obj)) {
    return obj.map((item: any) => roundDeep(item, precision))
  } else if (typeof obj === "object" && obj !== null) {
    const result: any = {}
    for (const key of Object.keys(obj)) {
      result[key] = roundDeep(obj[key], precision)
    }
    return result
  }
  return obj
}

beforeEach(() => {
  resetConfig()
})

describe("ARRAY", () => {
  it("returns an array from the arguments", () => {
    expect(ARRAY()).toEqual([])
    expect(ARRAY(1, 2, 3, 4)).toEqual([1, 2, 3, 4])
    expect(ARRAY([1, 2], [3, 4])).toEqual([1, 2, 3, 4])
    expect(ARRAY([1, 2], [3, 4], [5, 6])).toEqual([1, 2, 3, 4, 5, 6])
    expect(ARRAY(undefined, null)).toEqual([undefined, null])
    expect(ARRAY(1, 2, 3)).toEqual([1, 2, 3])
    expect(ARRAY(1, "2", 3)).toEqual([1, "2", 3])
    expect(ARRAY([], [], [])).toEqual([])
    expect(ARRAY([])).toEqual([])
    expect(ARRAY(undefined)).toEqual([undefined])
  })
})

describe("NUM", () => {
  it("converts the input to a number", () => {
    expect(NUM(1)).toBe(1)
    expect(NUM(-1)).toBe(-1)
    expect(NUM("1")).toBe(1)
    expect(NUM({})).toBeNaN()
    expect(NUM(undefined)).toBeNaN()
    expect(NUM([])).toBeNaN()
    expect(NUM("test")).toBeNaN()
  })
})

describe("NUMS", () => {
  it("returns an array of numbers from the arguments", () => {
    expect(NUMS(1, 2, 3)).toEqual([1, 2, 3])
    expect(NUMS(1, "2", 3)).toEqual([1, 2, 3])
    expect(NUMS(1, "2", "a7")).toEqual([1, 2, NaN])
  })
})

describe("ISNAN", () => {
  it("tests whether the input is not a number", () => {
    expect(ISNAN(1)).toBe(false)
    expect(ISNAN("1")).toBe(false)
    expect(ISNAN("a7")).toBe(true)
    expect(ISNAN({})).toBe(true)
  })
})

describe("PRECISION", () => {
  it("returns the precision of a number", () => {
    expect(PRECISION(1.11)).toBe(2)
    expect(PRECISION("1")).toBe(0)
    expect(PRECISION("aaa")).toBeNaN()
    expect(PRECISION(1 / 3)).toBe(16)
  })
})

describe("ABS", () => {
  it("returns the absolute value of a number", () => {
    expect(ABS(-7)).toBe(7)
    expect(ABS(7)).toBe(7)
    expect(ABS(0)).toBe(0)
  })
})

describe("ACOS", () => {
  it("returns the arccosine of a number", () => {
    expect(ACOS(-7)).toBeNaN()
    expect(ACOS(0.13213)).toBe(1.4382788129257988)
    expect(ACOS(NaN)).toBeNaN()
  })
})

describe("ACOSH", () => {
  it("returns the inverse hyperbolic cosine of a number", () => {
    expect(ACOSH(27)).toBe(Math.log(27 + Math.sqrt(27 * 27 - 1)))
  })
})

describe("AND", () => {
  it("returns true when all arguments are truthy", () => {
    expect(AND(true, true)).toBe(true)
    expect(AND(true, false)).toBe(false)
    expect(AND(false, false)).toBe(false)
    expect(AND(1, 1)).toBe(true)
    expect(AND(1, 0)).toBe(false)
    expect(AND(0, 0)).toBe(false)
  })
})

describe("AVERAGE", () => {
  it("returns the average of the values", () => {
    expect(AVERAGE([1, 2, 3])).toBe(2)
    expect(AVERAGE(1, 2, 3)).toBe(2)
    expect(AVERAGE([])).toBeNaN()
  })
})

describe("CEILING", () => {
  it("returns the rounded up value", () => {
    expect(CEILING(2.5, 1)).toBe(3)
    expect(CEILING(0.25, 0.1)).toBeCloseTo(0.3, 10)
    expect(CEILING(-2.5, -2)).toBe(-2)
    expect(CEILING(1.5, 0.1)).toBeCloseTo(1.5, 10)
    expect(CEILING(-0.13, 0.25)).toBe(-0)
    expect(CEILING(-0.31, 0.25)).toBe(-0.25)
  })
})

describe("CHAR", () => {
  it("returns a character from a code", () => {
    expect(CHAR(65)).toBe("A")
    expect(CHAR(122)).toBe("z")
  })
})

describe("CODE", () => {
  it("returns the character code for a character", () => {
    expect(CODE("A")).toBe(65)
    expect(CODE("z")).toBe(122)
  })
})

describe("CONCAT", () => {
  it("is an alias for CONCATENATE and joins text strings", () => {
    expect(CONCAT("1", "2", "3")).toBe("123")
    expect(CONCAT("1", 2, "3")).toBe("123")
    expect(CONCAT("1", null, "3")).toBe("13")
  })
})

describe("CONCATENATE", () => {
  it("concatenates values into a string", () => {
    expect(CONCATENATE("a", "b", "c")).toBe("abc")
    expect(CONCATENATE("a", 1, "c")).toBe("a1c")
  })
})

describe("COS", () => {
  it("returns the cosine of a number", () => {
    expect(COS(1)).toBe(0.5403023058681398)
    expect(COS(0)).toBe(1)
  })
})

describe("COUNT", () => {
  it("returns the count of numeric values", () => {
    expect(COUNT([1, "2", null, 3, null])).toBe(3)
    expect(COUNT([1, 2, 3])).toBe(3)
    expect(COUNT([])).toBe(0)
  })
})

describe("COUNTA", () => {
  it("returns the count of non-blank values", () => {
    expect(COUNTA([1, "2", null, 3, null])).toBe(3)
    expect(COUNTA([1, 2, 3])).toBe(3)
    expect(COUNTA([])).toBe(0)
  })
})

describe("COUNTBLANK", () => {
  it("returns the count of blank values", () => {
    expect(COUNTBLANK([1, "2", null, 3, null])).toBe(2)
    expect(COUNTBLANK([1, 2, 3])).toBe(0)
    expect(COUNTBLANK([null, null])).toBe(2)
  })
})

describe("DATEVALUE", () => {
  it("converts a date string to a Date object", () => {
    const result = DATEVALUE("2015-01-01")
    expect(result).toBeInstanceOf(Date)
    expect(result.getFullYear()).toBe(2015)
    expect(result.getMonth()).toBe(0)
    expect(result.getDate()).toBe(1)
  })
})

describe("DEGREES", () => {
  it("converts radians to degrees", () => {
    expect(DEGREES(Math.PI)).toBe(180)
    expect(DEGREES(Math.PI / 2)).toBe(90)
  })
})

describe("EVEN", () => {
  it("rounds up to the nearest even integer", () => {
    expect(EVEN(1.5)).toBe(2)
    expect(EVEN(3)).toBe(4)
    expect(EVEN(2)).toBe(2)
  })
})

describe("EXACT", () => {
  it("checks if two values are exactly equal", () => {
    expect(EXACT("hello", "hello")).toBe(true)
    expect(EXACT("hello", "world")).toBe(false)
  })
})

describe("EXP", () => {
  it("returns e raised to a power", () => {
    expect(EXP(1)).toBe(Math.E)
    expect(EXP(0)).toBe(1)
  })
})

describe("FACT", () => {
  it("returns the factorial", () => {
    expect(FACT(5)).toBe(120)
    expect(FACT(0)).toBe(1)
    expect(FACT(1)).toBe(1)
  })
})

describe("FACTDOUBLE", () => {
  it("returns the double factorial", () => {
    expect(FACTDOUBLE(5)).toBe(15)
    expect(FACTDOUBLE(6)).toBe(48)
  })
})

describe("FALSE", () => {
  it("returns false", () => {
    expect(FALSE()).toBe(false)
  })
})

describe("TRUE", () => {
  it("returns true", () => {
    expect(TRUE()).toBe(true)
  })
})

describe("FLOOR", () => {
  it("rounds down a number", () => {
    expect(FLOOR(2.5, 1)).toBe(2)
    expect(FLOOR(-0.13, 0.25)).toBe(-0.25)
    expect(FLOOR(-0.31, 0.25)).toBe(-0.5)
  })
})

describe("FORMAT", () => {
  it("formats a string", () => {
    expect(FORMAT("%s world", "hello")).toBe("hello world")
    expect(FORMAT("the number is %d", 42)).toBe("the number is 42")
  })
})

describe("GCD", () => {
  it("returns the greatest common divisor", () => {
    expect(GCD(8, 12)).toBe(4)
    expect(GCD(5, 0)).toBe(5)
  })
})

describe("IF", () => {
  it("returns value based on condition", () => {
    expect(IF(true, "yes", "no")).toBe("yes")
    expect(IF(false, "yes", "no")).toBe("no")
  })
})

describe("INT", () => {
  it("truncates to integer", () => {
    expect(INT(7.7)).toBe(7)
    expect(INT(-7.7)).toBe(-8)
  })
})

describe("ISBLANK", () => {
  it("checks if value is blank", () => {
    expect(ISBLANK(null)).toBe(true)
    expect(ISBLANK(undefined)).toBe(true)
    expect(ISBLANK("")).toBe(true)
    expect(ISBLANK("hello")).toBe(false)
    expect(ISBLANK(0)).toBe(false)
  })
})

describe("ISNUMBER", () => {
  it("checks if value is a number", () => {
    expect(ISNUMBER(1)).toBe(true)
    expect(ISNUMBER("1")).toBe(true)
    expect(ISNUMBER(NaN)).toBe(false)
    expect(ISNUMBER("a7")).toBe(false)
  })
})

describe("ISTEXT", () => {
  it("checks if value is text", () => {
    expect(ISTEXT("hello")).toBe(true)
    expect(ISTEXT(1)).toBe(false)
  })
})

describe("ISLOGICAL", () => {
  it("checks if value is a boolean", () => {
    expect(ISLOGICAL(true)).toBe(true)
    expect(ISLOGICAL(false)).toBe(true)
    expect(ISLOGICAL(1)).toBe(false)
  })
})

describe("ISEVEN", () => {
  it("checks if number is even", () => {
    expect(ISEVEN(2)).toBe(true)
    expect(ISEVEN(3)).toBe(false)
  })
})

describe("ISODD", () => {
  it("checks if number is odd", () => {
    expect(ISODD(3)).toBe(true)
    expect(ISODD(2)).toBe(false)
  })
})

describe("LAST", () => {
  it("returns the last element", () => {
    expect(LAST([1, 2, 3])).toBe(3)
  })
})

describe("LCM", () => {
  it("returns the least common multiple", () => {
    expect(LCM(4, 6)).toBe(12)
    expect(LCM(5, 0)).toBe(0)
  })
})

describe("LEFT", () => {
  it("returns leftmost characters", () => {
    expect(LEFT("hello", 3)).toBe("hel")
    expect(LEFT("hello", 1)).toBe("h")
  })
})

describe("LEN", () => {
  it("returns the length of a string", () => {
    expect(LEN("hello")).toBe(5)
    expect(LEN("")).toBe(0)
  })
})

describe("LN", () => {
  it("returns the natural log", () => {
    expect(LN(Math.E)).toBe(1)
    expect(LN(1)).toBe(0)
  })
})

describe("LOG", () => {
  it("returns the logarithm", () => {
    expect(LOG(100, 10)).toBe(2)
    expect(LOG(8, 2)).toBe(3)
  })
})

describe("LOG10", () => {
  it("returns the base-10 logarithm", () => {
    expect(LOG10(100)).toBe(2)
    expect(LOG10(1000)).toBeCloseTo(3, 10)
  })
})

describe("LOWER", () => {
  it("converts to lowercase", () => {
    expect(LOWER("HELLO")).toBe("hello")
  })
})

describe("MAX", () => {
  it("returns the maximum value", () => {
    expect(MAX([1, 2, 3])).toBe(3)
    expect(MAX(1, 2, 3)).toBe(3)
  })
})

describe("MIN", () => {
  it("returns the minimum value", () => {
    expect(MIN([1, 2, 3])).toBe(1)
    expect(MIN(1, 2, 3)).toBe(1)
  })
})

describe("MEDIAN", () => {
  it("returns the median value", () => {
    expect(MEDIAN([1, 2, 3])).toBe(2)
    expect(MEDIAN([1, 2, 3, 4])).toBe(2.5)
  })
})

describe("MID", () => {
  it("returns characters from the middle", () => {
    expect(MID("hello world", 7, 5)).toBe("world")
    expect(MID("hello world", 1, 5)).toBe("hello")
  })
})

describe("MOD", () => {
  it("returns the modulus", () => {
    expect(MOD(10, 3)).toBe(1)
    expect(MOD(10, 5)).toBe(0)
  })
})

describe("NOT", () => {
  it("returns the logical not", () => {
    expect(NOT(true)).toBe(false)
    expect(NOT(false)).toBe(true)
  })
})

describe("ODD", () => {
  it("rounds up to the nearest odd integer", () => {
    expect(ODD(1.5)).toBe(3)
    expect(ODD(2)).toBe(3)
    expect(ODD(3)).toBe(3)
  })
})

describe("PI", () => {
  it("returns pi", () => {
    expect(PI()).toBe(Math.PI)
  })
})

describe("POWER", () => {
  it("returns a number raised to a power", () => {
    expect(POWER(2, 3)).toBe(8)
    expect(POWER(5, 2)).toBe(25)
  })
})

describe("PRODUCT", () => {
  it("returns the product of values", () => {
    expect(PRODUCT(2, 3, 4)).toBe(24)
  })
})

describe("PROPER", () => {
  it("capitalizes the first letter of each word", () => {
    expect(PROPER("hello world")).toBe("Hello World")
  })
})

describe("QUOTIENT", () => {
  it("returns the integer quotient", () => {
    expect(QUOTIENT(10, 3)).toBe(3)
    expect(QUOTIENT(10, 5)).toBe(2)
  })
})

describe("RADIANS", () => {
  it("converts degrees to radians", () => {
    expect(RADIANS(180)).toBe(Math.PI)
  })
})

describe("RAND", () => {
  it("returns a random number between 0 and 1", () => {
    const value = RAND()
    expect(value).toBeGreaterThanOrEqual(0)
    expect(value).toBeLessThan(1)
  })
})

describe("RANDBETWEEN", () => {
  it("returns a random number in range", () => {
    const value = RANDBETWEEN(1, 10)
    expect(value).toBeGreaterThanOrEqual(1)
    expect(value).toBeLessThanOrEqual(10)
  })
})

describe("RIGHT", () => {
  it("returns rightmost characters", () => {
    expect(RIGHT("hello", 3)).toBe("llo")
  })
})

describe("ROUND", () => {
  it("rounds a number", () => {
    expect(ROUND(2.5, 0)).toBe(3)
    expect(ROUND(2.15, 1)).toBe(2.2)
  })
})

describe("ROUNDDOWN", () => {
  it("rounds down a number", () => {
    expect(ROUNDDOWN(3.7, 0)).toBe(3)
    expect(ROUNDDOWN(-3.7, 0)).toBe(-3)
  })
})

describe("ROUNDUP", () => {
  it("rounds up a number", () => {
    expect(ROUNDUP(3.2, 0)).toBe(4)
    expect(ROUNDUP(-3.2, 0)).toBe(-4)
  })
})

describe("SIGN", () => {
  it("returns the sign of a number", () => {
    expect(SIGN(5)).toBe(1)
    expect(SIGN(-5)).toBe(-1)
    expect(SIGN(0)).toBe(0)
  })
})

describe("SIN", () => {
  it("returns the sine", () => {
    expect(SIN(0)).toBe(0)
  })
})

describe("SQRT", () => {
  it("returns the square root", () => {
    expect(SQRT(9)).toBe(3)
    expect(SQRT(4)).toBe(2)
  })
})

describe("STRING", () => {
  it("converts to string", () => {
    expect(STRING(123)).toBe("123")
    expect(STRING(null)).toBe("")
    expect(STRING(undefined)).toBe("")
  })
})

describe("SUBSTITUTE", () => {
  it("substitutes text", () => {
    expect(SUBSTITUTE("hello world", "world", "earth")).toBe("hello earth")
  })
})

describe("SUM", () => {
  it("returns the sum of values", () => {
    expect(SUM([1, 2, 3])).toBe(6)
    expect(SUM(1, 2, 3)).toBe(6)
  })
})

describe("SUMSQ", () => {
  it("returns the sum of squares", () => {
    expect(SUMSQ([2, 3])).toBe(13)
  })
})

describe("TRIM", () => {
  it("trims whitespace", () => {
    expect(TRIM("  hello  ")).toBe("hello")
  })
})

describe("TYPEOF", () => {
  it("returns the type of a value", () => {
    expect(TYPEOF(1)).toBe("number")
    expect(TYPEOF("hello")).toBe("string")
    expect(TYPEOF(true)).toBe("boolean")
    expect(TYPEOF(null)).toBe("null")
    expect(TYPEOF(undefined)).toBe("undefined")
  })
})

describe("UNIQUE", () => {
  it("returns unique values", () => {
    expect(UNIQUE([1, 2, 2, 3, 3])).toEqual([1, 2, 3])
  })
})

describe("UPPER", () => {
  it("converts to uppercase", () => {
    expect(UPPER("hello")).toBe("HELLO")
  })
})

describe("COMPACT", () => {
  it("removes null and undefined from array", () => {
    expect(COMPACT([1, null, 2, undefined, 3])).toEqual([1, 2, 3])
    expect(COMPACT([])).toEqual([])
  })
})

describe("COALESCE", () => {
  it("returns the first non-empty value", () => {
    expect(COALESCE(null, undefined, "hello")).toBe("hello")
    expect(COALESCE(1, 2, 3)).toBe(1)
  })
})

describe("FLATTEN", () => {
  it("flattens a nested array", () => {
    expect(FLATTEN([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4])
  })
})

describe("FIRST", () => {
  it("returns the first element", () => {
    expect(FIRST([1, 2, 3])).toBe(1)
  })
})

describe("LPAD", () => {
  it("pads a string on the left", () => {
    expect(LPAD("5", 3, "0")).toBe("005")
  })
})

describe("RPAD", () => {
  it("pads a string on the right", () => {
    expect(RPAD("5", 3, "0")).toBe("500")
  })
})

describe("Runtime", () => {
  it("exports a Runtime class", () => {
    expect(Runtime).toBeDefined()
    expect(typeof Runtime).toBe("function")
  })

  it("exports functions map", () => {
    expect(functions).toBeDefined()
    expect(typeof functions).toBe("object")
    expect(functions.ABS).toBeDefined()
    expect(functions.SUM).toBeDefined()
  })

  it("creates a runtime instance with globals", () => {
    const rt = new Runtime()
    expect(g.$$runtime).toBeDefined()
    expect(g.$$evaluate).toBeDefined()
    expect(g.$$trigger).toBeDefined()
    expect(g.$$prepare).toBeDefined()
  })
})

describe("ERROR", () => {
  it("throws an error", () => {
    expect(() => ERROR("test error")).toThrow(Error)
    expect(() => ERROR("test error")).toThrow("test error")
  })
})
