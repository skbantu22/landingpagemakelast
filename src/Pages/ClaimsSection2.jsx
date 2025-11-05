import React from 'react';
import { Link } from 'react-scroll';
function ClaimsSection2() {
  return (
    <div className="bg-green-900 text-white text-center p-8 sm:p-12 md:p-16 lg:max-w-6xl mx-auto rounded-lg shadow-xl">
      {/* Main text */}
      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed mb-8">
        ক্যাশ অন ডেলিভারি - সারা বাংলাদেশে<br />
        ডেলিভারি চার্জ ফ্রি অর্ডার কনফার্ম করার<br />
        (৭২) ঘণ্টার মধ্যে প্রোডাক্টটি হাতে পেয়ে যাবেন<br />
        ইনশাল্লাহ।
      </p>

      {/* Call buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
        <a
          href="tel:+8801768952233"
          className="block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-md text-lg sm:text-xl transition-all"
        >
          কল করুন: 01335434265
        </a>

        <a
          href="https://wa.me/8801335434265"
          className="block bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-md text-lg sm:text-xl transition-all"
        >
          WhatsApp: +88 01768-952233
        </a>
      </div>

      {/* Bottom banner */}
     


 <Link
        to="orderform"       // target id
        smooth={true}        // smooth scrolling
        duration={500}       // scroll duration in ms
        className="cursor-pointer 
                   bg-red-600 hover:bg-red-700 
                   text-white font-bold 
                   rounded-full 
                   px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 
                   text-base sm:text-lg lg:text-xl 
                   shadow-xl 
                   transition-transform transform hover:scale-105
                   text-center flex items-center justify-center"
      >
        অর্ডার করতে নিচের ফর্ম পূরণ করুন
      </Link>

    </div>
  );
}

export default ClaimsSection2;
