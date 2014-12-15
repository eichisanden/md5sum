var inputTag = document.getElementsByTagName("input");
var i;
for (i = 0; i < inputTag.length; i++) {
	if (inputTag[i].getAttribute('modified') === 'true') {
		inputTag[i].setAttribute('type', 'password');
		inputTag[i].setAttribute('modified', 'false');
	} else if (inputTag[i].getAttribute('type') == 'password') {
		inputTag[i].setAttribute('type', 'text');
		inputTag[i].setAttribute('modified', 'true');
	}

}