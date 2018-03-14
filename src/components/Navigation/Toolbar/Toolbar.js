import React from 'react';
import './Toolbar.css';
import { Logo } from '../../Logo/Logo';
import { NavigationItems } from '../NavigationItems/NavigationItems';

export const Toolbar = (props) => (
    <header className='Toolbar'>
        <div>MENU</div>
        <div className='Tolbar-Logo'>
            <Logo />
        </div>
            {/* <Logo /> */}
        <nav className='DesktopOnly'>
            <NavigationItems />
        </nav>
    </header>
);