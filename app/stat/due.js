var target = [];

for (i = 1; document.getElementById('js--d-'+i) != undefined; i++) {
    target.push(document.getElementById('js--d-'+i));
}

//미완성 이벤트
window.setInterval(function(){
    let date = new Date();

    target.map(function(t){
        let due = t.getAttribute('dueto').split(':'),
            timer = [
                due[0] - date.getDate(),
                due[1] - date.getHours(),
                due[2] - date.getMinutes()
            ];
        t.innerHTML = `${timer[0]}D ${timer[1]}H ${timer[2]}M`;
    });
},1000);