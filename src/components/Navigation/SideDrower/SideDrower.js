import React from 'react';
import { Logo } from '../../Logo/Logo';
import { NavigationItems } from '../NavigationItems/NavigationItems';
import './SideDrower.css';

export const SideDrower = (props) => {
    return (
        <div className='SideDrower'>
            <Logo />
            <nav>
                <NavigationItems />
            </nav>
        </div>
    );
};
