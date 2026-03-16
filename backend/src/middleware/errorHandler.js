// Global feilhåndterer – fanger opp feil som ikke er håndtert andre steder

function errorHandler(err, req, res, next) {
  console.error('Uhåndtert feil:', err);

  if (res.headersSent) {
    return next(err);
  }

  const status = err.status || 500;

  const message =
    status === 500
      ? 'Intern serverfeil'
      : err.message || 'Feil oppstod';

  res.status(status).json({
    error: message,
  });
}

module.exports = errorHandler;