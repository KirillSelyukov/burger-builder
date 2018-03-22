import React, { Component } from 'react';

import axios from '../../../axios-orders';
import { Button } from '../../../components/UI/Button';
import { Spinner } from '../../../components/UI/Spinner';
import Input from '../../../components/UI/Input/Input';

import './ContactData.css';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
            },
            email: {
                elementType: 'email',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your E-Mail'
                },
                value: '',
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                value: '',
            },
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let el in this.state.orderForm) {
            formData[el] = this.state.orderForm[el].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price1: this.props.price,
            orderData: formData,
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => this.setState({ loading: false }))
        this.setState({ loading: true });
    }

    inputChangedHandler = (event, identifier) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedformEl = { ...updatedOrderForm[identifier] };
        updatedformEl.value = event.target.value;
        updatedOrderForm[identifier] = updatedformEl;
        this.setState({ orderForm: updatedOrderForm });
    }

    render() {
        if (this.state.loading) {
            return <Spinner />
        }
        const formElements = [];

        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements.map(el => {
                    return <Input
                        key={el.id}
                        elementType={el.config.elementType}
                        elementConfig={el.config.elementConfig}
                        value={el.config.value}
                        changed={(event) => this.inputChangedHandler(event, el.id)} />
                })}

                <Button className='Success'>ORDER</Button>
            </form>
        );

        return (
            <div className='ContactData'>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
