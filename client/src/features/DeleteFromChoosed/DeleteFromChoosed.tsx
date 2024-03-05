import React, { useContext } from 'react';
import './styles/deleteFromChoosed.css'
import { orderListContext } from '../OrderedProductsList/OrderedProductsList';
import { DeleteFromChoosedPropsType } from './types/deleteItemProps';

const DeleteFromChoosed = ({id}: DeleteFromChoosedPropsType) => {
    const contextData = useContext(orderListContext)

    function deleteFromChoosed() {
        contextData?.setOrderedProducts((prev: any) => prev.filter((item: any) => item.id !== id))
    }
    return (
        <button className='delete-btn' onClick={deleteFromChoosed}>
            X
        </button>
    );
};

export default DeleteFromChoosed;