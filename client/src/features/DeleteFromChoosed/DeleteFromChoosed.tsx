import React, { useContext } from 'react';
import './styles/deleteFromChoosed.css'
import { useLocalStorage } from '../../shared/lib/hooks/useLocalStorage';
import { orderListContext } from '../OrderedProductsList/OrderedProductsList';

const DeleteFromChoosed = ({id}: {id: number}) => {
    // const [choosedProducts, setChoosedProducts] = useLocalStorage([] ,'ordered');

    const contextData = useContext(orderListContext)

    function deleteFromChoosed() {
        // const updatedList = choosedProducts;
        // (updatedList.filter((item: any) => {
        //     console.log(item, id);
        // }));
        contextData?.setOrderedProducts((prev: any) => prev.filter((item: any) => item.id !== id))
        // setChoosedProducts(choosedProducts.filter((item: any) => item.id !== id))
    }
    return (
        <button className='delete-btn' onClick={deleteFromChoosed}>
            X
        </button>
    );
};

export default DeleteFromChoosed;