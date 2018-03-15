import React, { Component } from 'react';
import { Aux } from '../../../hoc/Auxiliary';
import { Button } from '../../UI/Button';

export class OrederSummary extends Component {
    integredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
            </li>
        });

    render() {
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients: </p>
                <ul>
                    {this.integredientSummary}
                </ul>
                <p>Total Price: <strong>{this.props.price.toFixed(2)}</strong></p>
                <p>Continuie to Checkout?</p>
                <Button className='Danger' clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button className='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        )
    }
};
