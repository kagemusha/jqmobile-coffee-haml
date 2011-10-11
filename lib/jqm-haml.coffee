DATA_ROLE = "data-role"

listview = (options={}) ->
  options[DATA_ROLE] = "listview"
  haTag "ul", options

link = (label="<blank>", href="#", options={}, reverse=false) ->
  options["href"] = idSel(href)
  if reverse
    if (!href or href="#") then options["data-direction"]='reverse' else options["data-rel"]='back'
  haTag "a", options, label

button = (label, href="#", options={}, reverse=false) ->
  options[DATA_ROLE] = 'button'
  link label, href, options, reverse


rightButton = (label, href, options={}, reverse=false) ->
  options["class"] = "#{options["class"] || ""} ui-btn-right"
  link label, href, options, reverse


backButton = (label="Back", href="#", options={}) ->
  options["data-icon"] ?='arrow-l'
  link label, href, options, true


label = (text, forAttr, options={}) ->
  options["for"] = forAttr
  haTag "label", options, text


input = (type, name, options={}) ->
  options["type"] = type
  options["name"] = name
  options["id"] ?= name
  haTag "input", options


fieldcontain = (options={}) ->
  options[DATA_ROLE] = "fieldcontain"
  """
  #{ haTag "div", options }
  """

controlgroup = (label, options={}) ->
  options[DATA_ROLE] = 'controlgroup'
  fieldset label, options


fieldset = (label, options={}) ->
  id = delProp options, "id"
  #log "fieldset", id
  choiceDiv = if id then "#{idSel id}.choices" else "" #needed for dynamic choice groups
  multilineHaml """
  #{ haTag "fieldset", options }
    %legend #{label}
    #{choiceDiv}
  """

choiceGroup = (isRadio, label, fieldName, options, choices=[] )->
  multilineHaml """
  #{controlgroup label, options}
    #{choiceButtons isRadio, fieldName, choices}
  """

resetChoices = (isRadioBtns, fieldId, fieldName, choices, options={}) ->
  sel = "#{idSel fieldId}.choices"
  $(sel).empty()
  #log "reset choices", sel, $(sel).length
  $( sel ).append choiceButtons(isRadioBtns, fieldName, choices, options)


choiceButtons = (isRadioBtns, fieldName, choicesArray=[], options) ->
  btns = for choice in choicesArray
    _.extend options, choice.options if options #choice options take precedence
    choiceBtn isRadioBtns, choice.label, fieldName, choice.id, choice.value, choice.options, choice.checked, choice.lbl_options, false
  if (btns and btns.length > 0) then hamlHtml(multilineHaml(btns.join "\n")) else ""

choiceBtn = (isRadio, lbl, fieldName, id, val, options={}, checked=false, lbl_options={}, multiline=true) ->
  #log "choiceopts", options, fieldName, val, id, lbl
  options.id = id
  options.value ?= val || id
  type = if isRadio then "radio" else "checkbox"
  options["checked"] = "checked" if checked
  haml = """
  #{input type, fieldName, options}
  #{label(lbl, id, lbl_options)}
  """
  if multiline then multilineHaml(haml) else haml


radio = (label, name, id, val, options, checked, lblOptions) ->
  choiceBtn true, label, name, id, val, options, checked, lblOptions

checkbox = (label, name, id, val, options, checked, lblOptions) ->
  choiceBtn false, label, name, id, val, options, checked, lblOptions

form = (options={}) ->
  options["accept-charset"] ?= "UTF-8"
  haTag "form", options


page = (id, options={}) ->
  options[DATA_ROLE] = "page"
  options["id"] = id
  div options

#position can be "inline", "fixed", or "fullscreen"
pageHeader = (title="", position="inline", options={}) ->
  options[DATA_ROLE] = "header"
  options["data-position"] = position
  """
  #{div options}
      %h1 #{title}
  """

refreshListById = (id, template, objs, options) ->
  refreshTmplById id, template, objs, options
  listviewRefresh id

pageFooter = (fixed=true, options={}) ->
  options[DATA_ROLE] = "footer"
  div options

navbar = (options={}) ->
  options[DATA_ROLE] = "navbar"
  div options

content = (options={}) ->
  options[DATA_ROLE] = "content"
  div options

div = ( options={}, content) ->  haTag "div", options, content


delProp = (obj, prop) ->
  objProp = obj[prop]
  delete obj[prop]
  objProp