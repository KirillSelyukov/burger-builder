import * as actions from './actions';

export const addIngredient = ingredientsName => {
  return {
    type: actions.ADD_INGREDIENT,
    ingredientsName
  };
};

export const removeIngredient = ingredientsName => {
  return {
    type: actions.REMOVE_INGREDIENT,
    ingredientsName
  };
};

export const initIngredients = () => {
  return {
    type: actions.INIT_INGREDIENTS
  };
};
export const setIngredients = ingredients => {
  return {
    type: actions.SET_INGREDIENTS,
    ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actions.FETCH_INGREDIENTS_FAILED
  };
};
