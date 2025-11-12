import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-10">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-lg font-semibold mb-4">ক্যাশ অন ডেলিভারি - সারা বাংলাদেশে ডেলিভারি চার্জ ফ্রি!</h3>
        <div className="flex justify-center space-x-6 text-lg mb-4">
          <a href="tel:+8801768952233" className="hover:text-red-400 transition duration-300">
            📞 কল করুন: +88 01768-952233
          </a>
          <a href="https://web.whatsapp.com/send?phone=+8801768952233" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition duration-300">
            💬 WhatsApp: +88 01768-952233
          </a>
        </div>
        <p className="text-sm text-gray-400 mt-4">
          © 2025 YourSite. All rights reserved. | <a href="#" className="hover:underline">Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;