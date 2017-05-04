var isMobile = false;

document.body.addEventListener('click', () => {
	if (isMobile) {
		document.body.className = "";
		isMobile = false;
	} else {
		document.body.className = "mobile";
		isMobile = true;
	}
});