import React, { Component } from 'react';
import { connect } from 'react-redux'

import axios from '../../axios-orders'
import { Aux } from '../../hoc/Auxiliary'
import { Burger } from '../../components/Burger'
import { BuildControls } from '../../components/Burger/BuildControls'
import { Modal } from '../../components/UI/Modal'
import { OrederSummary } from '../../components/Burger/OrderSummary/OrderSummary'
import { Spinner } from '../../components/UI/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => { return sum + el }, 0)
        return sum > 0
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdd}
                        ingredientRemoved={this.props.onIngredientRemove}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.totalPrice}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );

            orderSummary = <OrederSummary
                price={this.props.totalPrice}
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdd: (ingName) => {
            dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientsName: ingName })
        },
        onIngredientRemove: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientsName: ingName })
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const BBuilder = connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
export { BBuilder as BurgerBuilder };