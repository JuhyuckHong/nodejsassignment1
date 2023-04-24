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
router.put("/posts/:_postId/comments/:_commentId", async (req, res) => {
    // 파라미터로 들어온 _postId를 필드 타입인 Number로 변환해서 저장하고,
    const _postId = Number(req.params._postId)
    const _commentId = Number(req.params._commentId)
    // 수정 할 내용이 담긴 body에서, password, contents를 받아와서
    const { password, content } = req.body

    // 필수값인 content를 입력받지 못한 경우
    if (!(content)) {
        // 400, 댓글 내용 입력 요청 메시지 반환
        return res.status(400).json({ message: "댓글 내용을 입력해주세요." })
    }

    try {
        // 코멘트 내용을 DB에서 검색해서 result로 반환
        const result = await Comments.find({})
            .where("commentId").equals(_commentId)
            .where("postId").equals(_postId)
        // 검색결과가 있는 경우,
        if (result.length) {
            // body내용으로 DB 업데이트하고,
            await Comments.updateOne({ commentId: _commentId }, { $set: { content, password } })
            // 201, 수정 완료 메시지 반환
            return res.status(201).json({ message: "댓글을 수정하였습니다." })
            // 검색 결과가 없는 경우 404, 댓글 조회 실패 메시지 반환
        } else {
            return res.status(404).json({ message: "댓글 조회에 실패하였습니다." })
        }
        // 필드 타입 Number로 들어오지 않은 경우 400, 데이터 형식 오류 메시지 반환
    } catch (error) {
        return res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." })
    }
})

// 4. 댓글 삭제
router.delete("/posts/:_postId/comments/:_commentId", async (req, res) => {
    // 파라미터로 들어온 _postId와 _commentId를 필드 타입인 Number로 변환해서 저장하고,
    const _postId = Number(req.params._postId)
    const _commentId = Number(req.params._commentId)
    // body에서, 삭제할 게시글의 password를 받아와서,
    const { password } = req.body

    try {
        // 게시글 내용을 DB에서 검색해서 result로 반환
        const result = await Comments.find({})
            .where("postId").equals(_postId)
            .where("commentId").equals(_commentId)
        // 검색결과가 있는 경우,
        if (result.length) {
            // DB에서 삭제 후,
            await Comments.deleteOne({ commentId: _commentId })
            // 200, 삭제 완료 메시지 반환
            return res.status(200).json({ message: "댓글을 삭제하였습니다." })
        // 검색 결과가 없는 경우 400, 게시글 조회 실패 메시지 반환
        } else {
            return res.status(404).json({ message: "댓글 조회에 실패하였습니다." })
        }
        // 필드 타입 Number로 들어오지 않은 경우 400, 데이터 형식 오류 메시지 반환
    } catch (error) {
        return res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." })
    }
})

module.exports = router
