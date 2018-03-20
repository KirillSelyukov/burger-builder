import React from "react";
import { Burger } from "../../Burger";
import { Button } from "../../UI/Button";

import './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className='CheckoutSummary'>
            <h1>We hope it tastes well!</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button className='Danger' clicked> CANCEL </Button>
            <Button className='Success' clicked> CONTINUE </Button>
        </div>
    )
}

export default checkoutSummary;
