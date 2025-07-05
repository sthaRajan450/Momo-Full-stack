import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const { isAuth, isLoading } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const getAllProducts = async () => {
    try {
      let response = await fetch(
        "http://localhost:9000/api/products/getAllProducts",
        {
          method: "GET",
        }
      );
      response = await response.json();
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600 animate-pulse">
          Loading menu...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 via-purple-50 to-blue-100 p-6 sm:p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 drop-shadow-sm">
          Explore Our Menu
        </h1>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              onClick={() => {
                navigate("/productDescription", { state: product });
              }}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 border border-gray-100"
            >
              <img
                src={`http://localhost:9000/image/${product.image}`}
                alt={product.title}
                className="w-full h-64 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {product.title}
                </h2>
                <p className="text-pink-600 font-bold text-lg mb-2">
                  Rs.{product.price}
                </p>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {product.description}
                </p>
                <p className="text-gray-600 text-sm line-clamp-2">
                  Quantity: {product.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg mt-20">
          🚫 No products available yet.
        </div>
      )}
    </div>
  );
};

export default Menu;
