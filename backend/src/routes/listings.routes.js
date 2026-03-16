// Definerer URL-endepunkter og kobler dem til controller-funksjoner

const express = require('express');
const router = express.Router();

const {
  search,
  getAll,
} = require('../controllers/listings.controller');

// Hent annonser fra databasen
router.get('/', getAll);

// Søk og synk annonser fra Finn
router.get('/search', search);

module.exports = router;