const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const port = 3000;
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const usersRouter = require("./routes/users");
const connect = require("./schemas");

// mongoDB 연결
connect();

// 미들웨어 express 설정
app.use(cookieParser());
app.use(express.json());
app.use("/", [postsRouter, commentsRouter, usersRouter]);

// 랜딩페이지 눈부심 방지
app.get("/", (req, res) => {
  const fs = require("fs");

  const htmlFilePath = "index.html";

  fs.readFile(htmlFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const htmlString = data.toString();
    res.send(htmlString);
  });
});

// 서버 실행
app.listen(port, () => {
  console.log(`Server is listening on port ${port} now.`);
});
