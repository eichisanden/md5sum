function handleFileSelect(evt) {
	evt.stopPropagation();
	evt.preventDefault();

	var files = evt.dataTransfer.files;

	var output = [];
	for (var i = 0, f; f = files[i]; i++) {

		var reader = new FileReader();

		reader.onload = (function(theFile) {
			return function(e) {
				var md5sum = MD5_hexhash(e.target.result);

				var div = document.createElement('div');
				div.innerHTML = [md5sum, '&nbsp;&nbsp;&nbsp;', theFile.name].join('');
				document.getElementById('list').insertBefore(div, null);
			};
		})(f);
		reader.readAsBinaryString(f);
	}
}

function handleDragOver(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	evt.dataTransfer.dropEffect = 'copy';
}

var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);