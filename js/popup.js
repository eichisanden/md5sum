$(function () {
	$("#test").click(function() {
		$.get(
			"https://www.google.co.jp/images/srpr/logo11w.png",
			//"http://www.sra.co.jp",
			//"http://crypto-js.googlecode.com/svn/tags/3.0.2/build/rollups/md5.js",
			{},
			function(data) {
				//var result = CryptoJS.MD5(data).toString();
				var result = MD5_hash(data);
				var hash = "";
				var c;
				for(i = 0; i < 16; i++) {
					c = result.charCodeAt(i);
					hash += "0123456789abcdef".charAt((c>>4) & 0xf);
					hash += "0123456789abcdef".charAt(c & 0xf);
				}

				console.log(hash);
				$("#result").html(hash);
			}
		);
	});
});

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