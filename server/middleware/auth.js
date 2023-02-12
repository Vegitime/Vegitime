const { User } = require('../models/User');
const { generateResponse } = require('../utils/generateResponse');

const auth = (req, res, next) => {
  // 인증 처리를 하는 곳
  // 클라이언트 쿠키에서 토큰을 가져온다.
  const token = req.cookies.auth_token;
  User.findByToken(token, (err, user) => {
    if (err) return res.json(generateResponse(500, false, err));
    if (!user) return res.json(generateResponse(500, false, null, null, false)); // 유저 못찾으면 리턴

    req.user = user;
    next();
  });
};

module.exports = { auth };
