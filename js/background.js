chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.create({"url": "../popup.html" });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
	$.get(
		info.linkUrl,
		{},
		function(data) {
			//var result = MD5_hexhash(data);
			var result = MD5_hash(data);
			alert(result);
			return false;
		}
	);
});

chrome.contextMenus.create({
	id: 'open',
	title: "md5sum",
	contexts: ['link'],
});