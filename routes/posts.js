const express = require("express")
const router = express.Router()
const Posts = require("../schemas/post.js");

// 1. 전체 게시글 목록 조회
// - 제목, 작성자명, 작성 날짜를 조회하기
// - 작성 날짜 기준으로 내림차순 정렬하기
router.get("/posts", async (req, res) => {
    // 전체 게시글 중에 postId, user, title, createdAt 만 추출
    const posts = await Posts.find({})
        .select("postId user title createdAt -_id");
    // 작성 날짜 기준으로 내림차순 정렬하기
    posts.sort((a, b) => b.createdAt - a.createdAt)
    // 200, 데이터 반환
    return res.status(200).json({ "data": posts })
})

// 2. 게시글 작성
router.post("/posts", async (req, res) => {
    // body값을 변수에 저장
    const { user, password, title, content } = req.body

    // 필수값인 user, password, title, content 중 없는 자료가 있는 경우
    if (!(user && password && title && content)) {
        // 400, 데이터 형식 오류 메시지 반환
        return res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." })
    }
    // 가장 최근 부여된 postId 검색
    let lastPostId = await Posts.find({})
        .where('postId')
        .sort({ postId: -1 })
        .limit(1)
        .select("postId")
    postId = lastPostId[0]["postId"] + 1

    // 작성시간 생성
    createdAt = new Date()

    // DB에 추가
    await Posts.create({ user, password, title, content, postId, createdAt })
    // 201, 게시글 생성 메시지 반환
    return res.status(201).json({ message: "게시글을 생성하였습니다." })
})

// 3. 게시글 상세 조회
router.get("/posts/:_postId", async (req, res) => {
    // params를 _postI로 저장
    const { _postId } = req.params

    // postId가 _postId같은 경우, _id, __v, password를 뺀 데이터를 반환
    await Posts.find({})
        .where("postId").equals(_postId)
        .select("-_id -__v -password").then((result) => {
            // 찾은 경우 200, 데이터 반환
            return res.status(200).json({ "data": result })
            // postId 필드 타입과 다른 경우 400, 데이터 형식 오류 메시지 반환
        }).catch((error) => {
            return res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." })
        })
})

// 4. 게시글 수정
// - API를 호출할 때 입력된 비밀번호를 비교하여 동일할 때만 글이 수정되게 하기
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

        // 검색결과가 있는 경우,
        if (result.length) {

            if (password === result[0].password) {
                // body내용으로 DB 업데이트하고,
                await Posts.updateOne({ postId: _postId }, { $set: { title, content, password } })
                // 201, 수정 완료 메시지 반환
                return res.status(201).json({ message: "게시글을 수정하였습니다." })
            } else {
                return res.status(401).json({ message: "수정 권한이 없습니다." })
            }
            // 검색 결과가 없는 경우 404, 게시글 조회 실패 메시지 반환
        } else {
            return res.status(404).json({ message: "게시글 조회에 실패하였습니다." })
        }
        // 필드 타입 Number로 들어오지 않은 경우 400, 데이터 형식 오류 메시지 반환
    } catch (error) {
        return res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." })
    }
})

// 5. 게시글 삭제 
// -API를 호출할 때 입력된 비밀번호를 비교하여 동일할 때만 글이 삭제되게 하기
router.delete("/posts/:_postId", async (req, res) => {
    // 파라미터로 들어온 _postId를 필드 타입인 Number로 변환해서 저장하고,
    const _postId = Number(req.params._postId)
    // body에서, 삭제할 게시글의 password를 받아와서,
    const { password } = req.body

    try {
        // 게시글 내용을 DB에서 검색해서 result로 반환
        const result = await Posts.find({})
            .where("postId").equals(_postId)
        // 검색결과가 있는 경우,
        if (result.length) {
            if (password === result[0].password) {
                // DB에서 삭제 후,
                await Posts.deleteOne({ postId: _postId })
                // 200, 삭제 완료 메시지 반환
                return res.status(200).json({ message: "게시글을 삭제하였습니다." })
                // 검색 결과가 없는 경우 400, 게시글 조회 실패 메시지 반환
            } else {
                return res.status(401).json({ message: "삭제 권한이 없습니다." })
            }
        } else {
            return res.status(404).json({ message: "게시글 조회에 실패하였습니다." })
        }
        // 필드 타입 Number로 들어오지 않은 경우 400, 데이터 형식 오류 메시지 반환
    } catch (error) {
        return res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." })
    }
})

module.exports = router
