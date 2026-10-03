import { z } from 'zod';

export const enquiryValidationSchema = z.object({
  name: z
    .string({ required_error: 'Please provide your full name.' })
    .trim()
    .min(2, 'Name must be at least 2 characters long.')
    .max(100, 'Name cannot exceed 100 characters.'),
  
  organization: z
    .string()
    .trim()
    .max(100, 'Organization name cannot exceed 100 characters.')
    .optional()
    .or(z.literal('')),

  email: z
    .string({ required_error: 'Please provide an email address.' })
    .trim()
    .email('Please enter a valid email address.')
    .max(120, 'Email cannot exceed 120 characters.')
    .toLowerCase(),

  phone: z
    .string({ required_error: 'Please provide a contact phone or WhatsApp number.' })
    .trim()
    .min(7, 'Phone number must be at least 7 digits.')
    .max(25, 'Phone number is too long.')
    .regex(/^[+0-9\s\-()]+$/, 'Phone number contains invalid characters.'),

  service: z.enum([
    'Web Development',
    'Video Editing',
    'Logo & Brand Design',
    'Social Media Management',
    'Ad Management',
    'Event Management',
    'Other'
  ], {
    errorMap: () => ({ message: 'Please select a valid UXpert service.' })
  }),

  description: z
    .string({ required_error: 'Please provide a project description.' })
    .trim()
    .min(10, 'Project description must be at least 10 characters long.')
    .max(3000, 'Project description cannot exceed 3000 characters.')
});

export function validateEnquiry(req, res, next) {
  const result = enquiryValidationSchema.safeParse(req.body);

  if (!result.success) {
    const formattedErrors = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] || 'form';
      if (!formattedErrors[field]) {
        formattedErrors[field] = issue.message;
      }
    }

    return res.status(400).json({
      success: false,
      message: 'Validation failed. Please correct the highlighted errors.',
      errors: formattedErrors
    });
  }

  // Attach sanitized, validated data to request
  req.validatedBody = result.data;
  next();
}
