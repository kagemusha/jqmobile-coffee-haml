appendTmpl = (containers, templateFn, data, options) ->
  templateFn = eval(templateFn) if typeof templateFn == 'string'
  elems = genElems(templateFn, data, options)
  $(containers).append elems

refreshTmplById = (id, templateFn, data, options) ->
  refreshTmpl "#{idSel id}", templateFn, data, options

refreshTmpl = (containers, templateFn, data, options) ->
  $(containers).empty()
  appendTmpl containers, templateFn, data, options

#refreshTmpl = (containers, templateFn, data, options) ->
#    templateFn = eval(templateFn) if typeof templateFn == 'string'
#    $(containers).empty()
#    elems = genElems(templateFn, data, options)
#    #log "elems", elems
#    $(containers).append elems

genElems = (fn, data, options) ->
  if _.isArray(data)
    elems = for elem in data
              fn elem, options
    if elems then elems.join("") else ""
  else
    fn data, options

