// https://material.io/guidelines/style/color.html#color-color-palette
// 에서 SASS용 색 리스트를 추출하기 위해 임의로 작성한 코드.
// 개발자 도구 콘솔에 복붙해서 사용하면 됨.

var cgl = document.querySelectorAll('.color-group > ul > li > span'),
    name,
    result = '';

for (var i = 0; i < cgl.length; i++) {
    let val = cgl[i].innerHTML,
        cl = cgl[i].classList;

    if ('name' == cl[0]) {
        result += '\n';
        name = val.replace(' ', '_')
                  .toLowerCase();

        // 색상 마다 나오는 500번 색상이 중복 작성되는 것을 처리.
        i += 2;
        continue;
    }
    if('shade' == cl[0]) {
        if (val == 'Black' || val == 'White') {
            result += '\n';
            name = '';
            val = val.toLowerCase();
        }
        result += `$${name}${val}: `;
        continue;
    }
    if('hex' == cl[0]) {
        result += `${val};\n`;
        continue;
    }
    console.log('failed:', cgl);
}
console.log(result);