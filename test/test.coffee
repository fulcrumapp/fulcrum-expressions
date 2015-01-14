global.Intl = require 'intl'

path = require 'path'
CSON = require 'season'

DIST = process.env.DIST or false

if DIST
  console.log 'Running distribution'
  require '../dist/expressions.js'
  runtime = $$runtime
else
  console.log 'Running debug'
  runtime = require '../runtime'

variables = CSON.readFileSync(path.join(__dirname, 'variables.cson'))

CONFIGURE(variables)

runtime.form = variables.form
runtime.values = variables.values
runtime.prepare()

shouldBeNull = (value) ->
  (value is null).should.be.true

shouldHaveNoValue = (value) ->
  (value is NO_VALUE).should.be.true

shouldBeUndefined = (value) ->
  (value is undefined).should.be.true

describe 'NUMS', ->
  it 'returns an array of numbers from the arguments', ->
    NUMS(1, 2, 3).should.eql([1, 2, 3])
    NUMS(1, '2', 3).should.eql([1, 2, 3])
    NUMS(1, '2', 'a7').should.eql([1, 2, NaN])
    NUMS({}, '2', 'a7').should.eql([NaN, 2, NaN])

describe 'NUM', ->
  it 'converts the input to a number', ->
    NUM(1).should.be.exactly(1)
    NUM(-1).should.be.exactly(-1)
    NUM('1').should.be.exactly(1)
    NUM({}).should.be.NaN
    NUM().should.be.NaN
    NUM([]).should.be.NaN
    NUM('test').should.be.NaN

describe 'ISNAN', ->
  it 'tests whether the input is not a number', ->
    ISNAN(1).should.be.false
    ISNAN('1').should.be.false
    ISNAN('a7').should.be.true
    ISNAN({}).should.be.true

describe 'PRECISION', ->
  it 'returns the precision of a number', ->
    PRECISION(1.11).should.be.exactly(2)
    PRECISION('1').should.be.exactly(0)
    PRECISION('aaa').should.be.NaN
    PRECISION(1 / 3).should.be.exactly(16)

describe 'ACOS', ->
  it 'returns the arccosine, or inverse cosine, of a number', ->
    ACOS(-7).should.be.NaN
    ACOS(0.13213).should.be.exactly(1.4382788129257988)
    ACOS(NaN).should.be.NaN
    ACOS(undefined).should.be.NaN
    ACOS('-7').should.be.NaN
    ACOS('7').should.be.NaN
    ACOS('7').should.be.NaN
    ACOS('z7').should.be.NaN
    ACOS('7z').should.be.NaN

describe 'AND', ->
  it 'returns true if all of the parameters evaluate truthy', ->
    AND(1.11).should.be.true
    AND(1 > 0, 2 > 1, 3 > 2).should.be.true
    AND(1 > 0, 2 > 1, '').should.be.false
    AND(0, 0, 0).should.be.false
    AND(1, 1, 1).should.be.true
    AND(true, false).should.be.false
    AND({}, []).should.be.true

describe 'AVERAGE', ->
  it 'returns the average of all of the parameters', ->
    AVERAGE(1, 2, 3).should.be.exactly(2)
    AVERAGE(1, 2, 'a').should.be.NaN
    AVERAGE(1).should.be.exactly(1)
    AVERAGE(1, 1.5, 3.75).should.be.exactly(2.0833333333333335)

describe 'ROUND', ->
  it 'round the given number to the specified number of digits', ->
    ROUND(1).should.be.exactly(1)
    ROUND(1.5).should.be.exactly(2)
    ROUND(2.5).should.be.exactly(3)
    ROUND('2.5').should.be.exactly(3)
    ROUND('test').should.be.NaN
    ROUND(2.3333333, 4).should.be.exactly(2.3333)
    ROUND(-2.3333333, 4).should.be.exactly(-2.3333)
    ROUND(2.3333333, 7).should.be.exactly(2.3333333)
    ROUND(2.3333333, 8).should.be.exactly(2.3333333)
    ROUND(1 / 3, 7).should.be.exactly(0.3333333)

describe 'CEILING', ->
  it 'returns number rounded up, away from zero, to the nearest multiple', ->
    CEILING(1).should.be.exactly(1)
    CEILING(1.5).should.be.exactly(2)
    CEILING(2.5).should.be.exactly(3)
    CEILING('2.5').should.be.exactly(3)
    CEILING('test').should.be.NaN
    CEILING(2.3333333, 4).should.be.exactly(4)
    CEILING(0.13, 0.25).should.be.exactly(0.25)
    CEILING(0.31, 0.25).should.be.exactly(0.5)
    CEILING(-0.13, 0.25).should.be.exactly(0)
    CEILING(-0.31, 0.25).should.be.exactly(-0.25)

describe 'FLOOR', ->
  it 'returns number rounded down, towards zero, to the nearest multiple', ->
    FLOOR(1).should.be.exactly(1)
    FLOOR(1.5).should.be.exactly(1)
    FLOOR(2.5).should.be.exactly(2)
    FLOOR(-45).should.be.exactly(-45)
    FLOOR('2.5').should.be.exactly(2)
    FLOOR('test').should.be.NaN
    FLOOR(2.3333333, 4).should.be.exactly(0)
    FLOOR(0.13, 0.25).should.be.exactly(0)
    FLOOR(0.31, 0.25).should.be.exactly(0.25)
    FLOOR(-0.13, 0.25).should.be.exactly(-0.25)
    FLOOR(-0.31, 0.25).should.be.exactly(-0.5)

describe 'CHAR', ->
  it 'returns the character given the char code', ->
    CHAR(65).should.eql('A')
    CHAR(90).should.eql('Z')
    CHAR(1337).should.eql('Թ')

describe 'CLEAN', ->
  it 'removes non-printable characters from a string', ->
    CLEAN('test').should.eql('test')
    CLEAN('test test').should.eql('test test')
    CLEAN('testԹ test').should.eql('testԹ test')
    CLEAN('test\x00\x1D\x1Etest').should.eql('testtest')

describe 'CODE', ->
  it 'returns a numeric code for the first character in a text string', ->
    CODE('test').should.be.exactly(116)
    CODE('t').should.be.exactly(116)
    CODE('1').should.be.exactly(49)
    CODE(1).should.be.exactly(49)
    CODE(1.7).should.be.exactly(49)
    CODE('').should.be.NaN
    CODE({}).should.be.NaN

describe 'HASOTHER', ->
  it 'returns true if the field has an other value set', ->
    HASOTHER(other_values: ['test']).should.be.true
    HASOTHER(other_values: []).should.be.false
    HASOTHER(other_values: null).should.be.false
    HASOTHER().should.be.false
    HASOTHER(null).should.be.false
    HASOTHER(choice_values: ['1']).should.be.false
    HASOTHER(choice_values: ['1'], other_values: ['2']).should.be.true

describe 'OTHER', ->
  it 'returns the other value if a field has it set', ->
    OTHER(other_values: ['test']).should.eql('test')
    OTHER(choice_values: ['1'], other_values: ['2']).should.eql('2')
    (OTHER(other_values: []) is NO_VALUE).should.be.true
    (OTHER(other_values: null) is NO_VALUE).should.be.true
    (OTHER() is NO_VALUE).should.be.true
    (OTHER(null) is NO_VALUE).should.be.true
    (OTHER(choice_values: ['1']) is NO_VALUE).should.be.true

describe 'CONCATENATE', ->
  it 'join text strings together', ->
    CONCATENATE('1', '2', '3').should.eql('123')
    CONCATENATE('1', 2, '3').should.eql('123')
    CONCATENATE('1', {}, '3').should.eql('13')
    CONCATENATE('1', null, '3').should.eql('13')
    CONCATENATE('1', null, undefined).should.eql('1')
    CONCATENATE([], null, undefined).should.eql('')
    CONCATENATE('').should.eql('')
    CONCATENATE().should.eql('')
    CONCATENATE(null).should.eql('')
    CONCATENATE(undefined).should.eql('')

describe 'COMPACT', ->
  it 'compacts an array', ->
    COMPACT([1, 2, 3]).should.eql([1, 2, 3])
    COMPACT([]).should.eql([])
    (COMPACT(null) is undefined).should.be.true
    (COMPACT(undefined) is undefined).should.be.true
    (COMPACT({}) is undefined).should.be.true
    COMPACT([undefined]).should.eql([])
    COMPACT([null]).should.eql([])
    COMPACT([0]).should.eql([0])
    COMPACT(['', 0, 1]).should.eql(['', 0, 1])

describe 'COUNT', ->
  it 'returns the count of items', ->
    COUNT([1, 2, 3]).should.be.exactly(3)
    COUNT([]).should.be.exactly(0)
    COUNT(null).should.be.NaN
    COUNT(undefined).should.be.NaN
    COUNT({}).should.be.NaN
    COUNT([undefined]).should.be.exactly(0)
    COUNT([null]).should.be.exactly(0)
    COUNT([0]).should.be.exactly(1)

describe 'COUNTA', ->
  it 'returns the count of items', ->
    COUNTA(1, 2, 3).should.be.exactly(3)
    COUNTA().should.be.exactly(0)
    COUNTA(null).should.be.exactly(0)
    COUNTA(undefined).should.be.exactly(0)
    COUNTA({}).should.be.exactly(1)
    COUNTA([0]).should.be.exactly(1)

describe 'COUNTBLANK', ->
  it 'returns the count of blank items', ->
    COUNTBLANK([1, 2, 3]).should.be.exactly(0)
    COUNTBLANK([1, 2, '']).should.be.exactly(1)
    COUNTBLANK([]).should.be.exactly(0)
    COUNTBLANK(null).should.be.NaN
    COUNTBLANK(undefined).should.be.NaN
    COUNTBLANK({}).should.be.NaN
    COUNTBLANK([undefined]).should.be.exactly(1)
    COUNTBLANK([null]).should.be.exactly(1)
    COUNTBLANK([0]).should.be.exactly(0)

describe 'DEGREES', ->
  it 'converts radians to degrees', ->
    DEGREES(Math.PI).should.be.exactly(180)
    DEGREES(Math.PI + '').should.be.exactly(180)
    DEGREES(Math.PI / 4).should.be.exactly(45)
    DEGREES([]).should.be.NaN
    DEGREES(undefined).should.be.NaN
    DEGREES(null).should.be.NaN
    DEGREES(NaN).should.be.NaN
    DEGREES(true).should.be.NaN

describe 'EVEN', ->
  it 'returns number rounded up to the nearest even integer', ->
    EVEN(0).should.be.exactly(0)
    EVEN(1).should.be.exactly(2)
    EVEN(2).should.be.exactly(2)
    EVEN(-1).should.be.exactly(0)
    EVEN(-1.5).should.be.exactly(0)
    EVEN(-2.5).should.be.exactly(-2)
    EVEN(1.5).should.be.exactly(2)
    EVEN(11.5).should.be.exactly(12)
    EVEN(1 / 3).should.be.exactly(2)
    EVEN(undefined).should.be.NaN
    EVEN(null).should.be.NaN
    EVEN([]).should.be.NaN
    EVEN({}).should.be.NaN
    EVEN(true).should.be.NaN

describe 'EXACT', ->
  it 'checks to see if two text values are identical', ->
    EXACT('', '').should.be.true
    EXACT('test', 'test').should.be.true
    EXACT(1, 1).should.be.true
    EXACT([], []).should.be.true
    EXACT({}, {}).should.be.true
    EXACT(undefined, undefined).should.be.true
    EXACT(1, undefined).should.be.false
    EXACT(NaN, NaN).should.be.true
    EXACT(1, NaN).should.be.false

describe 'FACTDOUBLE', ->
  it 'returns the double factorial of a number.', ->
    FACTDOUBLE(0).should.be.exactly(1)
    FACTDOUBLE(1).should.be.exactly(1)
    FACTDOUBLE(2).should.be.exactly(2)
    FACTDOUBLE(3).should.be.exactly(3)
    FACTDOUBLE(4).should.be.exactly(8)
    FACTDOUBLE(7).should.be.exactly(105)
    FACTDOUBLE(20).should.be.exactly(3715891200)
    FACTDOUBLE(-1).should.be.NaN
    FACTDOUBLE(NaN).should.be.NaN
    FACTDOUBLE(true).should.be.NaN
    FACTDOUBLE([]).should.be.NaN
    FACTDOUBLE({}).should.be.NaN
    FACTDOUBLE('').should.be.NaN
    FACTDOUBLE(null).should.be.NaN
    FACTDOUBLE(undefined).should.be.NaN

describe 'FIND', ->
  it 'find the position of a string in another string', ->
    FIND('t', 'test').should.be.exactly(1)
    FIND('te', 'test').should.be.exactly(1)
    FIND('test', 'test').should.be.exactly(1)
    FIND('st', 'test').should.be.exactly(3)
    FIND('4', '1234').should.be.exactly(4)
    FIND(4, '1234').should.be.exactly(4)
    FIND('', 'test').should.be.exactly(1)
    FIND('t', 'test', 2).should.be.exactly(4)
    shouldBeNull(FIND('abc', 'def'))
    shouldBeNull(FIND('abc', undefined))
    shouldBeNull(FIND('abc', null))
    shouldBeNull(FIND('abc', NaN))
    shouldBeNull(FIND('abc', true))
    shouldBeNull(FIND('abc', []))
    shouldBeNull(FIND(null, 'abc'))
    shouldBeNull(FIND(undefined, 'abc'))
    shouldBeNull(FIND(NaN, 'abc'))
    shouldBeNull(FIND([], 'abc'))
    shouldBeNull(FIND({}, 'abc'))
    shouldBeNull(FIND('t', 'test', 1000))

describe 'GCD', ->
  it 'returns the greatest common divisor of two or more integers', ->
    GCD(1, 2, 3).should.be.exactly(1)
    GCD(2, 4, 6).should.be.exactly(2)
    GCD(3, 6, 9).should.be.exactly(3)
    GCD(4, 6, 10).should.be.exactly(2)
    GCD('4', '6', '10').should.be.exactly(2)
    GCD(-1, -2, -3).should.be.NaN
    GCD().should.be.NaN
    GCD(undefined).should.be.NaN
    GCD(null).should.be.NaN
    GCD({}).should.be.NaN
    GCD([]).should.be.NaN
    GCD(true).should.be.NaN

describe 'IF', ->
  it 'evaluates a condition', ->
    IF(1 > 0, 10, 20).should.be.exactly(10)
    IF(1 < 0, 10, 20).should.be.exactly(20)

describe 'IFERROR', ->
  it 'evaluates an error', ->
    IFERROR(EVEN(null), 'ERR').should.eql('ERR')
    IFERROR(EVEN(7), 'ERR').should.be.exactly(8)

describe 'ISBLANK', ->
  it 'tests if a value is blank', ->
    ISBLANK('').should.be.true
    ISBLANK(null).should.be.true
    ISBLANK(undefined).should.be.true
    ISBLANK(NaN).should.be.true
    ISBLANK([]).should.be.true
    ISBLANK({}).should.be.true
    ISBLANK({ test: 1 }).should.be.false
    ISBLANK(7).should.be.false
    ISBLANK(true).should.be.false
    ISBLANK('test').should.be.false
    ISBLANK(new Date).should.be.false
    ISBLANK(choice_values: null).should.be.true
    ISBLANK(choice_values: []).should.be.true
    ISBLANK(choice_values: [], other_values: []).should.be.true
    ISBLANK(choice_values: [], other_values: null).should.be.true
    ISBLANK(choice_values: null, other_values: null).should.be.true
    ISBLANK(choice_values: null, other_values: []).should.be.true
    ISBLANK(other_values: null).should.be.true
    ISBLANK(choice_values: ['a'], other_values: []).should.be.false
    ISBLANK(choice_values: ['a'], other_values: ['b']).should.be.false
    ISBLANK(choice_values: [], other_values: ['b']).should.be.false
    ISBLANK(choice_values: null, other_values: ['b']).should.be.false

describe 'ISERR', ->
  it 'tests for an error', ->
    ISERR(EVEN(null)).should.be.true
    ISERR(EVEN(7)).should.be.false
    ISERR(new Error).should.be.true

describe 'ISLOGICAL', ->
  it 'tests for a logical value', ->
    ISLOGICAL(true).should.be.true
    ISLOGICAL(false).should.be.true
    ISLOGICAL('').should.be.false

describe 'ISNONTEXT', ->
  it 'tests for a non-text value', ->
    ISNONTEXT(true).should.be.true
    ISNONTEXT(false).should.be.true
    ISNONTEXT('').should.be.false

describe 'ISNUMBER', ->
  it 'tests for a number value', ->
    ISNUMBER(1).should.be.true
    ISNUMBER('1').should.be.false
    ISNUMBER(true).should.be.false

describe 'ISODD', ->
  it 'tests for an odd number', ->
    ISODD(0).should.be.false
    ISODD(1).should.be.true
    ISODD(2).should.be.false
    ISODD('1').should.be.true
    ISODD(true).should.be.false
    ISODD(false).should.be.false
    ISODD(undefined).should.be.false
    ISODD(null).should.be.false

describe 'ISEVEN', ->
  it 'tests for an even number', ->
    ISEVEN(0).should.be.true
    ISEVEN(1).should.be.false
    ISEVEN(2).should.be.true
    ISEVEN('2').should.be.true
    ISEVEN(true).should.be.false
    ISEVEN(false).should.be.false
    ISEVEN(undefined).should.be.false
    ISEVEN(null).should.be.false

describe 'ISTEXT', ->
  it 'tests for a text value', ->
    ISTEXT(true).should.be.false
    ISTEXT(false).should.be.false
    ISTEXT('').should.be.true

describe 'LCM', ->
  it 'returns the least common multiple', ->
    LCM(-50, 25, -45, -18, 90, 447).should.be.exactly(67050)
    LCM('-50', 25, -45, -18, 90, '447').should.be.exactly(67050)
    LCM(-50, 25, -45, -18, 90, null).should.be.NaN
    LCM(-50, 25, -45, -18, 90, NaN).should.be.NaN
    LCM(1.3, 2.5).should.be.exactly(2)
    LCM('1.3', '2.5').should.be.exactly(2)
    LCM(undefined).should.be.NaN
    LCM(null).should.be.NaN
    LCM(true).should.be.NaN
    LCM('').should.be.NaN
    LCM(new Date).should.be.NaN

describe 'LEFT', ->
  it 'returns the left characters of a string', ->
    LEFT('abc', 1).should.eql('a')
    LEFT('abc', 1.9).should.eql('a')
    LEFT('abc', '1').should.eql('a')
    LEFT('abc').should.eql('a')
    LEFT('abc', 2).should.eql('ab')
    LEFT('abc', 1000).should.eql('abc')
    LEFT('', 1000).should.eql('')
    LEFT(7000, 2).should.eql('70')
    LEFT(true, 4).should.eql('true')
    shouldBeNull(LEFT('abc', -1))
    shouldBeNull(LEFT('abc', '-1'))
    shouldBeNull(LEFT({}, 4))
    shouldBeNull(LEFT({}))
    shouldBeNull(LEFT(undefined))
    shouldBeNull(LEFT(null))
    shouldBeNull(LEFT(new Date))

describe 'LEN', ->
  it 'returns the length of a string', ->
    LEN('abc').should.be.exactly(3)
    LEN('').should.be.exactly(0)
    LEN(true).should.be.exactly(4)
    LEN(800).should.be.exactly(3)
    LEN(-800).should.be.exactly(4)
    LEN(-1 / 3).should.be.exactly(19)
    shouldBeNull(LEN({}, 4))
    shouldBeNull(LEN({}))
    shouldBeNull(LEN(undefined))
    shouldBeNull(LEN(null))
    shouldBeNull(LEN(new Date))

describe 'LN', ->
  it 'returns the natural logarithm of a number', ->
    LN(0).should.be.exactly(-Infinity)
    LN(1).should.be.exactly(0)
    LN(100).should.be.exactly(4.605170185988092)
    LN('100').should.be.exactly(4.605170185988092)
    LN('abc').should.be.NaN
    LN(-100).should.be.NaN
    LN('').should.be.NaN
    LN([]).should.be.NaN
    LN({}).should.be.NaN
    LN(true).should.be.NaN
    LN(undefined).should.be.NaN
    LN(null).should.be.NaN
    LN(new Date).should.be.NaN

describe 'LOG', ->
  it 'returns the logarithm of a number with the given base', ->
    LOG(0).should.be.exactly(-Infinity)
    LOG(1).should.be.exactly(0)
    LOG(100).should.be.exactly(2)
    LOG(1 / 3).should.be.exactly(-0.47712125471966244)
    LOG('100').should.be.exactly(2)
    LOG('abc').should.be.NaN
    LOG(-100).should.be.NaN
    LOG('').should.be.NaN
    LOG([]).should.be.NaN
    LOG({}).should.be.NaN
    LOG(true).should.be.NaN
    LOG(undefined).should.be.NaN
    LOG(null).should.be.NaN
    LOG(new Date).should.be.NaN

describe 'LOG10', ->
  it 'returns the logarithm of a number with 10 as the base', ->
    LOG10(0).should.be.exactly(-Infinity)
    LOG10(1).should.be.exactly(0)
    LOG10(100).should.be.exactly(2)
    LOG10(1 / 3).should.be.exactly(-0.47712125471966244)
    LOG10('100').should.be.exactly(2)
    LOG10('abc').should.be.NaN
    LOG10(-100).should.be.NaN
    LOG10('').should.be.NaN
    LOG10([]).should.be.NaN
    LOG10({}).should.be.NaN
    LOG10(true).should.be.NaN
    LOG10(undefined).should.be.NaN
    LOG10(null).should.be.NaN
    LOG10(new Date).should.be.NaN

describe 'LOWER', ->
  it 'returns the string as lower case', ->
    LOWER('ABC').should.eql('abc')
    LOWER('abc').should.eql('abc')
    LOWER('1A').should.eql('1a')
    LOWER(100).should.eql('100')
    LOWER('').should.eql('')
    LOWER(true).should.eql('true')
    shouldHaveNoValue(LOWER([]))
    shouldHaveNoValue(LOWER({}))
    shouldHaveNoValue(LOWER(undefined))
    shouldHaveNoValue(LOWER(null))
    shouldHaveNoValue(LOWER(new Date))

describe 'MAX', ->
  it 'returns the maximum number in a list of numbers', ->
    MAX(1, 2, 3).should.be.exactly(3)
    MAX('1', '2', '3').should.be.exactly(3)
    MAX('1.11', '2.22', '3.33').should.be.exactly(3.33)
    MAX(-1, -2, -3).should.be.exactly(-1)

    shouldHaveNoValue(MAX([]))
    shouldHaveNoValue(MAX({}))
    shouldHaveNoValue(MAX(undefined))
    shouldHaveNoValue(MAX(null))
    shouldHaveNoValue(MAX(new Date))
    shouldHaveNoValue(MAX(NaN, -2, -3))
    shouldHaveNoValue(MAX())

describe 'MAXA', ->
  it 'returns the maximum number in a list of numbers', ->
    MAXA([1, 2, 3]).should.be.exactly(3)
    MAXA(['1', '2', '3']).should.be.exactly(3)
    MAXA(['1.11', '2.22', '3.33']).should.be.exactly(3.33)
    MAXA([-1, -2, -3]).should.be.exactly(-1)

    shouldHaveNoValue(MAXA([]))
    shouldHaveNoValue(MAXA({}))
    shouldHaveNoValue(MAXA(undefined))
    shouldHaveNoValue(MAXA(null))
    shouldHaveNoValue(MAXA(new Date))
    shouldHaveNoValue(MAXA(NaN, -2, -3))
    shouldHaveNoValue(MAXA())

describe 'MIN', ->
  it 'returns the minimum number in a list of numbers', ->
    MIN(1, 2, 3).should.be.exactly(1)
    MIN('1', '2', '3').should.be.exactly(1)
    MIN('1.11', '2.22', '3.33').should.be.exactly(1.11)
    MIN(-1, -2, -3).should.be.exactly(-3)

    shouldHaveNoValue(MIN([]))
    shouldHaveNoValue(MIN({}))
    shouldHaveNoValue(MIN(undefined))
    shouldHaveNoValue(MIN(null))
    shouldHaveNoValue(MIN(new Date))
    shouldHaveNoValue(MIN(NaN, -2, -3))
    shouldHaveNoValue(MIN())

describe 'MINA', ->
  it 'returns the minium number in a list of numbers', ->
    MINA([1, 2, 3]).should.be.exactly(1)
    MINA(['1', '2', '3']).should.be.exactly(1)
    MINA(['1.11', '2.22', '3.33']).should.be.exactly(1.11)
    MINA([-1, -2, -3]).should.be.exactly(-3)

    shouldHaveNoValue(MINA([]))
    shouldHaveNoValue(MINA({}))
    shouldHaveNoValue(MINA(undefined))
    shouldHaveNoValue(MINA(null))
    shouldHaveNoValue(MINA(new Date))
    shouldHaveNoValue(MINA(NaN, -2, -3))
    shouldHaveNoValue(MINA())

describe 'MID', ->
  it 'returns a specific number of characters from a text string', ->
    MID('abc', 3, 1).should.eql('c')
    MID('abc', 2, 2).should.eql('bc')
    MID('abc', 1, 3).should.eql('abc')
    MID('abc', 1, 2).should.eql('ab')
    MID('abc', 4, 2).should.eql('')
    MID('abc', 2, 9).should.eql('bc')
    MID('abc', '1', '3').should.eql('abc')
    MID(777, '1', '1').should.eql('7')
    MID(true, '1', '1').should.eql('t')

    shouldHaveNoValue(MID('abc', 1, -1))
    shouldHaveNoValue(MID('abc', -1, 1))
    shouldHaveNoValue(MID('abc'))
    shouldHaveNoValue(MID([]))
    shouldHaveNoValue(MID({}))
    shouldHaveNoValue(MID(undefined))
    shouldHaveNoValue(MID(null))
    shouldHaveNoValue(MID(new Date))
    shouldHaveNoValue(MID(NaN))
    shouldHaveNoValue(MID())

describe 'MOD', ->
  it 'returns the modulus', ->
    MOD(10, 2).should.be.exactly(0)
    MOD(11, 2).should.be.exactly(1)
    MOD(12.5, 2).should.be.exactly(0.5)
    MOD(11 / 3, 2).should.be.exactly(1.6666666666666665)
    MOD('11', '2').should.be.exactly(1)
    MOD(1, 0).should.be.NaN
    MOD(NaN).should.be.NaN
    MOD(undefined).should.be.NaN
    MOD(null).should.be.NaN
    MOD(true).should.be.NaN
    MOD(new Date).should.be.NaN
    MOD().should.be.NaN

describe 'NOT', ->
  it 'returns the negation of a value', ->
    NOT(false).should.be.true
    NOT(true).should.be.false
    NOT(1).should.be.false
    NOT(NaN).should.be.true
    NOT(undefined).should.be.true
    NOT(null).should.be.true
    NOT(new Date).should.be.false
    NOT().should.be.true

describe 'ODD', ->
  it 'returns the next odd number', ->
    ODD(0).should.be.exactly(1)
    ODD(1).should.be.exactly(1)
    ODD(2).should.be.exactly(3)
    ODD(-1).should.be.exactly(-1)
    ODD(-2).should.be.exactly(-3)
    ODD(-3).should.be.exactly(-3)
    ODD(true).should.be.NaN
    ODD([]).should.be.NaN
    ODD({}).should.be.NaN
    ODD(NaN).should.be.NaN
    ODD(undefined).should.be.NaN
    ODD(null).should.be.NaN
    ODD(new Date).should.be.NaN
    ODD().should.be.NaN

describe 'OR', ->
  it 'returns true if any argument is truthy', ->
    OR(true, false).should.be.true
    OR(true, true).should.be.true
    OR(false, true).should.be.true
    OR(false, false).should.be.false
    OR(1, 0).should.be.true
    OR(0, 0).should.be.false
    OR(true).should.be.true
    OR(false).should.be.false
    OR(undefined).should.be.false
    OR(null).should.be.false
    OR(NaN).should.be.false
    OR(new Date).should.be.true
    OR([]).should.be.true
    OR({}).should.be.true

describe 'PI', ->
  it 'returns PI', ->
    PI().should.eql(Math.PI)

describe 'POWER', ->
  it 'returns the result of a number raised to a power', ->
    POWER(2, 3).should.be.exactly(8)
    POWER(-2, 3).should.be.exactly(-8)
    POWER(-2, 3.1).should.be.NaN
    POWER('-2', '3').should.be.exactly(-8)
    POWER(1, 0).should.be.exactly(1)
    POWER(NaN).should.be.NaN
    POWER(undefined).should.be.NaN
    POWER(null).should.be.NaN
    POWER(true).should.be.NaN
    POWER(new Date).should.be.NaN
    POWER().should.be.NaN

describe 'PRODUCT', ->
  it 'multiplies all the numbers given as arguments', ->
    PRODUCT(2, 3, 4).should.be.exactly(24)
    PRODUCT(-2, 3, 4).should.be.exactly(-24)
    PRODUCT(-2, 3.1, 1.7).should.be.exactly(-10.54)
    PRODUCT('-2', '3').should.be.exactly(-6)
    PRODUCT(1, 0).should.be.exactly(0)
    PRODUCT(1, NaN).should.be.NaN
    PRODUCT(undefined).should.be.NaN
    PRODUCT(null).should.be.NaN
    PRODUCT(true).should.be.NaN
    PRODUCT(new Date).should.be.NaN
    PRODUCT().should.be.NaN

describe 'PROPER', ->
  it 'capitalizes the first letter in a text string', ->
    PROPER('ABC').should.eql('Abc')
    PROPER('Abc').should.eql('Abc')
    PROPER('abc').should.eql('Abc')
    PROPER('test test').should.eql('Test Test')
    PROPER('TEST TEST').should.eql('Test Test')
    PROPER('Test Test').should.eql('Test Test')
    PROPER('1A').should.eql('1a')
    PROPER(100).should.eql('100')
    PROPER('').should.eql('')
    PROPER(true).should.eql('True')
    shouldHaveNoValue(PROPER([]))
    shouldHaveNoValue(PROPER({}))
    shouldHaveNoValue(PROPER(undefined))
    shouldHaveNoValue(PROPER(null))
    shouldHaveNoValue(PROPER(new Date))

describe 'QUOTIENT', ->
  it 'returns the quotient', ->
    QUOTIENT(10, 2).should.be.exactly(5)
    QUOTIENT(11, 2).should.be.exactly(5)
    QUOTIENT(12.5, 2).should.be.exactly(6)
    QUOTIENT(11 / 3, 2).should.be.exactly(1)
    QUOTIENT('11', '2').should.be.exactly(5)
    QUOTIENT(1, 0).should.be.NaN
    QUOTIENT(NaN).should.be.NaN
    QUOTIENT(undefined).should.be.NaN
    QUOTIENT(null).should.be.NaN
    QUOTIENT(true).should.be.NaN
    QUOTIENT(new Date).should.be.NaN
    QUOTIENT().should.be.NaN

describe 'RADIANS', ->
  it 'converts degrees to radians', ->
    RADIANS(45).should.be.exactly(Math.PI / 4)
    RADIANS(90).should.be.exactly(Math.PI / 2)
    RADIANS(180).should.be.exactly(Math.PI)
    RADIANS(360).should.be.exactly(Math.PI * 2)
    RADIANS(-45).should.be.exactly(-Math.PI / 4)
    RADIANS([]).should.be.NaN
    RADIANS(undefined).should.be.NaN
    RADIANS(null).should.be.NaN
    RADIANS(NaN).should.be.NaN
    RADIANS(true).should.be.NaN

describe 'RAND', ->
  it 'returns a random number between 0 and 1', ->
    RAND().should.be.above(0).and.below(1)

describe 'RANDBETWEEN', ->
  it 'returns a random integer between low and high', ->
    RANDBETWEEN(5, 10).should.be.above(4).and.below(11)
    RANDBETWEEN('5', '10').should.be.above(4).and.below(11)
    RANDBETWEEN(NaN, 6).should.be.NaN
    RANDBETWEEN(null).should.be.NaN
    RANDBETWEEN(undefined).should.be.NaN
    RANDBETWEEN(true).should.be.NaN
    RANDBETWEEN([]).should.be.NaN
    RANDBETWEEN({}).should.be.NaN
    RANDBETWEEN(new Date).should.be.NaN

describe 'REPLACE', ->
  it 'replace characters in a string', ->
    REPLACE('abc', 3, 1, 'd').should.eql('abd')
    REPLACE('abc', 2, 2, 'd').should.eql('ad')
    REPLACE('abc', 1, 3, 'd').should.eql('d')
    REPLACE('abc', 1, 2, 'd').should.eql('dc')
    REPLACE('abc', 4, 2, 'd').should.eql('abcd')
    REPLACE('abc', 2, 9, 'd').should.eql('ad')
    REPLACE('abc', '1', '3', 'd').should.eql('d')
    REPLACE(777, '1', '1', 'd').should.eql('d77')
    REPLACE(true, '1', '1', 'd').should.eql('drue')

    shouldHaveNoValue(REPLACE('abc', 1, -1, 'd'))
    shouldHaveNoValue(REPLACE('abc', -1, 1, 'd'))
    shouldHaveNoValue(REPLACE('abc'))
    shouldHaveNoValue(REPLACE([]))
    shouldHaveNoValue(REPLACE({}))
    shouldHaveNoValue(REPLACE(undefined))
    shouldHaveNoValue(REPLACE(null))
    shouldHaveNoValue(REPLACE(new Date))
    shouldHaveNoValue(REPLACE(NaN))
    shouldHaveNoValue(REPLACE())

describe 'RIGHT', ->
  it 'returns the right characters of a string', ->
    RIGHT('abc', 1).should.eql('c')
    RIGHT('abc', 1.9).should.eql('c')
    RIGHT('abc', '1').should.eql('c')
    RIGHT('abc').should.eql('c')
    RIGHT('abc', 2).should.eql('bc')
    RIGHT('abc', 1000).should.eql('abc')
    RIGHT('', 1000).should.eql('')
    RIGHT(7000, 2).should.eql('00')
    RIGHT(true, 4).should.eql('true')
    shouldBeNull(RIGHT('abc', -1))
    shouldBeNull(RIGHT('abc', '-1'))
    shouldBeNull(RIGHT({}, 4))
    shouldBeNull(RIGHT({}))
    shouldBeNull(RIGHT(undefined))
    shouldBeNull(RIGHT(null))
    shouldBeNull(RIGHT(new Date))

describe 'ROUNDDOWN', ->
  it 'round down the given number to the specified number of digits', ->
    ROUNDDOWN(1).should.be.exactly(1)
    ROUNDDOWN(1.5).should.be.exactly(1)
    ROUNDDOWN(2.5).should.be.exactly(2)
    ROUNDDOWN('2.5').should.be.exactly(2)
    ROUNDDOWN('test').should.be.NaN
    ROUNDDOWN(2.6666666, 4).should.be.exactly(2.6666)
    ROUNDDOWN(-2.6666666, 4).should.be.exactly(-2.6666)
    ROUNDDOWN(2.6666666, 7).should.be.exactly(2.6666666)
    ROUNDDOWN(2.6666666, 8).should.be.exactly(2.6666666)
    ROUNDDOWN(1 / 3, 7).should.be.exactly(0.3333333)
    ROUNDDOWN(NaN).should.be.NaN
    ROUNDDOWN(undefined).should.be.NaN
    ROUNDDOWN(null).should.be.NaN
    ROUNDDOWN(new Date).should.be.NaN
    ROUNDDOWN([]).should.be.NaN
    ROUNDDOWN({}).should.be.NaN

describe 'ROUNDUP', ->
  it 'round up the given number to the specified number of digits', ->
    ROUNDUP(1).should.be.exactly(1)
    ROUNDUP(1.5).should.be.exactly(2)
    ROUNDUP(2.5).should.be.exactly(3)
    ROUNDUP('2.5').should.be.exactly(3)
    ROUNDUP('test').should.be.NaN
    ROUNDUP(2.6666666, 4).should.be.exactly(2.6667)
    ROUNDUP(-2.6666666, 4).should.be.exactly(-2.6667)
    ROUNDUP(2.6666666, 7).should.be.exactly(2.6666666)
    ROUNDUP(2.6666666, 8).should.be.exactly(2.6666666)
    ROUNDUP(1 / 3, 7).should.be.exactly(0.3333334)
    ROUNDUP(NaN).should.be.NaN
    ROUNDUP(undefined).should.be.NaN
    ROUNDUP(null).should.be.NaN
    ROUNDUP(new Date).should.be.NaN
    ROUNDUP([]).should.be.NaN
    ROUNDUP({}).should.be.NaN

describe 'SEARCH', ->
  it 'locate one text string within a second text string', ->
    SEARCH('t', 'test').should.be.exactly(1)
    SEARCH('te', 'test').should.be.exactly(1)
    SEARCH('test', 'test').should.be.exactly(1)
    SEARCH('st', 'test').should.be.exactly(3)
    SEARCH('4', '1234').should.be.exactly(4)
    SEARCH(4, '1234').should.be.exactly(4)
    SEARCH('', 'test').should.be.exactly(1)
    SEARCH('t', 'test', 2).should.be.exactly(4)
    shouldBeNull(SEARCH('abc', 'def'))
    shouldBeNull(SEARCH('abc', undefined))
    shouldBeNull(SEARCH('abc', null))
    shouldBeNull(SEARCH('abc', NaN))
    shouldBeNull(SEARCH('abc', true))
    shouldBeNull(SEARCH('abc', []))
    shouldBeNull(SEARCH(null, 'abc'))
    shouldBeNull(SEARCH(undefined, 'abc'))
    shouldBeNull(SEARCH(NaN, 'abc'))
    shouldBeNull(SEARCH([], 'abc'))
    shouldBeNull(SEARCH({}, 'abc'))
    shouldBeNull(SEARCH('t', 'test', 1000))

describe 'SIGN', ->
  it 'return the sign of a number', ->
    SIGN(0).should.be.exactly(0)
    SIGN(1).should.be.exactly(1)
    SIGN(1.5).should.be.exactly(1)
    SIGN(-1.5).should.be.exactly(-1)
    SIGN('2.5').should.be.exactly(1)
    SIGN('test').should.be.NaN
    SIGN(NaN).should.be.NaN
    SIGN(undefined).should.be.NaN
    SIGN(null).should.be.NaN
    SIGN(new Date).should.be.NaN
    SIGN([]).should.be.NaN
    SIGN({}).should.be.NaN

describe 'SQRT', ->
  it 'return the square root of a number', ->
    SQRT(4).should.be.exactly(2)
    SQRT(9).should.be.exactly(3)
    SQRT('9').should.be.exactly(3)
    SQRT(-1).should.be.NaN
    SQRT(NaN).should.be.NaN
    SQRT(undefined).should.be.NaN
    SQRT(null).should.be.NaN
    SQRT(new Date).should.be.NaN
    SQRT([]).should.be.NaN
    SQRT({}).should.be.NaN

describe 'SQRTPI', ->
  it 'return the square root of a number times PI', ->
    SQRTPI(4).should.be.exactly(3.5449077018110318)
    SQRTPI(9).should.be.exactly(5.317361552716548)
    SQRTPI('9').should.be.exactly(5.317361552716548)
    SQRTPI(-1).should.be.NaN
    SQRTPI(NaN).should.be.NaN
    SQRTPI(undefined).should.be.NaN
    SQRTPI(null).should.be.NaN
    SQRTPI(new Date).should.be.NaN
    SQRTPI([]).should.be.NaN
    SQRTPI({}).should.be.NaN

describe 'SUBSTITUTE', ->
  it 'substitutes text in a text string', ->
    SUBSTITUTE('abc abc abc', 'abc', 'def').should.eql('def def def')
    SUBSTITUTE('abc abc abc', 'xyz', 'def').should.eql('abc abc abc')
    SUBSTITUTE('abc abc ghi', 'abc', 'def').should.eql('def def ghi')
    SUBSTITUTE('ABC abc ghi', 'abc', 'def').should.eql('ABC def ghi')
    SUBSTITUTE('abc abc abc', 'abc', 'def', 1).should.eql('def abc abc')
    SUBSTITUTE('abc abc abc', 'abc', 'def', 2).should.eql('abc def abc')
    SUBSTITUTE('abc abc abc', 'abc', 'def', 3).should.eql('abc abc def')
    SUBSTITUTE('abc abc abc', 'abc', 'def', 4).should.eql('abc abc abc')
    SUBSTITUTE('def def def', 'abc', 'def', 2).should.eql('def def def')
    SUBSTITUTE('777', '7', '8', 2).should.eql('787')
    shouldHaveNoValue(SUBSTITUTE('abc abc abc', 'abc', 'def', -1))
    shouldHaveNoValue(SUBSTITUTE(null, 'abc', 'def', 1))
    shouldHaveNoValue(SUBSTITUTE('abc', null, 'def', 1))
    shouldHaveNoValue(SUBSTITUTE('abc', null, null, 1))
    shouldHaveNoValue(SUBSTITUTE(undefined))
    shouldHaveNoValue(SUBSTITUTE(null))
    shouldHaveNoValue(SUBSTITUTE(new Date))
    shouldHaveNoValue(SUBSTITUTE([]))
    shouldHaveNoValue(SUBSTITUTE({}))
    shouldHaveNoValue(SUBSTITUTE(NaN))
    shouldHaveNoValue(SUBSTITUTE())

describe 'SUM', ->
  it 'sum all the numbers given as arguments', ->
    SUM(2, 3, 4).should.be.exactly(9)
    SUM(-2, 3, 4).should.be.exactly(5)
    SUM(-2, 3.1, 1.7).should.be.exactly(2.8)
    SUM('-2', '3').should.be.exactly(1)
    SUM(1, 0).should.be.exactly(1)
    SUM(1, NaN).should.be.NaN
    SUM(undefined).should.be.NaN
    SUM(null).should.be.NaN
    SUM(true).should.be.NaN
    SUM(new Date).should.be.NaN
    SUM().should.be.NaN

describe 'SUMSQ', ->
  it 'sum all the squares of numbers given as arguments', ->
    SUMSQ(2, 3, 4).should.be.exactly(29)
    SUMSQ(-2, 3, 4).should.be.exactly(29)
    SUMSQ(-2, 3.1, 1.7).should.be.exactly(16.5)
    SUMSQ('-2', '3').should.be.exactly(13)
    SUMSQ(1, 0).should.be.exactly(1)
    SUMSQ(1, NaN).should.be.NaN
    SUMSQ(undefined).should.be.NaN
    SUMSQ(null).should.be.NaN
    SUMSQ(true).should.be.NaN
    SUMSQ(new Date).should.be.NaN
    SUMSQ().should.be.NaN

describe 'T', ->
  it 'converts argument to text', ->
    T('test').should.eql('test')
    T(undefined).should.eql('')
    T(null).should.eql('')

describe 'TRIM', ->
  it 'trim whitespace from a string', ->
    TRIM('test').should.eql('test')
    TRIM(' test ').should.eql('test')
    TRIM(undefined).should.eql('')
    TRIM(null).should.eql('')

describe 'UPPER', ->
  it 'returns the string as upper case', ->
    UPPER('ABC').should.eql('ABC')
    UPPER('abc').should.eql('ABC')
    UPPER('1a').should.eql('1A')
    UPPER(100).should.eql('100')
    UPPER('').should.eql('')
    UPPER(true).should.eql('TRUE')
    shouldHaveNoValue(UPPER([]))
    shouldHaveNoValue(UPPER({}))
    shouldHaveNoValue(UPPER(undefined))
    shouldHaveNoValue(UPPER(null))
    shouldHaveNoValue(UPPER(new Date))

describe 'SELECTED', ->
  it 'returns true if a choice value is selected', ->
    SELECTED(choice_values: ['test'], 'test').should.be.true
    SELECTED(choice_values: ['1', '2'], '1').should.be.true
    SELECTED(choice_values: ['1', '2'], ['1', '2']).should.be.true
    SELECTED(choice_values: ['1', '2'], ['1', '2', '3']).should.be.false
    SELECTED(other_values: ['test'], 'test').should.be.true
    SELECTED(other_values: [], 'test').should.be.false
    SELECTED(other_values: null, 'test').should.be.false
    SELECTED().should.be.false
    SELECTED(null).should.be.false
    SELECTED(choice_values: ['1']).should.be.false
    SELECTED(choice_values: ['1'], other_values: ['2'], '1').should.be.true
    SELECTED(choice_values: ['1'], other_values: ['2'], '2').should.be.true

describe 'CONFIG', ->
  it 'returns the current config', ->
    CONFIGURE(decimalSeparator: '.')
    CONFIG().decimalSeparator.should.eql('.')

describe 'FIXED', ->
  it 'returns the fixed represention of a number', ->
    FIXED(12345678901 / 3, 3).should.eql('4,115,226,300.333')
    FIXED(12345678901 / 3, 3, true).should.eql('4115226300.333')
    FIXED(1 / 3, 3, true).should.eql('0.333')
    FIXED(1 / 3, 3).should.eql('0.333')
    FIXED(2 / 3, 3).should.eql('0.667')
    FIXED(13.371337, 3).should.eql('13.371')
    FIXED(3 * 3.2, 1).should.eql('9.6')
    FIXED(0).should.eql('0.00')
    FIXED(1, 10).should.eql('1.0000000000')
    FIXED(100000, 10).should.eql('100,000.0000000000')
    FIXED(1000000001, 10).should.eql('1,000,000,001.0000000000')
    FIXED(9999999999, 10).should.eql('9,999,999,999.0000000000')
    FIXED(9999999999.001, 3).should.eql('9,999,999,999.001')

    CONFIGURE(decimalSeparator: ',', groupingSeparator: '.')

    FIXED(12345678901 / 3, 3).should.eql('4.115.226.300,333')
    FIXED(12345678901 / 3, 3, true).should.eql('4115226300,333')
    FIXED(1 / 3, 3, true).should.eql('0,333')
    FIXED(1 / 3, 3).should.eql('0,333')
    FIXED(13.371337, 3).should.eql('13,371')
    FIXED(3 * 3.2, 1).should.eql('9,6')
    FIXED(0).should.eql('0,00')
    FIXED(1, 10).should.eql('1,0000000000')
    FIXED(100000, 10).should.eql('100.000,0000000000')
    FIXED(1000000001, 10).should.eql('1.000.000.001,0000000000')

    CONFIGURE(decimalSeparator: '.', groupingSeparator: ',', groupingSize: 4)

    FIXED(12345678901 / 3, 3).should.eql('41,1522,6300.333')
    FIXED(12345678901 / 3, 3, true).should.eql('4115226300.333')

    CONFIGURE(decimalSeparator: '.', groupingSeparator: ',', groupingSize: 3)

    shouldHaveNoValue(FIXED([]))
    shouldHaveNoValue(FIXED({}))
    shouldHaveNoValue(FIXED(undefined))
    shouldHaveNoValue(FIXED(null))
    shouldHaveNoValue(FIXED(new Date))
    shouldHaveNoValue(FIXED(new RegExp))
    shouldHaveNoValue(FIXED(''))

describe 'LOCALE', ->
  it 'returns the current locale', ->
    LOCALE().should.eql('en_US')
    CONFIGURE(locale: 'pt_BR').locale.should.eql('pt_BR')

describe 'FORMATNUMBER', ->
  it 'formats a number in a given locale', ->
    FORMATNUMBER(1 / 3).should.eql('0.333')
    FORMATNUMBER(1 / 3, 'pt-BR').should.eql('0,333')
    FORMATNUMBER(10000 / 3, 'pt-BR').should.eql('3.333,333')
    FORMATNUMBER(10000 / 3, 'fr-FR').should.eql('3 333,333')
    FORMATNUMBER(10000 / 3, 'pt-BR', useGrouping: false).should.eql('3333,333')
    FORMATNUMBER(10000 / 3, 'fr-FR', useGrouping: false).should.eql('3333,333')
    FORMATNUMBER(1 / 3, null, minimumFractionDigits: 5).should.eql('0.33333')
    FORMATNUMBER(1 / 3, null, maximumFractionDigits: 2).should.eql('0.33')
    FORMATNUMBER(1 / 3, null, minimumIntegerDigits: 2).should.eql('00.333')
    FORMATNUMBER(10000 / 3, 'pt-BR', style: 'currency', currency: 'BRL').should.eql('R$3.333,33')
    FORMATNUMBER(10000 / 3, 'fr-FR', style: 'currency', currency: 'EUR').should.eql('3 333,33 €')

    CONFIGURE(currencyCode: 'BRL')
    FORMATNUMBER(10000 / 3, 'pt-BR', style: 'currency').should.eql('R$3.333,33')
    FORMATNUMBER(10000 / 3).should.eql('3,333.333')


    #test formatting currency in different locales
    CONFIGURE(currencyCode: 'EUR')
    FORMATNUMBER(10000 / 3, 'pt-BR', style: 'currency').should.eql('€3.333,33')
    FORMATNUMBER(10000 / 3, 'fr-FR', style: 'currency').should.eql('3 333,33 €')
    FORMATNUMBER(10000 / 3, 'en-US', style: 'currency').should.eql('€3,333.33')

    CONFIGURE(currencyCode: 'BRL')
    FORMATNUMBER(10000 / 3, 'pt-BR', style: 'currency').should.eql('R$3.333,33')
    FORMATNUMBER(10000 / 3, 'fr-FR', style: 'currency').should.eql('3 333,33 R$')
    FORMATNUMBER(10000 / 3, 'en-US', style: 'currency').should.eql('R$3,333.33')

    CONFIGURE(currencyCode: 'USD')
    FORMATNUMBER(10000 / 3, 'pt-BR', style: 'currency').should.eql('US$3.333,33')
    FORMATNUMBER(10000 / 3, 'fr-FR', style: 'currency').should.eql('3 333,33 $US')
    FORMATNUMBER(10000 / 3, 'en-US', style: 'currency').should.eql('$3,333.33')

    RESETCONFIG()

describe 'DOLLAR', ->
  it 'returns a string with a formatted dollar amount in the current locale', ->
    RESETCONFIG()
    DOLLAR(10000 / 3).should.eql('$3,333.33')
    DOLLAR(10000 / 3, 0).should.eql('$3,333')
    DOLLAR(10000 / 3, 4).should.eql('$3,333.3333')

    CONFIGURE(currencyCode: 'EUR')
    DOLLAR(10000 / 3).should.eql('€3,333.33')
    DOLLAR(10000 / 3, 0).should.eql('€3,333')
    DOLLAR(10000 / 3, 4).should.eql('€3,333.3333')

    RESETCONFIG()
    DOLLAR(10000 / 3, 2, 'THB').should.eql('฿3,333.33')
    DOLLAR(10000 / 3, 0, 'THB').should.eql('฿3,333')
    DOLLAR(10000 / 3, 4, 'THB').should.eql('฿3,333.3333')


describe 'VERSIONINFO', ->
  it 'returns version info as a string', ->
    RESETCONFIG()

    CONFIGURE(variables)

    VERSIONINFO().should.eql('Apple iPhone6,2 iOS 8.1 Fulcrum 2.7.0 2162')

describe 'LATITUDE', ->
  it 'returns the latitude of the current feature', ->
    RESETCONFIG()

    CONFIGURE(variables)

    LATITUDE().should.eql(27.770756908186286)

    CONFIGURE(featureGeometry: null)

    LATITUDE().should.be.NaN

describe 'LONGITUDE', ->
  it 'returns the longitude of the current feature', ->
    RESETCONFIG()

    CONFIGURE(variables)

    LONGITUDE().should.eql(-82.63814896345139)

    CONFIGURE(featureGeometry: null)

    LONGITUDE().should.be.NaN

describe 'STATUS', ->
  it 'returns the status of the current record', ->
    RESETCONFIG()

    CONFIGURE(variables)

    STATUS().should.eql('approved')

    CONFIGURE(recordStatus: null)

    shouldBeNull(STATUS())

describe 'REPEATABLEVALUES', ->
  it 'returns a specific field out of a collection of repeatable items', ->
    RESETCONFIG()

    CONFIGURE(variables)

    $repeatable_field = variables.values.form_values['1337']

    costs = REPEATABLEVALUES($repeatable_field, 'items', 'cost')

    costs.should.eql([1, 2, 3])

describe 'REPEATABLESUM', ->
  it 'returns the sum of a specific numeric field within a repeatable field', ->
    $repeatable_field = variables.values.form_values['1337']

    totalCost = REPEATABLESUM($repeatable_field, 'items', 'cost')

    totalCost.should.eql(6)
