var target = [];

for (i = 1; document.getElementById('js--d-'+i) != undefined; i++) {
    target.push(document.getElementById('js--d-'+i));
}

//미완성 이벤트
window.setInterval( () => {
    let date = new Date();

    target.map(t => {
        let dueto = t.getAttribute('dueto').split(':'),
            remain = {
                dd :  dueto[0] - date.getDate(),
                hh : dueto[1] - date.getHours(),
                mm : dueto[2] - date.getMinutes(),
                ss : dueto[3] - date.getSeconds()
            };

        if (remain.ss < 0) {
            remain.ss += 60;
            remain.mm -= 1;
        }

        if (remain.mm < 0) {
            remain.mm += 60;
            remain.hh -= 1;
        }

        if (remain.hh < 0) {
            remain.hh += 24;
            remain.dd -= 1;
        }

        if (remain.dd < 0) {
            // 미완성 부분
        }

        let res = '';

        //console.log(remain);

        if (remain.dd < 0) {
            res = 'DUE END';

        } else if (remain.dd == remain.hh && remain.hh == 0) {
            if (remain.mm != 0)
                res += `${remain.mm}M`;

            if (remain.ss != 0)
                res += ` ${remain.ss}S`;

        } else {
            if (remain.dd != 0)
                res += `${remain.dd}D`;

            if (remain.hh != 0)
                res += ` ${remain.hh}H`;

            if (remain.mm != 0)
                res += ` ${remain.mm}M`;

        }

        if (t.innerHTML != res)
            t.innerHTML = res;
    });
},1000);