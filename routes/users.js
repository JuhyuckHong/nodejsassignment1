const express = require("express");
const jwt = require("jsonwebtoken");
const Users = require("../schemas/users.js");
const router = express.Router();

// 회원 가입 API
router.post("/signup", async (req, res) => {
  // 닉네임, 비밀번호, 비밀번호 확인을 request에서 전달받기
  const { nickname, password, confirm } = req.body;
  try {
    // 닉네임은 최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)로 구성되었는지 확인
    const regex = /^[a-zA-Z0-9]+$/;
    if (nickname.length < 3 || !regex.test(nickname)) {
      return res
        .status(412)
        .json({ errorMessage: "닉네임의 형식이 일치하지 않습니다." });
    }
    // 비밀번호는 최소 4자 이상이며,
    if (password.length < 4) {
      return res
        .status(412)
        .json({ errorMessage: "패스워드 형식이 일치하지 않습니다." });
    }
    // 닉네임과 같은 값이 포함된 경우 회원가입에 실패로 만들기
    if (password.includes(nickname)) {
      return res
        .status(412)
        .json({ errorMessage: "패스워드에 닉네임이 포함되어 있습니다." });
    }
    // 비밀번호 확인은 비밀번호와 정확하게 일치하기
    if (password !== confirm) {
      return res
        .status(412)
        .json({ errorMessage: "패스워드가 일치하지 않습니다." });
    }
    // 데이터베이스에 존재하는 닉네임 중복등록 막기
    const [isExistNickname] = await Users.find({})
      .where("nickname")
      .equals(nickname);
    if (isExistNickname) {
      return res.status(412).json({ errorMessage: "중복된 닉네임입니다." });
    }
    // 조건 검토 끝 --------------------------------------------------------------------------
  } catch (error) {
    // 예외 케이스에서 처리하지 못한 에러
    console.log(error);
    return res
      .status(400)
      .json({ errorMessage: "요청한 데이터 형식이 올바르지 않습니다." });
  }
  // 회원 정보 테이블에 등록
  const user = await Users.create({ nickname, password });
  // 가입과 동시에 jwt 발행후 쿠키 전달
  const token = jwt.sign({ nickname: user.nickname }, "ghdwngur");
  res.cookie("authorization", `Bearer ${token}`);
  // 회원가입 완료 메세지와 201 상태 코드 전달
  return res.status(201).json({ message: "회원 가입에 성공하였습니다." });
});

// 로그인 API
router.post("/login", async (req, res) => {
  // 닉네임, 비밀번호를 request에서 전달받기
  const { nickname, password } = req.body;
  try {
    // 로그인 버튼을 누른 경우 닉네임과 비밀번호가 데이터베이스에 등록됐는지 확인한 뒤,
    const [user] = await Users.find({}).where("nickname").equals(nickname);
    // 하나라도 맞지 않는 정보가 있다면 에러메시지와 412 상태 코드 전달
    if (!user || password !== user.password) {
      return res
        .status(412)
        .json({ errorMessage: "닉네임 또는 패스워드를 확인해주세요." });
    } else {
      // 로그인 성공 시, 로그인에 성공한 유저의 정보를 JWT를 활용하여 클라이언트에게 Cookie로 전달하기
      const token = jwt.sign({ nickname: user.nickname }, "ghdwngur");
      res.cookie("authorization", `Bearer ${token}`);
      return res.status(200).json({ token });
    }
  } catch {
    // 예외 케이스에서 처리하지 못한 에러
    return res.status(400).json({ errorMessage: "로그인에 실패하였습니다." });
  }
});

module.exports = router;
