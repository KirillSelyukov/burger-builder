import React from 'react';

import './Order.css';

const Order = (props) => {
    const ingredients = [];

    for (let name in props.ingredients) {
        ingredients.push({
            name: name,
            amount: props.ingredients[name],

        });
    }

    const output = ingredients.map(ig => {
        return <span
            style={{
                textTransform: 'Capitalize',
                display: 'inline-block',
                margin: '0 8px',
                padding: '5px',
                border: '1px solid #ccc'
            }}
            key={ig.name}> {ig.name} ({ig.amount}) </span>;
    })

    return (
        <div className='Order'>
            <p>Ingredients: {output}</p>
            <p>Price:<strong> USD {props.price}</strong></p>
        </div>
    )
}

export default Order;
