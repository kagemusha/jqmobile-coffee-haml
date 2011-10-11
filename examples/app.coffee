###
   This is multi-page jquerymobile example app using jqm-coffee-haml.
   It has two pages: hotelsPage and reservePage which are built in
   makePages() using hotelsPageTmpl() and reservePageTmpl() which
   are in views.coffee.
###


CLICK_EVENT = "tap" # "tap" or "click"

initApp = ->
  log "initing"
  makePages()
  callbacks()


makePages = ->
  for page in PAGES
    console.log "making #{page}"

    # name ur templates as u wish but must be a
    # fn defined somewhere (see views.coffee)
    tmpl = "#{page}Tmpl"
    appendTmpl "body", tmpl, {pageId: page}

  #page specific setup
  refreshListById "hotelList", hotelLiTmpl, hotelData()


callbacks = ->


  ###
  calls fn specified in link. used instead of jqm pagebeforechange callback
  when needs variables in link, e.g. hotel id
  alternatively could set a global var using link then
  use the jqm page callback
  ###
  $('a[callfn]').live CLICK_EVENT, ->
    fn = $(this).attr("callfn")
    log "callfn", fn
    callFn fn, this if (fn and fn.length > 0)

  ###
  When want to style save button in header instead of in form
  use a link and a callback
  ###
  $('a[saveform]').live CLICK_EVENT, ->
    msg = "Pretending to save form #{ $(this).attr("saveform") }  ;-)"
    popupMsg msg, 2500

#callback specified in hotels li links
initReservePage = (link) ->
  id = $(link).attr("obj_id")
  console.log "id", $(link).attr("obj_id")
  hotel = getHotel id
  log "htl", hotel
  $("#hotelName").html hotel.name
  resetChoices true, ROOM_CHOICE_SEL, "roomType" , roomChoices(hotel.roomTypes), {"data-theme": "d"}
  refreshPage RESERVE_PG

#in real life get data from server, localStorage, etc.
hotelData = ->
  [{name: "Excelsior Hotel", id: 1, roomTypes: ["Standard","Deluxe"]},
   {name: "Super Grande Resort", id: 2, roomTypes: ["Grand","Extra Grand", "Deluxe Grand"]},
   {name: "Sunray Inn", id: 3, roomTypes: ["Standard","Sunny"]} ]

#in real life, use real persistence solution
getHotel = (id) ->
  for hotel in hotelData()
    log "ids", hotel.id.toString(), id.toString()
    return hotel if hotel.id.toString() == id.toString()


#convert room choices to objs usable to build choices
roomChoices = (choices) ->
  for choice in choices
    {id: "id#{choice}", value: choice, label: choice, "data-theme": "a"}


callFn = (name, params) ->
  fn = new Function("params", "#{name}(params)")
  fn(params)
