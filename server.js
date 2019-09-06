const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

// If local, include .env
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

// Include Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, 'client/build')));
  // All routes to build file
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Routes
app.post('/payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd'
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    }
    res.status(200).send({ success: stripeRes });
  });
});

// Set port for heroku or local
const PORT = process.env.PORT || 5000;
// Start server
app.listen(PORT, error => {
  if (error) throw error;
  console.log(`Listening on port ${PORT}`);
});
