import React, { useEffect, useState } from "react";

const Photo4 = () => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 43, seconds: 50 });

  // Countdown simulation (you can adjust this logic)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { minutes: prev.minutes - 1, seconds: 59 };
        clearInterval(timer);
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-gray-50 py-8 px-6 text-center">
      <div className="max-w-3xl mx-auto rounded-lg shadow-xl overflow-hidden border-4 border-green-700">
        {/* Header */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white bg-green-700 py-3 tracking-wide">
          অফারের শেষ সময়
        </h2>

        {/* Timer */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 bg-linear-to-r from-red-600 to-red-500 p-6">
          <div className="bg-red-700 text-yellow-300 px-10 py-4 rounded-md shadow-lg transform hover:scale-105 transition duration-300">
            <span className="text-5xl font-bold">{timeLeft.minutes}</span>
            <span className="ml-2 text-lg font-semibold">Minutes</span>
          </div>
          <div className="bg-red-700 text-yellow-300 px-10 py-4 rounded-md shadow-lg transform hover:scale-105 transition duration-300">
            <span className="text-5xl font-bold">{timeLeft.seconds}</span>
            <span className="ml-2 text-lg font-semibold">Seconds</span>
          </div>
        </div>

        {/* Regular Price */}
        <div className="border-2 border-red-500 my-6 mx-6 py-6 rounded-lg bg-white hover:shadow-lg transition">
          <h3 className="text-2xl font-bold text-gray-700">
            রেগুলার প্রাইস :-{" "}
            <span className="text-red-600 line-through relative inline-block">
              1990 টাকা
              <span className="absolute inset-0 flex justify-center items-center text-green-500 text-3xl font-extrabold rotate-12">
                ✖
              </span>
            </span>
          </h3>
        </div>

        {/* Offer Price */}
        <div className="border-4 border-green-500 my-6 mx-6 py-6 rounded-lg shadow-2xl bg-linear-to-r from-green-50 to-green-100 animate-pulse">
          <h3 className="text-3xl font-extrabold text-red-600">
            অফার প্রাইস :-{" "}
            <span className="relative inline-block text-green-700">
              <span className="absolute inset-0 border-4 border-green-500 rounded-full animate-ping"></span>
              <span className="relative bg-white px-3 py-1 rounded-full shadow-inner">
                990
              </span>
              <span className="ml-1">টাকা</span>
            </span>
          </h3>
        </div>
      </div>
    </section>
  );
};

export default Photo4;
