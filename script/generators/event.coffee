_ = require('underscore')
BaseGenerator = require('./base_generator')

class EventGenerator extends BaseGenerator
  globalName: 'EventFunctions'

  generateExamples: (examples) ->
    examples = _.map examples, (example) ->
      "\n```js\n#{example}\n```"

    if examples.length is 0
      'No examples'
    else
      examples.join("\n\n").trim()

  helpFrontMatter: (func) ->
    """
---
layout: default
section: data_events
title: "#{func.name}"
description: "#{@cleanDescription(func)}"
category: section
permalink: /data-events/reference/#{func.name.toLowerCase()}/
---
"""

  generateIndex: ->
    titles = _.map @functions, (func) =>
      "### [#{func.name}](/data-events/reference/#{func.name.toLowerCase()}/)\n\n#{@getDescription(func)}"

    """
---
layout: default
section: data_events
order: 2
title: "Data Events Reference"
description: "Function reference for data events"
category: section
search: true
---

<div class="row">
  <div class="col-xs-12 col-md-4">
    <input type="search" class="form-control search" placeholder="Search data event functions" />
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

    ### Examples

    #{examples}
    """

      schema.fullMarkdown = @helpFrontMatter(func) + "\n\n" + schema.markdown

      schema

module.exports = EventGenerator
