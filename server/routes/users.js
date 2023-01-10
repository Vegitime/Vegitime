const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { Vegetable } = require("../models/Vegetable");
const { auth } = require("../middleware/auth");
const { generateResponse } = require("../utils/generateResponse");

router.get("/auth", auth, (req, res) => {
    return res.status(200).json(generateResponse(200, true, null, null, true));
});

router.post("/register", (req, res) => {
    const user = new User(req.body);
    user.save((err, doc) => {
        if (err) {
            return res.json(generateResponse(500, false, err));
        }

        return res.status(201).json(generateResponse(201, true));
    });
});

router.post("/duplication", (req, res) => {
    console.log('duplication')
    User.findOne({ id: req.body.id }, (err, doc) => {
        if (doc) return res.json(generateResponse(500, false));
        return res.status(200).json(generateResponse(200, true));
    });
});

router.post("/login", (req, res) => {
    User.findOne({ id: req.body.id }, (err, user) => {
        if (!user)
            return res.json(generateResponse(500, false, err));

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json(generateResponse(500, false, err));

            user.generateToken((err, user) => {
                if (err) return res.json(generateResponse(500, false, err));
                res.cookie("auth_token", user.token, {
                    maxAge: 1000 * 60 * 60 * 24 * 7, // 7d
                    httpOnly: true,
                    secure: true,
                  }).status(200).json(generateResponse(200, true, null, user._id));
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
        if (err) return res.json(generateResponse(500, false, err));

        res.clearCookie('auth_token');
        return res.status(200).json(generateResponse(200, true));
    });
});

router.get("/info", auth, (req, res) => {
    // user 고유 아이디로 vegis 배열 가져오기
    // 그 다음 가공해서 리턴
    Vegetable.find({ "ownerId": req.user._id })  // user의 고유 아이디를 갖는 야채 찾기
        .exec((err, info) => {
            if (err) return res.json(generateResponse(500, false, err));
            const data = {
                nickname: req.user.nickname,
                money: req.user.money,
                harvest: req.user.harvest
            }
            data.vegis = info.map(info => ({
                name: info.name,
                level: info.level,
                alarm: info.alarm,
                attendance: info.attendance
            }))
            res.status(200).json(generateResponse(200, true, null, null, null, data));
        })
});

module.exports = router;