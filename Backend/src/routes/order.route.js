const express = require("express");

const verifyToken = require("../middelwares/auth");
const {
  createOrder,
  success,
  getorder,
} = require("../controllers/orderController");
const orderRouter = express.Router();

orderRouter.post("/createOrder", verifyToken, createOrder);
orderRouter.get("/success", success);
orderRouter.get("/:id",verifyToken, getorder);

module.exports = orderRouter;
