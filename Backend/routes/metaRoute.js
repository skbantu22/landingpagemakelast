import express from "express";
import axios from "axios";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Hash function for user data
function hashData(data) {
  return crypto.createHash("sha256").update(data.trim().toLowerCase()).digest("hex");
}

// Send server-side events
router.post("/send-event", async (req, res) => {
  try {
    const { name, phone, address, quantity, total, testEventCode } = req.body;

    const [firstName, lastName] = name ? name.split(" ") : [undefined, undefined];
    const [street, city, country] = address ? address.split(",") : [undefined, undefined, undefined];

    // Combined payload for both Lead and Purchase
    const payload = {
      data: [
        {
          event_name: "Lead",
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          event_source_url: "https://yourdomain.com",
          user_data: {
            fn: firstName ? hashData(firstName) : undefined,
            ln: lastName ? hashData(lastName) : undefined,
            ph: phone ? hashData(phone) : undefined,
            ct: city ? hashData(city.trim()) : undefined,
            country: country ? hashData(country.trim()) : undefined,
            client_ip_address: req.ip,
            client_user_agent: req.headers["user-agent"],
          },
        },
        {
          event_name: "Purchase",
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          event_source_url: "https://yourdomain.com",
          user_data: {
            fn: firstName ? hashData(firstName) : undefined,
            ln: lastName ? hashData(lastName) : undefined,
            ph: phone ? hashData(phone) : undefined,
            ct: city ? hashData(city.trim()) : undefined,
            country: country ? hashData(country.trim()) : undefined,
            client_ip_address: req.ip,
            client_user_agent: req.headers["user-agent"],
          },
          custom_data: {
            currency: "BDT",
            value: total,
            content_name: "প্রাইম ল্যাবস প্রাইম টেস্ট অর্গানিক ব্ল্যাক মাকা 1200 ML",
            content_type: "product",
            quantity: quantity,
          },
        },
      ],
    };

    let url = `https://graph.facebook.com/v18.0/${process.env.PIXEL_ID}/events?access_token=${process.env.META_ACCESS_TOKEN}`;
    if (testEventCode) url += `&test_event_code=${testEventCode}`;

    const response = await axios.post(url, payload);
    console.log("Server-side Lead & Purchase events sent to Facebook");
    res.json({ success: true, fbResponse: response.data });

  } catch (err) {
    console.error("Error sending events:", err.response?.data || err.message);
    res.status(500).json({ success: false, error: err.response?.data || err.message });
  }
});

export default router;
