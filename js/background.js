chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.create({"url": "../popup.html" });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', info.linkUrl, true);
	xhr.responseType = "arraybuffer";
	xhr.onload = function() {
		var bytes = new Uint8Array(this.response);
		var binaryData = "";
		for (var i = 0, len = bytes.byteLength; i < len; i++) {
			binaryData += String.fromCharCode(bytes[i]);
		}
		var result = MD5_hexhash(binaryData);
		alert(result);
	};
	xhr.send();
});

chrome.contextMenus.create({
	id: 'open',
	title: "md5sum",
	contexts: ['link'],
});