const express = require("express")
const router = express.Router()
const Comments = require("../schemas/comment.js");

// 1. 댓글 목록 조회
//  - 조회하는 게시글에 작성된 모든 댓글을 목록 형식으로 볼 수 있도록 하기
//  - 작성 날짜 기준으로 내림차순 정렬하기
router.get("/posts/:_postId/comments", async (req, res) => {
    // params를 _postId로 저장
    const postId = Number(req.params._postId)
    // postId에 해당하는 comment 조회
    try {
        // commnetId, user, content, createdAt 데이터만 받도록 select
        const comments = await Comments.find({ postId })
            .select("commentId user content createdAt -_id");
        // 작성 날짜 기준으로 내림차순 정렬하기
        comments.sort((a, b) => b.createdAt - a.createdAt)
        // 200, 데이터 반환
        return res.status(200).json({ "data": comments })
    // params의 데이터 형식 오류 시 400, 데이터 형식 오류 메시지 반환
    } catch (error) {
        return res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." })
    }
})

// 2. 댓글 작성
router.post("/posts/:_postId/comments", async (req, res) => {
    // params를 postId에 저장
    const postId = Number(req.params._postId)
    // body값을 변수에 저장
    const { user, password, content } = req.body

    // 필수값인 content 중 없는 자료가 있는 경우
    if (!(content)) {
        // 400, 댓글 내용 입력 요청 메시지 반환
        return res.status(400).json({ message: "댓글 내용을 입력해주세요." })
    } else if (!(user && password)) {
        // 400, 데이터 형식 오류 메시지 반환
        return res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." })
    }

    // 가장 최근 부여된 commentId 검색
    let lastCommentId = await Comments.find({})
        .where('commentId')
        .sort({ commentId: -1 })
        .limit(1)
        .select("commentId")
    const commentId = lastCommentId.length ? lastCommentId[0]["commentId"] + 1 : 1

    // 작성시간 생성
    createdAt = new Date()

    // DB에 추가
    await Comments.create({ commentId, user, password, content, postId, createdAt })
    // 201, 게시글 생성 메시지 반환
    return res.status(201).json({ message: "게시글을 생성하였습니다." })
})

// 3. 댓글 수정
router.put("/posts/:_postId/comments", async (req, res) => {

})

// 4. 댓글 삭제
router.delete("/posts/:_postId/comments", async (req, res) => {

})

module.exports = router
