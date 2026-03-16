// Kaller til ekstern kilde med aios
// Henter ut resultatlista 
// Normaliserer hvert element 
// Fanger feil ned try/catch


const { scrapeFinn } = require('./scraper/finn.scraper');
const logger = require('../utils/logger');

// RSS-løsning fungerte ikke (403) ekkel blokkering fra lame aktør, we find new ways - scraper brukes istedenfor
// const axios = require('axios');
// const { XMLParser } = require('fast-xml-parser');
// const parser = new XMLParser({ ignoreAttributes: false });
// async function searchFinnRSS(query) { ... }

async function searchFinn(query) {
  if (!query || !query.trim()) return [];

  try {
    const listings = await scrapeFinn(query.trim());
    logger.info('Hentet fra Finn', { count: listings.length });
    return listings;
  } catch (err) {
    logger.error('Feil i searchFinn', { message: err.message });
    return [];
  }
}

module.exports = { searchFinn };