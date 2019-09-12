import React from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';

import logo from '../../assets/crown.svg';

import { paymentSubmitStart } from '../../redux/cart/cart.actions';

const StripeCheckoutButton = ({ price, paymentSubmit }) => {
  const priceForStripe = price * 100;
  const stripePublishableKey = 'pk_test_MqZA9i4PbgrUODccnd0enlQJ';

  const handleOnToken = token => {
    const data = {
      amount: priceForStripe,
      token
    };

    paymentSubmit(data);
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='Ropa Regio'
      billingAddress
      shippingAddress
      image={logo}
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={handleOnToken}
      stripeKey={stripePublishableKey}
    />
  );
};

const mapDispatchToProps = dispatch => ({
  paymentSubmit: data => {
    dispatch(paymentSubmitStart(data));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(StripeCheckoutButton);
