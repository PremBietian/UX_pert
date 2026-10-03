import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { env } from './config/env.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { notFoundHandler, globalErrorHandler } from './middleware/errorHandler.js';

const app = express();

// Security Headers
app.use(helmet());

// CORS Configuration
const allowedOrigins = [
  env.FRONTEND_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://localhost:4173'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.some(o => origin.startsWith(o) || o === '*')) {
      return callback(null, true);
    }
    // Allow in development mode
    if (env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    callback(new Error('Blocked by CORS policy'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body Parsing Middleware
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// Global API Rate Limiting
app.use('/api', apiLimiter);

// API Routes
app.use('/api', enquiryRoutes);

// Root informational endpoint
app.get('/', (req, res) => {
  res.json({
    agency: 'UXpert',
    tagline: 'We Build. We Create. We Grow.',
    service: 'UXpert Enquiry API',
    status: 'online',
    documentation: {
      health: 'GET /api/health',
      submitEnquiry: 'POST /api/enquiries',
      listEnquiries: 'GET /api/enquiries'
    }
  });
});

// Error handling
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
