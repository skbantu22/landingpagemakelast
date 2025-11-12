import React from 'react';
import ads_photo from '../assets/ads.jpg';

function Photo1() {
  return (
    <div className="flex justify-center p-2 bg-gray-50">
      <img
        src={ads_photo}
        alt="Advertisement"
        className="w-full max-w-3xl h-auto rounded-md shadow-md object-contain"
      />
    </div>
  );
}

export default Photo1;
