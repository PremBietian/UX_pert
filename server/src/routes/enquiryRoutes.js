import { Router } from 'express';
import { enquiryController } from '../controllers/enquiryController.js';
import { validateEnquiry } from '../middleware/validateRequest.js';
import { enquiryLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Health check
router.get('/health', enquiryController.getHealth);

// Submit enquiry
router.post(
  '/enquiries',
  enquiryLimiter,
  validateEnquiry,
  enquiryController.submitEnquiry
);

export default router;