const express = require("express");

const router = express.Router();

const { getGiftPacks } = require("../controllers/giftPackController");

router.get("/", getGiftPacks);

module.exports = router;