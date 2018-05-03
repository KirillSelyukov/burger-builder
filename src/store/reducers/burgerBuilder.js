import * as actionTypes from '../actions/actions';

const initialState = {
    ingredients: { salad: 0, meat: 0, bacon: 0, cheese: 0 },
    totalPrice: 4,
}

const INGREDIET_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:

            var result = {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientsName]: state.ingredients[action.ingredientsName] + 1
                },
                totalPrice: state.totalPrice + INGREDIET_PRICES[action.ingredientsName]
            };
            return result
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientsName]: state.ingredients[action.ingredientsName] - 1
                },
                totalPrice : state.totalPrice - INGREDIET_PRICES[action.ingredientsName]

            };
        default:
            return state;
    }
}

export default reducer;