var Pre;

Pre = {
  i: function(el, progress, complete) {
    var srcs;
    srcs = Pre.scrape($('.slide'));
    return Pre.load(srcs, progress, complete);
  },
  load: function(srcs, progress, complete) {
    var i, images, j, len, loaded, results, src, total;
    images = [];
    loaded = 0;
    total = srcs.length;
    results = [];
    for (i = j = 0, len = srcs.length; j < len; i = ++j) {
      src = srcs[i];
      images[i] = new Image();
      images[i].src = src;
      results.push(images[i].onload = function() {
        var perc;
        loaded++;
        perc = Math.round(loaded / total * 100) / 100;
        if (loaded === total) {
          return complete(true);
        } else {
          return progress(perc);
        }
      });
    }
    return results;
  },
  scrape: function(el) {
    var srcs;
    srcs = [];
    el.each(function(i, el) {
      var src;
      src = Pre.srcFromStyle($(el));
      if (src !== false) {
        return srcs.push(src);
      }
    });
    return srcs;
  },
  srcFromStyle: function(el) {
    var style, url;
    style = el.attr('style');
    url = style.match(/url\((.*)\)/);
    if (url !== null && url[1] !== void 0) {
      return url[1];
    } else {
      return false;
    }
  }
};
