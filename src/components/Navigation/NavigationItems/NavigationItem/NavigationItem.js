import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavigationItem.css'

export const NavigationItem = (props) => (
    <li className='NavigationItem'>
        <NavLink
            activeClassName='active'
            to={props.link}
            exact>
            {props.children}
        </NavLink>
    </li>
);
