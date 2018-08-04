import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';
import { Button } from '../../../components/UI/Button';
import { Spinner } from '../../../components/UI/Spinner';
import {Input} from '../../../components/UI/Input';

import * as orderDispatcher from '../../../store/actions';
import withErrorHandler from '../../../hoc/WithErrorHandler';

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
                validation: {
                    required: true
                },
                valid: false,
                touched: false

            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'email',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                validation: {},
                value: 'fastest',
                valid: true
            },
        },
        formIsValid: false,
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    orderHandler = (event) => {
        console.log(event);
        event.preventDefault();
        const formData = {};
        for (let el in this.state.orderForm) {
            formData[el] = this.state.orderForm[el].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price.toFixed(2),
            orderData: formData,
        }
        this.props.onOrderBurger(order)
    }

    inputChangedHandler = (event, identifier) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedformEl = { ...updatedOrderForm[identifier] };

        updatedformEl.value = event.target.value;
        updatedformEl.valid = this.checkValidity(updatedformEl.value, updatedformEl.validation);
        updatedformEl.touched = true;

        updatedOrderForm[identifier] = updatedformEl;

        let formIsValid = true;
        for (let key in updatedOrderForm) {
            formIsValid = updatedOrderForm[key].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    }

    render() {
        if (this.props.loading) {
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
                        invalid={!el.config.valid}
                        shouldvalidate={el.config.validation}
                        touched={el.config.touched}
                        changed={(event) => this.inputChangedHandler(event, el.id)} />
                })}

                <Button className='Success' disabled={!this.state.formIsValid}>ORDER</Button>
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

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    };
}
const mapDistpatchToProps = (dispatch) => {
    return {
        onOrderBurger: (orderData) => dispatch(orderDispatcher.purchaseBurger(orderData))
    };
}

export default connect(mapStateToProps, mapDistpatchToProps)(withErrorHandler(ContactData, axios));
