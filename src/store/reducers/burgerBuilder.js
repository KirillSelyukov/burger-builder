import * as actionTypes from '../actions/actions';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    loading: false,
    error: false,
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
                totalPrice: state.totalPrice - INGREDIET_PRICES[action.ingredientsName]

            };
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat,
                },
                totalPrice: initialState.totalPrice,
                error: false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default reducer;