const express = require("express")
const router = express.Router()
const Comments = require("../schemas/comment.js");

// 1. 댓글 목록 조회
router.get("/posts/:_postId/comments", async (req, res) => {

})

// 2. 댓글 작성
router.post("/posts/:_postId/comments", async (req, res) => {
    
})

// 3. 댓글 수정
router.put("/posts/:_postId/comments", async (req, res) => {
    
})

// 4. 댓글 삭제
router.delete("/posts/:_postId/comments", async (req, res) => {
    
})

module.exports = router
