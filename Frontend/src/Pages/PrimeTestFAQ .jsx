import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaReply } from "react-icons/fa";

export default function PrimeTestFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Prime Test এর কার্যকারিতা গুলো কি?",
      answer: (
        <ol className="list-decimal list-inside space-y-1 text-sm leading-relaxed">
          <p>1. ছোট গোপনাঙ্গ লম্বা করে</p>
          <p>2. চিরস্থায়ী যৌন শক্তি বৃদ্ধি পাবে।</p>
          <p>3. আপনার গোপ-নাঙ্গের ভেতর থেকে লম্বা, মোটা, শক্ত ও রগ সতেজ করে তুলবে।</p>
          <p>4. গোপনাঙ্গ নিস্তেজ শিথিলতা দূর করবে।</p>
          <p>5. পুরাপুরি শক্ত হয়না এমন গোপনাঙ্গ স্থায়ীভাবে শক্ত করবে।</p>
          <p>6. গোপনাঙ্গকে মোটা ও ২-৩ ইঞ্চি লম্বা করে তুলবে।</p>
          <p>7. টানা ৩-৪ বার করে মিলন করতে পারবেন।</p>
          <p>8. প্রসাবে ধাতু ক্ষয় দূর করবে। বীর্য গাড় করে এবং দেহের মধ্যে বীর্য তৈরি করে।</p>
          <p>9. ৩৫ থেকে ৪৫ মিনিট স্ত্রী মিলন করতে পারবেন।</p>
          <p>10. এটা ব্যাবহার করলে লিংগ আগা মোটা গোরা চিকন থাকলে সেটা সমাধান করবে।</p>
          <p>বিশেষ সময়ে তৃপ্তির জন্য এটির কোন বিকল্প নেই।</p>
          <p className="font-semibold mt-3">
            বিশেষ দ্রষ্টব্যঃ ডায়াবেটিস ও হার্টের রোগীরাও ব্যবহার করতে পারবেন। কোন পার্শ্বপ্রতিক্রিয়া হবে না !
          </p>
        </ol>
      ),
      colorRed: false,
    },
    {
      question: "Prime Test ক্যাপসুল সেবন করার নিয়ম?",
      answer: <p className="text-sm">প্রতিদিন রাত্রে খাবার পর একটি করে ক্যাপসুল খাবেন। এক বোতলে ৯০ টি ক্যাপসুল আছে, তিন মাস খেতে হবে। এক ফাইল এই দুর্বল পুরুষের স্থায়ী সমাধান। স্যার এটা ব্যবহার করার ২-৩ দিন পর থেকে রেজাল্ট বুঝতে পারবেন।</p>,
      colorRed: true,
    },
    {
      question: "আমাদের থেকে কেন কিনবেন?",
      answer: <p className="text-sm">     <p>বাংলাদেশে একমাত্র আমরাই সরাসরি বিদেশ থেকে বাংলাদেশ সরকারকে 13 শতাংশ শুল্ক দিয়ে প্রোডাক্ট আমদানি করে থাকি !</p>
          <p>আপনি আমাদের কাছে পাচ্ছেন 100% অরজিনাল ও অফিসিয়াল প্রোডাক্ট।</p>
          <p>আমরা দিচ্ছি আপনাকে প্রোডাক্ট হাতে পাওয়ার পর প্রোডাক্ট দেখে খুলে চেক করে, পেমেন্ট করার সুব্যবস্থা।</p>
          <p>আমরা দিচ্ছি আপনাকে 100% মানিব্যাগ গ্যারান্টি।</p>
          <p>একমাত্র আমরাই দিচ্ছি আপনাকে 100% রিটার্ন পলিসি।</p>
          <p>Qr code Scan করে নিতে পারবেন।</p></p>,
      colorRed: false,
    },
    {
      question: "যদি কাজ না হয়?",
      answer: <p className="text-sm">100% মানিব্যাগ গ্যারান্টি কাজ না হলে টাকা ফেরত।</p>,
      colorRed: true,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto my-6 border border-gray-300 rounded">
      {/* Header */}
      <div className="bg-black text-yellow-400 text-center font-bold text-lg sm:text-xl py-3">
        নিচের প্রশ্ন গুলাতে ক্লিক করলে উত্তর পেয়ে যাবেন।
      </div>

      {/* Accordion */}
      {faqs.map((item, i) => {
        const open = openIndex === i;

        return (
          <div key={i} className="border-b border-gray-300">
            <button
              onClick={() => setOpenIndex(open ? null : i)}
              className={`w-full flex items-center justify-between px-4 py-3 text-left transition ${
                open
                  ? "bg-gradient-to-b from-green-300 to-green-100"
                  : "bg-gradient-to-b from-green-200 to-green-50"
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Left icon like your screenshot */}
                <FaReply className="text-black text-lg" />

                <span
                  className={`font-semibold text-base sm:text-lg ${
                    item.colorRed ? "text-red-600" : "text-gray-800"
                  }`}
                >
                  {item.question}
                </span>
              </div>

              {/* Chevron */}
              {open ? (
                <FaChevronUp className="text-black" />
              ) : (
                <FaChevronDown className="text-black" />
              )}
            </button>

            {open && (
              <div className="px-6 py-4 text-gray-800 bg-white text-sm sm:text-base">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
