const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { Vegetable } = require("../models/Vegetable");
const { Shop } = require("../models/Shop");
const { auth } = require("../middleware/auth");
const { generateResponse } = require("../utils/generateResponse");
const axios = require('axios');

require('dotenv').config();

router.get("/", auth, (req, res) => {

  Vegetable.find({ "ownerId": req.user._id })  // user의 고유 아이디를 갖는 야채 찾기
      .exec((err, info) => {
          if (err) return res.json(generateResponse(500, false, err));
          const data = info.map(info => {
            const result = {
              id: info._id, // 야채의 고유 아이디
              name: info.name,
              level: info.level,
              alarm: info.alarm,
              attendance: info.attendance,
            }
            Shop.findOne({"name": info.name}).exec((err, shopInfo) => {
              if (err) return res.json(generateResponse(500, false, err));
              result.src = shopInfo.image[5]
            })
            return result;
          })
          res.status(200).json(generateResponse(200, true, null, null, null, data));
      })
});

router.get("/:vegetableId", (req, res) => {

  let { vegetableId } = req.params;
  console.log(vegetableId)
  Vegetable.findOne({ "_id": vegetableId })  // user의 고유 아이디를 갖는 야채 찾기
      .exec((err, info) => {
          if (err) return res.json(generateResponse(500, false, err));
          const data = {
            vegeId: info._id,
            name: info.name,
            level: info.level,
            alarm: info.alarm,
          }
          Shop.findOne({"name": info.name}).exec((err, shopInfo) => {
            if (err) return res.json(generateResponse(500, false, err));
            data.src = shopInfo.image[info.level];
            data.sellingPrice = shopInfo.sellingPrice;
          })
          res.status(200).json(generateResponse(200, true, null, null, null, data));
      })
});

router.patch("/:vegetableId/alarm", (req, res) => {

  let { vegetableId } = req.params;
  Vegetable.findOneAndUpdate({ _id: vegetableId }, { alarm: req.body.alarm }, (err, info) => {
      if (err) return res.json(generateResponse(500, false, err));
      return res.status(200).json(generateResponse(200, true));
  });
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
    }).then(response => {
      console.log(response.data)
      return response.data
    });
    
    console.log('sentiData : ', sentiData)

    Vegetable.findOne({ _id: vegetableId })
      .exec((err, info) => {
        if (err) return res.json(generateResponse(500, false, err));
        const data = {
          sentiment: ''
        }
        if (sentiData.document.sentiment == 'positive') {
          // attandance에 true 추가
          // level++
          data.sentiment = 'positive';
          Vegetable.update({ _id: vegetableId }, { $push: { attendance: true }, $inc: { level: 1}}).exec();
        }
        else if (sentiData.document.sentiment == 'negative') {
          // attandance에 false 추가
          data.sentiment = 'negative';
          Vegetable.update({ _id: vegetableId }, { $push: { attendance: false } }).exec();
        }
        else {
          // attandance에 true 추가
          data.sentiment = 'neutral';
          Vegetable.update({ _id: vegetableId }, { $push: { attendance: true }}).exec();
        }
        Shop.findOne({"name": info.name}).exec((err, shopInfo) => {
          if (err) return res.json(generateResponse(500, false, err));
          data.src = shopInfo.image[info.level];
          data.sellingPrice = shopInfo.sellingPrice;
        })
        res.status(200).json(generateResponse(200, true, null, null, null, data));
    });
  }
  catch(err) {
    console.log('err : ',err)
    return res.json(generateResponse(500, false, err));
  }
});

router.delete("/:vegetableId/sale", auth, (req, res) => {

  let { vegetableId } = req.params;
  User.findOne({ _id: req.user._id })
    .exec((err, info) => {
      if (err) return res.json(generateResponse(500, false, err));
      Vegetable.findOne({ _id: vegetableId })
        .exec((err, info) => {
          if (err) return res.json(generateResponse(500, false, err));
          console.log('info : ', info)
          Shop.findOne({ name: info.name })
            .exec((err, info) => {
              if (err) return res.json(generateResponse(500, false, err));
              console.log('info.sellingPrice : ', info.sellingPrice)
              User.update({ _id: req.user._id }, {$inc: { harvest: 1, money: info.sellingPrice}}).exec();
            
              Vegetable.findOneAndDelete({ _id: vegetableId })
                .exec((err, info) => {
                  if (err) return res.json(generateResponse(500, false, err));
                })
            })
        })
    })


  return res.status(200).json(generateResponse(200, true));
});

module.exports = router;