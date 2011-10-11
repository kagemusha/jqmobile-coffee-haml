var log;
log = function() {
  var array, i, msg, _ref;
  try {
    msg = arguments[0];
    if (arguments.length > 1) {
      msg += ": ";
      array = new Array();
      for (i = 1, _ref = arguments.length - 1; 1 <= _ref ? i <= _ref : i >= _ref; 1 <= _ref ? i++ : i--) {
        array.push(JSON.stringify(arguments[i]));
      }
      msg += array.join(",");
      return console.log(msg);
    } else {
      return console.log(msg);
    }
  } catch (e) {
    return console.log("log fn err: " + e);
  }
};