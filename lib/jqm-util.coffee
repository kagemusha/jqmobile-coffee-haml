#very useful for dynamic pages or when
refreshPage = (page) ->
  try
    $(idSel page).page('destroy').page()
  catch e

listviewRefresh = (list) ->
  listSel = idSel list
  try
    $(listSel).listview("init")
  catch e
  try
    $(listSel).listview("refresh")
  catch e


idSel = (id) ->
  return "" if !id or id.length == 0
  if (id[0]=="#") then id else "##{id}"

