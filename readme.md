# 이 프로젝트의 FrontEnd를 관리합니다.

# Hierarchy

- app : `express`의 정적 위치
    - stat : 자주 사용될 파일들의 정적 위치
        * card.css
        * layout.css
        * writing.js :
            + `dueCheck` : 마감시간 카운터
            + `editorManager` : 에디터 글자수 경고, 수정 메뉴(예정) 기능
        * library.js :
            + `threadContentHandler` : 글묶음 카드 본문 로드와 애니메이션
            + `threadLoadHandler` : 글묶음 카드 불러오기
        * text.js
            + 디버그용 모바일뷰/데스크탑뷰 전환 기능 (타이틀 클릭/엔터키 입력시 작동)
    - writing
        * index.html : '글쓰기'에 해당하는 페이지
    - library
        * index.html : '라이브러리'에 해당하는 페이지
    - newsfeed
        * index.html : '뉴스피드'에 해당하는 페이지

    * header.partial.html : 반복 사용되는 header 영역을 분리 시켜 놓은 html 파일
    * footer.partial.html : 반복 사용되는 footer 영역을 분리 시켜 놓은 html 파일
    * index.html : '홈'에 해당하는 페이지
- node_modules : Node.js 모듈
* index.js : Node.js 서버 실행시 시작 포인트

# Modules

- `express` : 매우 좋은 모듈.
- `mz` : `fs`를 포함한 node.js의 여러 기본 기능들을 더욱 유용하게 확장시켜주는 모듈.
- `supervisor` : 서버 파일에 변경사항이 있을 시, 자동으로 서버를 재부팅 시켜주는 모듈.
- `uglify-js` : 자바스크립트 압축 모듈 [자세히](https://github.com/mishoo/UglifyJS2)
- ~~babel : 아직 ECMAScript6 를 지원하지 않는 환경에서 ECMAScript6 Syntax를 사용 할 수 있게 해주는 모듈.~~

# Description
[자세히](https://github.com/Writing-Service/Design-Documents)

1. 서비스는 간단하게 다음과 같다.
    - 제시문이 작성되고 임의 사용자에게 전달된다.
    - 사용자는 제시문을 읽고 글을 쓴다. 글이 완성되면 제출한다.
    - 제출한 글은 글을 쓰기 원하는 임의 사용자에게 전달된다.
    - 다음 사용자는 이전 사용자의 글만 읽고 자신의 글을 완성한다.
    - 위 과정을 반복하여 하나의 글묶음이 완성된다.
    - 완성된 글은 모든 사용자의 라이브러리에 저장된다.
    - 이후 글 묶음에 대한 만족과 공감을 표시한다.

2. 위 서비스의 자세한 설명에 앞서 용어를 확실하게 정리하고 들어가겠다.
    - 제시문: 가장 처음 작성되는 글이다. 즉 글 묶음의 1번 글이다.
    - 글감: `motive` 사용자의 입장에서 받은 글을 의미한다.
    - 글 요청: `request` 사용자가 글감을 받고 싶을 때 사용하는 기능이다.
    - 글묶음: `thread` 7개의 글 묶음을 의미한다.
    - 라이브러리: `library` 사용자가 작성에 참여한 글묶음이 모이는 곳을 의미한다.
    - 만족도: `satisfy` 작성에 참여한 글묶음에 사용자가 만족을 표시한다. 이때 그 척도를 말한다.
    - 공감도: `rating` 과반수 이상이 만족한 글은 전체 공개된다. 이 글을 다른 사용자에게 공감 받을 수 있다. 이때 그 척도를 말한다.
  
3. 서비스의 궁극적인 목적은 무엇인가?
인간의 다양한 의견과 생각을 갖고 있다. 그리고 그것을 알아가는 일은 즐겁다. 이 철학을 널리 퍼트리고 싶다. 그러기 위해서는 다양한 생각을 보여줄 수 있어야 하며 자유롭게 자신의 생각을 말하는 공간이 제공되어야 한다. 이 서비스는 이 원리를 중심으로 기획되었다.

4. 글은 어떤 제한을 갖는가?
기본적으로 모든 글은 700자의 글자 수 제한을 갖는다. 이외에는 별다른 제한이 없다. 다만 신고기능이 존재해서 글 내용에 따라서 제제 당할 수 있다.

5. 제시문은 어떤 방법으로 작성되는가?
제시문은 두가지 종류가 있다. 먼저 서비스에서 제공되는 제시문과 사용자가 제공하는 제시문이다. 전자의 경우에는 도서나 영화 혹은 다양한 매체의 인용문을 전달하는 형식으로 제공될 것이며 후자의 경우에는 서식이 없이 자유롭다. 전자의 경우 서비스상에 존재하는 글 수를 조절하는 역할도 한다는 부분에 주의해야 한다. 후자의 경우 사용자는 3번 글묶음 작성에 참여하는 것으로 1번의 제시문 작성권을 얻을 수 있다.

6. 사용자는 글 감을 어떻게 받는가? 또한 사용자의 글 요청은 어떻게 제한되는가?
글 요청 버튼이 존재한다. 단 무분별한 글 요청을 방지하기 위해서 한번에 3개의 글만 받아볼 수 있다. (글을 받을 수 있는 최대 수는 3개이지만 신고로 인한 재작성이 필요하면 현재 작성 중인 글이 4개 이상일 수 있다.)

7. 글의 완성은 어떻게 판단하는가?
작성자는 글을 수령하고 3시간 이내에 자신의 글을 작성 완료해야 한다. 작성자는 글을 작성하고 3가지 선택권을 갖는다. 임시 저장, 작성 완료, 제출이다. 임시 저장은 글을 잠시 저장해 두는 것으로 제한 시간이 지나면 제출되지 않고 글은 삭제된다. 작성 완료는 임시 저장과 동일하게 선택 시 제출되지 않고 수정이 가능하지만 제한 시간이 지나면 제출된다. 다음으로 제출은 글이 제출되어 수정이 불가능하다.

8. 다음 사용자는 어떻게 결정되는가?
제출된 글은 서버 queue에 저장된다. 이후 임의 사용자가 글을 요청하면 전달된다. 이때 글의 변수를 고려해서 사용자에게 전달된다. 변수는 다음과 같다.

9. 글감의 정보는 어느정도 공개되는가?
글감 일 경우 오로지 글만 공개된다.

10. 참여한 미완성 글묶음의 정보는 어느정도 공개되는가?
글의 진행도, 실시간 작성 여부가 공개된다.

11. 받은 글에 대한 불만은 어떻게 표현할 것이며 어떻게 반영되는가?
신고 기능이 존재한다. 신고는 다양한 상황을 다룬다. 그 사항에 따라서 기회를 부여하고 다른 처방을 내린다.
    - 난해한 글: 2번의 기회를 더 준다. 맞으면 작성 기회를 한번 더 준다. 계속해서 반복한다.
    비속어 및 은어가 과한 글: 1번의 기회를 더 준다. 맞으면 작성 기회를 한번 더 준다. 또 같은 문제가 발생하면 글이 삭제된다.  
    - 미완성 글: 1번의 기회를 더 준다. 맞으면 작성 기회를 한번 더 준다. 또 같은 문제가 발생가면 글이 삭제 된다.
    - 혐오스러운 사상을 갖고 있는 글: 바로 검사한다. 맞으면 경고를 보낸다.
    - 광고 글: 바로 검사한다. 맞으면 계정을 차단한다.

12. 사용자는 라이브러리를 어떻게 관리하는가? 어느 정도의 관리를 허용할 것인가?
라이브러리에는 내가 작성에 참여한 글 묶음이 저장된다. 글 묶음에는 각 글의 작성자와 제출 시간 그리고 만족도와 존재한다면 공감도도 표시된다. 라이브러리는 정렬이 가능하고 자신의 라이브러리에서 삭제도 가능하다. 다만 삭제 하는 경우 데이터베이스의 모든 데이터가 삭제되는 것이 아니다. 삭제된 경우, 삭제한 사용자는 라이브러리에서 글이 보이지 않게 되며 다른 사용자는 글의 작성자가 ‘작자 미상’으로 표시된다.

13. 사용자 간의 상호작용은 얼마나 제공할 것인가?
사용자는 다른 사용자의 이메일만 볼 수 있다. 이외에 별다른 교류는 없다. 다른 사용자의 라이브러리를 보는 것은 추후에 다시 고려해보도록 한다.

14. 글 묶음에 대한 만족은 어떻게 표현하는가?
작성이 완료된 글 묶음에 대해서 작성에 참여한 사용자들끼리 만족도를 투표한다. 과반수(4표)가 넘는 글은 공개 게시판에 올라가게 된다.

15. 글 묶음에 대한 공감은 어떻게 표현하는가?
공개 게시판에 올라온 글은 모든 사용자가 볼 수 있으며 글에 대해 공감을 표시할 수 있다. 공감도에 따라 게시판에 오래 남아있도록 한다.