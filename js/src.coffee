getParameter = ()->
	if location.search.length > 1
		get = new Object()
		rets = location.search.substr(1).split('&')
		for ret in rets
			r = ret.split('=')
			get[r[0]] = r[1]
		return get;
	else
		return false;

escapeHTML = (html) ->
	return $('<div>').text(html).html();

$(()->
	# hljs.configure({tabReplace: '    '})
	# hljs.initHighlightingOnLoad()
	get = getParameter()
	xhr = new XMLHttpRequest()
	xhr.open('GET', get['url'], true)
	xhr.responseType = "arraybuffer"
	xhr.onload = ->
		bytes = new Uint8Array(this.response)
		binaryData = ""
		for b in bytes
			binaryData += String.fromCharCode(b)
		result = MD5_hexhash(binaryData)
		$('#md5sum').html(result)
	xhr.send()

	xhr2 = new XMLHttpRequest()
	xhr2.open('GET', get['url'], true)
	xhr2.responseType = "text"
	xhr2.onload = ->
		$('#content').html(escapeHTML(this.response))
		# $('#content').html(hljs.highlightAuto(hljs.fixMarkup(this.response)).value)

#		$('#content').html(this.response)
		# hljs.configure({
		# 	tabReplace: "    ",
		# })
		$('pre code').each((i, block)->
			hljs.highlightBlock(block)
		)
	xhr2.send()
)

