import React, { useEffect, useState } from 'react';
import './styles/orderedList.css';
import getChoosedProdcuts from './api/getChoosedProducts';
import ProductCart from '../../entities/ProductCart/ProductCart';
import AddToOrderBtn from '../AddToOrderBtn/AddToOrderBtn';

const OrderedProductsList = () => {
    const [choosedProducts, stChoosedProducts] = useState([]);
    
    useEffect(() => {
        getChoosedProdcuts(JSON.parse(localStorage.ordered))
        .then(data => stChoosedProducts(JSON.parse(data.products)));
    }, [])

    return (
        <div className='ordered-block'>
            {choosedProducts.map((product: any) => {
                return (
                    <ProductCart 
                    title={product.title}
                    description={product.description}
                    cost={product.cost}
                    img={product.photo}
                    closeComponent 
                    preferBtn
                    secondaryBlock
                />
                )
            })}
        </div>
    );
};

export default OrderedProductsList;