import { all, call, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import UserActionTypes from '../user/user.types';
import { CartActionTypes } from '../cart/cart.types';
import {
  clearCart,
  paymentSubmitSuccess,
  paymentSubmitFailure
} from './cart.actions';

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* paymentSubmit({ payload: { amount, token } }) {
  try {
    const response = yield axios({
      url: '/api/payment',
      method: 'post',
      data: {
        amount,
        token
      }
    });
    const data = response.json();
    yield put(paymentSubmitSuccess(data));
  } catch (error) {
    yield put(paymentSubmitFailure(error));
  }
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* onPaymentSubmitStart() {
  yield takeLatest(CartActionTypes.PAYMENT_SUBMIT_START, paymentSubmit);
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess), call(onPaymentSubmitStart)]);
}
