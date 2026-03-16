// Logger meldinger med tidsstempel og nivå

function formatMeta(meta) {
  try {
    return Object.keys(meta).length ? JSON.stringify(meta) : '';
  } catch {
    return '[meta serialization error]';
  }
}

function log(level, message, meta = {}) {
  const timestamp = new Date().toISOString();
  const metaStr = formatMeta(meta);

  const output = `[${timestamp}] [${level.toUpperCase()}] ${message} ${metaStr}`;

  switch (level) {
    case 'error':
      console.error(output);
      break;
    case 'warn':
      console.warn(output);
      break;
    case 'info':
      console.info(output);
      break;
    default:
      console.log(output);
  }
}

const logger = {
  debug: (message, meta) => log('debug', message, meta),
  info: (message, meta) => log('info', message, meta),
  warn: (message, meta) => log('warn', message, meta),
  error: (message, meta) => log('error', message, meta),
};

module.exports = logger;


