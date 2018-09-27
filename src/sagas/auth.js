import { put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import axios from 'axios';

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

export function* authUserSaga(action) {
  yield put(actionTypes.authStart());

  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };
  let url =
    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCb5CTQi5_vI_D8T3tlGhxDgO74gBnmfyc';
  if (!action.isSignup) {
    url =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCb5CTQi5_vI_D8T3tlGhxDgO74gBnmfyc';
  }
  try {
    const res = yield axios.post(url, authData);
    const expirationDate = yield new Date(
      new Date().getTime() + res.data.expiresIn * 1000
    );
    yield localStorage.setItem('token', res.data.idToken);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', res.data.localId);
    yield put(actionTypes.authSuccess(res.data.idToken, res.data.localId));
    yield put(actionTypes.checkAuthTimeout(res.data.expiresIn));
  } catch (error) {
    yield put(actionTypes.authFail(error.response.data.error));
  }
}
