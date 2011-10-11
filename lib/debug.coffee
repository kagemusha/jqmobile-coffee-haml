log = ->
  try
    msg = arguments[0]
    if arguments.length>1
        msg += ": "
        array = new Array();
        for i in [1..arguments.length-1]
            array.push(JSON.stringify(arguments[i]))
        msg += array.join(",")
        console.log msg
    else
      console.log msg
  catch e
    console.log "log fn err: #{e}"