import React from 'react';
import './Toolbar.css';
import { Logo } from '../../Logo/Logo';

export const Toolbar = (props) => (
    <header className='Toolbar'>
        <div>MENU</div>
        <Logo />
        <nav>
            ...
        </nav>
    </header>
);