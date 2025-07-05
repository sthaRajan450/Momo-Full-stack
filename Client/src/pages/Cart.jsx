import React, { useContext, useEffect } from "react";
import { CartContext } from "../context/CartProvider";
import { NavLink, useNavigate } from "react-router-dom";

const Cart = () => {
  const { state, dispatch } = useContext(CartContext);
  console.log(state);
  const navigate = useNavigate();
  const totalAmount = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const orderNow = async () => {
    const product = state.cartItems.map((product) => {
      return { product_id: product._id, quantity: product.quantity };
    });
    try {
      let response = await fetch(
        "http://localhost:9000/api/orders/createOrder",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(product),
        }
      );
      if (response.ok) {
        response = await response.json();
        console.log(response);
        alert(response.message);
        let order_id = response.data._id;
        navigate("/payment", { state: { order_id, totalAmount } });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Your Cart</h2>

      {state.cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="lg:col-span-2 space-y-4">
            <div className="text-right">
              <button
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium"
                onClick={() => dispatch({ type: "clear" })}
              >
                Clear Cart
              </button>
            </div>

            {state.cartItems.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-md p-4 flex flex-col sm:flex-row items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <img
                    className="w-24 h-24 object-cover rounded-md"
                    src={`http://localhost:9000/image/${product.image}`}
                    alt={product.title}
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {product.title}
                    </h3>
                    <p className="text-gray-600">Price: Rs.{product.price}</p>
                    <p className="text-gray-600">
                      Quantity: {product.quantity}
                    </p>
                    <p className="text-gray-700 font-medium">
                      Subtotal: Rs.{product.price * product.quantity}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                  <button
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium"
                    onClick={() =>
                      dispatch({ type: "increment", payload: product._id })
                    }
                  >
                    +
                  </button>
                  <button
                    className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium"
                    onClick={() =>
                      dispatch({ type: "decrement", payload: product._id })
                    }
                  >
                    -
                  </button>
                  <button
                    className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium"
                    onClick={() =>
                      dispatch({ type: "remove", payload: product._id })
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-center items-center">
              <NavLink
                className="bg-blue-500 rounded-lg p-2 text-white"
                to="/menu"
              >
                Continue shoping
              </NavLink>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md h-fit">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <p className="text-gray-700 mb-2">
              Items: {state.cartItems.length}
            </p>
            <p className="text-lg font-bold text-gray-800">
              Total: Rs.{totalAmount.toFixed(2)}
            </p>
            <button
              className="p-3 bg-green-600 text-white rounded-2xl cursor-pointer"
              onClick={() => {
                orderNow();
              }}
            >
              Order Now
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-600 mt-10">
          No products in cart.
          <div className="flex justify-center items-center">
            <NavLink
              className="bg-orange-500 rounded-lg p-2 text-white mt-4"
              to="/menu"
            >
              Shop Now
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
