import React, { Component } from 'react';
import { Button } from '../../../components/UI/Button';
import axios from '../../../axios-orders';
import { Spinner } from '../../../components/UI/Spinner';

import './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        },
        loading: false,

    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Max Max',
                address: {
                    street: 'Test street',
                    zipCode: '123124',
                    country: 'USA',
                },
                email: 'someemail@someemail.com'
            },
            deliveryMethod: 'ASAP'
        };

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => this.setState({ loading: false }))
    }

    render() {
        let form = (<form>
            <input className='Input' type="text" name='name' placeholder='Your Name' />
            <input className='Input' type="text" name='email' placeholder='Your Email' />
            <input className='Input' type="text" name='street' placeholder='Your Street' />
            <input className='Input' type="text" name='postalCode' placeholder='Your Postal Code' autoComplete='postalCode' />
            <Button className='Success' clicked={this.orderHandler}>ORDER</Button>
        </form>);
        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className='ContactData'>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;