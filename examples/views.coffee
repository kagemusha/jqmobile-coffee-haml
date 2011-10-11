PG_DEFAULTS = {"data-theme": "e"}

HOTELS_PG = "hotelsPage"
RESERVE_PG = "reservePage"
PAGES = [HOTELS_PG, RESERVE_PG]


hotelsPageTmpl = (pgData)->
  hamlHtml  """
    #{page "#{pgData.pageId}", PG_DEFAULTS}
      #{pageHeader "Hotels"}
      #{content() }
        #{listview {id: "hotelList" } }
    """

hotelLiTmpl = (hotel) ->
  hamlHtml """
    %li #{link hotel.name, RESERVE_PG, {obj_id: hotel.id, callfn: 'initReservePage'} }
  """

ROOM_CHOICE_SEL = "roomChoices"

reservePageTmpl = (pgData) ->
  hamlHtml  """
    #{page "#{pgData.pageId}", PG_DEFAULTS }
      #{pageHeader "Reserve a room", "fixed"}
        #{ backButton "Hotels", HOTELS_PG }
        #{ saveButton 'reservationForm', 'reservation', HOTELS_PG, "Reserve!" }

      #{content() }
        %h3#hotelName
        #{form {id: "reservationForm", obj_type: "card"} }
          #{input "hidden", "id"}
          %br
          #{controlgroup "Room Type",{id: ROOM_CHOICE_SEL, "data-theme": "d"} }
          #{yesnoChoiceTmpl "Smoking", "smoking" , false}
          #{haTag "textarea", {id: "comments", placeholder: "Comments", "data-theme": "d"} }

    """

saveButton = (form, objType, page="#", label="Save", reverse=true) ->
  link label, page, {obj_type: objType, saveform: form}, true
