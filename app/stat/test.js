var isMobile = false;

document.body.addEventListener('click', () => {
	if (isMobile) {
		document.body.className = "desktop";
		isMobile = false;
	} else {
		document.body.className = "mobile";
		isMobile = true;
	}
});