const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

const stripeChargeCallback = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
};

// @route POST api/payment
// @desc Submits Stripe payment
const paymentApi = app => {
  app.post('/api/payment', (req, res) => {
    const body = {
      source: req.body.token.id,
      amount: req.body.amount,
      currency: 'usd'
    };

    stripe.charges.create(body, stripeChargeCallback(res));
  });
  return app;
};

module.exports = paymentApi;
