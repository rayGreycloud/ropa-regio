const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

const stripeChargeCallback = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
};

// @route GET api/payment/test
// @desc Tests payment route
router.get('/test', (req, res) =>
  res.json({
    msg: 'Payment Route works!'
  })
);

// @route POST api/payment
// @desc Submits Stripe payment
router.post('/', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd'
  };

  stripe.charges.create(body, stripeChargeCallback(res));
});

module.exports = router;
