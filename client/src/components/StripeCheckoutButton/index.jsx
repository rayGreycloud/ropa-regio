import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

import logo from '../../assets/crown.svg';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_MqZA9i4PbgrUODccnd0enlQJ';

  const onToken = token => {
    axios({
      url: 'api/payment',
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
    <StripeCheckout
      label='Pay Now'
      name='Ropa Regio'
      billingAddress
      shippingAddress
      image={logo}
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
