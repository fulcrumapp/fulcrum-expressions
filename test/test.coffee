global.Intl = require 'intl'

_ = require 'underscore'

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
  Utils = require '../utils'

variables = CSON.readFileSync(path.join(__dirname, 'variables.cson'))

CONFIGURE(variables)

resetConfig = ->
  RESETCONFIG()
  runtime.values = variables.values.form_values
  runtime.setupValues()
  CONFIGURE(variables)

runtime.form = variables.form
runtime.values = variables.values.form_values
runtime.prepare()

shouldBeNull = (value) ->
  (value is null).should.be.true

shouldHaveNoValue = (value) ->
  (value is NO_VALUE).should.be.true

shouldBeUndefined = (value) ->
  (value is undefined).should.be.true

beforeEach ->
  resetConfig()

describe 'ARRAY', ->
  it 'returns an array from the arguments', ->
    ARRAY().should.eql([])
    ARRAY(1, 2, 3, 4).should.eql([1, 2, 3, 4])
    ARRAY([1, 2], [3, 4]).should.eql([1, 2, 3, 4])
    ARRAY([1, 2], [3, 4], [5, 6]).should.eql([1, 2, 3, 4, 5, 6])
    ARRAY([1, 2], [3, 4], [5, [6, [7, 8]]]).should.eql([1, 2, 3, 4, 5, 6, 7, 8])
    ARRAY(undefined, null).should.eql([undefined, null])
    ARRAY(NaN, NaN).should.eql([NaN, NaN])
    ARRAY(1, 2, 3).should.eql([1, 2, 3])
    ARRAY(1, '2', 3).should.eql([1, '2', 3])
    ARRAY({}, '2', 'a7').should.eql([{}, '2', 'a7'])
    ARRAY([], [], []).should.eql([])
    ARRAY([]).should.eql([])
    ARRAY(ARRAY([], [], [])).should.eql([])
    ARRAY(ARRAY([], ARRAY([]), [], ARRAY())).should.eql([])
    ARRAY(ARRAY(ARRAY(ARRAY([1, 2], [3, 4])))).should.eql([1, 2, 3, 4])

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
    AVERAGE(1, [1.5, 3.75]).should.be.exactly(2.0833333333333335)
    AVERAGE([1, 1.5, 3.75]).should.be.exactly(2.0833333333333335)
    AVERAGE([[1], [1.5, 3.75]]).should.be.exactly(2.0833333333333335)

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

describe 'CONTAINS', ->
  it 'returns whether an array or string contains a string', ->
    CONTAINS(['1', '2', '3'], '1').should.be.true
    CONTAINS(['1', '2', '3'], '3').should.be.true
    CONTAINS(['1', '2', '3'], '4').should.be.false
    CONTAINS([1, 2, 3], 3).should.be.true
    CONTAINS('123', '1').should.be.true
    CONTAINS('123', '3').should.be.true
    CONTAINS('123', '123').should.be.true
    CONTAINS('123', 1).should.be.true
    CONTAINS([null, 1], null).should.be.true
    CONTAINS([null, 1], '').should.be.false
    CONTAINS([null, 1], undefined).should.be.false
    CONTAINS([null, undefined], undefined).should.be.true
    CONTAINS(null, null).should.be.false

describe 'DESCRIPTION', ->
  it 'returns the description of a field', ->
    DESCRIPTION('name').should.be.exactly('Enter the name')
    shouldBeUndefined(DESCRIPTION('invalid_field'))

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

describe 'CHOICEVALUE', ->
  it 'return a single choice value', ->
    shouldHaveNoValue(CHOICEVALUE(''))
    shouldHaveNoValue(CHOICEVALUE(null))
    shouldHaveNoValue(CHOICEVALUE(undefined))
    shouldHaveNoValue(CHOICEVALUE(NaN))
    shouldHaveNoValue(CHOICEVALUE([]))
    shouldHaveNoValue(CHOICEVALUE({}))
    shouldHaveNoValue(CHOICEVALUE({ test: 1 }))
    shouldHaveNoValue(CHOICEVALUE(7))
    shouldHaveNoValue(CHOICEVALUE(true))
    shouldHaveNoValue(CHOICEVALUE('test'))
    shouldHaveNoValue(CHOICEVALUE(new Date))
    shouldHaveNoValue(CHOICEVALUE(choice_values: null))
    shouldHaveNoValue(CHOICEVALUE(choice_values: []))
    shouldHaveNoValue(CHOICEVALUE(choice_values: [], other_values: []))
    shouldHaveNoValue(CHOICEVALUE(choice_values: [], other_values: null))
    shouldHaveNoValue(CHOICEVALUE(choice_values: null, other_values: null))
    shouldHaveNoValue(CHOICEVALUE(choice_values: null, other_values: []))
    shouldHaveNoValue(CHOICEVALUE(other_values: null))
    CHOICEVALUE(choice_values: ['a'], other_values: []).should.be.exactly('a')
    CHOICEVALUE(choice_values: ['a'], other_values: ['b']).should.be.exactly('a')
    CHOICEVALUE(choice_values: ['a', 'b'], other_values: ['c']).should.be.exactly('a')
    CHOICEVALUE(choice_values: [], other_values: ['b']).should.be.exactly('b')
    CHOICEVALUE(choice_values: null, other_values: ['b']).should.be.exactly('b')

describe 'CHOICEVALUES', ->
  it 'return the choice values of a choice field', ->
    shouldHaveNoValue(CHOICEVALUES(''))
    shouldHaveNoValue(CHOICEVALUES(null))
    shouldHaveNoValue(CHOICEVALUES(undefined))
    shouldHaveNoValue(CHOICEVALUES(NaN))
    shouldHaveNoValue(CHOICEVALUES([]))
    shouldHaveNoValue(CHOICEVALUES({}))
    shouldHaveNoValue(CHOICEVALUES({ test: 1 }))
    shouldHaveNoValue(CHOICEVALUES(7))
    shouldHaveNoValue(CHOICEVALUES(true))
    shouldHaveNoValue(CHOICEVALUES('test'))
    shouldHaveNoValue(CHOICEVALUES(new Date))
    shouldHaveNoValue(CHOICEVALUES(choice_values: null))
    shouldHaveNoValue(CHOICEVALUES(choice_values: null, other_values: null))
    shouldHaveNoValue(CHOICEVALUES(other_values: null))
    CHOICEVALUES(choice_values: []).should.eql([])
    CHOICEVALUES(choice_values: [], other_values: []).should.eql([])
    CHOICEVALUES(choice_values: [], other_values: null).should.eql([])
    CHOICEVALUES(choice_values: null, other_values: []).should.eql([])
    CHOICEVALUES(choice_values: ['a'], other_values: []).should.eql(['a'])
    CHOICEVALUES(choice_values: ['a'], other_values: ['b']).should.eql(['a', 'b'])
    CHOICEVALUES(choice_values: ['a', 'b'], other_values: ['c']).should.eql(['a', 'b', 'c'])
    CHOICEVALUES(choice_values: [], other_values: ['b']).should.eql(['b'])
    CHOICEVALUES(choice_values: null, other_values: ['b']).should.eql(['b'])

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
    CONCATENATE('1', [2], '3').should.eql('123')
    CONCATENATE('1', [2], '3', [4, 5]).should.eql('12345')

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
  it 'returns the count of numeric items', ->
    COUNT([1, 2, 3]).should.be.exactly(3)
    COUNT([]).should.be.exactly(0)
    shouldHaveNoValue(COUNT(null))
    shouldHaveNoValue(COUNT(undefined))
    shouldHaveNoValue(COUNT({}))
    COUNT([undefined]).should.be.exactly(0)
    COUNT([null]).should.be.exactly(0)
    COUNT([0]).should.be.exactly(1)

describe 'COUNTA', ->
  it 'returns the count of items', ->
    COUNTA([1, 2, 3]).should.be.exactly(3)
    shouldHaveNoValue(COUNTA())
    shouldHaveNoValue(COUNTA(null))
    shouldHaveNoValue(COUNTA(undefined))
    shouldHaveNoValue(COUNTA({}))
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

describe 'EXISTS', ->
  it 'checks whether a value exists', ->
    # truthy things
    EXISTS(0).should.be.true
    EXISTS(-1).should.be.true
    EXISTS(true).should.be.true
    EXISTS(false).should.be.true
    EXISTS('test').should.be.true
    EXISTS([1]).should.be.true
    EXISTS({test:1}).should.be.true
    EXISTS(1, 2).should.be.true
    EXISTS(1, 2, 'test').should.be.true
    EXISTS(new Date).should.be.true
    EXISTS(/test/).should.be.true

    # falsey things
    EXISTS([]).should.be.false
    EXISTS({}).should.be.false
    EXISTS('').should.be.false
    EXISTS(NaN).should.be.false
    EXISTS(null).should.be.false
    EXISTS(undefined).should.be.false
    EXISTS(undefined, null).should.be.false
    EXISTS(1, null).should.be.false

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
    shouldHaveNoValue(FIND('abc', 'def'))
    shouldHaveNoValue(FIND('abc', undefined))
    shouldHaveNoValue(FIND('abc', null))
    shouldHaveNoValue(FIND('abc', NaN))
    shouldHaveNoValue(FIND('abc', true))
    shouldHaveNoValue(FIND('abc', []))
    shouldHaveNoValue(FIND(null, 'abc'))
    shouldHaveNoValue(FIND(undefined, 'abc'))
    shouldHaveNoValue(FIND(NaN, 'abc'))
    shouldHaveNoValue(FIND([], 'abc'))
    shouldHaveNoValue(FIND({}, 'abc'))
    shouldHaveNoValue(FIND('t', 'test', 1000))

describe 'FIRST', ->
  it 'returns the first N items of an array', ->
    FIRST([1]).should.be.exactly(1)
    FIRST([1, 2, 3]).should.be.exactly(1)
    FIRST('1234').should.be.exactly('1')
    shouldBeUndefined(FIRST(''))
    shouldBeUndefined(FIRST([]))
    shouldBeUndefined(FIRST(1))
    shouldBeUndefined(FIRST(1.337))
    shouldBeUndefined(FIRST(new Date))
    shouldBeUndefined(FIRST(true))
    shouldBeUndefined(FIRST(NaN))
    shouldBeUndefined(FIRST({}))
    shouldBeUndefined(FIRST(null))
    shouldBeUndefined(FIRST(undefined))

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

describe 'INSPECT', ->
  it 'returns the string representation of a value', ->
    INSPECT({ test: 'yes' }).should.eql("{ test: 'yes' }")
    INSPECT(null).should.eql('null')
    INSPECT(undefined).should.eql('undefined')

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

describe 'LABEL', ->
  it 'returns the label of a field', ->
    LABEL('name').should.be.exactly('Name')
    shouldBeUndefined(LABEL('invalid_field'))

describe 'LAST', ->
  it 'returns the last N items of an array', ->
    LAST([1]).should.be.exactly(1)
    LAST([1, 2, 3]).should.be.exactly(3)
    LAST('1234').should.be.exactly('4')
    shouldBeUndefined(LAST(''))
    shouldBeUndefined(LAST([]))
    shouldBeUndefined(LAST(1))
    shouldBeUndefined(LAST(1.337))
    shouldBeUndefined(LAST(new Date))
    shouldBeUndefined(LAST(true))
    shouldBeUndefined(LAST(NaN))
    shouldBeUndefined(LAST({}))
    shouldBeUndefined(LAST(null))
    shouldBeUndefined(LAST(undefined))

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
    shouldHaveNoValue(LEFT('abc', -1))
    shouldHaveNoValue(LEFT('abc', '-1'))
    shouldHaveNoValue(LEFT({}, 4))
    shouldHaveNoValue(LEFT({}))
    shouldHaveNoValue(LEFT(undefined))
    shouldHaveNoValue(LEFT(null))
    shouldHaveNoValue(LEFT(new Date))

describe 'LEN', ->
  it 'returns the length of a string', ->
    LEN('abc').should.be.exactly(3)
    LEN('').should.be.exactly(0)
    LEN(true).should.be.exactly(4)
    LEN(false).should.be.exactly(5)
    LEN(800).should.be.exactly(3)
    LEN(-800).should.be.exactly(4)
    LEN(-1 / 3).should.be.exactly(19)
    LEN(undefined).should.be.exactly(0)
    LEN(null).should.be.exactly(0)
    LEN(NaN).should.be.exactly(0)
    LEN([]).should.be.exactly(0)
    LEN([1]).should.be.exactly(1)
    LEN([1, 2, 3]).should.be.exactly(3)
    LEN([1, 2, 3, null]).should.be.exactly(4)
    LEN({}).should.be.exactly(0)
    LEN({key1: 1}).should.be.exactly(1)
    LEN({key1: 1, key2: 2}).should.be.exactly(2)
    LEN(new Date).should.be.exactly(39)
    LEN(/test/).should.be.exactly(6)

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
    MAX(-1, [-2, 5], -3).should.be.exactly(5)

    shouldHaveNoValue(MAX([]))
    shouldHaveNoValue(MAX({}))
    shouldHaveNoValue(MAX(undefined))
    shouldHaveNoValue(MAX(null))
    shouldHaveNoValue(MAX(new Date))
    shouldHaveNoValue(MAX(NaN, -2, -3))
    shouldHaveNoValue(MAX())
    shouldHaveNoValue(MAX(3, 4, 5, 'Test'))

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
    shouldHaveNoValue(MAXA([3, 4, 5, 'Test']))

describe 'MEDIAN', ->
  it 'returns the median number in a list of numbers', ->
    MEDIAN(1, 2, 3).should.be.exactly(2)
    MEDIAN(2, 3, 3, 5, 7, 10).should.be.exactly(4)
    MEDIAN(2, 3, [3, 5], 7, 10).should.be.exactly(4)
    MEDIAN(10, 3, 7, 5, 3, 2).should.be.exactly(4)
    MEDIAN(10, 3, 5, 3, 2).should.be.exactly(3)
    MEDIAN('1.11', '2.22', '3.33').should.be.exactly(2.22)
    MEDIAN(-1, -2, -3).should.be.exactly(-2)

    shouldHaveNoValue(MEDIAN([]))
    shouldHaveNoValue(MEDIAN({}))
    shouldHaveNoValue(MEDIAN(undefined))
    shouldHaveNoValue(MEDIAN(null))
    shouldHaveNoValue(MEDIAN(new Date))
    shouldHaveNoValue(MEDIAN(NaN, -2, -3))
    shouldHaveNoValue(MEDIAN())

describe 'MIN', ->
  it 'returns the minimum number in a list of numbers', ->
    MIN(1, 2, 3).should.be.exactly(1)
    MIN([1], 2, 3).should.be.exactly(1)
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

describe 'PROJECTID', ->
  it 'returns the project ID', ->
    PROJECTID().should.be.exactly('88eb3511-13d8-4666-b188-8108019d0984')

describe 'PROJECTNAME', ->
  it 'returns the project name', ->
    PROJECTNAME().should.be.exactly('Project X')

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
    shouldHaveNoValue(RIGHT('abc', -1))
    shouldHaveNoValue(RIGHT('abc', '-1'))
    shouldHaveNoValue(RIGHT({}, 4))
    shouldHaveNoValue(RIGHT({}))
    shouldHaveNoValue(RIGHT(undefined))
    shouldHaveNoValue(RIGHT(null))
    shouldHaveNoValue(RIGHT(new Date))

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
    shouldHaveNoValue(SEARCH('abc', 'def'))
    shouldHaveNoValue(SEARCH('abc', undefined))
    shouldHaveNoValue(SEARCH('abc', null))
    shouldHaveNoValue(SEARCH('abc', NaN))
    shouldHaveNoValue(SEARCH('abc', true))
    shouldHaveNoValue(SEARCH('abc', []))
    shouldHaveNoValue(SEARCH(null, 'abc'))
    shouldHaveNoValue(SEARCH(undefined, 'abc'))
    shouldHaveNoValue(SEARCH(NaN, 'abc'))
    shouldHaveNoValue(SEARCH([], 'abc'))
    shouldHaveNoValue(SEARCH({}, 'abc'))
    shouldHaveNoValue(SEARCH('t', 'test', 1000))

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
    SUM(-2, [3.1], 1.7).should.be.exactly(2.8)
    SUM([-2, 3.1, 1.7]).should.be.exactly(2.8)
    SUM([-2, 3.1, [1.7]]).should.be.exactly(2.8)
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
    SUMSQ(-2, [3.1, [1.7]]).should.be.exactly(16.5)
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

describe 'TIMESTAMP', ->
  it 'returns a timestamp value', ->
    TIMESTAMP().length.should.eql(19)
    TIMESTAMP(new Date('December 16, 1982 03:24:00')).should.be.exactly('1982-12-16 03:24:00')

describe 'TRIM', ->
  it 'trim whitespace from a string', ->
    TRIM('test').should.eql('test')
    TRIM(' test ').should.eql('test')
    TRIM(undefined).should.eql('')
    TRIM(null).should.eql('')

describe 'TYPEOF', ->
  it 'returns the type of a variable', ->
    TYPEOF(null).should.eql('null')
    TYPEOF(undefined).should.eql('undefined')
    TYPEOF('test').should.eql('string')
    TYPEOF(1).should.eql('number')
    TYPEOF(NaN).should.eql('nan')
    TYPEOF(new Date).should.eql('date')
    TYPEOF(->).should.eql('function')
    TYPEOF(true).should.eql('boolean')
    TYPEOF(/test/).should.eql('regexp')
    TYPEOF({}).should.eql('object')
    TYPEOF([]).should.eql('array')
    TYPEOF(arguments).should.eql('object')

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

describe 'ISSELECTED', ->
  it 'returns true if a choice value is selected', ->
    ISSELECTED(choice_values: ['test'], 'test').should.be.true
    ISSELECTED(choice_values: ['1', '2'], '1').should.be.true
    ISSELECTED(choice_values: ['1', '2'], ['1', '2']).should.be.true
    ISSELECTED(choice_values: ['1', '2'], ['1', '2', '3']).should.be.false
    ISSELECTED(other_values: ['test'], 'test').should.be.true
    ISSELECTED(other_values: [], 'test').should.be.false
    ISSELECTED(other_values: null, 'test').should.be.false
    ISSELECTED().should.be.false
    ISSELECTED(null).should.be.false
    ISSELECTED(choice_values: ['1']).should.be.false
    ISSELECTED(choice_values: ['1'], other_values: ['2'], '1').should.be.true
    ISSELECTED(choice_values: ['1'], other_values: ['2'], '2').should.be.true

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

describe 'FORMAT', ->
  it 'formats strings', ->
    FORMAT('%s-%s-%s-%s', 1, 2, 3, 4).should.be.exactly('1-2-3-4')
    FORMAT('%s|%s|%s|%s', 1, 2, 3, 4).should.be.exactly('1|2|3|4')
    FORMAT('%s%%', 1).should.be.exactly('1%')
    FORMAT('%d + %d == %d', 2, 3, 5).should.be.exactly('2 + 3 == 5')
    FORMAT('%d + %d == %d', '2', 3, 5).should.be.exactly('2 + 3 == 5')
    FORMAT('%d', 'a').should.be.exactly('NaN')
    FORMAT('%d', 1.337).should.be.exactly('1.337')
    FORMAT('%d', null).should.be.exactly('0')
    FORMAT('%d', undefined).should.be.exactly('NaN')
    FORMAT('%s', null).should.be.exactly('null')
    FORMAT('%s', undefined).should.be.exactly('undefined')
    FORMAT('%s', true).should.be.exactly('true')
    FORMAT('%j', {x:1}).should.be.exactly('{"x":1}')

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

describe 'DOLLAR', ->
  it 'returns a string with a formatted dollar amount in the current locale', ->
    DOLLAR(10000 / 3).should.eql('$3,333.33')
    DOLLAR(10000 / 3, 0).should.eql('$3,333')
    DOLLAR(10000 / 3, 4).should.eql('$3,333.3333')

    CONFIGURE(currencyCode: 'EUR')
    DOLLAR(10000 / 3).should.eql('€3,333.33')
    DOLLAR(10000 / 3, 0).should.eql('€3,333')
    DOLLAR(10000 / 3, 4).should.eql('€3,333.3333')

    resetConfig()

    DOLLAR(10000 / 3, 2, 'THB').should.eql('฿3,333.33')
    DOLLAR(10000 / 3, 0, 'THB').should.eql('฿3,333')
    DOLLAR(10000 / 3, 4, 'THB').should.eql('฿3,333.3333')


describe 'VERSIONINFO', ->
  it 'returns version info as a string', ->
    VERSIONINFO().should.eql('Apple iPhone6,2, iOS 8.1, Fulcrum 2.7.0 2162')

describe 'LATITUDE', ->
  it 'returns the latitude of the current feature', ->
    CONFIGURE(variables)

    LATITUDE().should.eql(27.770756908186286)

    CONFIGURE(featureGeometry: null)

    LATITUDE().should.be.NaN

describe 'LONGITUDE', ->
  it 'returns the longitude of the current feature', ->
    LONGITUDE().should.eql(-82.63814896345139)

    CONFIGURE(featureGeometry: null)

    LONGITUDE().should.be.NaN

describe 'LPAD', ->
  it 'pads a string on the left', ->
    LPAD('test', 5).should.be.exactly(' test')
    LPAD('t', 5).should.be.exactly('    t')
    LPAD('test', 10).should.be.exactly('      test')
    LPAD('1', 2, '0').should.be.exactly('01')
    LPAD('1', 4, '0').should.be.exactly('0001')

describe 'STATUS', ->
  it 'returns the status of the current record', ->
    STATUS().should.eql('approved')

    CONFIGURE(recordStatus: null)

    shouldHaveNoValue(STATUS())

describe 'STATUSLABEL', ->
  it 'returns the status label of the current record', ->
    STATUSLABEL().should.eql('Approved')

    CONFIGURE(recordStatus: null)

    shouldHaveNoValue(STATUSLABEL())

describe 'REPEATABLEVALUES', ->
  it 'returns a specific field out of a collection of repeatable items', ->
    $repeatable_field = variables.values.form_values['1337']

    costs = REPEATABLEVALUES($repeatable_field, 'cost')

    costs.should.eql([1, 2, 3])

  it 'returns a specific field out of a blank collection of repeatable items', ->
    $repeatable_field = []

    costs = REPEATABLEVALUES($repeatable_field, 'cost')

    costs.should.eql([])

  it 'returns no value if the data name of the field does not exist', ->
    $repeatable_field = variables.values.form_values['1337']

    costs = REPEATABLEVALUES($repeatable_field, 'does_not_exist')

    shouldHaveNoValue(costs)

describe 'REPEATABLESUM', ->
  it 'returns the sum of a specific numeric field within a repeatable field', ->
    $repeatable_field = variables.values.form_values['1337']

    totalCost = REPEATABLESUM($repeatable_field, 'cost')

    totalCost.should.eql(6)

  it 'returns the sum of a specific numeric field within a blank collection of repeatable items', ->
    $repeatable_field = []

    totalCost = REPEATABLESUM($repeatable_field, 'cost')

    totalCost.should.be.NaN

  it 'returns the sum of a specific numeric field when some of the items have no value', ->
    $repeatable_field = [
      {
        id: '1'
        form_values: {
          '1338': 1
        }
      }
      {
        id: '2'
        form_values: {
        }
      }
      {
        id: '3'
        form_values: {
          '1338': 4
        }
      }
      {
        id: '4'
        form_values: {
          '1338': ''
        }
      }
    ]

    totalCost = REPEATABLESUM($repeatable_field, 'cost')

    totalCost.should.be.exactly(5)

  it 'returns no value if the data name of the field does not exist', ->
    $repeatable_field = variables.values.form_values['1337']

    totalCost = REPEATABLESUM($repeatable_field, 'does_not_exist')

    totalCost.should.be.NaN

describe 'DATANAMES', ->
  it 'returns the data names of the form fields', ->
    names = DATANAMES()
    names.should.eql([ 'name', 'items', 'cost' ])

    names = DATANAMES('Repeatable')
    names.should.eql([ 'items' ])

describe 'DATE', ->
  it 'returns a date given a year, month, and day', ->
    date = DATE(2015, 1, 14)
    date.getFullYear().should.be.exactly(2015)
    date.getMonth().should.be.exactly(0)
    date.getDate().should.be.exactly(14)

    shouldHaveNoValue(DATE('a', 'b', 'c'))
    shouldHaveNoValue(DATE(new Date))

describe 'DATE', ->
  it 'returns a date given a date string', ->
    dateObject = DATE(2015, 1, 14)

    date = DATEVALUE(dateObject.toString())
    date.getFullYear().should.be.exactly(2015)
    date.getMonth().should.be.exactly(0)
    date.getDate().should.be.exactly(14)

    date = DATEVALUE(dateObject)
    date.getFullYear().should.be.exactly(2015)
    date.getMonth().should.be.exactly(0)
    date.getDate().should.be.exactly(14)

    shouldHaveNoValue(DATEVALUE('a', 'b', 'c'))

describe 'DAY', ->
  it 'returns a day given a date', ->
    DAY('2015/12/16').should.be.exactly(16)
    DAY('2015-12-16').should.be.exactly(16)
    DAY('2015.12.16').should.be.exactly(16)
    DAY('2015 12 16').should.be.exactly(16)
    DAY('12/16/2015').should.be.exactly(16)
    DAY('12-16-2015').should.be.exactly(16)
    DAY('12.16.2015').should.be.exactly(16)
    DAY('12 16 2015').should.be.exactly(16)
    DAY('5/1/2015').should.be.exactly(1)

    DAY(new Date('2015/12/16 00:00:00')).should.be.exactly(16)
    DAY(new Date('2015-12-16 00:00:00')).should.be.exactly(16)
    DAY(new Date('2015 12 16 00:00:00')).should.be.exactly(16)
    DAY(new Date('2015/5/1 00:00:00')).should.be.exactly(1)

    shouldHaveNoValue(DAY('not a date'))

describe 'EMAIL', ->
  it 'returns the email', ->
    EMAIL().should.eql 'test@example.com'

describe 'MONTH', ->
  it 'returns a month given a date', ->
    MONTH('2015/12/16').should.be.exactly(12)
    MONTH('2015-12-16').should.be.exactly(12)
    MONTH('2015.12.16').should.be.exactly(12)
    MONTH('2015 12 16').should.be.exactly(12)
    MONTH('12/16/2015').should.be.exactly(12)
    MONTH('12.16.2015').should.be.exactly(12)
    MONTH('12-16-2015').should.be.exactly(12)
    MONTH('12 16 2015').should.be.exactly(12)
    MONTH('5/1/2015').should.be.exactly(5)

    MONTH(new Date('2015/12/16 00:00:00')).should.be.exactly(12)
    MONTH(new Date('2015-12-16 00:00:00')).should.be.exactly(12)
    MONTH(new Date('2015.12.16 00:00:00')).should.be.exactly(12)
    MONTH(new Date('2015 12 16 00:00:00')).should.be.exactly(12)
    MONTH(new Date('2015/5/1 00:00:00')).should.be.exactly(5)

    shouldHaveNoValue(MONTH('not a date'))

describe 'RECORDID', ->
  it 'returns the record ID', ->
    RECORDID().should.eql '96eb35f5-13d8-4666-b188-8108019d0984'

describe 'REPEATABLEID', ->
  it 'returns the repeatable item ID', ->
    REPEATABLEID().should.eql '859fdb06-4e7d-4bed-b1d2-af168db71522'

describe 'REPEATABLENUMBER', ->
  it 'returns the repeatable item number', ->
    REPEATABLENUMBER().should.eql 4

describe 'ROLE', ->
  it 'returns the role name', ->
    ROLE().should.eql 'Owner'

describe 'RPAD', ->
  it 'pads a string on the right', ->
    RPAD('test', 5).should.be.exactly('test ')
    RPAD('t', 5).should.be.exactly('t    ')
    RPAD('test', 10).should.be.exactly('test      ')
    RPAD('1', 2, '0').should.be.exactly('10')
    RPAD('1', 4, '0').should.be.exactly('1000')

describe 'SORT', ->
  it 'returns the sorted values from the parameters', ->
    SORT(1, 2, 3).should.be.eql([1, 2, 3])
    SORT(3, 2, 1, 3, 3, 3).should.be.eql([1, 2, 3, 3, 3, 3])
    SORT(1, 2, 'a').should.be.eql([1, 2, 'a'])
    SORT(1, 2, 'a', 'a').should.be.eql([1, 2, 'a', 'a'])
    SORT('a', 'c', 'c', 'b', 'a').should.be.eql(['a', 'a', 'b', 'c', 'c'])
    SORT(1).should.be.eql([1])
    SORT(1, 1.5, 3.75).should.be.eql([1, 1.5, 3.75])
    SORT(1, [1.5, 3.75]).should.be.eql([1, 1.5, 3.75])
    SORT({test: 2}, {test: 1}, {test: 1}, (a, b) -> a.test).should.be.eql([{test: 1}, {test: 1}, {test: 2}])
    SORT([{test: 2}, {test: 1}, {test: 1}], (a, b) -> a.test).should.be.eql([{test: 1}, {test: 1}, {test: 2}])

describe 'TIMEDIFF', ->
  it 'returns the number of minutes between 2 times', ->
    TIMEDIFF('00:00', '00:01').should.be.exactly(1 / 60)
    TIMEDIFF('14:00', '18:00').should.be.exactly(4)
    TIMEDIFF('02:00', '01:00').should.be.exactly(23)
    TIMEDIFF('02:00', '02:00').should.be.exactly(24)
    TIMEDIFF('22:00', '06:00').should.be.exactly(8)
    TIMEDIFF('12:00', '19:00').should.be.exactly(7)
    TIMEDIFF('23:59', '00:00').should.be.exactly(1 / 60)
    TIMEDIFF('23:59', '00:01').should.be.exactly(2 / 60)
    TIMEDIFF('00:00', '23:59').should.be.exactly(1439 / 60)

    TIMEDIFF('00:00', '00:01', 'minutes').should.be.exactly(1)
    TIMEDIFF('14:00', '18:00', 'minutes').should.be.exactly(4 * 60)
    TIMEDIFF('02:00', '01:00', 'minutes').should.be.exactly(23 * 60)

    shouldHaveNoValue(TIMEDIFF(1, 2))
    shouldHaveNoValue(TIMEDIFF('0000', '0001'))
    shouldHaveNoValue(TIMEDIFF('2:00', '6:00'))
    shouldHaveNoValue(TIMEDIFF(new Date, null))
    shouldHaveNoValue(TIMEDIFF('2:00', undefined))

describe 'TIMEADD', ->
  it 'adds a given amount of time to a time', ->
    TIMEADD('00:00', 1).should.be.exactly('01:00')
    TIMEADD('00:00', 23).should.be.exactly('23:00')
    TIMEADD('00:00', -1).should.be.exactly('23:00')
    TIMEADD('00:00', -48).should.be.exactly('00:00')
    TIMEADD('00:00', 48).should.be.exactly('00:00')
    TIMEADD('00:00', 24).should.be.exactly('00:00')
    TIMEADD('16:00', 4).should.be.exactly('20:00')
    TIMEADD('16:00', 1.5).should.be.exactly('17:30')
    TIMEADD('16:00', -1.5).should.be.exactly('14:30')
    TIMEADD('16:00', 30, 'minutes').should.be.exactly('16:30')
    TIMEADD('16:00', 100, 'minutes').should.be.exactly('17:40')
    TIMEADD('16:00', -30, 'minutes').should.be.exactly('15:30')
    TIMEADD('16:00', -100, 'minutes').should.be.exactly('14:20')

describe 'UNIQUE', ->
  it 'returns the unique values of the parameters', ->
    UNIQUE(1, 2, 3).should.be.eql([1, 2, 3])
    UNIQUE(1, 2, 3, 3, 3).should.be.eql([1, 2, 3])
    UNIQUE(1, 2, 'a').should.be.eql([1, 2, 'a'])
    UNIQUE(1, 2, 'a', 'a').should.be.eql([1, 2, 'a'])
    UNIQUE('c', 'c', 'b', 'a').should.be.eql(['c', 'b', 'a'])
    UNIQUE(1).should.be.eql([1])
    UNIQUE(1, 1.5, 3.75).should.be.eql([1, 1.5, 3.75])
    UNIQUE(1, [1.5, 3.75]).should.be.eql([1, 1.5, 3.75])
    UNIQUE({test: 1}, {test: 1}, {test: 2}, (a) -> a.test).should.be.eql([{test: 1}, {test: 2}])
    UNIQUE([{test: 1}, {test: 1}, {test: 2}], (a) -> a.test).should.be.eql([{test: 1}, {test: 2}])

describe 'USERFULLNAME', ->
  it 'returns the user full name', ->
    USERFULLNAME().should.eql 'John Smith'

describe 'VALUE', ->
  it 'returns a data value by a string', ->
    VALUE('name').should.be.exactly('Test Record')
    shouldHaveNoValue(VALUE(null))
    shouldHaveNoValue(VALUE('invalid_field'))

describe 'YEAR', ->
  it 'returns a year given a date', ->
    YEAR('2015/01/01').should.be.exactly(2015)
    YEAR('2015-01-01').should.be.exactly(2015)
    YEAR('2015 12 16').should.be.exactly(2015)
    YEAR('01/01/2015').should.be.exactly(2015)
    YEAR('01-01-2015').should.be.exactly(2015)
    YEAR('01 01 2015').should.be.exactly(2015)
    YEAR('1/1/2015').should.be.exactly(2015)

    YEAR(new Date('2015/01/01 00:00:00')).should.be.exactly(2015)
    YEAR(new Date('2015-01-01 00:00:00')).should.be.exactly(2015)
    YEAR(new Date('2015.01.01 00:00:00')).should.be.exactly(2015)
    YEAR(new Date('2015 01 01 00:00:00')).should.be.exactly(2015)

    shouldHaveNoValue(YEAR('not a date'))

describe 'X_ISNEW', ->
  it 'returns a boolean indicating whether the feature is new or an update', ->
    CONFIGURE(featureIsNew: true)

    X_ISNEW().should.be.true
    X_ISUPDATE().should.be.false

    CONFIGURE(featureIsNew: false)

    X_ISNEW().should.be.false
    X_ISUPDATE().should.be.true

describe 'Values', ->
  it 'should create choice values', ->
    makeValue = Utils.converters.ChoiceField

    makeValue('test').should.eql({ choice_values: [ 'test' ], other_values: [] })
    makeValue(1).should.eql({ choice_values: [ '1' ], other_values: [] })
    makeValue(['a', 'b', 'c']).should.eql({ choice_values: [ 'a', 'b', 'c' ], other_values: [] })
    makeValue({choice_values: ['a']}).should.eql({ choice_values: [ 'a' ], other_values: [] })

    shouldBeNull(makeValue({bogus: ['a']}))
    shouldBeNull(makeValue({}))
    shouldBeNull(makeValue(null))
    shouldBeNull(makeValue(undefined))
    shouldBeNull(makeValue(new Date))
    shouldBeNull(makeValue('')) # special case for empty string blanking out the choice field

  it 'should create classification values', ->
    makeValue = Utils.converters.ClassificationField

    makeValue('test').should.eql({ choice_values: [ 'test' ], other_values: [] })
    makeValue(1).should.eql({ choice_values: [ '1' ], other_values: [] })
    makeValue(['a', 'b', 'c']).should.eql({ choice_values: [ 'a', 'b', 'c' ], other_values: [] })
    makeValue({choice_values: ['a']}).should.eql({ choice_values: [ 'a' ], other_values: [] })

    shouldBeNull(makeValue({bogus: ['a']}))
    shouldBeNull(makeValue({}))
    shouldBeNull(makeValue(null))
    shouldBeNull(makeValue(undefined))
    shouldBeNull(makeValue(new Date))
    shouldBeNull(makeValue('')) # special case for empty string blanking out the choice field

  it 'should create date values', ->
    makeValue = Utils.converters.DateTimeField

    makeValue('2015-01-01').should.eql('2015-01-01')
    makeValue('2015-12-31').should.eql('2015-12-31')
    makeValue('2015/12/31').should.eql('2015-12-31')
    makeValue(new Date('01/01/2015')).should.eql('2015-01-01')

    shouldBeNull(makeValue({bogus: ['a']}))
    shouldBeNull(makeValue({}))
    shouldBeNull(makeValue(null))
    shouldBeNull(makeValue(undefined))
    shouldBeNull(makeValue(''))

  it 'should create time values', ->
    makeValue = Utils.converters.TimeField

    makeValue('12:30').should.eql('12:30')
    makeValue('23:00').should.eql('23:00')
    makeValue('00:00').should.eql('00:00')
    makeValue('01:01').should.eql('01:01')

    shouldBeNull(makeValue('25:61'))
    shouldBeNull(makeValue('2:30'))
    shouldBeNull(makeValue('a'))
    shouldBeNull(makeValue({bogus: ['a']}))
    shouldBeNull(makeValue({}))
    shouldBeNull(makeValue(null))
    shouldBeNull(makeValue(undefined))
    shouldBeNull(makeValue(''))

  it 'should create address values', ->
    makeValue = Utils.converters.AddressField

    addressWith = (parts) ->
      address =
        sub_thoroughfare: null
        thoroughfare: null
        suite: null
        locality: null
        sub_admin_area: null
        admin_area: null
        postal_code: null
        country: null

      _.extend(address, parts)

    makeValue(admin_area: 'FL').should.eql(addressWith(admin_area: 'FL'))
    makeValue(suite: 200).should.eql(addressWith(suite: '200'))
    makeValue(suite: true).should.eql(addressWith(suite: 'true'))
    makeValue(suite: undefined).should.eql(addressWith(suite: null))
    makeValue(suite: NaN).should.eql(addressWith(suite: 'NaN'))
    makeValue(suite: {}).should.eql(addressWith(suite: '[object Object]'))
    makeValue(suite: []).should.eql(addressWith(suite: ''))
    makeValue(suite: [1]).should.eql(addressWith(suite: '1'))
    makeValue(suite: ['1']).should.eql(addressWith(suite: '1'))

    makeValue(bogus: 'something').should.eql(addressWith())
    makeValue({}).should.eql(addressWith())

    shouldBeNull(makeValue('25:61'))
    shouldBeNull(makeValue('2:30'))
    shouldBeNull(makeValue('a'))
    shouldBeNull(makeValue(null))
    shouldBeNull(makeValue(undefined))
    shouldBeNull(makeValue(''))

  it 'should not create values for unsupported field types', ->
    fields = [
      'PhotoField'
      'VideoField'
      'AudioField'
      'SignatureField'
      'RecordLinkField'
      'Repeatable'
      'Section'
      'Label'
    ]

    for field in fields
      shouldBeNull(Utils.makeValue(type: field, 'test'))
