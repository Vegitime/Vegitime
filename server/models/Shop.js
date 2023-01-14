const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  1: String,
  2: String,
  3: String,
  4: String,
  5: String,
});

const shopSchema = mongoose.Schema({
  type: String, // 야채 타입
  name: String, // 야채 이름
  purchasePrice: Number, // 야채 구매 가격
  sellingPrice: Number, // 야채 판매 가격
  description: String, // 야채 특징 설명
  image: imageSchema, // 레벨별 이미지
});

const Shop = mongoose.model('Shop', shopSchema);
module.exports = { Shop };
