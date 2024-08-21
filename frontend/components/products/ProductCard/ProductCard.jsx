import React from 'react';
import './ProductCard.css';
import img1 from '../../../public/4413 Shoe Pics/NIKE+AIR+MAX+270+WHITE+1.png'

const ProductCard = ({product}) => {

    return (
        <div className='product-card'>
            <div className='product-img'>
                <img src={product.image ? product.image : img1} alt={product.name}></img>
            </div>
            <div className='product'>
                <p className='name'>{product.name}</p>
                <p className='gender'>{product.gender}</p>
                <p className='price'>${product.price}</p>

            </div>
        </div>
    );

}

export default ProductCard;