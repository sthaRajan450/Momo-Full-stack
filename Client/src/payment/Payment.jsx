import React from "react";
import { useLocation } from "react-router-dom";
import CryptoJS from "crypto-js";

const Payment = () => {
  const location = useLocation();
  const { order_id, totalAmount } = location.state;

  const message = `total_amount=${totalAmount},transaction_uuid=${order_id},product_code=EPAYTEST`;
  const hash = CryptoJS.HmacSHA256(message, "8gBm/:&EnhH.1/q");
  const signature = CryptoJS.enc.Base64.stringify(hash);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        method="POST"
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-green-600">eSewa Payment</h2>

        <div>
          <label className="block mb-1 text-gray-700 font-medium">Total Amount (Rs)</label>
          <input
            type="text"
            value={totalAmount}
            readOnly
            className="w-full px-4 py-2 border rounded-md bg-gray-50 text-gray-800 font-semibold"
          />
        </div>

        
        <input type="hidden" name="amount" value={totalAmount} />
        <input type="hidden" name="tax_amount" value={0} />
        <input type="hidden" name="total_amount" value={totalAmount} />
        <input type="hidden" name="transaction_uuid" value={order_id} />
        <input type="hidden" name="product_code" value="EPAYTEST" />
        <input type="hidden" name="product_service_charge" value={0} />
        <input type="hidden" name="product_delivery_charge" value={0} />
        <input
          type="hidden"
          name="success_url"
          value="http://localhost:9000/api/orders/success"
        />
        <input
          type="hidden"
          name="failure_url"
          value="https://developer.esewa.com.np/failure"
        />
        <input
          type="hidden"
          name="signed_field_names"
          value="total_amount,transaction_uuid,product_code"
        />
        <input type="hidden" name="signature" value={signature} />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Pay with eSewa
        </button>
      </form>
    </div>
  );
};

export default Payment;
