const express = require("express")
const router = express.Router()
const Posts = require("../schemas/post.js");

// 1. 전체 게시글 목록 조회
router.get("/posts", async (req, res) => {
    const posts = await Posts.find({})
        .select("postId user title createdAt -_id");
    return res.status(200).json({ "data": posts })
})

// 2. 게시글 작성
router.post("/posts", async (req, res) => {
    const { user, password, title, content } = req.body

    if (!(user && password && title && content)) {
        return res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." })
    }

    let lastPostId = await Posts.find({})
        .where('postId')
        .sort({ postId: -1 })
        .limit(1)
        .select("postId")
    // console.log("test", lastPostId[0]["postId"])

    postId = lastPostId[0]["postId"] + 1
    createdAt = new Date()

    const createdPost = await Posts.create({
        user,
        password,
        title,
        content,
        postId,
        createdAt
    })
    // console.log("createdPost", createdPost)

    return res.status(200).json({ message: "게시글을 생성하였습니다." })

})

// 3. 게시글 상세 조회
router.get("/posts/:_postId", async (req, res) => {
    const { _postId } = req.params
    // console.log(_postId)
    const post = await Posts.find({})
        .where("postId").equals(_postId)
        .select("-_id -__v -password")

    // console.log(post)

    return res.status(200).json({ "data": post })

})

// 4. 게시글 수정
router.put("/posts/:_postId", async (req, res) => {

})

// 5. 게시글 삭제 
router.delete("/posts/:_postId", async (req, res) => {

})

module.exports = router
