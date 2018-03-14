import React from 'react';
import './Button.css';

export const Button = (props) => (
    <button
        className={['Button', props.className].join(' ')}
        onClick={props.clicked}>
        {props.children}
    </button>
);