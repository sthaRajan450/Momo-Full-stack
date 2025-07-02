const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const generateToken = require("../utils/generateToke");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (
      [name, email, password, phone].some(
        (field) => !field || field.trim() === ""
      )
    ) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "All fields are required",
      });
    }

    const isExist = await User.findOne({ email });
    if (isExist) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    await newUser.save();
    const token = generateToken(newUser._id);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // set true in production with HTTPS
        sameSite: "strict",
        maxAge: 60 * 60 * 1000, // 1 hour
      })
      .status(201)
      .json({
        status: 201,
        success: true,
        message: "User registered successfully",
        data: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
        },
        token: token,
      });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({
      status: 500,
      success: false,
      message: "Server error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if ([email, password].some((field) => !field || field.trim() === "")) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "All fields are required",
      });
    }

    const isExist = await User.findOne({ email });
    if (!isExist) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "User does not exist, please register first",
      });
    }

    const isMatch = await bcrypt.compare(password, isExist.password);
    if (!isMatch) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Invalid credentials.",
      });
    }

    // Generate JWT token
    const token = generateToken(isExist._id);

    res.cookie("token", token, {
      httpOnly: true, // can't access cookie via client-side JS
      secure: false, // set true in production with HTTPS
      sameSite: "strict", // prevents CSRF attacks
      maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
    });
    res.status(200).json({
      status: 200,
      success: true,
      message: "User logged in successfully",
      token: token,
      data: isExist,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      status: 500,
      success: false,
      message: "Server error",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (users.length === 0) {
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    console.error("Fetch Users Error:", error);
    res.status(500).json({
      status: 500,
      success: false,
      message: "Server error",
    });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    console.error("Fetch User Error:", error);
    res.status(500).json({
      status: 500,
      success: false,
      message: "Server error",
    });
  }
};

const logoutUser = (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ status: 200, success: true, message: "User logout" });
};
module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getSingleUser,
  logoutUser,
};
