var idSel, listviewRefresh, refreshPage;
refreshPage = function(page) {
  try {
    return $(idSel(page)).page('destroy').page();
  } catch (e) {

  }
};
listviewRefresh = function(list) {
  var listSel;
  listSel = idSel(list);
  try {
    $(listSel).listview("init");
  } catch (e) {

  }
  try {
    return $(listSel).listview("refresh");
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
};