const express = require('express');
const app = express();
const port = 3000;
const postsRouter = require("./routes/posts")
const commentsRouter = require("./routes/comments")
const connect = require("./schemas");

// mongoDB 연결
connect();

// 미들웨어 express 설정
app.use(express.json())
app.use("/", [postsRouter, commentsRouter])

// 랜딩페이지 눈부심 방지
app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
    <html>
    <head>
        <title>My Page</title>
    </head>
    <body style="background-color: black; color: white;">
        <h1>Node 입문주차 과제</h1>
        <small> 홍주혁 파트타임1기</small>
    </body>
    </html>`)
});

// 서버 실행
app.listen(port, () => {
    console.log(`Server is listening on port ${port} now.`);
});