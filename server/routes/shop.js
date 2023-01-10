const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { Vegetable } = require("../models/Vegetable");
const { Shop } = require("../models/Shop");
const { auth } = require("../middleware/auth");
const { generateResponse } = require("../utils/generateResponse");

router.get("/", (req, res) => {
  Shop.find({})
      .exec((err, info) => {
          if (err) return res.json(generateResponse(500, false, err));
          return res.status(200).json(generateResponse(200, true, null, null, null,info));
      })
});

router.post("/purchase", auth, (req, res) => {
  Shop.findOne({_id: req.body.vegetableId})
    .exec((err, info) => {
        if (err) return res.json(generateResponse(500, false, err));
        const vegetable = new Vegetable({
          ownerId: req.user._id,
          name: info.name,
        });
        vegetable.save((err, doc) => {
          if (err) return res.json(generateResponse(500, false, err));
        });
        User.findOneAndUpdate({_id: req.user._id}, {$inc: { money: -info.purchasePrice}}).exec();
    })

    return res.status(201).json(generateResponse(201, true));
});


module.exports = router;