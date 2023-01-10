const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
require('dotenv').config();
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    trim: true,
  },
  nickname: {
    type: String,
    required: true,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  money:{
    type: Number,
    default: 10000,
  },
  harvest:{
    type: Number,
    default: 0,
  },
  token: {
    type: String,
    default: "",
  }
})

// user모델에 유저 정보를 저장하기 전에 콜백함수 실행
userSchema.pre('save', function(next) {
  const user = this
  // 모델 안의 필드 중에 password가 변환될 때만 암호화한다.
  if (user.isModified('password')) {
    // 비밀번호를 암호화
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) return next(err)
      // 첫번재 인자로 입력한 비번(plain password), 두번째 인자로 salt, 세번째 인자로 콜백함수
      bcrypt.hash(user.password, salt, function(err, hash) {  // hash가 암호화된 비밀번호
        if (err) return next(err)
        user.password = hash  // user 패스워드를 hash로 교체
        next()
      })
    })
  }
  else {
    next()  
  }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
  const user = this
  // plainPassword와 암호화된 비밀번호 비교
  bcrypt.compare(plainPassword, user.password, function(err, isMatch) {
    if (err) return cb(err) // 에러나면 에러만
    cb(null, isMatch)       // isMatch에 일치하는지 유무를 보내줌
  })
}

userSchema.methods.generateToken = function(cb) {
  const user = this;
  // user._id + JWT_SECRET_KEY해서 token을 만들음
  // 나중에 토큰을 해석할 때, 'JWT_SECRET_KEY'을 넣으면 user._id가 나옴
  // 그래서 토큰을 가지고 이사람이 누구인지 알 수 있음
  const token = jwt.sign(user._id.toHexString(), process.env.JWT_SECRET_KEY) // 토큰 생성
  user.token = token;
  user.save(function(err, user) {
    if (err) return cb(err)
    cb(null, user)
  })
}

userSchema.statics.findByToken = function( token, cb ){
  var user = this;

  // 토큰을 decode 한다
  jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decoded){  // decoded === 디코드된 userId
      // 유저 아이디를 이용해서 유저를 찾은 다음에 
      // 클라이언트에서 가져온 token과 데이터베이스에 보관된 token이 일치하는지 확인
      user.findOne({"_id": decoded, "token": token}, function(err, user){

          if(err) return cb(err);
          cb(null, user);
      });
  });
};

const User = mongoose.model('User', userSchema)
module.exports = { User }