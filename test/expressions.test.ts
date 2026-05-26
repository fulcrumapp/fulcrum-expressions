import { expect } from "chai"
import { Runtime, functions } from "../src/index.js"

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
    expect(ARRAY()).to.deep.equal([])
    expect(ARRAY(1, 2, 3, 4)).to.deep.equal([1, 2, 3, 4])
    expect(ARRAY([1, 2], [3, 4])).to.deep.equal([1, 2, 3, 4])
    expect(ARRAY([1, 2], [3, 4], [5, 6])).to.deep.equal([1, 2, 3, 4, 5, 6])
    expect(ARRAY(undefined, null)).to.deep.equal([undefined, null])
    expect(ARRAY(1, 2, 3)).to.deep.equal([1, 2, 3])
    expect(ARRAY(1, "2", 3)).to.deep.equal([1, "2", 3])
    expect(ARRAY([], [], [])).to.deep.equal([])
    expect(ARRAY([])).to.deep.equal([])
    expect(ARRAY(undefined)).to.deep.equal([undefined])
  })
})

describe("NUM", () => {
  it("converts the input to a number", () => {
    expect(NUM(1)).to.equal(1)
    expect(NUM(-1)).to.equal(-1)
    expect(NUM("1")).to.equal(1)
    expect(NUM({})).to.be.NaN
    expect(NUM(undefined)).to.be.NaN
    expect(NUM([])).to.be.NaN
    expect(NUM("test")).to.be.NaN
  })
})

describe("NUMS", () => {
  it("returns an array of numbers from the arguments", () => {
    expect(NUMS(1, 2, 3)).to.deep.equal([1, 2, 3])
    expect(NUMS(1, "2", 3)).to.deep.equal([1, 2, 3])
    expect(NUMS(1, "2", "a7")).to.deep.equal([1, 2, NaN])
  })
})

describe("ISNAN", () => {
  it("tests whether the input is not a number", () => {
    expect(ISNAN(1)).to.equal(false)
    expect(ISNAN("1")).to.equal(false)
    expect(ISNAN("a7")).to.equal(true)
    expect(ISNAN({})).to.equal(true)
  })
})

describe("PRECISION", () => {
  it("returns the precision of a number", () => {
    expect(PRECISION(1.11)).to.equal(2)
    expect(PRECISION("1")).to.equal(0)
    expect(PRECISION("aaa")).to.be.NaN
    expect(PRECISION(1 / 3)).to.equal(16)
  })
})

describe("ABS", () => {
  it("returns the absolute value of a number", () => {
    expect(ABS(-7)).to.equal(7)
    expect(ABS(7)).to.equal(7)
    expect(ABS(0)).to.equal(0)
  })
})

describe("ACOS", () => {
  it("returns the arccosine of a number", () => {
    expect(ACOS(-7)).to.be.NaN
    expect(ACOS(0.13213)).to.equal(1.4382788129257988)
    expect(ACOS(NaN)).to.be.NaN
  })
})

describe("ACOSH", () => {
  it("returns the inverse hyperbolic cosine of a number", () => {
    expect(ACOSH(27)).to.equal(Math.log(27 + Math.sqrt(27 * 27 - 1)))
  })
})

describe("AND", () => {
  it("returns true when all arguments are truthy", () => {
    expect(AND(true, true)).to.equal(true)
    expect(AND(true, false)).to.equal(false)
    expect(AND(false, false)).to.equal(false)
    expect(AND(1, 1)).to.equal(true)
    expect(AND(1, 0)).to.equal(false)
    expect(AND(0, 0)).to.equal(false)
  })
})

describe("AVERAGE", () => {
  it("returns the average of the values", () => {
    expect(AVERAGE([1, 2, 3])).to.equal(2)
    expect(AVERAGE(1, 2, 3)).to.equal(2)
    expect(AVERAGE([])).to.be.NaN
  })
})

describe("CEILING", () => {
  it("returns the rounded up value", () => {
    expect(CEILING(2.5, 1)).to.equal(3)
    expect(CEILING(0.25, 0.1)).to.be.closeTo(0.3, 1e-10)
    expect(CEILING(-2.5, -2)).to.equal(-2)
    expect(CEILING(1.5, 0.1)).to.be.closeTo(1.5, 1e-10)
    expect(CEILING(-0.13, 0.25)).to.equal(-0)
    expect(CEILING(-0.31, 0.25)).to.equal(-0.25)
  })
})

describe("CHAR", () => {
  it("returns a character from a code", () => {
    expect(CHAR(65)).to.equal("A")
    expect(CHAR(122)).to.equal("z")
  })
})

describe("CODE", () => {
  it("returns the character code for a character", () => {
    expect(CODE("A")).to.equal(65)
    expect(CODE("z")).to.equal(122)
  })
})

describe("CONCAT", () => {
  it("is an alias for CONCATENATE and joins text strings", () => {
    expect(CONCAT("1", "2", "3")).to.equal("123")
    expect(CONCAT("1", 2, "3")).to.equal("123")
    expect(CONCAT("1", null, "3")).to.equal("13")
  })
})

describe("CONCATENATE", () => {
  it("concatenates values into a string", () => {
    expect(CONCATENATE("a", "b", "c")).to.equal("abc")
    expect(CONCATENATE("a", 1, "c")).to.equal("a1c")
  })
})

describe("COS", () => {
  it("returns the cosine of a number", () => {
    expect(COS(1)).to.equal(0.5403023058681398)
    expect(COS(0)).to.equal(1)
  })
})

describe("COUNT", () => {
  it("returns the count of numeric values", () => {
    expect(COUNT([1, "2", null, 3, null])).to.equal(3)
    expect(COUNT([1, 2, 3])).to.equal(3)
    expect(COUNT([])).to.equal(0)
  })
})

describe("COUNTA", () => {
  it("returns the count of non-blank values", () => {
    expect(COUNTA([1, "2", null, 3, null])).to.equal(3)
    expect(COUNTA([1, 2, 3])).to.equal(3)
    expect(COUNTA([])).to.equal(0)
  })
})

describe("COUNTBLANK", () => {
  it("returns the count of blank values", () => {
    expect(COUNTBLANK([1, "2", null, 3, null])).to.equal(2)
    expect(COUNTBLANK([1, 2, 3])).to.equal(0)
    expect(COUNTBLANK([null, null])).to.equal(2)
  })
})

describe("DATEVALUE", () => {
  it("converts a date string to a Date object", () => {
    const result = DATEVALUE("2015-01-01")
    expect(result).to.be.an.instanceOf(Date)
    expect(result.getFullYear()).to.equal(2015)
    expect(result.getMonth()).to.equal(0)
    expect(result.getDate()).to.equal(1)
  })
})

describe("DEGREES", () => {
  it("converts radians to degrees", () => {
    expect(DEGREES(Math.PI)).to.equal(180)
    expect(DEGREES(Math.PI / 2)).to.equal(90)
  })
})

describe("EVEN", () => {
  it("rounds up to the nearest even integer", () => {
    expect(EVEN(1.5)).to.equal(2)
    expect(EVEN(3)).to.equal(4)
    expect(EVEN(2)).to.equal(2)
  })
})

describe("EXACT", () => {
  it("checks if two values are exactly equal", () => {
    expect(EXACT("hello", "hello")).to.equal(true)
    expect(EXACT("hello", "world")).to.equal(false)
  })
})

describe("EXP", () => {
  it("returns e raised to a power", () => {
    expect(EXP(1)).to.equal(Math.E)
    expect(EXP(0)).to.equal(1)
  })
})

describe("FACT", () => {
  it("returns the factorial", () => {
    expect(FACT(5)).to.equal(120)
    expect(FACT(0)).to.equal(1)
    expect(FACT(1)).to.equal(1)
  })
})

describe("FACTDOUBLE", () => {
  it("returns the double factorial", () => {
    expect(FACTDOUBLE(5)).to.equal(15)
    expect(FACTDOUBLE(6)).to.equal(48)
  })
})

describe("FALSE", () => {
  it("returns false", () => {
    expect(FALSE()).to.equal(false)
  })
})

describe("TRUE", () => {
  it("returns true", () => {
    expect(TRUE()).to.equal(true)
  })
})

describe("FLOOR", () => {
  it("rounds down a number", () => {
    expect(FLOOR(2.5, 1)).to.equal(2)
    expect(FLOOR(-0.13, 0.25)).to.equal(-0.25)
    expect(FLOOR(-0.31, 0.25)).to.equal(-0.5)
  })
})

describe("FORMAT", () => {
  it("formats a string", () => {
    expect(FORMAT("%s world", "hello")).to.equal("hello world")
    expect(FORMAT("the number is %d", 42)).to.equal("the number is 42")
  })
})

describe("GCD", () => {
  it("returns the greatest common divisor", () => {
    expect(GCD(8, 12)).to.equal(4)
    expect(GCD(5, 0)).to.equal(5)
  })
})

describe("IF", () => {
  it("returns value based on condition", () => {
    expect(IF(true, "yes", "no")).to.equal("yes")
    expect(IF(false, "yes", "no")).to.equal("no")
  })
})

describe("INT", () => {
  it("truncates to integer", () => {
    expect(INT(7.7)).to.equal(7)
    expect(INT(-7.7)).to.equal(-8)
  })
})

describe("ISBLANK", () => {
  it("checks if value is blank", () => {
    expect(ISBLANK(null)).to.equal(true)
    expect(ISBLANK(undefined)).to.equal(true)
    expect(ISBLANK("")).to.equal(true)
    expect(ISBLANK("hello")).to.equal(false)
    expect(ISBLANK(0)).to.equal(false)
  })
})

describe("ISNUMBER", () => {
  it("checks if value is a number", () => {
    expect(ISNUMBER(1)).to.equal(true)
    expect(ISNUMBER("1")).to.equal(true)
    expect(ISNUMBER(NaN)).to.equal(false)
    expect(ISNUMBER("a7")).to.equal(false)
  })
})

describe("ISTEXT", () => {
  it("checks if value is text", () => {
    expect(ISTEXT("hello")).to.equal(true)
    expect(ISTEXT(1)).to.equal(false)
  })
})

describe("ISLOGICAL", () => {
  it("checks if value is a boolean", () => {
    expect(ISLOGICAL(true)).to.equal(true)
    expect(ISLOGICAL(false)).to.equal(true)
    expect(ISLOGICAL(1)).to.equal(false)
  })
})

describe("ISEVEN", () => {
  it("checks if number is even", () => {
    expect(ISEVEN(2)).to.equal(true)
    expect(ISEVEN(3)).to.equal(false)
  })
})

describe("ISODD", () => {
  it("checks if number is odd", () => {
    expect(ISODD(3)).to.equal(true)
    expect(ISODD(2)).to.equal(false)
  })
})

describe("LAST", () => {
  it("returns the last element", () => {
    expect(LAST([1, 2, 3])).to.equal(3)
  })
})

describe("LCM", () => {
  it("returns the least common multiple", () => {
    expect(LCM(4, 6)).to.equal(12)
    expect(LCM(5, 0)).to.equal(0)
  })
})

describe("LEFT", () => {
  it("returns leftmost characters", () => {
    expect(LEFT("hello", 3)).to.equal("hel")
    expect(LEFT("hello", 1)).to.equal("h")
  })
})

describe("LEN", () => {
  it("returns the length of a string", () => {
    expect(LEN("hello")).to.equal(5)
    expect(LEN("")).to.equal(0)
  })
})

describe("LN", () => {
  it("returns the natural log", () => {
    expect(LN(Math.E)).to.equal(1)
    expect(LN(1)).to.equal(0)
  })
})

describe("LOG", () => {
  it("returns the logarithm", () => {
    expect(LOG(100, 10)).to.equal(2)
    expect(LOG(8, 2)).to.equal(3)
  })
})

describe("LOG10", () => {
  it("returns the base-10 logarithm", () => {
    expect(LOG10(100)).to.equal(2)
    expect(LOG10(1000)).to.be.closeTo(3, 1e-10)
  })
})

describe("LOWER", () => {
  it("converts to lowercase", () => {
    expect(LOWER("HELLO")).to.equal("hello")
  })
})

describe("MAX", () => {
  it("returns the maximum value", () => {
    expect(MAX([1, 2, 3])).to.equal(3)
    expect(MAX(1, 2, 3)).to.equal(3)
  })
})

describe("MIN", () => {
  it("returns the minimum value", () => {
    expect(MIN([1, 2, 3])).to.equal(1)
    expect(MIN(1, 2, 3)).to.equal(1)
  })
})

describe("MEDIAN", () => {
  it("returns the median value", () => {
    expect(MEDIAN([1, 2, 3])).to.equal(2)
    expect(MEDIAN([1, 2, 3, 4])).to.equal(2.5)
  })
})

describe("MID", () => {
  it("returns characters from the middle", () => {
    expect(MID("hello world", 7, 5)).to.equal("world")
    expect(MID("hello world", 1, 5)).to.equal("hello")
  })
})

describe("MOD", () => {
  it("returns the modulus", () => {
    expect(MOD(10, 3)).to.equal(1)
    expect(MOD(10, 5)).to.equal(0)
  })
})

describe("NOT", () => {
  it("returns the logical not", () => {
    expect(NOT(true)).to.equal(false)
    expect(NOT(false)).to.equal(true)
  })
})

describe("ODD", () => {
  it("rounds up to the nearest odd integer", () => {
    expect(ODD(1.5)).to.equal(3)
    expect(ODD(2)).to.equal(3)
    expect(ODD(3)).to.equal(3)
  })
})

describe("PI", () => {
  it("returns pi", () => {
    expect(PI()).to.equal(Math.PI)
  })
})

describe("POWER", () => {
  it("returns a number raised to a power", () => {
    expect(POWER(2, 3)).to.equal(8)
    expect(POWER(5, 2)).to.equal(25)
  })
})

describe("PRODUCT", () => {
  it("returns the product of values", () => {
    expect(PRODUCT(2, 3, 4)).to.equal(24)
  })
})

describe("PROPER", () => {
  it("capitalizes the first letter of each word", () => {
    expect(PROPER("hello world")).to.equal("Hello World")
  })
})

describe("QUOTIENT", () => {
  it("returns the integer quotient", () => {
    expect(QUOTIENT(10, 3)).to.equal(3)
    expect(QUOTIENT(10, 5)).to.equal(2)
  })
})

describe("RADIANS", () => {
  it("converts degrees to radians", () => {
    expect(RADIANS(180)).to.equal(Math.PI)
  })
})

describe("RAND", () => {
  it("returns a random number between 0 and 1", () => {
    const value = RAND()
    expect(value).to.be.at.least(0)
    expect(value).to.be.below(1)
  })
})

describe("RANDBETWEEN", () => {
  it("returns a random number in range", () => {
    const value = RANDBETWEEN(1, 10)
    expect(value).to.be.at.least(1)
    expect(value).to.be.at.most(10)
  })
})

describe("RIGHT", () => {
  it("returns rightmost characters", () => {
    expect(RIGHT("hello", 3)).to.equal("llo")
  })
})

describe("ROUND", () => {
  it("rounds a number", () => {
    expect(ROUND(2.5, 0)).to.equal(3)
    expect(ROUND(2.15, 1)).to.equal(2.2)
  })
})

describe("ROUNDDOWN", () => {
  it("rounds down a number", () => {
    expect(ROUNDDOWN(3.7, 0)).to.equal(3)
    expect(ROUNDDOWN(-3.7, 0)).to.equal(-3)
  })
})

describe("ROUNDUP", () => {
  it("rounds up a number", () => {
    expect(ROUNDUP(3.2, 0)).to.equal(4)
    expect(ROUNDUP(-3.2, 0)).to.equal(-4)
  })
})

describe("SIGN", () => {
  it("returns the sign of a number", () => {
    expect(SIGN(5)).to.equal(1)
    expect(SIGN(-5)).to.equal(-1)
    expect(SIGN(0)).to.equal(0)
  })
})

describe("SIN", () => {
  it("returns the sine", () => {
    expect(SIN(0)).to.equal(0)
  })
})

describe("SQRT", () => {
  it("returns the square root", () => {
    expect(SQRT(9)).to.equal(3)
    expect(SQRT(4)).to.equal(2)
  })
})

describe("STRING", () => {
  it("converts to string", () => {
    expect(STRING(123)).to.equal("123")
    expect(STRING(null)).to.equal("")
    expect(STRING(undefined)).to.equal("")
  })
})

describe("SUBSTITUTE", () => {
  it("substitutes text", () => {
    expect(SUBSTITUTE("hello world", "world", "earth")).to.equal("hello earth")
  })
})

describe("SUM", () => {
  it("returns the sum of values", () => {
    expect(SUM([1, 2, 3])).to.equal(6)
    expect(SUM(1, 2, 3)).to.equal(6)
  })
})

describe("SUMSQ", () => {
  it("returns the sum of squares", () => {
    expect(SUMSQ([2, 3])).to.equal(13)
  })
})

describe("TRIM", () => {
  it("trims whitespace", () => {
    expect(TRIM("  hello  ")).to.equal("hello")
  })
})

describe("TYPEOF", () => {
  it("returns the type of a value", () => {
    expect(TYPEOF(1)).to.equal("number")
    expect(TYPEOF("hello")).to.equal("string")
    expect(TYPEOF(true)).to.equal("boolean")
    expect(TYPEOF(null)).to.equal("null")
    expect(TYPEOF(undefined)).to.equal("undefined")
  })
})

describe("UNIQUE", () => {
  it("returns unique values", () => {
    expect(UNIQUE([1, 2, 2, 3, 3])).to.deep.equal([1, 2, 3])
  })
})

describe("UPPER", () => {
  it("converts to uppercase", () => {
    expect(UPPER("hello")).to.equal("HELLO")
  })
})

describe("COMPACT", () => {
  it("removes null and undefined from array", () => {
    expect(COMPACT([1, null, 2, undefined, 3])).to.deep.equal([1, 2, 3])
    expect(COMPACT([])).to.deep.equal([])
  })
})

describe("COALESCE", () => {
  it("returns the first non-empty value", () => {
    expect(COALESCE(null, undefined, "hello")).to.equal("hello")
    expect(COALESCE(1, 2, 3)).to.equal(1)
  })
})

describe("FLATTEN", () => {
  it("flattens a nested array", () => {
    expect(FLATTEN([1, [2, [3, [4]]]])).to.deep.equal([1, 2, 3, 4])
  })
})

describe("FIRST", () => {
  it("returns the first element", () => {
    expect(FIRST([1, 2, 3])).to.equal(1)
  })
})

describe("LPAD", () => {
  it("pads a string on the left", () => {
    expect(LPAD("5", 3, "0")).to.equal("005")
  })
})

describe("RPAD", () => {
  it("pads a string on the right", () => {
    expect(RPAD("5", 3, "0")).to.equal("500")
  })
})

describe("Runtime", () => {
  it("exports a Runtime class", () => {
    expect(Runtime).to.not.be.undefined
    expect(typeof Runtime).to.equal("function")
  })

  it("exports functions map", () => {
    expect(functions).to.not.be.undefined
    expect(typeof functions).to.equal("object")
    expect(functions.ABS).to.not.be.undefined
    expect(functions.SUM).to.not.be.undefined
  })

  it("creates a runtime instance with globals", () => {
    const rt = new Runtime()
    expect(g.$$runtime).to.not.be.undefined
    expect(g.$$evaluate).to.not.be.undefined
    expect(g.$$trigger).to.not.be.undefined
    expect(g.$$prepare).to.not.be.undefined
  })
})

describe("ERROR", () => {
  it("throws an error", () => {
    expect(() => ERROR("test error")).to.throw(Error)
    expect(() => ERROR("test error")).to.throw("test error")
  })
})

describe("OR", () => {
  it("returns true if any argument is truthy", () => {
    expect(g.OR(true, true)).to.equal(true)
    expect(g.OR(true, false)).to.equal(true)
    expect(g.OR(false, false)).to.equal(false)
    expect(g.OR(1, 0)).to.equal(true)
    expect(g.OR(0, 0)).to.equal(false)
  })
})

describe("FIND", () => {
  it("finds one string within another", () => {
    expect(g.FIND("world", "hello world")).to.equal(7)
    expect(g.FIND("xyz", "hello world")).to.be.undefined
    expect(g.FIND("l", "hello world", 5)).to.equal(10)
    expect(g.FIND(null, "hello")).to.be.undefined
  })
})

describe("REPLACE", () => {
  it("replaces part of a text string", () => {
    expect(g.REPLACE("hello world", 7, 5, "earth")).to.equal("hello earth")
    expect(g.REPLACE("abc", 2, 1, "X")).to.equal("aXc")
    expect(g.REPLACE(null, 1, 1, "x")).to.be.undefined
    expect(g.REPLACE("abc", 0, 1, "x")).to.be.undefined
  })
})

describe("DOLLAR", () => {
  it("formats a number as currency", () => {
    const result = g.DOLLAR(1234.56)
    expect(typeof result).to.equal("string")
  })
})

describe("MODE", () => {
  it("returns the current runtime mode", () => {
    const result = g.MODE()
    // mode is undefined initially
    expect(result).to.be.undefined
  })
})

describe("SETMODE", () => {
  it("sets the runtime mode", () => {
    g.SETMODE("edit")
    expect(g.MODE()).to.equal("edit")
  })

  it("throws if mode is not a string", () => {
    expect(() => g.SETMODE(null)).to.throw()
  })
})

describe("SAVE", () => {
  it("does not throw when called", () => {
    expect(() => g.SAVE()).to.not.throw()
  })
})

describe("PREVENTDEFAULT", () => {
  it("does not throw when called", () => {
    expect(() => g.PREVENTDEFAULT()).to.not.throw()
  })
})

describe("function parity", () => {
  it("exports all 253 functions from the CoffeeScript version", () => {
    expect(Object.keys(functions).length).to.equal(253)
  })

  it("includes all key functions", () => {
    const required = [
      "ABS", "ARRAY", "AVERAGE", "CEILING", "CONCAT", "CONCATENATE",
      "CONFIG", "CONFIGURE", "DOLLAR", "ERROR", "FIND", "FLOOR",
      "FORMAT", "GEOMETRY", "GEOMETRYALONG", "GEOMETRYAREA",
      "IF", "INFERENCE", "ISBLANK", "ISNUMBER", "LOADRECORDS",
      "MODE", "NUM", "OR", "PREVENTDEFAULT", "REPLACE",
      "REQUEST", "RESETCONFIG", "SAVE", "SETMODE", "SHUFFLE",
      "SUM", "TYPEOF", "VALUE",
    ]
    for (const fn of required) {
      expect(functions).to.have.property(fn)
    }
  })
})
