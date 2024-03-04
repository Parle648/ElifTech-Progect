import React from 'react';
import OrderForm from '../../features/OrderForm/OrderForm';
import OrderedProductsList from '../../features/OrderedProductsList/OrderedProductsList';

const OrderPage = () => {
    return (
        <div>
            <OrderForm />
            <OrderedProductsList />
        </div>
    );
};

export default OrderPage;