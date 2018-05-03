import * as actions from './actions';

export const addIngredient =(ingredientsName) =>{
    return {
        type: actions.ADD_INGREDIENT,
        ingredientsName
    }
}

export const removeIngredient = (ingredientsName) =>{
    return {
        type: actions.REMOVE_INGREDIENT,
        ingredientsName
    }
}