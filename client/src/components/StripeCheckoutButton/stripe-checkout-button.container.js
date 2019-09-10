import React from 'react';
import { connect } from 'react-redux';

import StripeCheckoutButton from './stripe-checkout-button.component';

import { paymentSubmitStart } from '../../redux/cart/cart.actions';

const StripeCheckoutButtonContainer = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_MqZA9i4PbgrUODccnd0enlQJ';

  return (
    <StripeCheckoutButton
      price={price}
      priceForStripe={priceForStripe}
      onToken={onToken}
      stripeKey={publishableKey}
    />
  );
};

const mapDispatchToProps = dispatch => ({
  paymentSubmit: ({ priceForStripe, token }) =>
    dispatch(paymentSubmitStart({ priceForStripe, token }))
});

export default connect(
  null,
  mapDispatchToProps
)(StripeCheckoutButtonContainer);
