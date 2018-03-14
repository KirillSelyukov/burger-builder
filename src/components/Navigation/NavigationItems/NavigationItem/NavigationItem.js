import React from 'react';
import './NavigationItem.css'

export const NavigationItem = (props) => (
    <li className='NavigationItem'>
        <a href={props.link}
            className={props.active ? 'active' : null}>
            {props.children}
        </a>
    </li>
);
