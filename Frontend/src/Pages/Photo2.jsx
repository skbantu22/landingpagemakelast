import React from 'react';
import ads_photo2 from '../assets/Ads2.jpg';

function Photo2() {
  return (
    <div className="flex justify-center p-2 bg-gray-50">
      <img
        src={ads_photo2}
        alt="Advertisement"
        className="w-full max-w-3xl h-auto rounded-md shadow-md object-contain"
      />
    </div>
  );
}

export default Photo2;
