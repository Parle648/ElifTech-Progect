import React from 'react';
import CouponeCart from '../../entities/CouponeCart/CouponeCart';
import CouponesList from '../../features/CouponesList/CouponesList';

const CouponesPage = () => {
    return (
        <div>
            <CouponesList />
            {/* <CouponeCart coupone='1523' off={0.95} /> */}
        </div>
    );
};

export default CouponesPage;