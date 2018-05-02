import * as actionTypes from './actions';

const initialState = {
    ingredients: { salad: 0, meat: 0, bacon: 0, cheese: 0 },
    totalPrice: 4,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:

            var result = {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientsName]: state.ingredients[action.ingredientsName] + 1
                }
            };
            return result
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientsName]: state.ingredients[action.ingredientsName] - 1
                }

            };
        default:
            return state;
    }
}

export default reducer;