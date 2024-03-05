import React from 'react';
import './styles/header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className='header'>
            <ul className='header-list'>
                <li><Link className='navigation-link' to='/'>Каталог</Link></li>
                <li><Link className='navigation-link' to='/order-page'>Замовити</Link></li>
                <li><Link className='navigation-link' to='/coupones'>Купони</Link></li>
            </ul>
        </header>
    );
};

export default Header;