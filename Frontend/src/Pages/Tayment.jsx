import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Product_img from "../assets/products.png";
import { useNavigate } from "react-router-dom";

// Product item component
const ProductItem = ({ name, subtext, total, quantity }) => (
  <div className="flex justify-between py-2 border-b border-gray-200">
    <div className="flex items-center space-x-3">
      <div className="w-12 h-12 bg-gray-200 rounded shrink-0">
        <img src={Product_img} alt="" className="w-full h-full object-cover" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700">{name}</p>
        {subtext && <p className="text-xs text-gray-500">{subtext}</p>}
      </div>
    </div>
    <div className="flex items-center text-sm font-medium text-gray-800">
      <span className="mr-4 text-xs font-normal text-gray-600">× {quantity}</span>
      <span>৳ {total.toFixed(2)}</span>
    </div>
  </div>
);

function Tayment() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);

  const price = 999;
  const total = quantity * price;
  const paymentMethod = "cod";

  const productName = "প্রাইম ল্যাবস প্রাইম টেস্ট অর্গানিক ব্ল্যাক মাকা 1200 ML";
  const productSubtext = "";

  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;
  const META_TEST_CODE = import.meta.env.VITE_META_TEST_CODE;

  // Load draft from localStorage
  useEffect(() => {
    const savedDraft = localStorage.getItem("orderDraft");
    if (savedDraft) {
      const { name, address, phone, quantity } = JSON.parse(savedDraft);
      setName(name || "");
      setAddress(address || "");
      setPhone(phone || "");
      setQuantity(quantity || 1);
    }
  }, []);

  // Auto-save draft to localStorage & backend
  useEffect(() => {
    if (!name && !address && !phone) return;

    const cleanPhone = phone.replace(/\D/g, "");
    const draftData = {
      name,
      address,
      phone: cleanPhone,
      quantity,
      total,
      paymentMethod,
      isComplete: false,
    };

    localStorage.setItem("orderDraft", JSON.stringify(draftData));

    const timeout = setTimeout(() => {
      fetch(`${API_URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draftData),
      })
        .then((res) => res.json())
        .then((data) => console.log("Draft autosaved:", data))
        .catch((err) => console.error("Auto-save error:", err));
    }, 3000);

    return () => clearTimeout(timeout);
  }, [name, address, phone, quantity, total, API_URL]);

  // Meta Pixel InitiateCheckout
  useEffect(() => {
    if (window.fbq && META_PIXEL_ID) {
      window.fbq("track", "InitiateCheckout", {
        value: Number(total),
        currency: "BDT",
        content_name: productName,
        content_type: "product",
        quantity: quantity,
      });
      console.log("Meta Pixel: InitiateCheckout event fired");
    }
  }, [total, quantity, productName, META_PIXEL_ID]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanPhone = phone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length !== 11) {
      toast.error("অনুগ্রহ করে সঠিক ১১ সংখ্যার ফোন নাম্বার দিন।");
      return;
    }

    const orderData = {
      name,
      phone: cleanPhone,
      address,
      quantity,
      total,
      paymentMethod,
      isComplete: true,
    };

    try {
      const res = await fetch(`${API_URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error("Server error");

      const savedOrder = await res.json();
      localStorage.removeItem("orderDraft");

      const orderDetails = {
        _id: savedOrder._id,
        date: new Date().toISOString(),
        total,
        product: productName,
        quantity,
        paymentMethod,
        billingAddress: { name, addressLine1: address, phone: cleanPhone },
        shippingAddress: address,
      };

      localStorage.setItem(`order-${savedOrder._id}`, JSON.stringify(orderDetails));
      toast.success("অর্ডার সফলভাবে সম্পন্ন হয়েছে!");

      // Server-side Facebook event
      try {
        await fetch(`${API_URL}/api/meta/send-event`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            phone: cleanPhone,
            address,
            quantity,
            total,
            testEventCode: META_TEST_CODE,
          }),
        });
        console.log("Server-side event sent to Facebook");
      } catch (err) {
        console.error("Server-side Facebook event failed:", err);
      }

      // Meta Pixel Purchase event
      if (window.fbq && META_PIXEL_ID) {
        window.fbq("track", "Purchase", {
          value: Number(total),
          currency: "BDT",
          content_name: productName,
          content_type: "product",
          quantity: quantity,
        });
        console.log("Meta Pixel: Purchase event fired");
      }

      navigate(`/order-confirm/${savedOrder._id}`);
    } catch (err) {
      console.error("Order submission failed:", err);
      toast.error("অর্ডার সম্পন্ন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  return (
    <div id="orderform" className="min-h-screen bg-gray-50 text-black">
      <div className="bg-emerald-600 text-center py-4 text-white text-xl font-bold rounded-md mb-6 mt-2">
        অর্ডার করতে নিচের ফর্মটি পূরণ করুন
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 shadow-xl shadow-gray-700/60 p-3">
        {/* LEFT SECTION */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Products</h2>
            <div className="border rounded-lg p-4 flex items-center gap-4 bg-white">
              <input type="checkbox" checked readOnly className="w-4 h-4" />
              <div className="w-16 h-16 flex items-center justify-center">
                <img src={Product_img} alt="" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{productName} × {quantity}</h3>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    type="button"
                    className="px-3 py-1 border border-gray-300 rounded-l"
                  >
                    -
                  </button>
                  <input
                    value={quantity}
                    readOnly
                    className="w-10 text-center border-t border-b border-gray-300 text-black"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    type="button"
                    className="px-3 py-1 border border-gray-300 rounded-r"
                  >
                    +
                  </button>
                  <span className="ml-4 font-semibold">৳{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Billing Form */}
          <div>
            <h2 className="mb-6 text-xl font-bold text-gray-800">
              আপনার ফোন নাম্বার দিন। নাম ও ঠিকানা প্রয়োজন নেই।
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 bg-white p-4 rounded-lg border text-black"
            >
              <div>
                <label className="block mb-1 font-medium">আপনার নাম</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="আপনার নাম লিখুন "
                  name="name"
                  autoComplete="name"
                  className="w-full border rounded p-2 lg:p-4 text-black placeholder-black"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">আপনার ফোন নাম্বার *</label>
                <input
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                  type="text"
                  maxLength="11"
                  placeholder="আপনার ফোন নাম্বার লিখুন"
                  className="w-full border rounded p-2 lg:p-4 text-black placeholder-black"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">আপনার ঠিকানা</label>
                <input
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  placeholder="আপনার ঠিকানা লিখুন "
                  name="street-address"
                  autoComplete="street-address"
                  className="w-full border rounded p-2 lg:p-5 text-black placeholder-black"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition"
              >
                🔒 অর্ডার সম্পন্ন করুন ৳{total.toFixed(2)}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT SECTION (Desktop) */}
        <div className="hidden lg:block lg:mt-9">
          <div className="p-4 mb-4 rounded-lg bg-gray-50 border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center w-full">
              <div className="shrink-0 mr-4">
                <div className="w-16 h-20 sm:w-20 sm:h-20 border border-gray-300 rounded bg-white">
                  <img src={Product_img} alt="" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex-grow">
                <p className="text-base text-gray-800 leading-snug">
                  (ফ্রি হোম ডেলিভারী) {productName}
                  <span className="text-xl font-bold ml-1 text-gray-600">×{quantity}</span>
                </p>
                <p className="text-lg font-bold mt-1 text-gray-900">৳ {total.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <h2 className="mb-4 text-xl font-bold text-gray-800">আপনার টোটাল অর্ডার</h2>
          <div className="flex justify-between pb-2 text-sm font-semibold text-gray-500 border-b border-gray-300">
            <span>Product</span>
            <span>Subtotal</span>
          </div>
          <ProductItem name={productName} subtext={productSubtext} total={total} quantity={quantity} />
          <div className="pt-4 space-y-2 text-gray-800">
            <div className="flex justify-between text-base">
              <span>Subtotal</span>
              <span>৳ {total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>৳ {total.toFixed(2)}</span>
            </div>
          </div>
          <div className="p-4 mt-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="mb-2 text-lg font-bold text-gray-800">ক্যাশ অন ডেলিভারী</h3>
            <p className="text-sm text-gray-600">ডেলিভারী চার্জ: ফ্রি হোম ডেলিভারী</p>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Tayment;
