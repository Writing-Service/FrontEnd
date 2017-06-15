var isMobile = false;

document.body.addEventListener('keypress', function(evt) {
	if (evt.keyCode != 13) // Enter
		return;

	if (isMobile) {
		document.body.className = "desktop";
		isMobile = false;
	} else {
		document.body.className = "mobile";
		isMobile = true;
	}
});

document.querySelector('.header__title').addEventListener('click', function(evt) {
	if (isMobile) {
		document.body.className = "desktop";
		isMobile = false;
	} else {
		document.body.className = "mobile";
		isMobile = true;
	}
});