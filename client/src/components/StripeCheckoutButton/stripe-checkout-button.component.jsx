import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

import logo from '../../assets/crown.svg';

const StripeCheckoutButton = ({
  price,
  priceForStripe,
  onToken,
  stripeKey
}) => (
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
    stripeKey={stripeKey}
  />
);

export default StripeCheckoutButton;
