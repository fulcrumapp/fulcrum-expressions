fs = require 'fs'
_ = require 'underscore'

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

deviceInfo =
  deviceManufacturer: 'Apple'
  deviceModel: 'iPhone6,2'
  platform: 'iOS'
  platformVersion: '8.1'
  application: 'Fulcrum'
  applicationVersion: '2.7.0'
  applicationBuild: '2162'

feature =
  geometry:
    type: 'Point'
    coordinates: [ -82.63814896345139, 27.770756908186286 ]

CONFIGURE(deviceInfo)
CONFIGURE(feature)

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

        (-> eval(example)).should.not.throw

        eval(example).toString().should.eql(returnValue)
