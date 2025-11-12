import React from 'react';

const HeroSection = () => {
  return (
    <section className="py-12 md:py-20 text-center border-b border-gray-200">
      <div className="max-w-4xl mx-auto">
        {/* Placeholder for the main product logo */}
        <img 
          src="/path/to/download.png" // Replace with actual image path
          alt="Ling Long Capsule Logo" 
          className="mx-auto h-24 mb-6"
        />
        
        <h1 className="text-3xl sm:text-4xl font-extrabold text-red-700 mb-4">
          Ling Long Capsule (Made in Japan) 100% original.
        </h1>
        
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          আর নয় হতাশা!!! এবার আপনি হয়ে উঠবেন একজন শক্তিশালী পুরুষ। আমরা আপনাদের মাঝে নিয়ে আসছি বর্তমান সময়ের সবচেয়ে কার্যকারী একটা প্রোডাক্ট, **Ling Long Capsule ভিটামিন ই সমৃদ্ধ**।
        </p>
        
        <a 
          href="#order" 
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-lg text-xl transition duration-300 shadow-xl transform hover:scale-105"
        >
          অর্ডার করতে চাই
        </a>
      </div>
      
      {/* Placeholder for the large product visual */}
      <div className="mt-12">
        <img 
          src="/path/to/product-jpeg.jpg" // Replace with actual image path
          alt="Product Bottle Visual" 
          className="mx-auto w-full max-w-md rounded-lg shadow-2xl"
        />
      </div>
    </section>
  );
};

export default HeroSection;