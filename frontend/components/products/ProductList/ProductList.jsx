import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';

const ProductList = ({products, currentPage}) => {

    const getProductsPag = () => {
        const start = (currentPage - 1) * 20;           // 20 being the page size
        const end = start + 20;

        return products.slice(start, end);
    }

    const displayProducts = getProductsPag();

    /*return (
        <div className='productlist'>
            {displayProducts?.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    ); */

    return (
        <div className='productlist'>
            {getProductsPag().map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    );

};

export default ProductList;