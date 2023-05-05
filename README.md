# Node.js 연습을 위한 로그인 기능을 제외한 블로그 서버 API입니다.
First Node.js Assignment: Building Blog Back-End Server with Node.js + Express + MongoDB without a Login Functionality

## 서비스 목록
1. 전체 게시글 목록 조회 API
	- [GET] /posts
	- 제목, 작성자명, 작성 날짜를 조회
	- 작성 날짜 기준으로 내림차순 정렬
2. 게시글 작성 API
	- [POST] /posts
	- 제목, 작성자명, 비밀번호, 작성 내용을 입력
3. 게시글 조회 API
	- [GET] /posts/:_postId
	- 제목, 작성자명, 작성 날짜, 작성 내용을 조회 
4. 게시글 수정 API
	- [PUT] /posts/:_postId
	- API를 호출할 때 입력된 비밀번호를 비교하여 동일할 때 글 수정
5. 게시글 삭제 API
	- [DELETE] /posts/:_postId
	- API를 호출할 때 입력된 비밀번호를 비교하여 동일할 때 글 삭제
6. 댓글 목록 조회
	- [GET] /posts/:_postId/comments
	- 조회하는 게시글에 작성된 모든 댓글을 목록 형식으로 조회
	- 작성 날짜 기준으로 내림차순 정렬
7. 댓글 작성
	- [POST] /posts/:_postId/comments
	- 댓글 내용을 입력하고 댓글 작성 API를 호출한 경우 작성한 댓글을 추가
8. 댓글 수정
	- [PUT] /posts/:_postId/comments/:_commentId
	- 댓글 내용을 입력하고 댓글 수정 API를 호출한 경우 작성한 댓글을 수정
9. 댓글 삭제
	- [DELETE] /posts/:_postId/comments/:_commentId
	- 원하는 댓글을 삭제하기
    
## 디렉토리 구조
	.
	├── app.js
	├── index.html
	├── routes
	│   ├── index.js
	│   ├── users.js
	│   ├── comments.js
	│   └── posts.js
	├── middlewares
	│   └── auth-middleware.js
	└── schemas
		├── index.js
		├── users.js
		├── comment.js
		└── post.js
