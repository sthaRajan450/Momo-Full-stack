const express = require("express");
const connectDB = require("./src/db/connection");
const userRouter = require("./src/routes/user.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const productRouter = require("./src/routes/product.route");
const orderRouter = require("./src/routes/order.route");
const app = express();

connectDB();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/image", express.static("public/image"));

app.listen(3000, () => {
  console.log(`server at http://localhost:3000`);
});
