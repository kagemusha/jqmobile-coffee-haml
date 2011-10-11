/*
  function to convert block of haml to html
  see jqm-haml.coffee for examples
*/var MULTI_END, MULTI_START, correctIndents, haTag, hamlHtml, hamlOptionStr, multilineHaml;
hamlHtml = function(haml) {
  return Haml(correctIndents(haml))();
};
/*
  convenience method which generates haml
  e.g.
     props = {href: "#editPage"}
     haTag("a", props, "Edit")
       => %a{href: "#editPage"} Edit

*/
haTag = function(tag, options, content) {
  if (options == null) {
    options = {};
  }
  if (content == null) {
    content = "";
  }
  return "%" + tag + (hamlOptionStr(options)) + " " + content;
};
/*
  takes javascript obj and generats option string
  properly formatted for haml.js
  brackets string if brackets=true

*/
hamlOptionStr = function(options, brackets) {
  var key, opts, val;
  if (brackets == null) {
    brackets = true;
  }
  if (!options) {
    return "";
  }
  if (typeof options === 'string') {
    return options;
  }
  opts = (function() {
    var _results;
    _results = [];
    for (key in options) {
      val = options[key];
      _results.push("" + key + ": '" + val + "'");
    }
    return _results;
  })();
  if (brackets) {
    return "{ " + (opts.join(", ")) + " }";
  } else {
    return opts.join(", ");
  }
};
MULTI_START = "~multhaml";
MULTI_END = "~endmulthaml";
/*
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

*/
multilineHaml = function(haml) {
  return "" + MULTI_START + "\n" + haml + "\n" + MULTI_END;
};
correctIndents = function(haml) {
  var line, lines, multiSpaces, spaced, spaces, spacingArray, _i, _len;
  lines = haml.split("\n");
  spacingArray = new Array();
  spaced = new Array();
  for (_i = 0, _len = lines.length; _i < _len; _i++) {
    line = lines[_i];
    multiSpaces = line.search(MULTI_START);
    if (multiSpaces > -1) {
      spacingArray.push(line.substring(0, multiSpaces));
    } else if (line.search(MULTI_END) > -1) {
      spacingArray.pop();
    } else {
      spaces = spacingArray.join("");
      line = "" + spaces + line;
      spaced.push(line);
    }
  }
  return spaced.join("\n");
};