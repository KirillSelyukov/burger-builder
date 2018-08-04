import * as actions from './actions';
import axios from '../../axios-orders'

export const addIngredient = (ingredientsName) => {
    return {
        type: actions.ADD_INGREDIENT,
        ingredientsName
    }
}

export const removeIngredient = (ingredientsName) => {
    return {
        type: actions.REMOVE_INGREDIENT,
        ingredientsName
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(({ data }) => {
                dispatch(setIngredients(data))
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed())
            });
    }
}
const setIngredients = (ingredients) => {
    return {
        type: actions.SET_INGREDIENTS,
        ingredients
    }
}

const fetchIngredientsFailed = () => {
    return {
        type: actions.FETCH_INGREDIENTS_FAILED
    }
}