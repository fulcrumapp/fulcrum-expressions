_ = require('underscore')
BaseGenerator = require('./base_generator')

class EventGenerator extends BaseGenerator
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

  generateIndex: (functions) ->
    titles = _.map functions, (func) =>
      "### [#{func.name}](/data-events/reference/#{func.name.toLowerCase()}/)\n\n#{@getDescription(func)}"

    """
---
layout: default
section: data_events
order: 2
title: "Data Events Reference"
description: "Function reference for data events"
category: section
---

#{titles.join("\n\n")}
"""

  generateDocs: (functions) ->
    _.map functions, (func) =>
      schema =
        name: func.name

      description = @getDescription(func)
      parameters  = @generateParameters(func.parameters)
      examples    = @generateExamples(func.examples)

      schema.markdown = """
    ## #{func.name}

    #{description}

    ### Parameters

    #{parameters}

    ### Examples

    #{examples}
    """

      schema.fullMarkdown = @helpFrontMatter(func) + "\n\n" + schema.markdown

      schema

module.exports = EventGenerator
