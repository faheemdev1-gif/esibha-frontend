const GiftPack = require("../models/GiftPack");

exports.getGiftPacks = async (req, res) => {
  try {
    const giftPacks = await GiftPack.find();

    res.status(200).json({
      success: true,
      data: giftPacks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch gift packs",
    });
  }
};