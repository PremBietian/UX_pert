import app from './app.js';
import { env } from './config/env.js';

const server = app.listen(env.PORT, () => {
  console.log(`
==================================================
  UXpert Backend API Server
  "We Build. We Create. We Grow."
==================================================
  Status:      Running
  Port:        ${env.PORT}
  Environment: ${env.NODE_ENV}
  Health:      http://localhost:${env.PORT}/api/health
  Enquiries:   Gmail notification only
==================================================
`);
});

// Graceful shutdown
const shutdown = (signal) => {
  console.log(`[Server] Received ${signal}. Shutting down gracefully...`);

  server.close(() => {
    console.log('[Server] HTTP server closed.');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('[Server] Forcing shutdown.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));