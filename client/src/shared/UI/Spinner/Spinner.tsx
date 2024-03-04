import React from 'react';
import './styles/spinner.css'

const Spinner = ({disabled}: {disabled: boolean}) => {
    return (
        <div className={`loader-wrapper ${disabled && 'disabled'}`}>
            <div className='loader'>
                
            </div>
        </div>
    );
};


export default Spinner;