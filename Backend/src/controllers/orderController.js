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

const success = async (req, res) => {
  let data = req.query.data;
  data = JSON.parse(atob(data));
  console.log(data.transaction_uuid);

  let isFoundOrder = await Order.findOne({ _id: data.transaction_uuid });

  if (!isFoundOrder) {
    return res
      .status(404)
      .json({ status: 400, success: false, message: "Order not found" });
  }
  let response = await Order.findByIdAndUpdate(
    data.transaction_uuid,
    { paymentStatus: data.status },
    { new: true }
  );
  res.redirect(`http://localhost:5173/success/${data.transaction_uuid}`);
  // res.status(200).json({
  //   status: 200,
  //   success: true,
  //   message: "Order status updated or payment completed",
  //   data: response,
  // });
};

const getorder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Order is not found",
      });
    }

    return res.status(200).json({
      status: 200,
      success: true,
      data: order,
      message: "Order is found",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getOrderHistory = async (req, res) => {
  try {
    const userId = req.user.id;


    const orderInfo = await Order.find({ user_id: userId }).populate("product.product_id");
  

    if (orderInfo.length === 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "No orders found for this user",
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      data: orderInfo,
      message: "User order history fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching order history:", error);
    res.status(500).json({
      status: 500,
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { createOrder, success, getorder, getOrderHistory };
