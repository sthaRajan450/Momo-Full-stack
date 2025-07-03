const express = require("express");

const verifyToken = require("../middelwares/auth");
const { createOrder } = require("../controllers/orderController");
const orderRouter = express.Router();

orderRouter.post("/createOrder", verifyToken, createOrder);

module.exports = orderRouter;
