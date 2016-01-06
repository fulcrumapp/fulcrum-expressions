_ = require('underscore')
BaseGenerator = require('./base_generator')

class ExpressionGenerator extends BaseGenerator
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

  generateIndex: (functions) ->
    titles = _.map functions, (func) =>
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

  generateDocs: (functions) ->
    _.map functions, (func) =>
      schema =
        name: func.name

      description = @getDescription(func)
      parameters  = @generateParameters(func.parameters)
      returns     = @generateReturns(func.returns)
      examples    = @generateExamples(func.examples)

      schema.markdown = """
    ## #{func.name}

    #{description}

    ### Parameters

    #{parameters}

    ### Returns

    #{returns}

    ### Examples

    #{examples}
    """

      schema.fullMarkdown = @helpFrontMatter(func) + "\n\n" + schema.markdown

      schema

module.exports = ExpressionGenerator
