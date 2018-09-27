import { put } from 'redux-saga/effects';
import axios from '../axios-orders';

import * as actions from '../store/actions';

export function* initIngredientsSaga() {
  try {
    var { data } = yield axios.get('/ingredients.json');
    yield put(actions.setIngredients(data));
  } catch (error) {
    yield put(actions.fetchIngredientsFailed());
  }
}
