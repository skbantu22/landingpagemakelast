import React from "react";

const PrimeTestSection = () => {
  return (
    <section className="bg-white py-10 px-6 text-center">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-green-700 border-4 border-red-500 inline-block px-6 py-4 mb-10">
          কেন Prime-Test আপনার জন্য সেরা সমাধান?
        </h2>

        {/* 4 Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center mt-10">
          {/* Box 1 */}
          <div>
            <div className="flex justify-center mb-3">
              <span className="text-green-600 text-4xl">🍃</span>
            </div>
            <h3 className="text-xl font-bold text-red-600 mb-2">
              স্বাভাবিকের চাইতে লিংগ ৩-৪ ইঞ্চি লম্বা ও মোটা করে
            </h3>
            <p className="text-green-600">
              Prime Test ক্যাপ্সুল সেবন করবার ফলে লিংগ ৩-৪ ইঞ্চি লম্বা ও মোটা হয়।
            </p>
          </div>

          {/* Box 2 */}
          <div>
            <div className="flex justify-center mb-3">
              <span className="text-green-600 text-4xl">🍃</span>
            </div>
            <h3 className="text-xl font-bold text-red-600 mb-2">
              লিংগ শক্ত ও স্ট্রং করে।
            </h3>
            <p className="text-green-600">
              যাদের লিংগ নিস্তেজ দাঁড়ায়না, তারা এটি সেবন করবার ফলে নিস্তেজ লিংগ শক্ত ও স্ট্রং হবে।
            </p>
          </div>

          {/* Box 3 */}
          <div>
            <div className="flex justify-center mb-3">
              <span className="text-green-600 text-4xl">🍃</span>
            </div>
            <h3 className="text-xl font-bold text-red-600 mb-2">
              সহবাসের সময় কমপক্ষে ৪০ থেকে ৪৫ মিনিট বৃদ্ধি করে।
            </h3>
            <p className="text-green-600">
              Prime Test ক্যাপ্সুল নিয়মিত সেবন করবার ফলে সহবাসের সময় কমপক্ষে ৪০ থেকে ৪৫ মিনিট বৃদ্ধি পাবে।
            </p>
          </div>

          {/* Box 4 */}
          <div>
            <div className="flex justify-center mb-3">
              <span className="text-green-600 text-4xl">🍃</span>
            </div>
            <h3 className="text-xl font-bold text-red-600 mb-2">
              পার্শ্ব-প্রতিক্রিয়া মুক্ত
            </h3>
            <p className="text-green-600">
              Prime Test ক্যাপ্সুল আমেরিকান সায়েন্টিস্ট দ্বারা পরীক্ষিত। এটি ব্যবহারে কোনো পার্শ্ব-প্রতিক্রিয়া নেই।
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrimeTestSection;
