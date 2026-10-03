import { emailService } from '../services/emailService.js';

export const enquiryController = {
  /**
   * POST /api/enquiries
   * Submit a new client project enquiry
   */
  async submitEnquiry(req, res, next) {
    try {
      const data = req.validatedBody;

      const enquiry = {
        ...data,
        createdAt: new Date().toISOString()
      };

      // Send email and WAIT for it to finish.
      // The website only shows success when Gmail accepts the email.
      const emailResult = await emailService.sendEnquiryNotification(enquiry);

      if (!emailResult.success) {
        return res.status(500).json({
          success: false,
          message: 'We could not send your enquiry right now. Please try again or contact UXpert directly.'
        });
      }

      return res.status(201).json({
        success: true,
        message: 'Thank you for contacting UXpert. Your enquiry has been received successfully.'
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/health
   */
  getHealth(req, res) {
    res.status(200).json({
      status: 'ok',
      agency: 'UXpert',
      tagline: 'We Build. We Create. We Grow.',
      timestamp: new Date().toISOString()
    });
  }
};