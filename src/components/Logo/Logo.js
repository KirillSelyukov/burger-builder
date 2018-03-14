import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import './Logo.css';

export const Logo = () => (
    <div className='Logo'>
        <img src={burgerLogo} alt='MyBurger' />
    </div>
);
