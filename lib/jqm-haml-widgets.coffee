yesnoChoiceTmpl = (label, fieldName, yesChecked=false, cgOptions={}) ->
  _.extend cgOptions, {"data-type": "horizontal", id: "#{fieldName}Choice"}
  haml = """
  #{controlgroup label, cgOptions}
      #{ radio "Yes", fieldName, "yes", "true", {}, yesChecked }
      #{ radio "No", fieldName, "no", "false", {}, !yesChecked }
  """
  multilineHaml haml


#edit to change popup style
POPUP_CLASSES =  ".popup.ui-loader.ui-overlay-shadow.ui-body-a.ui-corner-all"

popupTmpl = (msg) ->
  haml = """
    #{POPUP_CLASSES}
      %h1 #{msg}
  """
  multilineHaml haml

popupMsg = (msg, delay) ->
  $(".popup").remove()
  wait = delay || 800
  msgHTML = hamlHtml popupTmpl(msg)
  msgDiv = $(msgHTML).css(top: window.pageYOffset+100).appendTo("body")

  if delay != 0
    msgDiv.delay(wait).fadeOut 400, -> $(this).remove()


