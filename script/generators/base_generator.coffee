_ = require('underscore')
marked = require('marked')
entities = new (require('html-entities').AllHtmlEntities)

class BaseGenerator
  generateParameters: (parameters) ->
    parameters = _.map parameters, (param) ->
      optionality = if param.optional is true then ' (optional) ' else ' (__required__) '
      defaultValue = if param.default.length is 0 then '' else " [default = #{param.default}] "
      "`#{param.name}` #{param.type}#{optionality}#{defaultValue}- #{param.description}"

    if parameters.length is 0
      'No parameters'
    else
      parameters.join("\n\n").trim()

  generateExamples: (examples) ->
    examples = _.map examples, (example) ->
      parts = example.split("\n")
      returns = parts[0]
      rest = parts.slice(1)
      final = rest.concat(["\n#{returns}"]).join("\n")
      "\n~~~\n#{final}\n~~~\n{: .language-js}"

    if examples.length is 0
      'No examples'
    else
      examples.join("\n\n").trim()

  getDescription: (func) ->
    func.description.replace(new RegExp("^#{func.name}\n"), '').trim()

  generateAppHelp: (functions) ->
    functions = _.map functions, (func) =>
      desc = @getDescription(func)
      desc = @escapeLiteral(marked(desc.replace(/\n/g, "\\n")).replace(/^<p>/, '').replace(/<\/p>\n$/, ''))
      tip = entities.decode(desc.replace(/(<([^>]+)>)/ig, '').replace(/\n/g, ' ').trim())

      "    { identifier: \"#{func.name}\", description: \"#{desc}\", tip: \"#{tip}\" }"

    """
    class window.ExpressionFunctions
      @FUNCTIONS: [
#{functions.join("\n")}
      ]
    """

  escapeLiteral: (literal) ->
    literal.replace(/"/, "\\\"")

  cleanDescription: (func) ->
    marked(@getDescription(func)).replace(/(<([^>]+)>)/ig, '').replace(/\n/g, ' ').trim()

module.exports = BaseGenerator
