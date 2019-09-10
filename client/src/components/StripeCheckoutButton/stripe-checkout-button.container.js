import React from 'react';
// import { connect } from 'react-redux';
import axios from 'axios';

import StripeCheckoutButton from './stripe-checkout-button.component';

const StripeCheckoutButtonContainer = ({ price }) => {
  const priceForStripe = price * 100;

  // Put key in reducer, grab here in mapStateToProps
  const publishableKey = 'pk_test_MqZA9i4PbgrUODccnd0enlQJ';

  // Add action creator to start payment submission and inject here with mapDispatchToProps
  // Add reducer cases for PAYMENT_SUCCESS PAYMENT_FAILURE
  // Move api request to saga
  const onToken = token => {
    axios({
      url: '/api/payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token
      }
    })
      .then(response => {
        alert('Payment was successful');
      })
      .catch(error => {
        console.log(
          'There was a problem with your payment. Make check your CC info and try again.'
        );
      });
  };

  return (
    <StripeCheckoutButton
      price={price}
      priceForStripe={priceForStripe}
      onToken={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButtonContainer;
