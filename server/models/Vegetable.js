const mongoose = require('mongoose');

const vegetableSchema = mongoose.Schema({
  owner: {  // 소유자 고유 아이디
    type: String,
    required: true
  },
  vegetableFrom: {
    type: Schema.Types.ObjectId,  // shop의 ObjectId를 갖고 있으면 Vegetable의 모든 정보를 갖고올 수 있음
    ref: 'User' // ref로 Vegetable모델 지정
  },
  level: {
    type: Number,
    default: 1
  },
  exp: {  // 경험치
    type: Number,
    default: 0
  },
  alarm: Number | null, // 설정된 알람
})

const Vegetable = mongoose.model('Vegetable', vegetableSchema)
module.exports = { Vegetable }