import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartProvider";

const ProductDescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;

  const { dispatch } = useContext(CartContext);

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center text-xl text-gray-600">
        No product data found.
        <button
          onClick={() => navigate(-1)}
          className="ml-2 text-blue-600 underline hover:text-blue-800 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 p-6 flex justify-center items-center">
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden w-full max-w-6xl flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center">
          <img
            src={`http://localhost:9000/image/${product.image}`}
            alt={product.title}
            className="object-cover h-full max-h-[500px] w-full rounded-l-3xl"
          />
        </div>

        <div className="p-8 w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">
              {product.title}
            </h1>
            <p className="text-3xl text-pink-600 font-bold mb-4">
              ${product.price}
            </p>
            <p className="text-gray-700 text-base mb-4 leading-relaxed">
              {product.description}
            </p>
            <p className="text-gray-500 text-sm mb-6">
              Available Quantity: {product.quantity}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg transition duration-300 transform hover:scale-105"
              onClick={() => {
                dispatch({ type: "add", payload: product });
              }}
            >
              Add To Cart
            </button>
            <button
              onClick={() => {
                dispatch({ type: "add", payload: product });
                navigate("/cart");
              }}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg transition duration-300 transform hover:scale-105"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
