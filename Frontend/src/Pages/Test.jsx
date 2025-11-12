import React, { useState } from 'react';
// Assuming you have @heroicons/react installed for the lock icon
import { LockClosedIcon } from '@heroicons/react/20/solid'; 

const ProductItem = ({ name, subtext, price, quantity }) => {
  return (
    <div className="flex justify-between py-2 border-b border-gray-200">
      <div className="flex items-center space-x-3">
        {/* Placeholder for Product Image */}
        <div className="w-12 h-12 bg-gray-200 rounded shrink-0">
          {/*  */}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">{name}</p>
          <p className="text-xs text-gray-500">{subtext}</p>
        </div>
      </div>
      <div className="flex items-center text-sm font-medium text-gray-800">
        <span className="mr-4 text-xs font-normal text-gray-600">
          &times; {quantity}
        </span>
        <span>৳ {price.toFixed(2)}</span>
      </div>
    </div>
  );
};

// --- Main Component: Test ---
function Test() {
  // State for form inputs
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  // State to track if submission was attempted (for showing initial errors)
  const [submitted, setSubmitted] = useState(false); 

  // Hardcoded product details from the image
  const productName = '(ফ্রি হোম ডেলিভারি) 500 ML হেয়ার অয়েল';
  const productSubtext = '+ 1 পিস 100% পিওর হারবাল শ্যাম্পু';
  const itemPrice = 2600.00;
  const quantity = 1;

  // Validation Logic: Show error if (user has typed something AND it's invalid) OR (form was submitted AND field is empty)
  const isInvalidPhone = submitted && phone.length === 0;
  const isAddressRequired = submitted && address.length === 0;
    const isNameRequired = submitted && name.length === 0;
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true); // Mark as submitted to trigger validation errors

    const isPhoneValid = phone.length === 11;
    const isAddressFilled = address.length > 0;
    const isNameFilled = name.length > 0;
    
    // Check all required fields are valid
    if (isPhoneValid && isAddressFilled && isNameFilled) {
      alert(`Order placed successfully for ${name}! Total: ৳${itemPrice.toFixed(2)} (Simulated)`);
      // In a real app, you would send data to a server here
    } else {
      alert('অনুগ্রহ করে সঠিক তথ্য দিয়ে ফর্মটি পূরণ করুন। (Please fill out the form with correct information.)');
    }
  };

  return (
    <div className="flex flex-col max-w-6xl p-6 mx-auto bg-white shadow-xl lg:flex-row lg:p-10 rounded-xl">
      
      {/* --- Left Column: Input Fields --- */}
      <form onSubmit={handleSubmit} className="w-full lg:w-1/2 lg:pr-10">
        <h2 className="mb-6 text-xl font-bold text-gray-800">
          সঠিক নাম, ফোন নাম্বার এবং ঠিকানা দিন।
        </h2>

        {/* Name Field */}
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-red-600">
            ইংরেজীতে আপনার নাম লিখুন *
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            required
            placeholder="ghh" 
          />
        </div>

        {/* Phone Field */}
        <div className="mb-6">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-red-600">
            আপনার 11 অক্ষরের ফোন নাম্বার *
          </label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))} // Allow only digits
            className={`w-full p-3 border rounded-lg ${
              isInvalidPhone ? 'border-red-500' : 'border-gray-300'
            } focus:ring-indigo-500 focus:border-indigo-500`}
            required
            placeholder="hgfth"
            maxLength="11"
          />
          {/* Phone Number Error Message */}
          {isInvalidPhone && (
            <p className="mt-1 text-xs text-red-600">
              Billing আপনার 11 অক্ষরের ফোন নাম্বার is not a valid phone number.
            </p>
          )}
        </div>

        {/* Address Field */}
        <div className="mb-6">
          <label htmlFor="address" className="block mb-2 text-sm font-medium text-red-600">
            আপনার সম্পূর্ণ ঠিকানা লিখুন (পাড়া/গ্রাম, উপজেলা, জেলা সহ সম্পূর্ণ ঠিকানা দিন, নাহলে অর্ডার নেয়া হবে না) *
          </label>
          <textarea
            id="address"
            rows="4"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={`w-full p-3 border rounded-lg ${
              isAddressRequired ? 'border-red-500' : 'border-gray-300'
            } focus:ring-indigo-500 focus:border-indigo-500`}
            required
          />
          {/* Address Required Error Message */}
          {isAddressRequired && (
            <p className="mt-1 text-xs text-red-600">
              Billing আপনার সম্পূর্ণ ঠিকানা লিখুন (পাড়া/গ্রাম, উপজেলা, জেলা সহ সম্পূর্ণ ঠিকানা দিন, নাহলে অর্ডার নেয়া হবে না) is a required field.
            </p>
          )}
        </div>
      </form>

      {/* --- Horizontal Rule (for mobile) --- */}
      <hr className="mb-8 lg:hidden" />

      {/* --- Right Column: Order Summary --- */}
      <div className="w-full lg:w-1/2 lg:mt-0">
        <h2 className="mb-6 text-xl font-bold text-gray-800">
          আপনার টোটাল অর্ডার
        </h2>

        {/* Order Details Table Header */}
        <div className="flex justify-between pb-2 text-sm font-semibold text-gray-500 border-b border-gray-300">
          <span>Product</span>
          <span>Subtotal</span>
        </div>

        {/* Product Item List */}
        <ProductItem
          name={productName}
          subtext={productSubtext}
          price={itemPrice}
          quantity={quantity}
        />

        {/* Subtotal and Total */}
        <div className="pt-4 space-y-2 text-gray-800">
          <div className="flex justify-between text-base">
            <span>Subtotal</span>
            <span>৳ {itemPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>৳ {itemPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Delivery Details */}
        <div className="p-4 mt-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="mb-2 text-lg font-bold text-gray-800">
            ক্যাশ অন ডেলিভারী
          </h3>
          <p className="text-sm text-gray-600">
            ডেলিভারী চার্জ: চট্রগ্রাম সিটি কর্পোরেশনের ভেতর ৫০ টাকা, ঢাকার আশেপাশে (যেমন সাভার, গাজীপুর, নারায়ণগঞ্জ) ১৩০ টাকা, এবং অন্যান্য জেলায় ১৫০ টাকা।
          </p>
        </div>

        {/* Place Order Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="flex items-center justify-center w-full px-4 py-3 mt-6 text-lg font-semibold text-white transition duration-200 bg-indigo-700 rounded-lg hover:bg-indigo-800"
        >
          <LockClosedIcon className="w-5 h-5 mr-2" />
          অর্ডার করুন
        </button>
      </div>
    </div>
  );
};

export default Test;