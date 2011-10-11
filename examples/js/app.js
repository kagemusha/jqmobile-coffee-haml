/*
   This is multi-page jquerymobile example app using jqm-coffee-haml.
   It has two pages: hotelsPage and reservePage which are built in
   makePages() using hotelsPageTmpl() and reservePageTmpl() which
   are in views.coffee.
*/var CLICK_EVENT, callFn, callbacks, getHotel, hotelData, initApp, initReservePage, makePages, roomChoices;
CLICK_EVENT = "tap";
initApp = function() {
  log("initing");
  makePages();
  return callbacks();
};
makePages = function() {
  var page, tmpl, _i, _len;
  for (_i = 0, _len = PAGES.length; _i < _len; _i++) {
    page = PAGES[_i];
    console.log("making " + page);
    tmpl = "" + page + "Tmpl";
    appendTmpl("body", tmpl, {
      pageId: page
    });
  }
  return refreshListById("hotelList", hotelLiTmpl, hotelData());
};
callbacks = function() {
  /*
    calls fn specified in link. used instead of jqm pagebeforechange callback
    when needs variables in link, e.g. hotel id
    alternatively could set a global var using link then
    use the jqm page callback
    */  $('a[callfn]').live(CLICK_EVENT, function() {
    var fn;
    fn = $(this).attr("callfn");
    log("callfn", fn);
    if (fn && fn.length > 0) {
      return callFn(fn, this);
    }
  });
  /*
    When want to style save button in header instead of in form
    use a link and a callback
    */
  return $('a[saveform]').live(CLICK_EVENT, function() {
    var msg;
    msg = "Pretending to save form " + ($(this).attr("saveform")) + "  ;-)";
    return popupMsg(msg, 2500);
  });
};
initReservePage = function(link) {
  var hotel, id;
  id = $(link).attr("obj_id");
  console.log("id", $(link).attr("obj_id"));
  hotel = getHotel(id);
  log("htl", hotel);
  $("#hotelName").html(hotel.name);
  resetChoices(true, ROOM_CHOICE_SEL, "roomType", roomChoices(hotel.roomTypes), {
    "data-theme": "d"
  });
  return refreshPage(RESERVE_PG);
};
hotelData = function() {
  return [
    {
      name: "Excelsior Hotel",
      id: 1,
      roomTypes: ["Standard", "Deluxe"]
    }, {
      name: "Super Grande Resort",
      id: 2,
      roomTypes: ["Grand", "Extra Grand", "Deluxe Grand"]
    }, {
      name: "Sunray Inn",
      id: 3,
      roomTypes: ["Standard", "Sunny"]
    }
  ];
};
getHotel = function(id) {
  var hotel, _i, _len, _ref;
  _ref = hotelData();
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    hotel = _ref[_i];
    log("ids", hotel.id.toString(), id.toString());
    if (hotel.id.toString() === id.toString()) {
      return hotel;
    }
  }
};
roomChoices = function(choices) {
  var choice, _i, _len, _results;
  _results = [];
  for (_i = 0, _len = choices.length; _i < _len; _i++) {
    choice = choices[_i];
    _results.push({
      id: "id" + choice,
      value: choice,
      label: choice,
      "data-theme": "a"
    });
  }
  return _results;
};
callFn = function(name, params) {
  var fn;
  fn = new Function("params", "" + name + "(params)");
  return fn(params);
};