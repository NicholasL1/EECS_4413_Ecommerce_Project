import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

const ProductList = ({ products, currentPage }) => {
  const getProductsPage = () => {
    const start = (currentPage - 1) * 20; // 20 being the page size
    const end = start + 20;

    return products.slice(start, end);
  };

  const displayProducts = getProductsPage();

  /*return (
        <div className='productlist'>
            {displayProducts?.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    ); */

  return (
    <div className="flex flex-wrap gap-[50px] px-[100px] items-center justify-between">
      {getProductsPage().map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
