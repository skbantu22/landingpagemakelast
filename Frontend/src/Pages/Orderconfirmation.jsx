import React from "react";
import { ShareIcon } from "@heroicons/react/24/outline";

function Orderconfirmation({ order }) {
  if (!order) {
    return <div className="text-center p-10">Loading order details...</div>;
  }

  const total = Number(order.total) || 0;
  const subtotal = total; // use total as subtotal if not provided
  const shipping = order.shipping || "Free";

  // Convert MongoDB _id to human-readable order number
  const humanOrderNumber = order.orderNumber
    ? order.orderNumber
    : `ORD-${new Date(order.date).getFullYear()}${order._id.slice(-6).toUpperCase()}`;

  const shareUrl = window.location.href;

  const handleShare = (platform) => {
    let url = "";
    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          shareUrl
        )}&text=${encodeURIComponent("I just placed an order!")}`;
        break;
      case "instagram":
        url = `https://www.instagram.com/`;
        break;
      default:
        return;
    }
    window.open(url, "_blank", "width=600,height=400");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white p-8 pt-10 shadow-md border-t-4 border-indigo-600 mt-10 rounded-lg">
        <div className="text-center mb-6">
          <div className="text-2xl font-bold text-gray-800 mb-2">My Logo</div>
          <h1 className="text-4xl font-light text-gray-800 mt-0 mb-4">Thank you</h1>
          <p className="text-gray-600 text-sm italic">
            Your order is confirmed. You will receive an email shortly.
          </p>
        </div>

        <div className="p-5 bg-indigo-50 border border-indigo-200 rounded-lg mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Your order has been received.
          </h2>

          <div className="flex justify-between text-sm text-gray-700 border-b border-gray-300 pb-3 mb-3">
            <div>
              <p className="font-semibold">Order number:</p>
              <p className="font-semibold text-indigo-700">{humanOrderNumber}</p>
            </div>
            <div>
              <p className="font-semibold">Date:</p>
              <p>{new Date(order.date).toLocaleString()}</p>
            </div>
            <div>
              <p className="font-semibold">Total:</p>
              <p className="text-lg font-bold">৳{total.toFixed(2)}</p>
            </div>
          </div>

          <p className="text-sm text-gray-700">
            <span className="font-semibold">Payment method:</span> {order.paymentMethod}
          </p>
        </div>

        {/* Order details */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Order details</h3>

          <div className="flex justify-between font-semibold text-sm text-gray-700 border-b border-gray-300 pb-2 mb-2">
            <span>Product</span>
            <span>Total</span>
          </div>

          <div className="flex justify-between text-sm text-gray-800 py-1">
            <span>
              {order.product} × {order.quantity}
            </span>
            <span>৳{total.toFixed(2)}</span>
          </div>

          <div className="space-y-1 mt-4 pt-4 border-t border-gray-300">
            <div className="flex justify-between text-sm text-gray-700">
              <span>Subtotal:</span>
              <span>৳{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <span>Shipping:</span>
              <span>{shipping}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-gray-800">
              <span>Total:</span>
              <span>৳{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Billing & Shipping */}
        <div className="flex border-t border-gray-300 pt-6">
          <div className="w-1/2 pr-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Billing address</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p>{order.billingAddress?.name}</p>
              <p>{order.billingAddress?.addressLine1}</p>
              <p>{order.billingAddress?.phone}</p>
            </div>
          </div>

          <div className="w-1/2 pl-4 border-l border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Shipping address</h3>
            <p className="text-sm text-gray-700">{order.shippingAddress}</p>
          </div>
        </div>
      </div>

      {/* Share buttons */}
      <div className="w-full max-w-2xl mt-10 text-center">
        <h3 className="text-base font-semibold text-gray-700 mb-4">SHARE WITH FRIENDS:</h3>
        <div className="flex justify-center space-x-4 mb-10">
          <button
            onClick={() => handleShare("facebook")}
            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            <ShareIcon className="w-4 h-4" />
            <span>Share on Facebook</span>
          </button>
          <button
            onClick={() => handleShare("twitter")}
            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            <ShareIcon className="w-4 h-4" />
            <span>Share on Twitter</span>
          </button>
          <button
            onClick={() => handleShare("instagram")}
            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            <ShareIcon className="w-4 h-4" />
            <span>Open Instagram</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Orderconfirmation;
