import React from 'react'
 import ProductItems from './ProductItems';
function ProductItem() {

    const product = {
    name: "(ফ্রি হোম ডেলিভারি) 500 ML হেয়ার অয়েল",
    subtext: "+ 1 পিস 100% পিওর হারবাল শ্যাম্পু",
    price: 2600.0,
    quantity: 1,
  };
  return (
  <div className="p-6">
      <ProductItems
        name={product.name}
        subtext={product.subtext}
        price={product.price}
        quantity={product.quantity}
      />
    </div>
  )
}

export default ProductItem