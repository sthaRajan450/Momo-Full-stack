const Product = require("../models/product.model");

const createProduct = async (req, res) => {
  try {
    const { title, price, description, quantity } = req.body;
    const image = req.file?.filename;

    if (
      [title, price, description, image, quantity].some(
        (field) => !field || field.trim() === ""
      )
    ) {
      return res.status(400).json({
        status: 400,
        message: "All fields (including image) are required!",
        success: false,
      });
    }

    const product = new Product({
      title: title.trim(),
      description: description.trim(),
      price: parseFloat(price),
      image,
      quantity: parseInt(quantity),
    });

    await product.save();

    return res.status(201).json({
      status: 201,
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Server error",
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    let response = await Product.find();
    if (!response) {
      return res.status(404).json({
        stauts: 401,
        success: false,
        message: "Products not found",
      });
    }
    res.status(200).json({
      status: 200,
      success: true,
      message: "Products are found",
      data: response,
    });
  } catch (error) {
    console.error("Product not found:", error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Server error",
    });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "Product found",
      data: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      status: 500,
      success: false,
      message: "Server error",
    });
  }
};

const removeSingleProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Product ID is required",
      });
    }

    const deleted = await Product.deleteOne({ _id: productId });

    if (deleted.deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Product removed successfully",
    });
  } catch (error) {
    console.error("Cannot remove product:", error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Server error",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { title, price, description } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { title, price, description },
      { new: true }
    );
    if (!product) {
      return res
        .status(404)
        .json({ status: 404, success: false, message: "Product not found" });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "Product updated",
      data: product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  removeSingleProduct,
  updateProduct,
};
