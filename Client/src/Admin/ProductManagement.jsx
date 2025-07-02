import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const getAllProducts = async () => {
    try {
      let response = await fetch(
        "http://localhost:3000/api/products/getAllProducts",
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

  const removeProduct = async (id) => {
    try {
      let response = await fetch(`http://localhost:3000/api/products/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      
      if (response.ok) {
       response = await response.json();

        setProducts((prev) => prev.filter((product) => product._id !== id));
        alert("Product deleted successfully!");
      } else {
        alert("Failed to delete product.");
      }
    } catch (error) {
      console.log(error);
      alert("Error deleting product.");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-8">
      <div className="flex flex-col justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 drop-shadow-sm">
          Product Management
        </h1>
        <NavLink
          to="/addProduct"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
        >
          + Add Product
        </NavLink>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white w-80 rounded-xl shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105 border border-gray-100"
            >
              <img
                src={`http://localhost:3000/image/${product.image}`}
                alt={product.title}
                className="w-full h-56 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-1 line-clamp-1">
                  {product.title}
                </h2>
                <p className="text-pink-600 font-bold text-lg mb-2">
                  ${product.price}
                </p>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {product.description}
                </p>
                <p className="text-gray-600 text-sm line-clamp-2">
                  Quantity: {product.quantity}
                </p>
              </div>
              <div className="flex m-4 justify-between">
                <button
                  className="p-2 bg-green-700 text-white rounded-lg cursor-pointer w-32"
                  onClick={() => {
                    navigate(`/editProduct/${product._id}`);
                  }}
                >
                  Update
                </button>
                <button
                  className="p-2 bg-red-700 text-white rounded-lg cursor-pointer w-32"
                  onClick={() => {
                    removeProduct(product._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-xl mt-20">
          🚫 No products available. Please add one!
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
