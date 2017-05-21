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

var $types = document.querySelector('.js--types'),
	$editor = document.querySelector('.js--editor'),
	isOverTyped = false;

function types(evt) {
	let types = evt.target.value.length;
	
	$types.innerHTML = `${types}/700`;
	
	if (!isOverTyped && types > 700) {
		$types.classList.add('types--warning');
		isOverTyped = true;
	}else if (isOverTyped && types <= 700) {
		$types.classList.remove('types--warning');
		isOverTyped = false;
	}
}

$editor.addEventListener('keyup', types);