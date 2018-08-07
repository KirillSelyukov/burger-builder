import React from 'react';
import { Logo } from '../../Logo/Logo';
import { NavigationItems } from '../NavigationItems/NavigationItems';
import { DrawerToggle } from '../SideDrawer/DrawerToggle/DrawerToggle';

import './Toolbar.css';

export const Toolbar = (props) => (
    <header className='Toolbar'>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div className='Tolbar-Logo'>
            <Logo />
        </div>
        <nav className='DesktopOnly'>
            <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
    </header>
);