// Starter server

const app = require('./app');
const { PORT } = require('./config/env');
const logger = require('./utils/logger');

const server = app.listen(PORT, '0.0.0.0', () => {
  logger.info('Server startet', { port: PORT });
});

server.on('error', (err) => {
  logger.error('Serverfeil', { message: err.message });
});
