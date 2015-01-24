handleFileSelect = (evt) ->
	evt.stopPropagation()
	evt.preventDefault()

	files = evt.dataTransfer.files

	output = []
	for f in files
		reader = new FileReader()
		reader.onload = ((theFile) ->
			return (e) ->
				md5sum = MD5_hexhash(e.target.result)
				div = document.createElement('div')
				div.innerHTML = [md5sum, '&nbsp;&nbsp;&nbsp;', theFile.name].join('')
				document.getElementById('list').insertBefore(div, null)
		)(f)
		reader.readAsBinaryString(f)

handleDragOver = (evt) ->
	evt.stopPropagation()
	evt.preventDefault()
	evt.dataTransfer.dropEffect = 'copy'

dropZone = document.getElementById('drop_zone')
dropZone.addEventListener('dragover', handleDragOver, false)
dropZone.addEventListener('drop', handleFileSelect, false)
