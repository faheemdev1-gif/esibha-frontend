const HybridOrder = require("../models/HybridOrder");

exports.createHybridOrder = async (req, res) => {
  try {
    const order = await HybridOrder.create(req.body);

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

exports.getHybridOrders = async (req, res) => {
  try {
    const orders = await HybridOrder.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch hybrid orders",
    });
  }
};

exports.updateHybridOrderStatus = async (req, res) => {
  try {
    const order = await HybridOrder.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Hybrid order not found",
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