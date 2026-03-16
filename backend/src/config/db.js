// Lager en pool med database-tilkoblinger så man ikke oppretter en ny tilkobling per forespørsel
console.log('DB config:', require('./env').DB);
const { Pool } = require('pg');
const { DB } = require('./env');

const pool = new Pool({
  ...DB,
  ssl: false,
});

pool.on('connect', () => {
  console.log('Koblet til PostgreSQL');
});

pool.on('error', (err) => {
  console.error('PostgreSQL feil:', err);
});

module.exports = pool;
