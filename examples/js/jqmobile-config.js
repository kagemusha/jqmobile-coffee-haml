$(document).bind("mobileinit", function() {
  $.extend($.mobile, $.mobile.page.prototype.options.headerTheme = "a");
  $.mobile.page.prototype.options.contentTheme = "e";
  $.mobile.listview.prototype.options.headerTheme = "a";
  $.mobile.listview.prototype.options.theme = "d";
  $.mobile.checkboxradio.prototype.options.theme = "d";
  return $.mobile.button.prototype.options.theme = "d";
});