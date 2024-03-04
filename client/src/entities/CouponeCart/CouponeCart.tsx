import React from 'react';
import './styles/coupone.css';

const CouponeCart = ({coupone, off}: {coupone: string, off: number}) => {
    return (
        <div className='coupone-block'>
            <h2>coupone for {Math.floor((1 - off)*100)}% OFF</h2>
            <button data-value={coupone} >copy</button>
        </div>
    );
};

export default CouponeCart;