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
		author : "성균관대학교 대나무숲",
		date : "2017. 05. 27. 오후",
		content : "<저.. 진지합니다> <br>흡연자는 어디로 가야 할까요? (글의 기준 시점은 16년도입니다.) <br>여기 흡연자 갑이 있습니다. 갑은 태어나서 한 번도 금연구역에서 흡연을 한 적이 없는 사람입니다. 평소 경영관-호암관 사이의 계단에서 흡연하는 벌레들을 마뜩찮게 여기며 흡연구역으로 가는 사람입니다. <br>1. <br>갑이 사는 동네에는 별도로 흡연구역이 없습니다. 간간히 금연구역만 있을 뿐입니다. <br>즉 금연구역을 제외한 모든 곳에서 흡연을 해도 됩니다. 비금연구역인, 사람들이 많은 거리나 음식점 앞에서 흡연을 해도 아무런 문제가 되질 않습니다."
	},
	{
		author : "성균관대학교 대나무숲 #2",
		date : "2017. 05. 27. 오후",
		content : "하지만 갑은 그러지 않습니다. 사람들의 눈총이 너무 따갑거든요. <br>위법하지 않게 흡연을 하는데도 눈치를 봐야 하는 게 싫은 갑은 주변 PC방에 들어갑니다. 게임을 잘 즐기지도 않는 갑은 로그인만 해두고 PC방 내 설치된 흡연부스에서 흡연을 합니다. <br>흡연을 하는데 또 추가적인 비용이 들지만 거리에서 눈총을 받느니 이게 낫다고 생각하는 갑입니다."
	},
	{
		author : "Lukas Graham",
		date : "제작년",
		content : "Once I was seven years<br>old my momma told me<br>Go make yourself<br>some friends or you'll be lonely<br>Once I was seven years old<br>It was a big big world<br>but we thought we were bigger<br>Pushing each other to the limits<br>we were learning quicker<br>By eleven smoking herb and<br>drinking burning liquor<br>Never rich so we were out to<br>make that steady figure<br>Once I was eleven years old<br>my daddy told me<br>Go get yourself a wife or<br>you'll be lonely<br>Once I was eleven years old<br>I always had that dream<br>like my daddy before me<br>So I started writing songs<br>I started writing stories<br>Something about the glory<br>just always seemed to bore me<br>Cause only those<br>I really love will ever really know me<br>Once I was 20 years old"
	},
	{
		author : "Jane Austen",
		date : "28 January 1813",
		content : "<div style=\"text-align: center;\">Prejudice disabled me from<br>falling in love with others and pride<br>shuns others away from me.</div>"
	},
	{
		author : "혁오 (HYUKOH)",
		date : "3시간 전",
		content : "난 엄마가 늘 베푼 사랑에 어색해<br>그래서 그런 건가 늘 어렵다니까<br>잃기 두려웠던 욕심 속에도<br>작은 예쁨이 있지<br>난 지금 행복해 그래서 불안해<br>폭풍 전 바다는 늘 고요하니까<br>불이 붙어 빨리 타면 안 되잖아<br>나는 사랑을 응원해<br>젊은 우리 나이테는 잘 보이지 않고<br>찬란한 빛에 눈이 멀어 꺼져가는데<br>아아아아아<br>아아아아아<br>아아아아아아아<br>아아아아아<br>아아아아아<br>아아아아아아아아아"
	},
	{
		author : "w3school",
		date : "어제",
		content : "The onkeypress event is not fired for all keys (e.g. ALT, CTRL, SHIFT, ESC) in all browsers. To detect only whether the user has pressed a key, use the onkeydown event instead, because it works for all keys."
	}
];



document.querySelector('.js--t-previous').addEventListener('click', threadHandler);
document.querySelector('.js--t-next').addEventListener('click', threadHandler);

function threadHandler(evt, a) {

	let thread = evt.target;

	while (thread.id == undefined || thread.id == '') {
		thread = thread.parentNode;
	}
	// thread.id를 이용해서 서버에서 글 리스트를 가져옴.

	let nextBtn = document.querySelector(`#${thread.id} .js--t-next`),
		prevBtn = document.querySelector(`#${thread.id} .js--t-previous`),
		helper = document.querySelector(`#${thread.id} .js--t-get-bounding`),
		loadNext = a || nextBtn == evt.target;

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
	}
	else {
		article.index--;
		nextBtn.classList.remove('inactive');
		
		if (article.index <= 1) {
			prevBtn.classList.add('inactive');
		}
	}

	thread.setAttribute('index', article.index);

	helper.innerHTML = data[article.index].content;

	let startHeight = `${article.content.getBoundingClientRect().height}px`,
		endHeight = `${helper.getBoundingClientRect().height}px`;


	article.content.style.height = startHeight;

	//animation starts
	article.content.classList.add('content--swapping');

	setTimeout(function() {
		article.content.style.height = endHeight;

		article.author.innerHTML = data[article.index].author;
		article.date.innerHTML = data[article.index].date;
		article.content.innerHTML = data[article.index].content;
	}, 200);
		

	//animation ends
	setTimeout(function() {
		article.content.classList.remove('content--swapping');
	}, 600);
}