const Order = require("../models/Order");
const sendEmail = require("../utils/sendEmail");
exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    const itemsHtml = order.items
  .map(
    item => `
      <li>
        ${item.name} - ${item.size} × ${item.qty}
        <br />
        PKR ${(item.price * item.qty).toLocaleString()}
      </li>
    `
  )
  .join("");

await sendEmail({
  to: process.env.ADMIN_EMAIL,
  subject: `New Order Received - ${order.customer.fullName}`,
  html: `
    <h2>New Order Received</h2>
    <p><strong>Name:</strong> ${order.customer.fullName}</p>
    <p><strong>Phone:</strong> ${order.customer.phone}</p>
    <p><strong>Email:</strong> ${order.customer.email || "Not provided"}</p>
    <p><strong>City:</strong> ${order.customer.city}</p>
    <p><strong>Address:</strong> ${order.customer.address}</p>
    <p><strong>Notes:</strong> ${order.customer.notes || "None"}</p>

    <h3>Items</h3>
    <ul>${itemsHtml}</ul>

    <p><strong>Subtotal:</strong> PKR ${order.subtotal.toLocaleString()}</p>
    <p><strong>Shipping:</strong> PKR ${order.shipping.toLocaleString()}</p>
    <p><strong>Total:</strong> PKR ${order.total.toLocaleString()}</p>
    <p><strong>Payment:</strong> ${order.paymentMethod}</p>
  `,
});

if (order.customer.email) {
  await sendEmail({
    to: order.customer.email,
    subject: "Your eSibha Order Has Been Received",
    html: `
      <h2>Thank you for your order, ${order.customer.fullName}.</h2>
      <p>We have received your order successfully.</p>
      <p>Our team will contact you shortly on WhatsApp or phone to confirm the details.</p>

      <h3>Order Summary</h3>
      <ul>${itemsHtml}</ul>

      <p><strong>Total:</strong> PKR ${order.total.toLocaleString()}</p>
      <p><strong>Payment Method:</strong> Cash on Delivery</p>

      <p>Thank you for choosing eSibha.</p>
    `,
  });
}
    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update order",
    });
  }
};