import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Orderconfirmation from "./Orderconfirmation"; // make sure component name matches

export default function OrderConfirmWrapper() {
  const { orderId } = useParams(); // MongoDB _id
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Try to get order details from localStorage
    const saved = localStorage.getItem(`order-${orderId}`);
    if (saved) {
      setOrder(JSON.parse(saved));
    } else {
      // Optional: fallback - fetch from backend
      fetch(`http://localhost:5000/api/users/${orderId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Order not found");
          return res.json();
        })
        .then((data) => setOrder(data))
        .catch((err) => {
          console.error(err);
          setOrder(null);
        });
    }
  }, [orderId]);

  if (!order) {
    return <div className="text-center p-10">Order data not found.</div>;
  }

  return <Orderconfirmation order={order} />; // pass as `order` prop
}
