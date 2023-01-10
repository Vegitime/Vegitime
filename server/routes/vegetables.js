const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { Vegetable } = require("../models/Vegetable");
const { Shop } = require("../models/Shop");
const { auth } = require("../middleware/auth");
const { generateResponse } = require("../utils/generateResponse");
const axios = require('axios');

require('dotenv').config();

router.get("/", auth, async (req, res) => {
  try {
    const vegetableArr = await Vegetable.find({ "ownerId": req.user._id }).exec()
    const data = await Promise.all(vegetableArr.map(async res => {
      const shopData = await Shop.findOne({"name": res.name}).exec()
      return {
        vegeId: res._id, // 야채의 고유 아이디
        name: res.name,
        level: res.level,
        alarm: res.alarm,
        attendance: res.attendance,
        src: shopData.image[5]
      }
    }))   
    res.status(200).json(generateResponse(200, true, null, null, null, data));
  }
  catch(err) {
    return res.json(generateResponse(500, false, err));
  }
});

router.get("/:vegetableId", async (req, res) => {
  try {
    const { vegetableId } = req.params;
    const vegetableData = await Vegetable.findOne({ "_id": vegetableId }).exec()
    const shopData = await Shop.findOne({"name": vegetableData.name}).exec();
    const data = {
      vegeId: vegetableData._id,
      name: vegetableData.name,
      level: vegetableData.level,
      alarm: vegetableData.alarm,
      src: shopData.image[vegetableData.level],
      sellingPrice: shopData.sellingPrice
    }
    return res.status(200).json(generateResponse(200, true, null, null, null, data));
  }
  catch(err) {
    return res.json(generateResponse(500, false, err));
  }
});

router.patch("/:vegetableId/alarm", async (req, res) => {
  try {
    const { vegetableId } = req.params;
    await Vegetable.findOneAndUpdate({ _id: vegetableId }, { alarm: req.body.alarm }).exec();
    return res.status(200).json(generateResponse(200, true));
  }
  catch(err) {
    return res.json(generateResponse(500, false, err));
  }
});

router.patch("/:vegetableId/praise", async (req, res) => {
  try {
    const { vegetableId } = req.params;
    const sentiData = await axios.post("https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze", {
      "content": req.body.content
    }, {
      headers: {
        "X-NCP-APIGW-API-KEY-ID": process.env.SENTI_KEY_ID,
        "X-NCP-APIGW-API-KEY": process.env.SENTI_KEY,
        "Content-Type": "application/json"
      }
    }).then(response => response.data);
    
    const vegetableData = await Vegetable.findOne({ _id: vegetableId }).exec();
    const data = {
      sentiment: ''
    }
    console.log(sentiData.document)
    if (sentiData.document.sentiment == 'positive') {
      // attandance에 true 추가
      // level++
      data.sentiment = 'positive';
      await Vegetable.update({ _id: vegetableId }, { $push: { attendance: true }, $inc: { level: 1}}).exec();
    }
    else if (sentiData.document.sentiment == 'negative') {
      // attandance에 false 추가
      data.sentiment = 'negative';
      await Vegetable.update({ _id: vegetableId }, { $push: { attendance: false } }).exec();
    }
    else {
      // attandance에 true 추가
      data.sentiment = 'neutral';
      await Vegetable.update({ _id: vegetableId }, { $push: { attendance: true }}).exec();
    }
    const shopData = await Shop.findOne({"name": vegetableData.name}).exec();
    data.src = shopData.image[vegetableData.level + 1];
    data.sellingPrice = shopData.sellingPrice;

    return res.status(200).json(generateResponse(200, true, null, null, null, data));
  }
  catch(err) {
    return res.json(generateResponse(500, false, err));
  }
});

router.delete("/:vegetableId/sale", auth, async (req, res) => {
  try {
    let { vegetableId } = req.params;
    const vegetableData = await Vegetable.findOne({ _id: vegetableId }).exec();
    const shopData = await Shop.findOne({ name: vegetableData.name }).exec();
    await User.update({ _id: req.user._id }, {$inc: { harvest: 1, money: shopData.sellingPrice}}).exec();
    await Vegetable.findOneAndDelete({ _id: vegetableId }).exec();

    return res.status(200).json(generateResponse(200, true));
  }
  catch(err) {
    return res.json(generateResponse(500, false, err));
  }
});

module.exports = router;