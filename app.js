const express = require('express');
const app = express();
const port = 3000;
const postsRouter = require("./routes/posts")
const connect = require("./schemas");

// mongoDB 연결
connect();

// 미들웨어 express 설정
app.use(express.json())
app.use("/", [postsRouter])

// 랜딩페이지
app.get('/', (req, res) => {
    res.send('test')
});

// 서버 실행
app.listen(port, () => {
    console.log(`Server is listening on port ${port} now.`);
});