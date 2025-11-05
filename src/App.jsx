import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Login from "./Pages/Login";
import Sidebar from "./Pages/Sidebar";
import Footer from "./Component/Footer";
import axios from "axios";

export const backendURL = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const location = useLocation(); // ✅ Needed for tracking route changes

  // ✅ Save or remove token
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // ✅ Facebook Pixel Setup
  

  return (
    <div>
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <div className="min-h-screen">
          <Navbar />
          <hr />
          <div className="flex">
            <Sidebar />
            <div className="flex-1">
              <Outlet />
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
