import React from 'react';
import { Aux } from '../../../hoc/Auxiliary';
import { Button } from '../../UI/Button';

export const OrederSummary = (props) => {
    const integredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
            </li>
        });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients: </p>
            <ul>
                {integredientSummary}
            </ul>
            <p>Total Price: <strong>{props.price.toFixed(2)}</strong></p>
            <p>Continuie to Checkout?</p>
            <Button className='Danger' clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button className='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    )
};
