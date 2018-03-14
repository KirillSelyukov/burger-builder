import React from 'react';
import { Aux } from '../../hoc/Auxiliary';
import './Layout.css';
import { Toolbar } from '../Navigation/Toolbar/Toolbar';

export const Layout = (props) => {
    return (
        <Aux>
            <Toolbar />
            <main className='Context'>{props.children}</main>
        </Aux>
    )
}