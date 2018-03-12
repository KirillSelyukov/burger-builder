import React from 'react';
import './BuildControls.css';
import { BuildControl } from './BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

export const BuildControls = (props) => (
    <div className='BuildControls'>
        {
            controls.map(ctrl => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={props.ingredientRemoved}
                />
            ))
        }
    </div>
)
