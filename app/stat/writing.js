'use strict';

class editorManager {
	constructor() {
		this.types = document.querySelector('.js--em-types'),
		this.maxTypes = 700;
		this.editor = document.querySelector('.js--em-editor'),
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

		this.date = new Date();

		this.renderTargets = this.renderTargets.bind(this);
		this.update = this.update.bind(this);

		let that = this;
		window.setInterval(that.update, that.updateCycle);

		this.renderTargets();
	}

	// 새로 글 받아오면 renderTargets함수를 실행시켜줄 것.
	renderTargets() {
		let t = document.getElementById(`js--dc-${this.lastTarget}`);

		for(let i = this.lastTarget; t != undefined; i++) {
			this.targetNodes.push(t);
			t = document.getElementById(`js--dc-${i + 1}`);
		}
	}

	update() {
		let i = 0;
		this.targetNodes.map( t => {
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
		});
	}
}

new dueCheck();