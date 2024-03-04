import React, { useEffect, useState } from 'react';
import getAllCoupones from './api/getAllCoupones';
import CouponeCart from '../../entities/CouponeCart/CouponeCart';
import './styles/couponesList.css';

const CouponesList = () => {
    const [coupones, setCoupones] = useState([]);

    useEffect(() => {
        getAllCoupones().then(data => setCoupones(JSON.parse(data.products)))
    }, [])
    return (
        <div className='copones-list'>
            {coupones && coupones.map((coupone: any) => {
                return (
                    <CouponeCart coupone={coupone.coupon} off={coupone.discount} />
                )
            })}
        </div>
    );
};

export default CouponesList;