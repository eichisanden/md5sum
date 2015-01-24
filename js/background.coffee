chrome.browserAction.onClicked.addListener((tab) ->
	chrome.tabs.create({"url": "../popup.html" })
)

chrome.contextMenus.onClicked.addListener((info, tab)->
	# xhr = new XMLHttpRequest()
	# xhr.open('GET', info.linkUrl, true)
	# xhr.responseType = "arraybuffer"
	# xhr.onload = ->
	# 	bytes = new Uint8Array(this.response)
	# 	binaryData = ""
	# 	for b in bytes
	# 		binaryData += String.fromCharCode(b)
	# 	result = MD5_hexhash(binaryData)
	# 	alert(result)
	# xhr.send()

	url = 'src.html?url=' + info.linkUrl;
	chrome.windows.create({ url: url, width: 800, height: 800 });
)

chrome.contextMenus.create({
	id: 'open',
	title: "md5sum",
	contexts: ['link']
})