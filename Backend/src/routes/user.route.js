const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  getSingleUser,
  logoutUser,
} = require("../controllers/userController");
const verifyToken = require("../middelwares/auth");
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/", verifyToken, getAllUsers);
userRouter.get('/getSingleUser',verifyToken,getSingleUser)
userRouter.post('/logout',logoutUser)
module.exports = userRouter;
