import React, { createContext, useEffect, useState } from 'react';
import './styles/orderedList.css';
import getChoosedProdcuts from './api/getChoosedProducts';
import ProductCart from '../../entities/ProductCart/ProductCart';
import DeleteFromChoosed from '../DeleteFromChoosed/DeleteFromChoosed';
import { useLocalStorage } from '../../shared/lib/hooks/useLocalStorage';

export const orderListContext = createContext<{orderedProducts: any, setOrderedProducts: any} | undefined>(undefined);

const OrderedProductsList = () => {
    const [choosedProducts, stChoosedProducts] = useState([]);
    const [orderedProducts, setOrderedProducts] = useLocalStorage([] ,'ordered');
    
    useEffect(() => {
        if (localStorage.ordered) {
            getChoosedProdcuts(JSON.parse(localStorage.ordered))
            .then(data => stChoosedProducts(JSON.parse(data.products)));
        }
    }, [localStorage.ordered])

    return (
        <orderListContext.Provider value={{
            orderedProducts: orderedProducts,
            setOrderedProducts: setOrderedProducts
            }}>
            <div className='ordered-block'>
                {choosedProducts.map((product: any) => {
                    if(orderedProducts.some((obj: any) => obj.id === product.id)) {
                        return (
                            <ProductCart key={product.id}
                            title={product.title}
                            description={product.description}
                            cost={product.cost}
                            img={product.photo}
                            closeComponent={<DeleteFromChoosed id={product.id} />}
                            preferBtn
                            secondaryBlock
                        />
                        )
                    }
                })}
            </div>
        </orderListContext.Provider>
    );
};

export default OrderedProductsList;