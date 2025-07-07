import React, { useEffect, useState } from "react";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      let response = await fetch(
        "http://localhost:9000/api/orders/getOrderHistory",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setOrders(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Order Management</h1>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div
            key={order._id}
            className="mb-6 border border-gray-300 rounded-md shadow p-4 bg-white"
          >
            <div className="mb-2">
              <p>
                <span className="font-semibold">Order ID:</span> {order._id}
              </p>
              <p>
                <span className="font-semibold">User:</span>{" "}
                {order.user_id?.name} ({order.user_id?.email})
              </p>
              <p className="text-sm text-gray-500">
                Role: {order.user_id?.role} | Ordered At:{" "}
                {new Date(order.user_id?.createdAt).toLocaleString()}
              </p>
              <p
                className={`font-semibold mt-2 ${
                  order.paymentStatus === "COMPLETE"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                Payment Status: {order.paymentStatus}
              </p>
            </div>

            {order.product.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 border rounded p-3 mb-3 bg-gray-50"
              >
                <img
                  src={`http://localhost:9000/image/${item.product_id.image}`}
                  alt={item.product_id.title}
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <h2 className="text-lg font-semibold">
                    {item.product_id.title}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {item.product_id.description}
                  </p>
                  <p className="mt-1">Price: Rs. {item.product_id.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p className="font-medium">
                    Total: Rs. {item.product_id.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div className="text-gray-600">No orders found.</div>
      )}
    </div>
  );
};

export default OrderManagement;
