'use strict';

function getParameter() {
  const get = {};
  if (location.search.length > 1) {
    const rets = location.search.substr(1).split('&');
    for (const ret of rets) {
      const r = ret.split('=');
      get[r[0]] = r[1];
    }
  }
  return get;
}

function escapeHTML(html) {
  return $('<div>').text(html).html();
}

$(() => {
  const q = getParameter();
  const xhr = new XMLHttpRequest();

  xhr.open('GET', q['url'], true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = () => {
    const content = new Content(xhr.response);
    $('#md5sum').html(content.getMd5sum());
    $('#encoding').html(content.getEncoding());
    $('#newline').html(content.getLineFeedCode());
    $('#content').html(escapeHTML(content.getUnicodeCodeString()));
    $('pre code').each((i, block) => {
      return hljs.highlightBlock(block);
    });
  };
  xhr.send();
});
