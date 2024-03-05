import React from 'react';
import './styles/productCart.css'
import { ProductCartProps } from './types/productCartProps';

const ProductCart = ({
    title, 
    description, 
    cost, 
    img, 
    closeComponent, 
    preferBtn, 
    secondaryBlock
    }: ProductCartProps) => {
    return (
        <div className='product-cart'>
            <img className='product-img' src={img} alt="" />
            <div className="">
                <h2 className='product-cart-title'>{title}</h2>
                <p className='product-cart-paragraph'>
                    {description}
                </p>
                <h3 className='product-cart-cost'>{cost} ₴</h3>
                {secondaryBlock}
            </div>
            {closeComponent}
        </div>
    );
};

export default ProductCart;

// bioflex.png bioflex
// glockslin.png glizin
// artrotil.png artrocol
// diaflex.png diaflex
// relaxan.png relaxan
// immunstat.pngimmustat
// enegostim.png energostim
// migrocaps.png migrocaps
// holersterostop.png holersterostop
// gepatoprotect.png gepatoprotect
// probiostim.png probiostim
// somnirelax.png somnirelax
// vitrium.png vitrium
// osteostim.png osteostim
// detoxiflex.png detoxiflex
// immunoforte.png immunoforte
// fitoimmunostim.png