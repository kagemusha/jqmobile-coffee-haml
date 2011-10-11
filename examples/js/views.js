var HOTELS_PG, PAGES, PG_DEFAULTS, RESERVE_PG, ROOM_CHOICE_SEL, hotelLiTmpl, hotelsPageTmpl, reservePageTmpl, saveButton;
PG_DEFAULTS = {
  "data-theme": "e"
};
HOTELS_PG = "hotelsPage";
RESERVE_PG = "reservePage";
PAGES = [HOTELS_PG, RESERVE_PG];
hotelsPageTmpl = function(pgData) {
  return hamlHtml("" + (page("" + pgData.pageId, PG_DEFAULTS)) + "\n  " + (pageHeader("Hotels")) + "\n  " + (content()) + "\n    " + (listview({
    id: "hotelList"
  })));
};
hotelLiTmpl = function(hotel) {
  return hamlHtml("%li " + (link(hotel.name, RESERVE_PG, {
    obj_id: hotel.id,
    callfn: 'initReservePage'
  })));
};
ROOM_CHOICE_SEL = "roomChoices";
reservePageTmpl = function(pgData) {
  return hamlHtml("" + (page("" + pgData.pageId, PG_DEFAULTS)) + "\n  " + (pageHeader("Reserve a room", "fixed")) + "\n    " + (backButton("Hotels", HOTELS_PG)) + "\n    " + (saveButton('reservationForm', 'reservation', HOTELS_PG, "Reserve!")) + "\n\n  " + (content()) + "\n    %h3#hotelName\n    " + (form({
    id: "reservationForm",
    obj_type: "card"
  })) + "\n      " + (input("hidden", "id")) + "\n      %br\n      " + (controlgroup("Room Type", {
    id: ROOM_CHOICE_SEL,
    "data-theme": "d"
  })) + "\n      " + (yesnoChoiceTmpl("Smoking", "smoking", false)) + "\n      " + (haTag("textarea", {
    id: "comments",
    placeholder: "Comments",
    "data-theme": "d"
  })) + "\n");
};
saveButton = function(form, objType, page, label, reverse) {
  if (page == null) {
    page = "#";
  }
  if (label == null) {
    label = "Save";
  }
  if (reverse == null) {
    reverse = true;
  }
  return link(label, page, {
    obj_type: objType,
    saveform: form
  }, true);
};