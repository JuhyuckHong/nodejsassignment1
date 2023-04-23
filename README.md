#Node.js 연습을 위한 로그인 기능을 제외한 블로그 서버 API입니다.

##First Node.js Assignment: Building Blog Back-End Server with Node.js + Express + MongoDB without a Login Functionality

##서비스 목록
1. 전체 게시글 목록 조회 API
- 제목, 작성자명, 작성 날짜를 조회하기
- 작성 날짜 기준으로 내림차순 정렬하기
2. 게시글 작성 API
- 제목, 작성자명, 비밀번호, 작성 내용을 입력하기
3. 게시글 조회 API
- 제목, 작성자명, 작성 날짜, 작성 내용을 조회하기 
4. 게시글 수정 API
- API를 호출할 때 입력된 비밀번호를 비교하여 동일할 때만 글이 수정되게 하기
5. 게시글 삭제 API
- API를 호출할 때 입력된 비밀번호를 비교하여 동일할 때만 글이 삭제되게 하기
6. 댓글 목록 조회
- 조회하는 게시글에 작성된 모든 댓글을 목록 형식으로 볼 수 있도록 하기
- 작성 날짜 기준으로 내림차순 정렬하기
7. 댓글 작성
- 댓글 내용을 비워둔 채 댓글 작성 API를 호출하면 "댓글 내용을 입력해주세요" 라는 메세지를 return하기
- 댓글 내용을 입력하고 댓글 작성 API를 호출한 경우 작성한 댓글을 추가하기
8. 댓글 수정
- 댓글 내용을 비워둔 채 댓글 수정 API를 호출하면 "댓글 내용을 입력해주세요" 라는 메세지를 return하기
- 댓글 내용을 입력하고 댓글 수정 API를 호출한 경우 작성한 댓글을 수정하기
9. 댓글 삭제
- 원하는 댓글을 삭제하기
    
## 디렉토리 구조
.
├── app.js
├── routes
│   ├── index.js
│   ├── comments.js
│   └── posts.js
└── schemas
   ├── index.js
   ├── comment.js
   └── post.js

