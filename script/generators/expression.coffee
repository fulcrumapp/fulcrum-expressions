_ = require('underscore')
BaseGenerator = require('./base_generator')

class ExpressionGenerator extends BaseGenerator
  globalName: 'ExpressionFunctions'

  generateExamples: (examples) ->
    examples = _.map examples, (example) ->
      parts = example.split("\n")
      returns = parts[0]
      rest = parts.slice(1)
      final = rest.concat(["\n#{returns}"]).join("\n")
      "\n```js\n#{final}\n```"

    if examples.length is 0
      'No examples'
    else
      examples.join("\n\n").trim()

  generateReturns: (returns) ->
    description = if returns.description.length is 0 then '' else " - #{returns.description} "
    markdown = 'No return value'
    markdown = "#{returns.type}#{description}" if returns.type
    markdown.trim()

  helpFrontMatter: (func) ->
    """
---
layout: default
section: expressions
title: "#{func.name}"
description: "#{@cleanDescription(func)}"
category: section
permalink: /expressions/reference/#{func.name.toLowerCase()}/
---
"""

  generateIndex: ->
    titles = _.map @functions, (func) =>
      "### [#{func.name}](/expressions/reference/#{func.name.toLowerCase()}/)\n\n#{@getDescription(func)}"

    """
---
layout: default
section: expressions
order: 2
title: "Function Reference"
description: "Function reference for calculation fields"
category: section
search: true
---

## Calculation Expressions

<div class="row">
  <div class="col-xs-12 col-md-4">
    <input type="search" class="form-control search" placeholder="Search expressions" />
  </div>
</div>

#{titles.join("\n\n")}
"""

  generateDocs: ->
    _.map @functions, (func) =>
      schema =
        name: func.name

      description = @getDescription(func)
      parameters  = @generateParameters(func.parameters)
      returns     = @generateReturns(func.returns)
      examples    = @generateExamples(func.examples)

      longDescription = @getLongDescription(func)

      longDescriptionMarkdown =
        if longDescription
          "### Description\n\n#{longDescription}\n\n"
        else
          ''

      schema.markdown = """
    #{longDescriptionMarkdown}### Parameters

    #{parameters}

    ### Returns

    #{returns}

    ### Examples

    #{examples}
    """

      schema.fullMarkdown = @helpFrontMatter(func) + "\n\n" + schema.markdown

      schema

module.exports = ExpressionGenerator
