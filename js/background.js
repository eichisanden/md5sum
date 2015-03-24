chrome.browserAction.onClicked.addListener(function(tab) {
  return chrome.tabs.create({
    "url": "../html/popup.html"
  });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  var url;
  url = '../html/src.html?url=' + info.linkUrl;
  return chrome.windows.create({
    url: url,
    width: 800,
    height: 800
  });
});

chrome.contextMenus.create({
  id: 'open',
  title: "md5sum",
  contexts: ['link']
});
