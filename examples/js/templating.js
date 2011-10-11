var appendTmpl, genElems, refreshTmpl, refreshTmplById;
appendTmpl = function(containers, templateFn, data, options) {
  var elems;
  if (typeof templateFn === 'string') {
    templateFn = eval(templateFn);
  }
  elems = genElems(templateFn, data, options);
  return $(containers).append(elems);
};
refreshTmplById = function(id, templateFn, data, options) {
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