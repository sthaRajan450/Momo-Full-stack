const Order = require("../models/order.model");
const User = require("../models/user.model");

const createOrder = async (req, res) => {
  const userId = req.user.id;
  const product = req.body;

  try {
    if (!userId || !Array.isArray(product) || product.length < 1) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "User ID and products are required",
      });
    }

 
    const isExist = await User.findById(userId);
    if (!isExist) {
      return res
        .status(404)
        .json({ status: 404, success: false, message: "User is not found" });
    }

    const order = new Order({
      user_id: userId,
      product,
    });

    await order.save();

    res.status(201).json({
      status: 201,
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { createOrder };
