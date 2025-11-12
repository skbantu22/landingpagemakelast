import React from "react";

export default function BillingForm({ name, setName, address, setAddress, phone, setPhone }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mt-6 mb-4">Billing details</h2>
      <div id="order-form">
        <form className="space-y-4 bg-white p-4 rounded-lg border">
          <div>
            <label className="block mb-1 font-medium text-gray-700">আপনার নাম *</label>
            <input
              type="text"
              placeholder="আপনার নাম লিখুন"
              className="w-full border rounded p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">আপনার সম্পূর্ণ ঠিকানা *</label>
            <input
              type="text"
              placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন"
              className="w-full border rounded p-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">আপনার ফোন নাম্বার *</label>
            <input
              type="text"
              placeholder="আপনার ফোন নাম্বার লিখুন"
              className="w-full border rounded p-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
