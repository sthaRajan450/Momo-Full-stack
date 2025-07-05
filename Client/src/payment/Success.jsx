import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Success = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);

  const getOrder = async () => {
    try {
      let response = await fetch(`http://localhost:9000/api/orders/${id}`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        response = await response.json();
        console.log(response);
        setOrder(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrder();
  }, []);

  return (
    <div>
      {order ? (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            🎉 Order Successfully Placed!
          </h2>
          <p className="text-lg text-gray-800 mb-2">
            <span className="font-semibold">Order ID:</span> {order._id}
          </p>
          <p className="text-lg text-gray-800 mb-4">
            <span className="font-semibold">Payment Status:</span>{" "}
            <span
              className={`font-bold ${
                order.paymentStatus === "COMPLETE"
                  ? "text-green-500"
                  : "text-yellow-500"
              }`}
            >
              {order.paymentStatus}
            </span>
          </p>

          <div className="border-t pt-4">
            <h3 className="text-xl font-semibold mb-2">Products:</h3>
            <ul className="text-left">
              {order.product.map((item) => (
                <li
                  key={item._id}
                  className="py-2 border-b last:border-none flex justify-between"
                >
                  <span className="text-gray-700">
                    Product ID: {item.product_id}
                  </span>
                  <span className="text-gray-800 font-medium">
                    Qty: {item.quantity}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* OK button */}
          <button
            onClick={() => navigate("/")}
            className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
          >
            OK
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg mt-10">
          Loading order details...
        </p>
      )}
    </div>
  );
};

export default Success;
