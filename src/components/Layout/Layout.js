import React from 'react';
import { Aux } from '../../hoc/Auxiliary';
import './Layout.css';
import { Toolbar } from '../Navigation/Toolbar/Toolbar';
import { SideDrower } from '../Navigation/SideDrower/SideDrower';

export const Layout = (props) => {
    return (
        <Aux>
            <Toolbar />
            <SideDrower />
            <main className='Context'>{props.children}</main>
        </Aux>
    )
}