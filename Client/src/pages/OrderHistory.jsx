import React, { useEffect, useState } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  const getOrderHistory = async () => {
    try {
      let response = await fetch(
        "http://localhost:9000/api/orders/getOrderHistory",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        response = await response.json();
        console.log(response.data);
        setOrders(response.data);
      }
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  useEffect(() => {
    getOrderHistory();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Order History
      </h1>

      {orders.length > 0 ? (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-300 rounded-xl p-6 shadow-md bg-white"
            >
              {/* Payment Status */}
              <h2
                className={`text-xl font-semibold mb-4 ${
                  order.paymentStatus === "COMPLETE"
                    ? "text-green-700"
                    : "text-red-600"
                }`}
              >
                Payment Status: {order.paymentStatus}
              </h2>

              {/* Products List */}
              {order.product?.length > 0 ? (
                <div className="space-y-6">
                  {order.product.map((product) => (
                    <div
                      key={product.product_id._id}
                      className="flex flex-col md:flex-row gap-4 border border-gray-200 rounded-lg p-4 bg-gray-50 hover:shadow-lg transition-shadow"
                    >
                      {/* Product Image */}
                      <img
                        src={`http://localhost:9000/image/${product.product_id.image}`}
                        alt={product.product_id.title}
                        className="w-full md:w-48 h-48 object-cover rounded-md"
                      />

                      {/* Product Details */}
                      <div className="flex flex-col justify-between">
                        <h3 className="text-lg font-semibold mb-1">
                          {product.product_id.title}
                        </h3>
                        <p className="text-gray-700 mb-1">
                          Price:{" "}
                          <span className="font-medium">
                            Rs. {product.product_id.price}
                          </span>
                        </p>
                        <p className="text-gray-700 mb-1">
                          Description:{" "}
                          <span className="text-gray-600">
                            {product.product_id.description}
                          </span>
                        </p>
                        <p className="text-gray-700 mb-1">
                          Quantity: {product.quantity}
                        </p>
                        <p className="text-black font-semibold">
                          Total: Rs.{" "}
                          {product.product_id.price * product.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-red-500 font-medium">
                  No products in this order.
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg">
          No orders found.
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
