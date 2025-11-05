import React, { useState } from 'react';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submission logic would go here (e.g., API call)
    alert(`অর্ডার প্লেস করা হয়েছে: ${formData.name}`);
    console.log('Order Details:', formData);
  };

  const price = 1490.00; // 1,490.00৳

  return (
    <section className="py-12 bg-white rounded-lg shadow-2xl mt-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        অর্ডার করতে নিচের ফরম পূরণ করুন
      </h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-6">
        
        {/* Left Column: Billing Details */}
        <div>
          <h3 className="text-xl font-semibold mb-4 border-b pb-2">Billing Details</h3>
          <div className="space-y-4">
            <input 
              type="text" 
              name="name" 
              placeholder="আপনার নাম লিখুন *" 
              required 
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
            />
            <input 
              type="text" 
              name="address" 
              placeholder="আপনার ঠিকানা লিখুন *" 
              required 
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
            />
            <input 
              type="tel" 
              name="phone" 
              placeholder="আপনার ফোন নাম্বার লিখুন *" 
              required 
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold mb-4 border-b pb-2">Your Order</h3>
          
          <table className="w-full text-left mb-6">
            <tbody>
              <tr className="border-b">
                <td className="py-2">Ling Long Herbal Capsules 60 Pcs × 1</td>
                <td className="py-2 text-right">{price.toFixed(2)}৳</td>
              </tr>
              <tr className="font-semibold border-b">
                <td className="py-2">Subtotal</td>
                <td className="py-2 text-right">{price.toFixed(2)}৳</td>
              </tr>
              <tr className="font-semibold">
                <td className="py-2 text-red-600">Shipping</td>
                <td className="py-2 text-right text-red-600">ফ্রি হোম ডেলিভারি</td>
              </tr>
              <tr className="text-2xl font-bold text-red-700 border-t-2 border-red-700">
                <td className="py-3">Total</td>
                <td className="py-3 text-right">{price.toFixed(2)}৳</td>
              </tr>
            </tbody>
          </table>
          
          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <input type="radio" name="payment" value="cod" defaultChecked className="form-radio text-red-600" />
              <span className="font-medium">ক্যাশ অন ডেলিভারি, পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন।</span>
            </label>
          </div>

          <p className="text-sm text-red-600 mb-6 p-3 bg-red-100 rounded">
            **বিশেষ দ্রষ্টব্য:** ১০০% শিওর না হয়ে দয়া করে অর্ডার করবেন না, প্রোডাক্ট না নিলে ডেলিভারি চার্জ দিয়ে রিটার্ন করতে পারবেন।
          </p>
          
          <button 
            type="submit" 
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg text-xl transition duration-300 shadow-lg"
          >
            Place Order {price.toFixed(2)}৳
          </button>
        </div>
      </form>
    </section>
  );
};

export default OrderForm;