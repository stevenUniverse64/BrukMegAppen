// Skriver til database og leser fra database 

const pool = require('../config/db');

async function upsertListing(listing) {
  if (!listing || !listing.source || !listing.external_id || !listing.title || !listing.listing_url) {
    throw new Error('Ugyldig listing-data');
  }

  const result = await pool.query(
    `INSERT INTO listings
      (source, external_id, title, description, price, location, image_url, listing_url, category, published_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
     ON CONFLICT (source, external_id) DO UPDATE SET
       title = EXCLUDED.title,
       description = EXCLUDED.description,
       price = EXCLUDED.price,
       location = EXCLUDED.location,
       image_url = EXCLUDED.image_url,
       listing_url = EXCLUDED.listing_url,
       category = EXCLUDED.category,
       published_at = EXCLUDED.published_at,
       updated_at = NOW()
     RETURNING *`,
    [
      listing.source,
      listing.external_id,
      listing.title,
      listing.description,
      listing.price,
      listing.location,
      listing.image_url,
      listing.listing_url,
      listing.category,
      listing.published_at,
    ]
  );

  return result.rows[0];
}

async function findListings({ query, minPrice, maxPrice, location } = {}) {
  let sql = `SELECT * FROM listings WHERE 1=1`;
  const params = [];

  if (query) {
    params.push(`%${query}%`);
    sql += ` AND (title ILIKE $${params.length} OR description ILIKE $${params.length})`;
  }

  if (minPrice !== undefined && minPrice !== null) {
    params.push(minPrice);
    sql += ` AND price >= $${params.length}`;
  }

  if (maxPrice !== undefined && maxPrice !== null) {
    params.push(maxPrice);
    sql += ` AND price <= $${params.length}`;
  }

  if (location) {
    params.push(`%${location}%`);
    sql += ` AND location ILIKE $${params.length}`;
  }

  sql += ` ORDER BY published_at DESC NULLS LAST LIMIT 100`;

  const result = await pool.query(sql, params);
  return result.rows;
}

module.exports = { upsertListing, findListings };

