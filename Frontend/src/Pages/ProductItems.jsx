import React, { useState } from 'react';
import Test from './Test';
function ProductItems({ name, subtext, price, quantity }) {

 
  return (
    <div className="flex justify-between py-2 border-b border-gray-200">
      <div className="flex items-center space-x-3">
        {/* Placeholder for Product Image */}
        <div className="w-12 h-12 bg-gray-200 rounded shrink-0">
          {/*  */}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">{name}</p>
          <p className="text-xs text-gray-500">{subtext}</p>
        </div>
      </div>
      <div className="flex items-center text-sm font-medium text-gray-800">
        <span className="mr-4 text-xs font-normal text-gray-600">
          &times; {quantity}
        </span>
        <span>৳ {price.toFixed(2)}</span>
      </div>
    </div>
  );
};
export default ProductItems