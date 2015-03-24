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
  var get = getParameter(),
      xhr = new XMLHttpRequest(),
        encoding,
        bytes,
        codeString,
        newline,
        md5sum,
        content;

  xhr.open('GET', get['url'], true);
  xhr.responseType = "arraybuffer";
  xhr.onload = function() {
    bytes = new Uint8Array(this.response);
    encoding = Encoding.detect(bytes);
    codeString = Encoding.codeToString(bytes);
    md5sum = MD5_hexhash(codeString);
    md5sumLf = MD5_hexhash(codeString.replace(/\r\n?/g, "\n"));
    if (codeString.indexOf("\r\n", 0) > 0) {
      newline = "CRLF";
    } else if (codeString.indexOf("\n", 0) > 0) {
      newline = "LF";
    } else {
      newline = "CR";
    }
    content = Encoding.codeToString(Encoding.convert(bytes, "UNICODE", encoding));

    $('#md5sum').html(md5sum);
    $('#md5sumLf').html(md5sumLf);
    $('#encoding').html(encoding);
    $('#newline').html(newline);
    $("#content").html(escapeHTML(content));
    $('pre code').each(function(i, block) {
      return hljs.highlightBlock(block);
    });
  };
  xhr.send();
});
