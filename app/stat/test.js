var isMobile = false;

document.body.addEventListener('keypress', evt => {
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


// data for thread ajax-ing
const data = [
	{
		id : ""
	},
	{
		author : "Author",
		date : "Yesterday 5:09 PM",
		content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	{
		author : "홍길동",
		date : "어제",
		content : "2"
	},
	{
		author : "홍길동",
		date : "어제",
		content : "3"
	},
	{
		author : "홍길동",
		date : "어제",
		content : "4"
	},
	{
		author : "홍길동",
		date : "어제",
		content : "5"
	},
	{
		author : "홍길동",
		date : "어제",
		content : "6"
	},
	{
		author : "홍길동",
		date : "어제",
		content : "7"
	}
];



document.querySelector('.js--t-previous').addEventListener('click', threadHandler);
document.querySelector('.js--t-next').addEventListener('click', threadHandler);

function threadHandler(evt) {

	let thread = evt.target;

	while (thread.id == undefined || thread.id == '') {
		thread = thread.parentNode;
	}
	// thread.id를 이용해서 서버에서 글 리스트를 가져옴.

	let nextBtn = document.querySelector(`#${thread.id} .js--t-next`),
		prevBtn = document.querySelector(`#${thread.id} .js--t-previous`),
		loadNext = nextBtn == evt.target;

		console.log(loadNext);

	let article = {
		id : thread.id,
		index : thread.getAttribute('index'),
		author : document.querySelector(`#${thread.id} .js--t-author`),
		date : document.querySelector(`#${thread.id} .js--t-date`),
		content : document.querySelector(`#${thread.id} .js--t-content`)
	};

	if (loadNext) {
		article.index++;
		prevBtn.classList.remove('inactive');

		if (article.index >= 7) {
			nextBtn.classList.add('inactive');
		}
	} else {
		article.index--;
		nextBtn.classList.remove('inactive');
		
		if (article.index <= 1) {
			prevBtn.classList.add('inactive');
		}
	}

	thread.setAttribute('index', article.index);

	article.author.innerHTML = data[article.index].author;
	article.date.innerHTML = data[article.index].date;
	article.content.innerHTML = data[article.index].content;
}