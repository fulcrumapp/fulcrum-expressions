_ = require('underscore')
marked = require('marked')
entities = new (require('html-entities').AllHtmlEntities)

class BaseGenerator
  constructor: (@functions) ->

  generateParameters: (parameters) ->
    parameters = _.map parameters, (param) ->
      optionality = if param.optional is true then ' (optional) ' else ' (__required__) '
      defaultValue = if param.default.length is 0 then '' else " [default = #{param.default}] "
      "`#{param.name}` #{param.type}#{optionality}#{defaultValue}- #{param.description}"

    if parameters.length is 0
      'No parameters'
    else
      parameters.join("\n\n").trim()

  getDescription: (func) ->
    func.description.replace(new RegExp("^#{func.name}\n"), '').trim().split("\n")[0]

  getLongDescription: (func) ->
    lines = func.description.replace(new RegExp("^#{func.name}\n"), '').trim().split("\n")
    lines.slice(1).join('\n')

  generateAppHelp: ->
    functions = _.map @functions, (func) =>
      desc = @getDescription(func)
      desc = @escapeLiteral(marked(desc.replace(/\n/g, "\\n")).replace(/^<p>/, '').replace(/<\/p>\n$/, ''))
      tip = entities.decode(desc.replace(/(<([^>]+)>)/ig, '').replace(/\n/g, ' ').trim())

      "    { identifier: \"#{func.name}\", description: \"#{desc}\", tip: \"#{tip}\" }"

    """
    class window.#{@globalName}
      @FUNCTIONS: [
#{functions.join("\n")}
      ]
    """

  escapeLiteral: (literal) ->
    literal.replace(/"/, "\\\"")

  cleanDescription: (func) ->
    marked(@getDescription(func)).replace(/(<([^>]+)>)/ig, '').replace(/\n/g, ' ').trim()

module.exports = BaseGenerator
