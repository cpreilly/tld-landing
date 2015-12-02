Pre =

  i: (el, progress, complete) ->

    srcs = Pre.scrape $ '.slide'

    Pre.load srcs, progress, complete

  load: (srcs, progress, complete) ->

    images = []
    loaded = 0
    total = srcs.length

    for src, i in srcs
      images[i] = new Image()
      images[i].src = src
      images[i].onload = ->
        loaded++
        perc = Math.round(loaded/total*100)/100
        if loaded is total then complete(true) else progress(perc)

  scrape: (el) ->

    srcs = []
    el.each (i, el) ->
      src = Pre.srcFromStyle($(el))
      if src isnt false
        srcs.push src

    return srcs

  srcFromStyle: (el) ->
    style = el.attr 'style'
    url = style.match(/url\((.*)\)/)
    if url isnt null and url[1] isnt undefined
      return url[1]
    else
      return false

