'use strict';

class motiveHandler {
	constructor() {
		// 제시문 작성을 위해 작성해야 할 글감 수
		this.required = 3;

		this.createPrimaryBtn = document.getElementById('js--mh-create-primary');
		this.requestMotiveBtn = document.getElementById('js--mh-create-motive');

		this.updateCreatePrimaryBtn = this.updateCreatePrimaryBtn.bind(this)

		this.updateCreatePrimaryBtn();
	}

	updateCreatePrimaryBtn() {
		let written_motives = this.createPrimaryBtn.getAttribute('written');

		if (written_motives < this.required) {
			this.createPrimaryBtn.classList.add('inactive');
			this.createPrimaryBtn.innerHTML = `${written_motives}/${this.required}`;
		} else {
			this.createPrimaryBtn.classList.remove('inactive');
			this.createPrimaryBtn.innerHTML = '제시문 작성하기';
		}
	}
}
new motiveHandler();

class editorManager {
	constructor() {
		this.types = document.getElementById('js--em-types'),
		this.maxTypes = 700;
		this.editor = document.getElementById('js--em-editor'),
		this.isOverTyped = false;

		this.addEventListeners = this.addEventListeners.bind(this);
		this.countLetters = this.countLetters.bind(this);

		this.addEventListeners();
	}

	addEventListeners() {
		this.editor.addEventListener('keyup', this.countLetters);
	}

	countLetters(evt) {
		let letters = evt.target.value.length;

		this.types.innerHTML = `${letters}/${this.maxTypes}`;

		if (!this.isOverTyped && letters > this.maxTypes) {
			this.types.style.color = 'rgb(211, 47, 47)';
			this.types.style.fontWeight = 'bold';
			this.isOverTyped = true;
		} else if (this.isOverTyped && letters <= this.maxTypes) {
			this.types.style.color = '';
			this.types.style.fontWeight = '';
			this.isOverTyped = false;
		}
	}
}
new editorManager();


class dueCheck {
	constructor() {
		this.targetNodes = [];
		this.updateCycle = 1000;
		this.maxHoldDate = 3;

		this.renderTargets = this.renderTargets.bind(this);
		this.update = this.update.bind(this);
		this.removeCard = this.removeCard.bind(this);

		let that = this;
		window.setInterval(that.update, that.updateCycle);

		this.renderTargets();
	}

	// 새로 글 받아오면 renderTargets함수를 실행시켜줄 것.
	renderTargets() {
		this.targetNodes = document.querySelectorAll('.js--dc-timer');
	}

	update() {
		let date = new Date();

		[].map.call(this.targetNodes, t => {
			let dueto = t.getAttribute('dueto').split(':');

			let r = {
				days : parseInt(dueto[0]) - date.getDate(),
				hrs  : parseInt(dueto[1]) - date.getHours(),
				mins : parseInt(dueto[2]) - date.getMinutes(),
				secs : parseInt(dueto[3]) - date.getSeconds()
			};

			if (r.secs < 0) {
				r.secs += 60;
				r.mins--;
			} if (r.mins < 0) {
				r.mins += 60;
				r.hrs--;
			} if (r.hrs < 0) {
				r.hrs += 24;
				r.days--;
			} if (r.days < 0) {
				let endOfTheMonth = [
						31, 28, 31, 30, 31, 30,
						31, 31, 30, 31, 30, 31
					][date.getMonth()];

				r.days = dueto[0] + endOfTheMonth - date.getDate();
				
				if (r.days < 0 || r.days > this.maxHoldDate) {
					t.innerHTML = 'DUE END';
					this.removeCard(t);
					return;
				}
			}

			let res = '';

			if (r.days == 0) {
				if (r.hrs != 0)
					res += ` ${r.hrs}H`;
				if (r.mins != 0)
					res += ` ${r.mins}M`;
				if (r.secs != 0)
					res += ` ${r.secs}S`;
			} else {
				res += ` ${r.days}D`;
				if (r.hrs != 0)
					res += ` ${r.hrs}H`;
				if (r.mins != 0)
					res += ` ${r.mins}M`;
			}
			
			if (t.innerHTML != res)
				t.innerHTML = res;
		});
	}

	removeCard(t) {
		let target = document.getElementById(t.getAttribute('cardid'));

		target.style.maxHeight = `${target.getBoundingClientRect().height}px`;
		target.style.transition = 'transform .5s ease-in, opacity .5s linear, margin .35s ease, max-height .35s ease';

		setTimeout(() => {
			target.style.opacity = '0';
			target.style.transform = 'translateX(100%)';
		}, 1000);

		setTimeout(() => {
			target.style.maxHeight = '0';
			target.style.margin = '0';
		}, 1500);
	}
}
new dueCheck();