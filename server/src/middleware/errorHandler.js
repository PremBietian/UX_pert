import { env } from '../config/env.js';

export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: `Resource not found: ${req.method} ${req.originalUrl}`
  });
}

export function globalErrorHandler(err, req, res, _next) {
  console.error('[Error] Unhandled server error:', err);

  const statusCode = err.statusCode || err.status || 500;
  const isDev = env.NODE_ENV === 'development';

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error occurred.',
    ...(isDev && { stack: err.stack })
  });
}
