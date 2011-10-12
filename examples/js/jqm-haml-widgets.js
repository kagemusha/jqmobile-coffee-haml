var POPUP_CLASSES, popupMsg, popupTmpl, yesnoChoiceTmpl;
yesnoChoiceTmpl = function(label, fieldName, yesChecked, cgOptions) {
  var haml;
  if (yesChecked == null) {
    yesChecked = false;
  }
  if (cgOptions == null) {
    cgOptions = {};
  }
  _.extend(cgOptions, {
    "data-type": "horizontal",
    id: "" + fieldName + "Choice"
  });
  haml = "" + (controlgroup(label, cgOptions)) + "\n    " + (radio("Yes", fieldName, "yes", "true", {}, yesChecked)) + "\n    " + (radio("No", fieldName, "no", "false", {}, !yesChecked));
  return multilineHaml(haml);
};
POPUP_CLASSES = ".popup.ui-loader.ui-overlay-shadow.ui-body-a.ui-corner-all";
popupTmpl = function(msg) {
  var haml;
  haml = "" + POPUP_CLASSES + "\n  %h1 " + msg;
  return multilineHaml(haml);
};
popupMsg = function(msg, delay) {
  var msgDiv, msgHTML, wait;
  $(".popup").remove();
  wait = delay || 800;
  msgHTML = hamlHtml(popupTmpl(msg));
  msgDiv = $(msgHTML).css({
    top: window.pageYOffset + 100
  }).appendTo("body");
  if (delay !== 0) {
    return msgDiv.delay(wait).fadeOut(400, function() {
      return $(this).remove();
    });
  }
};