// Generated by CoffeeScript 1.8.0
(function() {
  var escapeHTML, getParameter;

  getParameter = function() {
    var get, r, ret, rets, _i, _len;
    if (location.search.length > 1) {
      get = new Object();
      rets = location.search.substr(1).split('&');
      for (_i = 0, _len = rets.length; _i < _len; _i++) {
        ret = rets[_i];
        r = ret.split('=');
        get[r[0]] = r[1];
      }
      return get;
    } else {
      return false;
    }
  };

  escapeHTML = function(html) {
    return $('<div>').text(html).html();
  };

  $(function() {
    var get, xhr, xhr2;
    hljs.configure({
      useBR: true
    });
    get = getParameter();
    xhr = new XMLHttpRequest();
    xhr.open('GET', get['url'], true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function() {
      var b, binaryData, bytes, result, _i, _len;
      bytes = new Uint8Array(this.response);
      binaryData = "";
      for (_i = 0, _len = bytes.length; _i < _len; _i++) {
        b = bytes[_i];
        binaryData += String.fromCharCode(b);
      }
      result = MD5_hexhash(binaryData);
      return $('#md5sum').html(result);
    };
    xhr.send();
    xhr2 = new XMLHttpRequest();
    xhr2.open('GET', get['url'], true);
    xhr2.responseType = "text";
    xhr2.onload = function() {
      $('#content').html(escapeHTML(this.response));
      return $('pre code').each(function(i, block) {
        hljs.configure({
          tabReplace: "    "
        });
        return hljs.highlightBlock(block);
      });
    };
    return xhr2.send();
  });

}).call(this);
