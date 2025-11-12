import React from "react";

const LoadingOverlay = ({ show = false, text = "লোড হচ্ছে..." }) => {
  if (!show) return null;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm z-50 animate-[fadeIn_0.3s_ease-in-out]">
      {/* Spinner */}
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-3 text-gray-700 font-semibold">{text}</p>
    </div>
  );
};

export default LoadingOverlay;
