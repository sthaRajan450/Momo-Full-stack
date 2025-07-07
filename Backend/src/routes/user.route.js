const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  getSingleUser,
  logoutUser,
  updateUser,
  removeUser,
} = require("../controllers/userController");
const verifyToken = require("../middelwares/auth");
const isAdmin = require("../middelwares/isAdmin");
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/", verifyToken, getAllUsers);
userRouter.get("/getSingleUser", verifyToken, getSingleUser);
userRouter.get("/:id", verifyToken, isAdmin, getSingleUser);
userRouter.put("/update/:id", updateUser);
userRouter.delete("/delete/:id", removeUser);
userRouter.post("/logout", logoutUser);
module.exports = userRouter;
