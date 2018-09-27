import { put } from 'redux-saga/effects';

import axios from '../axios-orders';

import * as actions from '../store/actions';

export function* purchaseBurgerSaga(action) {
  try {
    yield put(actions.purchaseBurgerStart());
    var response = yield axios.post(
      '/orders.json?auth=' + action.token,
      action.orderData
    );
    yield put(
      actions.purchaseBurgerSuccess(response.data.name, action.orderData)
    );
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}

export function* fetchOrderSaga(action) {
  try {
    yield put(actions.fetchOrdersStart());
    const queryParams =
      '?auth=' +
      action.token +
      '&orderBy="userId"&equalTo="' +
      action.userId +
      '"';

    const res = yield axios.get('/orders.json' + queryParams);
    const fetchedOrders = [];
    for (let key in res.data) {
      fetchedOrders.push({
        ...res.data[key],
        id: key
      });
    }
    yield put(actions.fetchOrdersSuccess(fetchedOrders));
  } catch (error) {
    yield put(actions.fetchOrdersFail(error));
  }
}
