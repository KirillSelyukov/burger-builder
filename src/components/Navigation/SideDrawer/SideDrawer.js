import React from 'react';
import { Logo } from '../../Logo/Logo';
import { NavigationItems } from '../NavigationItems/NavigationItems';
import { Aux } from '../../../hoc/Auxiliary';
import { Backdrop } from '../../UI/Backdrop';

import './SideDrawer.css';

export const SideDrawer = (props) => {
    let attachedClasses = ['SideDrawer', 'Close'];

    if (props.open) {
        attachedClasses = ['SideDrawer', 'Open'];
    }
    console.log('SideDrawer: ',props)

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className='Side-Drawer-Logo'>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </Aux>
    );
};
