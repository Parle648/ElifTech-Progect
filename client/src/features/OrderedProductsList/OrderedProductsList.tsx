import React, { createContext, useEffect, useState } from 'react';
import './styles/orderedList.css';
import getChoosedProdcuts from './api/getChoosedProducts';
import ProductCart from '../../entities/ProductCart/ProductCart';
import DeleteFromChoosed from '../DeleteFromChoosed/DeleteFromChoosed';
import { useLocalStorage } from '../../shared/lib/hooks/useLocalStorage';
import ProductCounter from '../ProductCounter/ProductCounter';

export const orderListContext = createContext<{orderedProducts: any, setOrderedProducts: any} | undefined>(undefined);

const OrderedProductsList = () => {
    const [choosedProducts, stChoosedProducts] = useState([]);
    const [orderedProducts, setOrderedProducts] = useLocalStorage([] ,'ordered');

    console.log(orderedProducts);
    

    useEffect(() => {
        if (localStorage.ordered) {
            try {
                getChoosedProdcuts(JSON.parse(localStorage.ordered))
                .then(data => stChoosedProducts(JSON.parse(data.products)));
            } catch (err) {
                console.error(err);
            }
        }
    }, [])

    return (
        <orderListContext.Provider value={{
            orderedProducts: orderedProducts,
            setOrderedProducts: setOrderedProducts
            }}>
            <div className='ordered-container'>
                <div className='ordered-block'>
                    {choosedProducts && choosedProducts.map((product: any) => {
                        let count = 1;
                        if(orderedProducts.some((item: any) => {
                            if (item.id === product.id) {
                                count = item.count
                                return true
                            }
                        })) {
                            return (
                                <ProductCart key={product.id}
                                title={product.title}
                                description={product.description}
                                cost={product.cost}
                                img={product.photo}
                                closeComponent={<DeleteFromChoosed id={product.id} />}
                                preferBtn
                                secondaryBlock={<ProductCounter id={product.id} count={count} />}
                            />
                            )
                        }
                    })}
                </div>
                <span>Загальна вартiсть - {orderedProducts.reduce((amount: any, item: any) => amount + (item.cost * item.count), 0)} ₴ </span>
            </div>
        </orderListContext.Provider>
    );
};

export default OrderedProductsList;