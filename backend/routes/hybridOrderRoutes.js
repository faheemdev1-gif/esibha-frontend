const express = require("express");

const router = express.Router();

const {
  createHybridOrder,
  getHybridOrders,
  updateHybridOrderStatus,
} = require("../controllers/hybridOrderController");

router.post("/", createHybridOrder);

router.get("/", getHybridOrders);

router.patch("/:id/status", updateHybridOrderStatus);

module.exports = router;