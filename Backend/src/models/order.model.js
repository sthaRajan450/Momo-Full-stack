const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  product: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  paymentStatus: {
    type: String,
    enum: [
      "PENDING",
      "COMPLETE",
      "FULL_REFUND",
      "PARTIAL_REFUND",
      "AMBIGUOUS",
      "NOT_FOUND",
      "CANCELED",
      "Service is currently unavailable",
    ],
    default: "PENDING",
  },
  //   orderStatus:{}
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
