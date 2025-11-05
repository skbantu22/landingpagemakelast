import React from "react";

export default function ProductSummary({ quantity, setQuantity, total }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Products</h2>
      <div className="border rounded-lg p-4 flex items-center gap-4 bg-white">
        <input type="checkbox" checked readOnly className="w-4 h-4" />
        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
          <span className="text-gray-400 text-sm">🖼️</span>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">demo × {quantity}</h3>
          <div className="flex items-center mt-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 border border-gray-300 rounded-l"
            >
              -
            </button>
            <input
              value={quantity}
              readOnly
              className="w-10 text-center border-t border-b border-gray-300"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 border border-gray-300 rounded-r"
            >
              +
            </button>
            <span className="ml-4 font-semibold">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
