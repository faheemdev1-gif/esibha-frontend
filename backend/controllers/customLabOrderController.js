const CustomLabOrder = require("../models/CustomLabOrder");

exports.createCustomLabOrder = async (req, res) => {
  try {
    const order = await CustomLabOrder.create(req.body);

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCustomLabOrders = async (req, res) => {
  try {
    const orders = await CustomLabOrder.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch custom lab orders",
    });
  }
};

exports.updateCustomLabOrderStatus = async (req, res) => {
  try {
    const order = await CustomLabOrder.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Custom lab order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};