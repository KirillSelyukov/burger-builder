import { put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as actionTypes from '../store/actions';

export function* logoutSaga(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');

  yield put(actionTypes.logoutSucceed());
}

export function* checkAuthTimeoutSaga(actions) {
  yield delay(actions.expirationTime * 1000);
  yield put(actionTypes.logout());
}
