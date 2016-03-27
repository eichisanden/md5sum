'use strict';

chrome.browserAction.onClicked.addListener((tab) => {
  return chrome.tabs.create({
    'url': '../html/popup.html'
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const url = `../html/src.html?url=${info.linkUrl}`;
  return chrome.windows.create({
    url: url,
    width: 800,
    height: 800
  });
});

chrome.contextMenus.create({
  id: 'open',
  title: 'md5sum',
  contexts: ['link']
});
