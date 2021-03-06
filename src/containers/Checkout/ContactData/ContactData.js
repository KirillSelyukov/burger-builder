import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';
import { Button } from '../../../components/UI/Button';
import { Spinner } from '../../../components/UI/Spinner';
import { Input } from '../../../components/UI/Input';

import * as orderDispatcher from '../../../store/actions';
import withErrorHandler from '../../../hoc/WithErrorHandler';
import { updateObject, checkValidity } from '../../../shared/utility';

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
    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let el in this.state.orderForm) {
            formData[el] = this.state.orderForm[el].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price.toFixed(2),
            orderData: formData,
            userId: this.props.userId
        }
        this.props.onOrderBurger(order, this.props.token)
    }

    inputChangedHandler = (event, identifier) => {
        const updatedformEl = updateObject(this.state.orderForm[identifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[identifier].validation),
            touched: true
        });
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [identifier]: updatedformEl
        });

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
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
}
const mapDistpatchToProps = (dispatch) => {
    return {
        onOrderBurger: (orderData, token) => dispatch(orderDispatcher.purchaseBurger(orderData, token))
    };
}

export default connect(mapStateToProps, mapDistpatchToProps)(withErrorHandler(ContactData, axios));
