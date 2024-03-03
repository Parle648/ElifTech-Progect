import React from 'react';
import './styles/header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className='header'>
            <ul>
                <li><Link to='/'>catalog</Link></li>
                <li><Link to='/order-page'>order</Link></li>
                <li><Link to='/orders'>orders</Link></li>
                <li><Link to='/coupones'>coupones</Link></li>
            </ul>
        </header>
    );
};

export default Header;