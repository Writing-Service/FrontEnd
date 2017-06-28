var isMobile = false;

document.querySelector('.header__title').addEventListener('click', function(evt) {
	if (isMobile) {
		document.body.className = "desktop";
		isMobile = false;
	} else {
		document.body.className = "mobile";
		isMobile = true;
	}
});