import React from 'react';
import './styles/coupone.css';
import { CouponeProps } from './types/couponePropsType';

const CouponeCart = ({coupone, off}: CouponeProps) => {
    function copyToClickBoard() {
        navigator.clipboard.writeText(coupone)
        .then(() => alert('Скопiйована до буферу обмiну'))
        .catch(err => console.error(err))
    }
    return (
        <div className='coupone-block'>
            <h2>coupone for {Math.floor((1 - off)*100)}% OFF</h2>
            <button onClick={copyToClickBoard} >copy</button>
        </div>
    );
};

export default CouponeCart;