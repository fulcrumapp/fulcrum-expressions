fs = require('fs')
_ = require('underscore')

ExpressionDocumentationGenerator = require('./generators/expression')
EventDocumentationGenerator = require('./generators/event')

SKIP_EXPORTS = [
  'COUNTRY',
  'CURRENCYCODE',
  'CURRENCYSYMBOL',
  'DECIMALSEPARATOR',
  'GROUPINGSEPARATOR',
  'GROUPINGSIZE',
  'IFERROR',
  'ISERR',
  'ISERROR',
  'LANGUAGE',
  'LOCALE',
  'N',
  'T',
  'SETASSIGNMENT',
  'TIMEZONE',
  'X_ISNEW',
  'X_ISUPDATE'
]

#
# Generate Expression Docs
#
expressionDocs = require('../docs/docs.json')

includeExport = (name) ->
  _.indexOf(SKIP_EXPORTS, name) is -1

expressionFunctions = _.select expressionDocs.functions, (func) -> includeExport(func.name)

expressionGenerator = new ExpressionDocumentationGenerator(expressionFunctions)

expressionFiles = expressionGenerator.generateDocs()
expressionIndex = expressionGenerator.generateIndex()
expressionHelp  = expressionGenerator.generateAppHelp()

_.each expressionFiles, (file) ->
  fs.writeFileSync("./docs/output/help/expressions/reference/#{file.name.toLowerCase()}.md", file.fullMarkdown)
fs.writeFileSync("./docs/output/help/expressions/reference.md", expressionIndex)
fs.writeFileSync("./docs/output/functions.coffee", expressionHelp)

#
# Generate Data Event Docs
#
eventDocs = require('../docs/event_docs.json')
eventFunctions = _.select eventDocs.functions, (func) -> includeExport(func.name)

eventGenerator = new EventDocumentationGenerator(eventFunctions)

eventFiles = eventGenerator.generateDocs()
eventIndex = eventGenerator.generateIndex()
eventHelp  = eventGenerator.generateAppHelp()

_.each eventFiles, (file) ->
  fs.writeFileSync("./docs/output/help/events/reference/#{file.name.toLowerCase()}.md", file.fullMarkdown)
fs.writeFileSync("./docs/output/help/events/reference.md", eventIndex)
fs.writeFileSync("./docs/output/event_functions.coffee", eventHelp)
