import React from "react";
import { useLocation } from "react-router-dom";
import CryptoJS from "crypto-js";
const Payment = () => {
  const location = useLocation();
  console.log(location.state);
  const { order_id, totalAmount } = location.state;
  const message = `total_amount=${totalAmount},transaction_uuid=${order_id},product_code=EPAYTEST`;
  var hash = CryptoJS.HmacSHA256(message, "8gBm/:&EnhH.1/q");
  var signature = CryptoJS.enc.Base64.stringify(hash);
  return (
    <div>
      <form
        action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        method="POST"
      >
        <input
          type="text"
          id="amount"
          name="amount"
          value={totalAmount}
          required
        />
        <input
          type="text"
          id="tax_amount"
          name="tax_amount"
          value={0}
          required
        />
        <input
          type="text"
          id="total_amount"
          name="total_amount"
          value={totalAmount}
          required
        />
        <input
          type="text"
          id="transaction_uuid"
          name="transaction_uuid"
          value={order_id}
          required
        />
        <input
          type="text"
          id="product_code"
          name="product_code"
          value="EPAYTEST"
          required
        />
        <input
          type="text"
          id="product_service_charge"
          name="product_service_charge"
          value={0}
          required
        />
        <input
          type="text"
          id="product_delivery_charge"
          name="product_delivery_charge"
          value={0}
          required
        />
        <input
          type="text"
          id="success_url"
          name="success_url"
          value="http://localhost:9000/api/orders/success"
          required
        />
        <input
          type="text"
          id="failure_url"
          name="failure_url"
          value="https://developer.esewa.com.np/failure"
          required
        />
        <input
          type="text"
          id="signed_field_names"
          name="signed_field_names"
          value="total_amount,transaction_uuid,product_code"
          required
        />
        <input
          type="text"
          id="signature"
          name="signature"
          value={signature}
          required
        />
        <input value="Submit" type="submit" />
      </form>
    </div>
  );
};

export default Payment;
