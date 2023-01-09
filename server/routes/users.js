const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");
const { generateResponse } = require("../utils/generateResponse");

router.get("/auth", auth, (req, res) => {
    return res.status(200).json(generateResponse(200, true, null, null, true));
});

router.post("/register", (req, res) => {
    console.log('register: ', req.body)
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
        return res.status(200).json(generateResponse(201, true));
    });
});

module.exports = router;