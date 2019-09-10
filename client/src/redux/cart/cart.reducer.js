import { CartActionTypes } from './cart.types';
import {
  addItemToCart,
  removeItemFromCart,
  decreaseItemQuantity
} from './cart.utils';

const INITIAL_STATE = {
  cartItems: [],
  isHidden: true,
  paymentData: null,
  paymentError: null
};

const {
  ADD_ITEM,
  REMOVE_ITEM,
  DECREASE_ITEM_QTY,
  TOGGLE_CART_HIDDEN,
  CLEAR_CART,
  PAYMENT_SUBMIT_SUCCESS,
  PAYMENT_SUBMIT_FAILURE
} = CartActionTypes;

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload)
      };
    case REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload)
      };
    case DECREASE_ITEM_QTY:
      return {
        ...state,
        cartItems: decreaseItemQuantity(state.cartItems, action.payload)
      };
    case TOGGLE_CART_HIDDEN:
      return {
        ...state,
        isHidden: !state.isHidden
      };
    case CLEAR_CART:
      return {
        ...state,
        cartItems: []
      };
    case PAYMENT_SUBMIT_SUCCESS:
      return {
        ...state,
        paymentData: action.payload,
        paymentError: null
      };
    case PAYMENT_SUBMIT_FAILURE:
      return {
        ...state,
        paymentError: action.payload
      };
    default:
      return state;
  }
};

export default cartReducer;
