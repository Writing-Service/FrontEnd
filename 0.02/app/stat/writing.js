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
		this.lastTarget = 1;
		this.updateCycle = 1000;

		this.renderTargets = this.renderTargets.bind(this);
		this.update = this.update.bind(this);

		let that = this;
		window.setInterval(that.update, that.updateCycle);

		this.renderTargets();
	}

	// 새로 글 받아오면 renderTargets함수를 실행시켜줄 것.
	renderTargets() {
		this.targetNodes = document.querySelectorAll('.js--dc-timer');
	}

	update() {
		this.date = new Date();
		for (let i = 0; i < this.targetNodes.length; i++) {
			let t = this.targetNodes[i];

			let dueto = t.getAttribute('dueto').split(':'),
				remain = {
					d :  dueto[0] - this.date.getDate(),
					h : dueto[1] - this.date.getHours(),
					m : dueto[2] - this.date.getMinutes(),
					s : dueto[3] - this.date.getSeconds()
				},
				res = '';

			if (remain.s < 0) {
				remain.s += 60;
				remain.m--;
			}

			if (remain.m < 0) {
				remain.m += 60;
				remain.h--;
			}

			if (remain.h < 0) {
				remain.h += 24;
				remain.d--;
			}

			if (remain.d < 0) {
				// 두 달에 걸쳐 있는 경우 만들어야함

				res = 'DUE END';
				let tp = t.parentNode.parentNode.parentNode;
				tp.style.transition = 'opacity 1s ease';
				tp.style.opacity = '.5';
			} else if (remain.d == 0 && remain.h == 0) {
				// 마감이 한 시간 채 안남은 경우 부터는 분과 초만 표시함
				if (remain.m != 0)
					res += `${remain.m}M`;

				if (remain.s != 0)
					res += ` ${remain.s}S`;

			} else {
				if (remain.d != 0)
					res += `${remain.d}D`;

				if (remain.h != 0)
					res += ` ${remain.h}H`;

				if (remain.m != 0)
					res += ` ${remain.m}M`;

			}

			if (t.innerHTML != res)
				t.innerHTML = res;
		}
	}
}
new dueCheck();