import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from server root directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const env = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  RATE_LIMIT_WINDOW_MINUTES: parseInt(process.env.RATE_LIMIT_WINDOW_MINUTES || '15', 10),
  RATE_LIMIT_MAX_SUBMISSIONS: parseInt(process.env.RATE_LIMIT_MAX_SUBMISSIONS || '5', 10),
  MONGODB_URI: process.env.MONGODB_URI || '',
  SMTP: {
    HOST: process.env.SMTP_HOST || '',
    PORT: parseInt(process.env.SMTP_PORT || '587', 10),
    SECURE: process.env.SMTP_SECURE === 'true',
    USER: process.env.SMTP_USER || '',
    PASS: process.env.SMTP_PASS || '',
    NOTIFICATION_EMAIL: process.env.NOTIFICATION_EMAIL || '',
    FROM: process.env.EMAIL_FROM || '"UXpert Agency" <notifications@uxpert.agency>'
  }
};
