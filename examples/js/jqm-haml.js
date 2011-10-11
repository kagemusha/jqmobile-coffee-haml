var DATA_ROLE, backButton, button, checkbox, choiceBtn, choiceButtons, choiceGroup, content, controlgroup, delProp, div, fieldcontain, fieldset, form, input, label, link, listview, navbar, page, pageFooter, pageHeader, radio, refreshListById, resetChoices, rightButton;
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
  options["href"] = idSel(href);
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
refreshListById = function(id, template, objs, options) {
  refreshTmplById(id, template, objs, options);
  return listviewRefresh(id);
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