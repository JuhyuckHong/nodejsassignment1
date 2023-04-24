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

    await Posts.find({})
        .where("postId").equals(_postId)
        .select("-_id -__v -password").then((result) => {
            return res.status(200).json({ "data": result })
        }).catch((error) => {
            return res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." })
        })

})

// 4. 게시글 수정
router.put("/posts/:_postId", async (req, res) => {
    // 파라미터로 들어온 _postId를 필드 타입인 Number로 변환해서 저장하고,
    const _postId = Number(req.params._postId)
    // 수정 할 내용이 담긴 body에서, password와 title, contents를 받아와서
    const { password, title, content } = req.body

    try {
        // 게시글 내용을 DB에서 검색해서 result로 반환
        const result = await Posts.find({})
            .where("postId").equals(_postId)
            .select("-_id -__v -user")

        // 검색결과가 있는 경우 post에 저장
        if (result.length) {
            await Posts.updateOne({ postId: _postId }, { $set: { title, content, password } })
            return res.status(200).json({ message: "게시글을 수정하였습니다." })
            // 검색 결과가 없는 경우 400, 게시글 조회 실패 메시지 반환
        } else {
            return res.status(404).json({ message: "게시글 조회에 실패하였습니다." })
        }
        // 필드 타입 Number로 들어오지 않은 경우 400, 데이터 형식 오류 메시지 반환
    } catch (error) {
        return res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." })
    }
})

// 5. 게시글 삭제 
router.delete("/posts/:_postId", async (req, res) => {

})

module.exports = router
