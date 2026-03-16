// Håndterer søk og lagring til database sammen med repository

const { searchFinn } = require('./finn.service');
const { upsertListing, findListings } = require('../repositories/listings.repository');

async function searchAndStore(query) {
  const finnListings = await searchFinn(query);
  const results = [];

  for (const listing of finnListings) {
    if (!listing || !listing.external_id) continue;

    try {
      const saved = await upsertListing(listing);
      results.push(saved);
    } catch (err) {
      console.error('Feil ved lagring av annonse:', err.message);
    }
  }

  return results;
}

async function getListings(filters) {
  return findListings(filters);
}

module.exports = { searchAndStore, getListings };