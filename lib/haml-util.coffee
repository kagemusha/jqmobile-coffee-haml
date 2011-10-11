
###
  function to convert block of haml to html
  see jqm-haml.coffee for examples
###
hamlHtml = (haml) ->
  Haml(correctIndents(haml))()


###
  convenience method which generates haml
  e.g.
     props = {href: "#editPage"}
     haTag("a", props, "Edit")
       => %a{href: "#editPage"} Edit

###
haTag = (tag, options={}, content="") ->
  "%#{tag}#{hamlOptionStr options} #{content}"



###
  takes javascript obj and generats option string
  properly formatted for haml.js
  brackets string if brackets=true

###
hamlOptionStr = (options, brackets=true) ->
  return "" if !options
  return options if typeof(options)=='string'
  opts = for key, val of options
      "#{key}: '#{val}'"
  if brackets then "{ #{opts.join ", "} }" else opts.join(", ")


MULTI_START = "~multhaml"
MULTI_END = "~endmulthaml"

###
  needed for functions which return multiple lines of Haml
  e.g. if you have
  myMultilineWidget = () ->
    """
    %div1 Some Div
    %div2 Another Div
    """

  and embed it in another function such as


  myPage = () ->
    """
    .content
      %h1 Some Page
      #{myMutilineWidget}
    """

  the output will be:

  .content
    %h1 Some Page
    %div1 Some Div
  %div2 Another Div

  Using multilineHaml corrects for this:

    myMultilineWidget = () ->
      mutlilineHaml """
      %div1 Some Div
      %div2 Another Div
      """

    generates

    .content
      %h1 Some Page
      %div1 Some Div
      %div2 Another Div

###

multilineHaml = (haml) ->
  """
  #{MULTI_START}
  #{haml}
  #{MULTI_END}
  """

correctIndents = (haml) ->
  lines = haml.split("\n")
  spacingArray = new Array()
  spaced = new Array()

  for line in lines
    multiSpaces = line.search(MULTI_START)
    if multiSpaces > -1
      spacingArray.push line.substring(0, multiSpaces)
    else if line.search(MULTI_END) > -1
      spacingArray.pop()
    else
      spaces =  spacingArray.join("")
      line = "#{spaces}#{line}"
      spaced.push line
  spaced.join("\n")

