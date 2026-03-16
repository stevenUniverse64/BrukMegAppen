// Setter opp Express-appen med middleware og routes

const express = require('express');
const cors = require('cors');

const errorHandler = require('./middleware/errorHandler');
const listingsRoutes = require('./routes/listings.routes');

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' })); // Unngår fatty payloads som kan overbelaste serveren

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/listings', listingsRoutes);

// Error middleware må være sist
app.use(errorHandler);

module.exports = app;

