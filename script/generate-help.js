const fs = require('fs');
const _ = require('underscore');

const ExpressionDocumentationGenerator = require('./generators/expression');
const EventDocumentationGenerator = require('./generators/event');

const SKIP_EXPORTS = [
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
  'X_ISNEW',
  'X_ISUPDATE'
];

//
// Generate Expression Docs
//
const expressionDocs = require('../docs/docs.json');

function includeExport(name) {
  return _.indexOf(SKIP_EXPORTS, name) === -1;
}

const expressionFunctions = _.select(expressionDocs.functions, (func) => includeExport(func.name));

const expressionGenerator = new ExpressionDocumentationGenerator(expressionFunctions);

const expressionFiles = expressionGenerator.generateDocs();
const expressionIndex = expressionGenerator.generateIndex();
const expressionHelp = expressionGenerator.generateAppHelp();

_.each(expressionFiles, (file) => {
  fs.writeFileSync(`./docs/output/help/expressions/reference/${file.name.toLowerCase()}.md`, file.fullMarkdown);
});
fs.writeFileSync("./docs/output/help/expressions/reference.md", expressionIndex);
fs.writeFileSync("./docs/output/functions.coffee", expressionHelp);

//
// Generate Data Event Docs
//
const eventDocs = require('../docs/event_docs.json');
const eventFunctions = _.select(eventDocs.functions, (func) => includeExport(func.name));

const eventGenerator = new EventDocumentationGenerator(eventFunctions);

const eventFiles = eventGenerator.generateDocs();
const eventIndex = eventGenerator.generateIndex();
const eventHelp = eventGenerator.generateAppHelp();

_.each(eventFiles, (file) => {
  fs.writeFileSync(`./docs/output/help/events/reference/${file.name.toLowerCase()}.md`, file.fullMarkdown);
});
fs.writeFileSync("./docs/output/help/events/reference.md", eventIndex);
fs.writeFileSync("./docs/output/event_functions.coffee", eventHelp);