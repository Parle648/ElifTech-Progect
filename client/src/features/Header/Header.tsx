import React from 'react';
import './styles/header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className='header'>
            <ul className='header-list'>
                <li><Link className='navigation-link' to='/'>catalog</Link></li>
                <li><Link className='navigation-link' to='/order-page'>order</Link></li>
                <li><Link className='navigation-link' to='/orders'>orders</Link></li>
                <li><Link className='navigation-link' to='/coupones'>coupones</Link></li>
            </ul>
        </header>
    );
};

export default Header;