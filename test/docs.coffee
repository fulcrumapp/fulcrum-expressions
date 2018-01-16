fs = require 'fs'
_ = require 'underscore'
path = require 'path'
CSON = require 'season'
Utils = require '../utils'
stringify = require 'json-stringify-safe'

spawnSync = require('child_process').spawnSync or require('spawn-sync')

spawnSync('make', ['docs'])

global.Intl = require 'intl'

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

$repeatable_field = variables.values.form_values['1337']

docs = JSON.parse(fs.readFileSync(__dirname + '/../docs/docs.json'))

shouldBeNull = (value) ->
  (value is null).should.be.true

shouldHaveNoValue = (value) ->
  (value is NO_VALUE).should.be.true

shouldBeUndefined = (value) ->
  (value is undefined).should.be.true

describe 'Documentation', ->
  _.each docs.functions, (func) ->
    it "examples for #{func.name}", ->
      _.each func.examples, (example) ->
        returnValue = example.split("\n")[0].replace('// returns ', '')

        return if returnValue is 'VALUE'

        # make the docs for things that need a choice field nicer
        $choice_field = { choice_values: ['Red', 'Green', 'Blue'] }

        (-> eval(example)).should.not.throw

        result = eval(example)
        actual = stringify(result)

        if _.isUndefined(result)
          actual = 'undefined'
        else if _.isNaN(result)
          actual = 'NaN'
        else if _.isDate(result)
          actual = Utils.formatMachineDate(result)

        actual.should.eql(returnValue)
