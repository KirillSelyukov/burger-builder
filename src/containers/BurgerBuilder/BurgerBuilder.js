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

const INGREDIET_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3,
}

class BurgerBuilder extends Component {
    state = {
        //ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount = () => {
        console.log(this.props);
        // axios.get('/ingredients.json')
        //     .then(({ data }) => {
        //         this.setState({ ingredients: data })
        //     })
        //     .catch(error => { this.setState({ error: true }) });
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => { return sum + el }, 0)
        this.setState({ purchasable: sum > 0 })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.props.ings[type]
        const updatedCount = oldCount + 1
        const updatedIngredients = { ...this.props.ings }
        updatedIngredients[type] = updatedCount
        const priceAddition = INGREDIET_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.props.ings[type]
        if (oldCount <= 0) {
            return
        }
        const updatedCount = oldCount - 1
        const updatedIngredients = { ...this.props.ings }
        updatedIngredients[type] = updatedCount
        const priceDeduction = INGREDIET_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceDeduction
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
        this.updatePurchaseState(updatedIngredients)
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.props.ings) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
        }
        queryParams.push('price=' + this.state.totalPrice.toFixed(2));

        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString,
        });
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
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );

            orderSummary = <OrederSummary
                price={this.state.totalPrice}
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
            dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientsName: ingName })},
        onIngredientRemove: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientsName: ingName })
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients
    }
}

const BBuilder = connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
export { BBuilder as BurgerBuilder };