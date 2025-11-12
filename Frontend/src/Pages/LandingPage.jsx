import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Photo1 from "./Photo1";
import ClaimsSection2 from "./ClaimsSection2";
import Checkout from "./Checkout";

function LandingPage() {
  
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Header />

      

      {/* Extra sections */}
      <Photo1 />
      <ClaimsSection2 />
      <Checkout />
    </div>
  );
}

export default LandingPage;
