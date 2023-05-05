const jwt = require("jsonwebtoken");
const Users = require("../schemas/users.js");

module.exports = async (req, res, next) => {
  try {
    // cookie에 저장된 JWT를 가져와서,
    const { authorization } = req.cookies;
    const [type, token] = authorization.split(" ");
    // 토큰 타입이 Bearer 타입이 아니라면,
    if (type !== "Bearer") {
      // 401 상태 코드와 에러메시지 반환
      return res.status(401).json({ errorMessage: "토큰 타입 불일치" });
    }
    // decode를 통해 verify하고, verify error시 catch로~
    const decodedToken = jwt.verify(token, "ghdwngur");
    const nickname = decodedToken.nickname;
    // 사용자 존재 여부 확인해서,
    const [user] = await Users.find({}).where("nickname").equals(nickname);
    // 사용자가 없다면
    if (!user) {
      // authorization 쿠키를 비우고
      res.clearCookie("authorization");
      // 401 상태 코드와 에러메시지 반환
      return res.status(401).json({ errorMessage: "토큰 사용자 없음" });
    }
    // res.locals에 user로 저장하고,
    res.locals.nickname = {nickname};
    // next()로 다음 작업으로 넘겨줌
    next();
    // 위 단계 중 뭐 하나 잘못되면
  } catch (error) {
    console.log({ error });
    // 비정상 요청으로 간주, 401 상태 코드와 에러메시지 반환
    return res.status(401).json({ errorMessage: "비정상 요청" });
  }
};
