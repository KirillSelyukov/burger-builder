import React from 'react';
import { Aux } from '../../hoc/Auxiliary';
import './Layout.css';

export const Layout = (props) => {
    return (
        <Aux>
            <div>Toolbar, Sidedrower, Backdrop</div>
            <main className='Context'>{props.children}</main>
        </Aux>
    )
}