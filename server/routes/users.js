const express = require('express');

const router = express.Router();
const { User } = require('../models/User');
const { Vegetable } = require('../models/Vegetable');
const { auth } = require('../middleware/auth');
const { generateResponse } = require('../utils/generateResponse');

router.get('/auth', auth, (req, res) => {
  return res.status(200).json({ isAuth: true });
});

router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    return res.status(201).json(generateResponse(201, true));
  } catch (err) {
    return res.json(generateResponse(500, false, err));
  }
});

router.post('/duplication', async (req, res) => {
  try {
    const userData = await User.findOne({ id: req.body.id }).exec();
    if (userData) return res.json(generateResponse(500, false));
    return res.status(200).json(generateResponse(200, true));
  } catch (err) {
    return res.json(generateResponse(500, false, err));
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ id: req.body.id }).exec();
    if (!userData) return res.json(generateResponse(500, false));

    userData.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) return res.json(generateResponse(500, false, err));
      userData.generateToken((err, user) => {
        if (err) return res.json(generateResponse(500, false, err));
        res
          .cookie('auth_token', user.token, {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7d
            httpOnly: true,
            secure: true,
          })
          .status(200)
          .json(generateResponse(200, true, null, user._id));
      });
    });
  } catch (err) {
    return res.json(generateResponse(500, false, err));
  }
});

router.get('/logout', auth, async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.user._id }, { token: '' }).exec();
    res.clearCookie('auth_token');
    return res.status(200).json(generateResponse(200, true));
  } catch (err) {
    return res.json(generateResponse(500, false, err));
  }
});

router.get('/info', auth, async (req, res) => {
  try {
    const vegetableData = await Vegetable.find({
      ownerId: req.user._id,
    }).exec();
    const data = {
      nickname: req.user.nickname,
      money: req.user.money,
      harvest: req.user.harvest,
    };
    data.vegis = vegetableData.map((res) => ({
      id: res._id,
      type: res.type,
      name: res.name,
      level: res.level,
      alarm: res.alarm,
      attendance: res.attendance,
    }));
    res.status(200).json(generateResponse(200, true, null, null, null, data));
  } catch (err) {
    return res.json(generateResponse(500, false, err));
  }
});

module.exports = router;
