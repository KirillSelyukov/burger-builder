import React from 'react';
import { Aux } from '../../hoc/Auxiliary';

export const Layout = (props) => {
    return (
        <Aux>
            <div>Toolbar, Sidedrower, Backdrop</div>
            <main>{props.children}</main>
        </Aux>
    )
}