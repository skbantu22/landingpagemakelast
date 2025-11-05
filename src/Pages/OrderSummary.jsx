import React from "react";

export default function OrderSummary({ quantity, total, handleSubmit }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your order</h2>
      <div className="border rounded-lg bg-white p-4">
        <table className="w-full text-sm mb-4">
          <thead>
            <tr className="border-b-2 border-dashed border-gray-400 pb-2">
              <th className="text-left pb-2">Product</th>
              <th className="text-right pb-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>demo × {quantity}</td>
              <td className="text-right">${total.toFixed(2)}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="border-t font-semibold">
              <td className="pt-2">Total</td>
              <td className="text-right pt-2">${total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Payment Method</h3>
          <div className="mt-4 bg-gray-100 border p-3 rounded text-sm text-gray-800">
            <p>💵 আপনি <strong>ক্যাশ অন ডেলিভারি</strong> সিলেক্ট করেছেন। পণ্য হাতে পেলে পেমেন্ট করুন।</p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition"
        >
          🔒 অর্ডার সম্পন্ন করুন ${total.toFixed(2)}
        </button>
      </div>
    </div>
  );
}
