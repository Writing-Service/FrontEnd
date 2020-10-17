/**
 * This Script is using ECMA Script 6th Edition
 */

'use strict';


var card = {
        id: document.getElementsByClassName('js--card')[0].id
    };

    function getTimeKST(datetime) {
        datetime = datetime.split(' ');

        if (datetime[4] == 'KST') {
            // Day Month Date HH:MM:SS KST YYYY -> Day Month Date YYYY HH:MM:SS GMT+0900 (KST)
            datetime =  datetime[0] + ' ' + datetime[1] + ' ' + datetime[2] + ' ' + datetime[5] + ' ' + datetime[3] + ' GMT+0900 (KST)';
        } else {
            datetime = datetime.join(' ');
        }
        
        return Date.parse(datetime);
    }

    card.timer = document.querySelector(`#${card.id} .js--timer`);
    card.date = new Date(
        new Date(getTimeKST(document.querySelector('#' + card.id + ' .js--time').getAttribute('datetime')))
    );


function updateTimer(card) {
    let remainSecs = Math.round(((3 * 86400000) - Date.now() + card.date.getTime())/1000);

    if (remainSecs <= 0) {
        card.timer.innerHTML = 'DUE END';
        onDueEnd(card.id);

        return;
    }

    let timer = '';

    if (remainSecs >= 86400) {
        timer += Math.floor(remainSecs/86400) + 'D';
        remainSecs -= Math.floor(remainSecs/86400)*86400;

        if (remainSecs >= 3600) {
            timer += ' ' + Math.floor(remainSecs/3600) + 'H';
            remainSecs -= Math.floor(remainSecs/3600)*3600;
        }
        if (remainSecs >= 60) {
            timer += ' ' + Math.floor(remainSecs/60) + 'M';
        }
    } else {
        if (remainSecs >= 3600) {
            timer += Math.floor(remainSecs/3600) + 'H';
            remainSecs -= Math.floor(remainSecs/3600)*3600;
        }
        if (remainSecs >= 60) {
            timer += ' ' + Math.floor(remainSecs/60) + 'M';
            remainSecs -= Math.floor(remainSecs/60)*60;
        }
        if (remainSecs > 0) {
            timer += ' ' + remainSecs + 'S';
        }
    }
    
    if (card.timer.innerHTML != timer) {
        card.timer.innerHTML = timer;
    }
}

function onDueEnd(id){
    return;
}

window.setInterval(updateTimer(card), 1000);


var editor = {
    textarea: document.getElementById('js--em-editor'),
    types: document.getElementById('js--em-types')
}

function updateEditorTypes() {
    let types = editor.textarea.value.length;

    editor.types.innerHTML = types + '/700';
    
    if (types > 700) {
        editor.types.classList.add('types--warn');
    } else {
        editor.types.classList.remove('types--warn');
    }
}
updateEditorTypes();

editor.textarea.addEventListener('input', updateEditorTypes);