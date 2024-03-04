import React, { createContext, useEffect, useState } from 'react';
import './styles/orderedList.css';
import getChoosedProdcuts from './api/getChoosedProducts';
import ProductCart from '../../entities/ProductCart/ProductCart';
import DeleteFromChoosed from '../DeleteFromChoosed/DeleteFromChoosed';
import { useLocalStorage } from '../../shared/lib/hooks/useLocalStorage';
import ProductCounter from '../ProductCounter/ProductCounter';
import isCouponeExist from './api/isCouponeExist';

export const orderListContext = createContext<{orderedProducts: any, setOrderedProducts: any} | undefined>(undefined);

const OrderedProductsList = () => {
    const [choosedProducts, stChoosedProducts] = useState([]);
    const [orderedProducts, setOrderedProducts] = useLocalStorage([] ,'ordered');
    const [orderCost, setOrderCost] = useLocalStorage(0 ,'orderCost');
    const [discount ,setDiscount] = useState(undefined)

    useEffect(() => {
        if (localStorage.ordered) {
            try {
                getChoosedProdcuts(JSON.parse(localStorage.ordered))
                .then(data => stChoosedProducts(JSON.parse(data.products)));
            } catch (err) {
                console.error(err);
            }
        }
        setOrderCost(orderedProducts.reduce((amount: any, item: any) => amount + (item.cost * item.count), 0) * (!discount ? 1 : discount))
    }, [])

    function isCpouponeExist(event: any) {
        isCouponeExist(event.target.value).then((data: any) => {
            setDiscount((data.products === undefined ) ? undefined : JSON.parse(data["products"])[0].discount)
            setOrderCost((data.products === undefined ) ? undefined : orderedProducts.reduce((amount: any, item: any) => amount + (item.cost * item.count), 0) * JSON.parse(data["products"])[0].discount)
        })
    }

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
                <span>Загальна вартiсть без знижки - {orderedProducts.reduce((amount: any, item: any) => amount + (item.cost * item.count), 0)} ₴ </span>
                <input placeholder='введiть купон' style={{display: 'block'}} type="text" onBlur={isCpouponeExist} />
                {discount ?
                    <span>Загальна вартiсть з урахуванням знижки - {orderedProducts.reduce((amount: any, item: any) => amount + (item.cost * item.count), 0) * discount} ₴ </span> :
                    <span>Купон не введений або такого купона не iснуе</span>
                }
            </div>
        </orderListContext.Provider>
    );
};

export default OrderedProductsList;