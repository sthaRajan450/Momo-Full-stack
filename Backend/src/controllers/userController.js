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
    const token = generateToken(newUser._id, newUser.role);

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
    const token = generateToken(isExist._id, isExist.role);

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
    const userId = req.params.id || req.user?.id;

    if (!userId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "User ID is required.",
      });
    }

    const user = await User.findById(userId).select("-password");

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

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, password, role } = req.body;

    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role) updateData.role = role;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("User update Error:", error);
    res.status(500).json({
      status: 500,
      success: false,
      message: "Server error",
    });
  }
};

const removeUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "User removed successfully",
    });
  } catch (error) {
    console.error("Cannot remove user:", error);
    return res.status(500).json({
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
  updateUser,
  removeUser,
};
