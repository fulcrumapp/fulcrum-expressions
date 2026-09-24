fs = require 'fs'
_ = require 'underscore'
Utils = require '../utils'

global.Intl = require 'intl'

DIST = process.env.DIST or false

if DIST
  console.log 'Running distribution'
  require '../dist/expressions.js'
  runtime = $$runtime
else
  console.log 'Running debug'
  runtime = require '../runtime'

variables = require('./variables.json')

CONFIGURE(variables)

runtime.form = variables.form
runtime.values = variables.values
runtime.prepare()

$repeatable_field = variables.values.form_values['1337']

docs = JSON.parse(fs.readFileSync(__dirname + '/../docs/docs.json'))
eventDocs = JSON.parse(fs.readFileSync(__dirname + '/../docs/event_docs.json'))

shouldBeNull = (value) ->
  (value is null).should.be.true()

shouldHaveNoValue = (value) ->
  (value is NO_VALUE).should.be.true()

shouldBeUndefined = (value) ->
  (value is undefined).should.be.true()

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
        actual = JSON.stringify(result)

        if _.isUndefined(result)
          actual = 'undefined'
        else if _.isNaN(result)
          actual = 'NaN'
        else if _.isDate(result)
          actual = Utils.formatMachineDate(result)

        actual.should.eql(returnValue)

describe 'Data Event Documentation', ->
  ragDoc = _.find(eventDocs.functions, (func) -> func.name is 'RAG')

  it 'includes executable RAG examples for both callback outcomes', ->
    ragDoc.should.be.ok()
    ragDoc.examples.should.have.length(1)

    example = ragDoc.examples[0]
    executeExample = new Function('RAG', 'SETVALUE', example)

    rag = (options, callback) ->
      options.query.should.eql('soil moisture')
      options.limit.should.eql(5)
      callback({code: 'rag_unavailable'}, null)

    (-> executeExample(rag, ->)).should.not.throw()

    rag = (options, callback) ->
      options.query.should.eql('soil moisture')
      options.limit.should.eql(5)
      callback(null, {results: [{text: 'A redacted passage.'}]})

    (-> executeExample(rag, ->)).should.not.throw()
