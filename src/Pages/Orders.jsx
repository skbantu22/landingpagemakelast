import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendURL } from "../App";
import { FaRegCopy } from "react-icons/fa";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const backendURL = import.meta.env.VITE_API_URL;


  // Fetch orders from backend
  const fetchOrders = async (pageNumber = 1) => {
  try {
    setLoading(true);
    const res = await axios.get(`${backendURL}/api/users?page=${pageNumber}&limit=5&isComplete=true`);

    setOrders(res.data.users);
    setPage(res.data.page);
    setPages(res.data.pages); // Use backend-provided total pages
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  const nextPage = () => page < pages && setPage(page + 1);
  const prevPage = () => page > 1 && setPage(page - 1);

  // Copy to clipboard
  const copyText = (text) => {
    navigator.clipboard.writeText(text).then(() => alert("Copied!"));
  };

  // Print voucher
  const printVoucher = (order) => {
    const voucherContent = `
      <html>
        <head>
          <title>Voucher</title>
          <style>
            body { font-family: monospace; padding: 10px; width: 300px; }
            .header { text-align: center; margin-bottom: 10px; }
            .logo { font-weight: bold; font-size: 18px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            td { padding: 4px 0; }
            .divider { border-top: 1px dashed #000; margin: 5px 0; }
            .total { font-weight: bold; margin-top: 5px; }
            .footer { text-align: center; margin-top: 10px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">MyShop</div>
            <div>Order Receipt</div>
          </div>

          <div class="divider"></div>

          <table>
            <tr><td>Name:</td><td>${order.name}</td></tr>
            <tr><td>Phone:</td><td>${order.phone}</td></tr>
            <tr><td>Quantity:</td><td>${order.order?.quantity || "-"}</td></tr>
            <tr><td>Date:</td><td>${order.order?.date ? new Date(order.order.date).toLocaleDateString() : "-"}</td></tr>
            <tr><td>Address:</td><td>${order.address || "-"}</td></tr>
            <tr><td>Status:</td><td>${order.deliveryStatus || "Pending"}</td></tr>
          </table>

          <div class="divider"></div>

          <div class="footer">
            Thank you for shopping with us!<br/>
            Visit again: myshop.com
          </div>
        </body>
      </html>
    `;

    const newWindow = window.open("", "_blank");
    newWindow.document.write(voucherContent);
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <div className="p-4 max-w-6xl mx-auto ">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Desktop Table */}
          <table className="w-full border border-gray-300 hidden md:table">
            <thead>
              <tr className="bg-gray-100 text-center">
                <th className="border p-2">#</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Address</th>
                <th className="border p-2">Delivery Status</th>
                <th className="border p-2">Voucher</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr key={order._id} className="text-center border">
                  <td className="border p-2">{idx + 1 + (page - 1) * 5}</td>

                  {/* Name */}
                  <td className="border p-2">
                    <div className="flex items-center justify-center gap-2">
                      {order.name}
                      <FaRegCopy
                        className="cursor-pointer text-gray-500 hover:text-gray-800"
                        onClick={() => copyText(order.name)}
                      />
                    </div>
                  </td>

                  {/* Phone */}
                  <td className="border p-2">
                    <div className="flex items-center justify-center gap-2">
                      {order.phone}
                      <FaRegCopy
                        className="cursor-pointer text-gray-500 hover:text-gray-800"
                        onClick={() => copyText(order.phone)}
                      />
                    </div>
                  </td>

                  {/* Quantity */}
                  <td className="border p-2">
                    <div className="flex items-center justify-center gap-2">
                      {order.order?.quantity || "-"}
                      <FaRegCopy
                        className="cursor-pointer text-gray-500 hover:text-gray-800"
                        onClick={() => copyText(order.order?.quantity || "-")}
                      />
                    </div>
                  </td>

                  {/* Date */}
                  <td className="border p-2">
                    <div className="flex items-center justify-center gap-2">
                      {order.order?.date
                        ? new Date(order.order.date).toLocaleDateString()
                        : "-"}
                      <FaRegCopy
                        className="cursor-pointer text-gray-500 hover:text-gray-800"
                        onClick={() =>
                          copyText(
                            order.order?.date
                              ? new Date(order.order.date).toLocaleDateString()
                              : "-"
                          )
                        }
                      />
                    </div>
                  </td>

                  {/* Address */}
                  <td className="border p-2">
                    <div className="flex items-center justify-center gap-2">
                      {order.address || "-"}
                      <FaRegCopy
                        className="cursor-pointer text-gray-500 hover:text-gray-800"
                        onClick={() => copyText(order.address || "-")}
                      />
                    </div>
                  </td>

                  {/* Delivery Status */}
                  <td className="border p-2">
                    <div className="flex items-center justify-center gap-2">
                      <select
                        value={order.deliveryStatus || "Pending"}
                        onChange={async (e) => {
                          const newStatus = e.target.value;
                          try {
                            await axios.put(`${backendURL}/api/users/${order._id}`, { deliveryStatus: newStatus });
                            setOrders(prevOrders =>
                              prevOrders.map(o =>
                                o._id === order._id ? { ...o, deliveryStatus: newStatus } : o
                              )
                            );
                          } catch (err) {
                            console.error(err);
                            alert("Failed to update status");
                          }
                        }}
                        className={`px-2 py-1 rounded ${
                          order.deliveryStatus === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.deliveryStatus === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </td>

                  {/* Voucher */}
                  <td className="border p-2">
                    <button
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => printVoucher(order)}
                    >
                      Print
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between mt-4">
            <button
              onClick={prevPage}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="self-center">
              Page {page} of {pages}
            </span>
            <button
              onClick={nextPage}
              disabled={page === pages}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>

          {/* Mobile View */}
          <div className="block md:hidden space-y-4 mt-4">
            {orders.length > 0 ? (
              orders.map((order, idx) => (
                <div key={order._id} className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Order #{idx + 1}</span>
                    <button
                      className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      onClick={() => printVoucher(order)}
                    >
                      Print
                    </button>
                  </div>

                  <div className="text-sm space-y-1">
                    <p><strong>Name:</strong> {order.name}</p>
                    <p><strong>Phone:</strong> {order.phone}</p>
                    <p><strong>Quantity:</strong> {order.order?.quantity || "-"}</p>
                    <p><strong>Date:</strong> {order.order?.date ? new Date(order.order.date).toLocaleDateString() : "-"}</p>
                    <p><strong>Address:</strong> {order.address || "-"}</p>

                    <p>
                      <strong>Status:</strong>{" "}
                      <select
                        value={order.deliveryStatus || "Pending"}
                        onChange={async (e) => {
                          const newStatus = e.target.value;
                          try {
                            await axios.put(`${backendURL}/api/users/${order._id}`, { deliveryStatus: newStatus });
                            setOrders(prevOrders =>
                              prevOrders.map(o =>
                                o._id === order._id ? { ...o, deliveryStatus: newStatus } : o
                              )
                            );
                          } catch (err) {
                            console.error(err);
                            alert("Failed to update status");
                          }
                        }}
                        className={`px-2 py-1 rounded ${
                          order.deliveryStatus === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.deliveryStatus === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No incomplete orders found</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Orders;