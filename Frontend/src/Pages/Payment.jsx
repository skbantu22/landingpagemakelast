import React, { useState, useEffect } from "react";
import Header from "./Header";
import ProductSummary from "./ProductSummary";
import BillingForm from "./BillingForm";
import OrderSummary from "./OrderSummary";

function Payment() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState(1);

  const price = 999;
  const total = quantity * price;
  const paymentMethod = "cod";

  // ... all useEffect hooks and handleSubmit (same as before) ...

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Header />
      <div className="bg-emerald text-center py-4 text-white text-xl font-bold rounded-md mb-6">
        অর্ডার করতে নিচের ফর্মটি পূরণ করুন
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 shadow-xl shadow-gray-700/60 p-8">
        <div>
          <ProductSummary quantity={quantity} setQuantity={setQuantity} total={total} />
          <BillingForm
            name={name} setName={setName}
            address={address} setAddress={setAddress}
            phone={phone} setPhone={setPhone}
          />
        </div>

        <OrderSummary quantity={quantity} total={total} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default Payment;
