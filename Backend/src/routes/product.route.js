const express = require("express");
const {
  createProduct,
  getAllProducts,
  removeSingleProduct,
  updateProduct,
  getSingleProduct,
} = require("../controllers/productController");
const upload = require("../middelwares/upload");
const productRouter = express.Router();

productRouter.post("/createProduct", upload.single("image"), createProduct);
productRouter.get("/getAllProducts", getAllProducts);
productRouter.get("/getSingleProduct/:id", getSingleProduct);
productRouter.delete("/delete/:id", removeSingleProduct);
productRouter.put("/update/:id", updateProduct);

module.exports = productRouter;
