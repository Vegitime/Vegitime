const express = require('express');

const router = express.Router();
const axios = require('axios');
const schedule = require('node-schedule');
const webpush = require('web-push');
const { User } = require('../models/User');
const { Vegetable } = require('../models/Vegetable');
const { Shop } = require('../models/Shop');
const { auth } = require('../middleware/auth');
const { generateResponse } = require('../utils/generateResponse');

require('dotenv').config();

const store = { data: [] };

router.get('/', auth, async (req, res) => {
  try {
    const vegetableArr = await Vegetable.find({ ownerId: req.user._id }).exec();
    const data = await Promise.all(
      vegetableArr.map(async (res) => {
        const shopData = await Shop.findOne({ name: res.name }).exec();
        return {
          vegeId: res._id, // 야채의 고유 아이디
          name: res.name,
          level: res.level,
          alarm: res.alarm,
          attendance: res.attendance,
          type: shopData.type,
          src: shopData.image[5],
        };
      })
    );
    res.status(200).json(generateResponse(200, true, null, null, null, data));
  } catch (err) {
    return res.json(generateResponse(500, false, err));
  }
});

router.get('/:vegetableId', async (req, res) => {
  try {
    const { vegetableId } = req.params;
    const vegetableData = await Vegetable.findOne({ _id: vegetableId }).exec();
    const shopData = await Shop.findOne({ name: vegetableData.name }).exec();
    const data = {
      vegeId: vegetableData._id,
      type: vegetableData.type,
      name: vegetableData.name,
      level: vegetableData.level,
      alarm: vegetableData.alarm,
      isCompleted: vegetableData.isCompleted,
      src: shopData.image[vegetableData.level],
      sellingPrice: shopData.sellingPrice,
    };
    return res
      .status(200)
      .json(generateResponse(200, true, null, null, null, data));
  } catch (err) {
    return res.json(generateResponse(500, false, err));
  }
});

router.patch('/:vegetableId/alarm', async (req, res) => {
  try {
    const { vegetableId } = req.params;
    const { ampm, hour, minute, subscription } = req.body;
    if (store.data[vegetableId] && store.data[vegetableId].cancel) {
      store.data[vegetableId].cancel();
    }

    if (ampm === '') {
      // 삭제
      store.data[vegetableId] = null;
    } else {
      let hour24;
      if (hour === 12) hour24 = ampm === 'AM' ? 0 : hour;
      else hour24 = ampm === 'PM' ? hour + 12 : hour;

      const utcHour = (hour24 - 9 + 24) % 24;
      const rule = new schedule.RecurrenceRule();
      rule.hour = utcHour;
      rule.minute = minute;
      rule.tz = 'Etc/UTC';

      store.data[vegetableId] = schedule.scheduleJob(rule, async () => {
        const messageData = {
          title: '야채타임',
          body: '칭찬해줘',
          link: `${process.env.URL}/myvegi/${vegetableId}`,
        };
        webpush
          .sendNotification(subscription, JSON.stringify(messageData))
          .then((pushServiceRes) => res.status(pushServiceRes.statusCode).end())
          .catch((error) => {
            if (error && error.statusCode) {
              res.status(error.statusCode).end();
            } else {
              res.status(500).end();
            }
          });
      });
    }
    await Vegetable.findOneAndUpdate(
      { _id: vegetableId },
      { alarm: { ampm, hour, minute } }
    ).exec();
    return res.status(200).json(generateResponse(200, true));
  } catch (err) {
    return res.json(generateResponse(500, false, err));
  }
});

router.patch('/:vegetableId/praise', async (req, res) => {
  try {
    const { vegetableId } = req.params;
    const sentiData = await axios
      .post(
        'https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze',
        {
          content: req.body.content,
        },
        {
          headers: {
            'X-NCP-APIGW-API-KEY-ID': process.env.SENTI_KEY_ID,
            'X-NCP-APIGW-API-KEY': process.env.SENTI_KEY,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => response.data);

    const vegetableData = await Vegetable.findOne({ _id: vegetableId }).exec();
    const data = {
      sentiment: '',
    };
    if (
      sentiData.document.sentiment === 'positive' ||
      sentiData.document.sentiment === 'neutral'
    ) {
      // attandance에 true 추가
      // level++
      data.sentiment = 'positive';
      await Vegetable.update(
        { _id: vegetableId },
        { $push: { attendance: true }, $inc: { level: 1 } }
      ).exec();
    } else if (sentiData.document.sentiment === 'negative') {
      // attandance에 false 추가
      data.sentiment = 'negative';
      await Vegetable.update(
        { _id: vegetableId },
        { $push: { attendance: false } }
      ).exec();
    }
    await Vegetable.update({ _id: vegetableId }, { isCompleted: true }).exec();
    const shopData = await Shop.findOne({ name: vegetableData.name }).exec();
    data.src = shopData.image[vegetableData.level + 1];
    data.sellingPrice = shopData.sellingPrice;

    return res
      .status(200)
      .json(generateResponse(200, true, null, null, null, data));
  } catch (err) {
    return res.json(generateResponse(500, false, err));
  }
});

router.delete('/:vegetableId/sale', auth, async (req, res) => {
  try {
    const { vegetableId } = req.params;
    const vegetableData = await Vegetable.findOne({ _id: vegetableId }).exec();
    const shopData = await Shop.findOne({ name: vegetableData.name }).exec();
    await User.update(
      { _id: req.user._id },
      { $inc: { harvest: 1, money: shopData.sellingPrice } }
    ).exec();
    await Vegetable.findOneAndDelete({ _id: vegetableId }).exec();

    return res.status(200).json(generateResponse(200, true));
  } catch (err) {
    return res.json(generateResponse(500, false, err));
  }
});

module.exports = router;
