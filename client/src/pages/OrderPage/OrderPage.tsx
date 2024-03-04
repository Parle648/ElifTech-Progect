import React from 'react';
import OrderForm from '../../features/OrderForm/OrderForm';
import OrderedProductsList from '../../features/OrderedProductsList/OrderedProductsList';
import './styles/orderedPage.css'

const OrderPage = () => {
    return (
        <div className='ordered-page'>
            <OrderForm />
            <OrderedProductsList />
        </div>
    );
};

export default OrderPage;