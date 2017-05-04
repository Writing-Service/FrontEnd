'use strict';

var toggleSize = document.querySelector('.js-sizing');
var extsblCard = document.querySelector('.extensable_card');
var body = document.body;
var extsbleCardMenu = document.querySelector('.extsbl_card-menu');
var extsbleCardMenuToggle = document.querySelector('#extsbl_card-menu_toggle');

var mouseStartX = 0;
var mouseStartY = 0;

var isMoved = false;

// this function will be used to get width/height in integer
function getWHValue (a) {
	return Number( a.replace('px','') );
}


toggleSize.addEventListener('mousedown', () => {
	mouseStartX = event.pageX;
	mouseStartY = event.pageY;
	isMoved = true;
});

function onMouseUpEl () {
	if (isMoved) {
		let preWidth = getWHValue(extsblCard.style.width) ||
			extsblCard.getBoundingClientRect().width;
		let preHeight = getWHValue(extsblCard.style.height) ||
			extsblCard.getBoundingClientRect().height;
		
		extsblCard.style.width = `${preWidth + mouseStartX - event.pageX}px`;
		extsblCard.style.height = `${preHeight + mouseStartY - event.pageY}px`;
		isMoved = false;
	}
	if (extsbleCardMenuToggle.checked) {
		extsbleCardMenuToggle.checked = false;
	}
}

body.addEventListener('mouseup', onMouseUpEl);
extsblCard.addEventListener('mouseup', onMouseUpEl);
extsbleCardMenu.addEventListener('mouseup', evt => evt.stopPropagation());