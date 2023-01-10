const mongoose = require('mongoose');

const alarmSchema = new mongoose.Schema({
  time: String,
  hour: Number,
  minute: Number,
});

const vegetableSchema = mongoose.Schema({
  ownerId: {  // 소유자 고유 아이디
    type: String,
    required: true
  },
  name: String, 
  level: {
    type: Number,
    default: 1
  },
  alarm: {  // 설정된 알람
    type: alarmSchema,
    default: {
      time: "",
      hour: 0,
      minute: 0,
    }
  },
  attendance: {
    type: [Boolean],  // 참여 정보
    default: []
  }
}, { timestamps: true })

const Vegetable = mongoose.model('Vegetable', vegetableSchema)
module.exports = { Vegetable }