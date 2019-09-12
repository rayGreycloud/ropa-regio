const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const paymentRoutes = require('./routes/api/payment');

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// Routes
app.use('/api/payment', paymentRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, 'client/build')));
  // All routes to build file
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Set port for heroku or local
const PORT = process.env.PORT || 5000;
// Start server
app.listen(PORT, error => {
  if (error) throw error;
  console.log(`Listening on port ${PORT}`);
});
