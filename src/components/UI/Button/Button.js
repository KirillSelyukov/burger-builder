import React from 'react';
import './Button.css';

export const Button = (props) => (
    <button
    disabled={props.disabled}
        className={['Button', props.className].join(' ')}
        onClick={props.clicked}>
        {props.children}
    </button>
);