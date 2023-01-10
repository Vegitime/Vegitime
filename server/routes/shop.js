const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { Vegetable } = require("../models/Vegetable");
const { Shop } = require("../models/Shop");
const { auth } = require("../middleware/auth");
const { generateResponse } = require("../utils/generateResponse");

router.get("/", async (req, res) => {
  try {
    const shopData = await Shop.find({}).exec();
    const data = await Promise.all(shopData.map(res => ({
      src: res.image[5],
      name: res.name,
      price: res.purchasePrice,
      specialty: res.description,
    })))
    return res.status(200).json(generateResponse(200, true, null, null, null, data));
  }
  catch(err) {
    return res.json(generateResponse(500, false, err));
  }
});

router.post("/purchase", auth, async (req, res) => {
  try {
    const shopData = await Shop.findOne({_id: req.body.vegeId}).exec()
    console.log(shopData)
    const vegetable = new Vegetable({
      ownerId: req.user._id,
      name: shopData.name,
    });
    await vegetable.save();
    await User.findOneAndUpdate({_id: req.user._id}, {$inc: { money: -shopData.purchasePrice}}).exec();
    return res.status(201).json(generateResponse(201, true));
  }
  catch(err) {
    return res.json(generateResponse(500, false, err));
  }
});


module.exports = router;