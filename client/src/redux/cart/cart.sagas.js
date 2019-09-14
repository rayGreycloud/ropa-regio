import { all, call, takeLatest, put, select } from 'redux-saga/effects';
import axios from 'axios';

import { getUserCartRef } from '../../firebase/firebase.utils';
import UserActionTypes from '../user/user.types';
import { selectCurrentUser } from '../user/user.selectors';
import { CartActionTypes } from '../cart/cart.types';
import {
  clearCart,
  paymentSubmitSuccess,
  paymentSubmitFailure,
  clearPaymentStatus,
  setCartFromFirebase
} from './cart.actions';
import { selectCartItems } from './cart.selectors';

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* updateCartInFirebase() {
  const currentUser = yield select(selectCurrentUser);
  if (currentUser) {
    try {
      const cartRef = yield getUserCartRef(currentUser.id);
      const cartItems = yield select(selectCartItems);
      yield cartRef.update({ cartItems });
    } catch (error) {
      console.log(error);
    }
  }
}

export function* checkCartFromFirebase({ payload: user }) {
  const cartRef = yield getUserCartRef(user.id);
  const cartSnapshot = yield cartRef.get();
  yield put(setCartFromFirebase(cartSnapshot.data().cartItems));
}

export function* paymentSubmit({ payload }) {
  yield put(clearPaymentStatus());

  console.log('paymentSubmitSaga', payload.amount, payload.token);

  try {
    const response = yield axios({
      url: 'api/payment',
      method: 'post',
      data: {
        amount: payload.amount,
        token: payload.token
      }
    });
    console.log('response:', response);
    alert('Payment was successful');

    yield put(paymentSubmitSuccess(response));
  } catch (error) {
    alert('Payment error');
    yield put(paymentSubmitFailure(error));
  }
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* onUserSignIn() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, checkCartFromFirebase);
}

export function* onCartChange() {
  yield takeLatest(
    [
      CartActionTypes.ADD_ITEM,
      CartActionTypes.REMOVE_ITEM,
      CartActionTypes.DECREASE_ITEM_QTY
    ],
    updateCartInFirebase
  );
}

export function* onPaymentSubmitStart() {
  yield takeLatest(CartActionTypes.PAYMENT_SUBMIT_START, paymentSubmit);
}

export function* cartSagas() {
  yield all([
    call(onSignOutSuccess),
    call(onCartChange),
    call(onUserSignIn),
    call(onPaymentSubmitStart)
  ]);
}
