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
