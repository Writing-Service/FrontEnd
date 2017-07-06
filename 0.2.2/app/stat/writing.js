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
		let written_motives = this.createPrimaryBtn.getAttribute('value');

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
		this.list = new Array();
        this.maxHoldDate = 3;

		this.render = this.render.bind(this);
		this.update = this.update.bind(this);

		let that = this;
		window.setInterval(that.update, 1000);

		this.render();
	}

	// 새로 글 받아오면 renderTargets함수를 실행시켜줄 것.
	render() {
		let cards = document.getElementsByClassName('js--card'),
            list = new Array();

        [].map.call(cards, function(card) {
            list.push(
                {
                    id: card.id,
                    date: new Date(document.querySelector(`#${card.id} .js--time`).getAttribute('datetime')),
                    timer: document.querySelector(`#${card.id} .js--timer`)
                }
            );
        });

        this.list = list;
	}

	update() {
		let date = new Date(),
            that = this;

		this.list.map(function(obj) {
            // day = 24 * 60 * 60 * 1000 milisecs
			let remainSecs = Math.round(((that.maxHoldDate * 86400000) - date.getTime() + obj.date.getTime())/1000);

            if (remainSecs <= 0) {
                obj.timer.innerHTML = 'DUE END';
                    
                that.removeCardEl(obj.id);
                return;
			}

			let timer = '';

			if (remainSecs >= 86400) {
				timer += `${Math.floor(remainSecs/86400)}D`;
                remainSecs -= Math.floor(remainSecs/86400)*86400;

				if (remainSecs >= 3600) {
					timer += ` ${Math.floor(remainSecs/3600)}H`;
                    remainSecs -= Math.floor(remainSecs/3600)*3600;
				}
                if (remainSecs >= 60) {
					timer += ` ${Math.floor(remainSecs/60)}M`;
                }
			} else {
				if (remainSecs >= 3600) {
					timer += ` ${Math.floor(remainSecs/3600)}H`;
                    remainSecs -= Math.floor(remainSecs/3600)*3600;
				}
                if (remainSecs >= 60) {
					timer += ` ${Math.floor(remainSecs/60)}M`;
                    remainSecs -= Math.floor(remainSecs/60)*60;
                }
                if (remainSecs > 0) {
					timer += ` ${remainSecs}S`;
                }
			}
			
			if (obj.timer.innerHTML != timer) {
				obj.timer.innerHTML = timer;
            }
		});
	}

	removeCardEl(id) {
		let target = document.getElementById(id);

        target.addEventListener('click', () => {
            target.style.maxHeight = `${target.getBoundingClientRect().height}px`;
            target.style.transition = 'transform .5s ease-in, opacity .5s linear, margin .35s ease, max-height .35s ease';

            target.style.opacity = '0';
            target.style.transform = 'translateX(100%)';

            setTimeout(() => {
                target.style.maxHeight = '0';
                target.style.margin = '0';
            }, 500);
        });
	}
}
new dueCheck();