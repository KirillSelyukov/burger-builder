import React from 'react';
import { Logo } from '../../Logo/Logo';
import { NavigationItems } from '../NavigationItems/NavigationItems';
import './SideDrower.css';

export const SideDrower = (props) => {
    return (
        <div className='SideDrower'>
            <div className='Side-Drawer-Logo'>
                <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
    );
};
