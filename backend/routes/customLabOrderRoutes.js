const express = require("express");
const router = express.Router();

const {
  createCustomLabOrder,
  getCustomLabOrders,
  updateCustomLabOrderStatus,
} = require("../controllers/customLabOrderController");

router.post("/", createCustomLabOrder);
router.get("/", getCustomLabOrders);
router.patch("/:id/status", updateCustomLabOrderStatus);

module.exports = router;