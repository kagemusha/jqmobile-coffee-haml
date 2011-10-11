/*
  function to convert block of haml to html
  see jqm-haml.coffee for examples
*/var DATA_ROLE, MULTI_END, MULTI_START, backButton, button, checkbox, choiceBtn, choiceButtons, choiceGroup, content, controlgroup, correctIndents, delProp, div, fieldcontain, fieldset, form, haTag, hamlHtml, hamlOptionStr, idSel, input, label, link, listview, multilineHaml, navbar, page, pageFooter, pageHeader, radio, refreshPage, resetChoices, rightButton, yesnoChoiceTmpl;
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
DATA_ROLE = "data-role";
listview = function(options) {
  if (options == null) {
    options = {};
  }
  options[DATA_ROLE] = "listview";
  return haTag("ul", options);
};
link = function(label, href, options, reverse) {
  if (label == null) {
    label = "<blank>";
  }
  if (href == null) {
    href = "#";
  }
  if (options == null) {
    options = {};
  }
  if (reverse == null) {
    reverse = false;
  }
  options["href"] = href;
  if (reverse) {
    if (!href || (href = "#")) {
      options["data-direction"] = 'reverse';
    } else {
      options["data-rel"] = 'back';
    }
  }
  return haTag("a", options, label);
};
button = function(label, href, options, reverse) {
  if (href == null) {
    href = "#";
  }
  if (options == null) {
    options = {};
  }
  if (reverse == null) {
    reverse = false;
  }
  options[DATA_ROLE] = 'button';
  return link(label, href, options, reverse);
};
rightButton = function(label, href, options, reverse) {
  if (options == null) {
    options = {};
  }
  if (reverse == null) {
    reverse = false;
  }
  options["class"] = "" + (options["class"] || "") + " ui-btn-right";
  return link(label, href, options, reverse);
};
backButton = function(label, href, options) {
  var _ref;
  if (label == null) {
    label = "Back";
  }
  if (href == null) {
    href = "#";
  }
  if (options == null) {
    options = {};
  }
    if ((_ref = options["data-icon"]) != null) {
    _ref;
  } else {
    options["data-icon"] = 'arrow-l';
  };
  return link(label, href, options, true);
};
label = function(text, forAttr, options) {
  if (options == null) {
    options = {};
  }
  options["for"] = forAttr;
  return haTag("label", options, text);
};
input = function(type, name, options) {
  var _ref;
  if (options == null) {
    options = {};
  }
  options["type"] = type;
  options["name"] = name;
    if ((_ref = options["id"]) != null) {
    _ref;
  } else {
    options["id"] = name;
  };
  return haTag("input", options);
};
fieldcontain = function(options) {
  if (options == null) {
    options = {};
  }
  options[DATA_ROLE] = "fieldcontain";
  return "" + (haTag("div", options));
};
controlgroup = function(label, options) {
  if (options == null) {
    options = {};
  }
  options[DATA_ROLE] = 'controlgroup';
  return fieldset(label, options);
};
fieldset = function(label, options) {
  var choiceDiv, id;
  if (options == null) {
    options = {};
  }
  id = delProp(options, "id");
  choiceDiv = id ? "" + (idSel(id)) + ".choices" : "";
  return multilineHaml("" + (haTag("fieldset", options)) + "\n  %legend " + label + "\n  " + choiceDiv);
};
choiceGroup = function(isRadio, label, fieldName, options, choices) {
  if (choices == null) {
    choices = [];
  }
  return multilineHaml("" + (controlgroup(label, options)) + "\n  " + (choiceButtons(isRadio, fieldName, choices)));
};
resetChoices = function(isRadioBtns, fieldId, fieldName, choices, options) {
  var sel;
  if (options == null) {
    options = {};
  }
  sel = "" + (idSel(fieldId)) + ".choices";
  $(sel).empty();
  return $(sel).append(choiceButtons(isRadioBtns, fieldName, choices, options));
};
choiceButtons = function(isRadioBtns, fieldName, choicesArray, options) {
  var btns, choice;
  if (choicesArray == null) {
    choicesArray = [];
  }
  btns = (function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = choicesArray.length; _i < _len; _i++) {
      choice = choicesArray[_i];
      if (options) {
        _.extend(options, choice.options);
      }
      _results.push(choiceBtn(isRadioBtns, choice.label, fieldName, choice.id, choice.value, choice.options, choice.checked, choice.lbl_options, false));
    }
    return _results;
  })();
  if (btns && btns.length > 0) {
    return hamlHtml(multilineHaml(btns.join("\n")));
  } else {
    return "";
  }
};
choiceBtn = function(isRadio, lbl, fieldName, id, val, options, checked, lbl_options, multiline) {
  var haml, type, _ref;
  if (options == null) {
    options = {};
  }
  if (checked == null) {
    checked = false;
  }
  if (lbl_options == null) {
    lbl_options = {};
  }
  if (multiline == null) {
    multiline = true;
  }
  options.id = id;
    if ((_ref = options.value) != null) {
    _ref;
  } else {
    options.value = val || id;
  };
  type = isRadio ? "radio" : "checkbox";
  if (checked) {
    options["checked"] = "checked";
  }
  haml = "" + (input(type, fieldName, options)) + "\n" + (label(lbl, id, lbl_options));
  if (multiline) {
    return multilineHaml(haml);
  } else {
    return haml;
  }
};
radio = function(label, name, id, val, options, checked, lblOptions) {
  return choiceBtn(true, label, name, id, val, options, checked, lblOptions);
};
checkbox = function(label, name, id, val, options, checked, lblOptions) {
  return choiceBtn(false, label, name, id, val, options, checked, lblOptions);
};
form = function(options) {
  var _ref;
  if (options == null) {
    options = {};
  }
    if ((_ref = options["accept-charset"]) != null) {
    _ref;
  } else {
    options["accept-charset"] = "UTF-8";
  };
  return haTag("form", options);
};
page = function(id, options) {
  if (options == null) {
    options = {};
  }
  options[DATA_ROLE] = "page";
  options["id"] = id;
  return div(options);
};
pageHeader = function(title, position, options) {
  if (title == null) {
    title = "";
  }
  if (position == null) {
    position = "inline";
  }
  if (options == null) {
    options = {};
  }
  options[DATA_ROLE] = "header";
  options["data-position"] = position;
  return "" + (div(options)) + "\n    %h1 " + title;
};
pageFooter = function(fixed, options) {
  if (fixed == null) {
    fixed = true;
  }
  if (options == null) {
    options = {};
  }
  options[DATA_ROLE] = "footer";
  return div(options);
};
navbar = function(options) {
  if (options == null) {
    options = {};
  }
  options[DATA_ROLE] = "navbar";
  return div(options);
};
content = function(options) {
  if (options == null) {
    options = {};
  }
  options[DATA_ROLE] = "content";
  return div(options);
};
div = function(options, content) {
  if (options == null) {
    options = {};
  }
  return haTag("div", options, content);
};
delProp = function(obj, prop) {
  var objProp;
  objProp = obj[prop];
  delete obj[prop];
  return objProp;
};
refreshPage = function(page) {
  try {
    return $(idSel(page)).page('destroy').page();
  } catch (e) {

  }
};
idSel = function(id) {
  if (!id || id.length === 0) {
    return "";
  }
  if (id[0] === "#") {
    return id;
  } else {
    return "#" + id;
  }
};   return id;
  } else {
    return "#" + id;
  }
};
appendTmpl = function(containers, templateFn, data, options) {
  var elems;
  if (typeof templateFn === 'string') {
    templateFn = eval(templateFn);
  }
  elems = genElems(templateFn, data, options);
  return $(containers).append(elems);
};
refreshTmplById = function(id, templateFn, data, options) {
  log("refreshTmplById", idSel(id));
  return refreshTmpl("" + (idSel(id)), templateFn, data, options);
};
refreshTmpl = function(containers, templateFn, data, options) {
  $(containers).empty();
  return appendTmpl(containers, templateFn, data, options);
};
genElems = function(fn, data, options) {
  var elem, elems;
  if (_.isArray(data)) {
    elems = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        elem = data[_i];
        _results.push(fn(elem, options));
      }
      return _results;
    })();
    if (elems) {
      return elems.join("");
    } else {
      return "";
    }
  } else {
    return fn(data, options);
  }
};