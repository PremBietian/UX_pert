import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';

// General API Rate Limiter
export const apiLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MINUTES * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again later.'
  }
});

// Stricter Rate Limiter for Enquiry Submissions
export const enquiryLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MINUTES * 60 * 1000,
  max: env.RATE_LIMIT_MAX_SUBMISSIONS,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: `Too many project enquiries submitted recently. Please wait ${env.RATE_LIMIT_WINDOW_MINUTES} minutes before submitting another, or contact our founders directly via WhatsApp / phone.`
    });
  }
});
