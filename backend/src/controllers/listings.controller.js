// Tar imot HTTPS-forespørseler og sender svar tilbake

const { searchAndStore, getListings } = require('../services/listings.service');

// Krever q, henter fra finn, lagrer i databasen, returnerer resultater
async function search(req, res) {
  const { q } = req.query;

  if (!q || !q.trim()) {
    return res.status(400).json({ error: 'Søkeord mangler' });
  }

  try {
    const listings = await searchAndStore(q.trim());
    return res.json({ count: listings.length, listings });
  } catch (err) {
    console.error('Feil i search controller:', err.message);
    return res.status(500).json({ error: 'Noe gikk galt ved søk' });
  }
}

// Leser kun fra database, ikke fra finn, og kan bruke filtre 
async function getAll(req, res) {
  const { q, minPrice, maxPrice, location } = req.query;

  const parsedMinPrice =
    minPrice !== undefined ? parseInt(minPrice, 10) : null;

  const parsedMaxPrice =
    maxPrice !== undefined ? parseInt(maxPrice, 10) : null;

  if (minPrice !== undefined && Number.isNaN(parsedMinPrice)) {
    return res.status(400).json({ error: 'minPrice må være et tall' });
  }

  if (maxPrice !== undefined && Number.isNaN(parsedMaxPrice)) {
    return res.status(400).json({ error: 'maxPrice må være et tall' });
  }

  try {
    const listings = await getListings({
      query: q?.trim() || null,
      minPrice: parsedMinPrice,
      maxPrice: parsedMaxPrice,
      location: location?.trim() || null,
    });

    return res.json({ count: listings.length, listings });
  } catch (err) {
    console.error('Feil i getAll controller:', err.message);
    return res.status(500).json({ error: 'Noe gikk galt ved henting' });
  }
}

module.exports = { search, getAll };