import React, { useContext, useState } from 'react';
import './styles/productsCounter.css';
import { orderListContext } from '../OrderedProductsList/OrderedProductsList';

const ProductCounter = ({count, id}: {count: number, id: number}) => {
    const contextData = useContext(orderListContext);

    function updateOrderedProducts(event: any) {
        contextData?.setOrderedProducts((prev: any) => {
            const result = prev.map((item: any) => {
                if(event.target.innerText === '-') {
                    if (item.id === id) {
                        return {id: id, ["count"]: item.count !== 1 ? item.count-- : 1, ["cost"]: item.cost}
                    } else {
                        return item
                    }
                } else {
                    if (item.id === id) {
                        return {id: id, ["count"]: item.count++, ["cost"]: item.cost}
                    } else {
                        return item
                    }
                }
            });
            return result
        })
    }

    return (
        <div className='counter'>
            <button onClick={updateOrderedProducts}>-</button>
            {count}
            <button onClick={updateOrderedProducts}>+</button>
        </div>
    );
};

export default ProductCounter;