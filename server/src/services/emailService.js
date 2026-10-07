import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  if (!env.SMTP.HOST || !env.SMTP.USER || !env.SMTP.PASS) {
    return null;
  }

  transporter = nodemailer.createTransport({
    host: env.SMTP.HOST,
    port: env.SMTP.PORT,
    secure: env.SMTP.SECURE,
    auth: {
      user: env.SMTP.USER,
      pass: env.SMTP.PASS
    }
  });

  return transporter;
}

export const emailService = {
  async sendEnquiryNotification(enquiry) {
    const mailer = getTransporter();

    // If SMTP is unconfigured, log clean simulation without error
    if (!mailer) {
      console.log(
        `[EmailService] Notification simulated (SMTP not configured in .env): Registration from "${enquiry.name}" (${enquiry.email}) for "${enquiry.service}".`
      );
      return { success: true, simulated: true };
    }

    try {
      const recipientString = env.SMTP.NOTIFICATION_EMAIL || env.SMTP.USER;
      const recipients = recipientString
        .split(',')
        .map((e) => e.trim())
        .filter(Boolean);

      const mailOptions = {
        from: env.SMTP.FROM || `"UX_PERT Agency" <${env.SMTP.USER}>`,
        to: recipients,
        subject: `New UX_PERT Client Registration [${enquiry.requestId || 'UXP'}] - ${enquiry.name}`,
        text: `
New UX_PERT Client Registration:

Client Name: ${enquiry.name}
Company / Business: ${enquiry.organization || 'Not provided'}
Email: ${enquiry.email}
Phone / WhatsApp: ${enquiry.phone || 'Not provided'}
City / Location: ${enquiry.city || 'Not provided'}
Selected Service(s): ${enquiry.service}
Budget Range: ${enquiry.budget || 'Not specified'}
Target Timeline: ${enquiry.timeline || 'Flexible'}
Request ID: ${enquiry.requestId || 'N/A'}
Submission Time: ${enquiry.createdAt || new Date().toISOString()}

Project Description:
${enquiry.description}
        `.trim(),
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #07070B; color: #FFFFFF; border-radius: 12px; padding: 24px; border: 1px solid #1E1E28;">
            <div style="border-bottom: 1px solid #272733; padding-bottom: 16px; margin-bottom: 20px;">
              <h2 style="margin: 0; color: #8B5CF6; font-size: 20px;">New UX_PERT Client Registration</h2>
              <p style="margin: 4px 0 0 0; color: #A1A1AA; font-size: 13px;">Request Reference: ${enquiry.requestId || 'N/A'}</p>
            </div>

            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; color: #A1A1AA; width: 140px;">Client Name:</td>
                <td style="padding: 8px 0; color: #FFFFFF; font-weight: bold;">${enquiry.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #A1A1AA;">Company:</td>
                <td style="padding: 8px 0; color: #FFFFFF;">${enquiry.organization || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #A1A1AA;">Email:</td>
                <td style="padding: 8px 0; color: #8B5CF6;"><a href="mailto:${enquiry.email}" style="color: #8B5CF6; text-decoration: none;">${enquiry.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #A1A1AA;">Phone / WhatsApp:</td>
                <td style="padding: 8px 0; color: #FFFFFF;">${enquiry.phone || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #A1A1AA;">City / Location:</td>
                <td style="padding: 8px 0; color: #FFFFFF;">${enquiry.city || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #A1A1AA;">Selected Service(s):</td>
                <td style="padding: 8px 0; color: #C084FC; font-weight: bold;">${enquiry.service}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #A1A1AA;">Budget Range:</td>
                <td style="padding: 8px 0; color: #34D399; font-weight: bold;">${enquiry.budget || 'Unspecified'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #A1A1AA;">Timeline:</td>
                <td style="padding: 8px 0; color: #FFFFFF;">${enquiry.timeline || 'Flexible'}</td>
              </tr>
            </table>

            <div style="background: #101018; border: 1px solid #272733; border-radius: 8px; padding: 16px; margin-top: 16px;">
              <div style="color: #A1A1AA; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Project Scope & Description:</div>
              <div style="color: #F4F4F5; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${enquiry.description}</div>
            </div>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #272733; font-size: 12px; color: #71717A; text-align: center;">
              UX_PERT Digital & Media Agency — We Build. We Create. We Grow.
            </div>
          </div>
        `
      };

      const info = await mailer.sendMail(mailOptions);
      console.log(`[EmailService] Notification email sent successfully: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('[EmailService] Failed to send notification email:', error.message);
      return { success: false, error: error.message };
    }
  }
};
