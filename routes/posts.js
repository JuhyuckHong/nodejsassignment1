const express = require("express")
const router = express.Router()
const Posts = require("../schemas/post.js");

// 1. 전체 게시글 목록 조회
router.get("/posts", async (req, res) => {
    const posts = await Posts.find({});
    return res.status(200).json({ "data": posts })
})

// 2. 게시글 작성
router.post("/posts", async (req, res) => {

})

// 3. 게시글 상세 조회
router.get("/posts/:_postId", async (req, res) => {

})

// 4. 게시글 수정
router.put("/posts/:_postId", async (req, res) => {

})

// 5. 게시글 삭제 
router.delete("/posts/:_postId", async (req, res) => {

})

module.exports = router