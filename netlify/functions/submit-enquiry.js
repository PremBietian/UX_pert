import nodemailer from 'nodemailer';

export async function handler(event) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 455,
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');

    if (!data.name || !data.email || !data.description) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required registration fields (name, email, description).' })
      };
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const notificationEmail = process.env.NOTIFICATION_EMAIL || smtpUser || 'prem.mahendrakar@uxpert.agency';

    let simulated = false;


    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(smtpPort),
        secure: Number(smtpPort) === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      const mailOptions = {
        from: process.env.EMAIL_FROM || `"UX_PERT Agency" <${smtpUser}>`,
        to: notificationEmail,
        subject: `[New UX_PERT Client Registration] ${data.requestId || ''} — ${data.name}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #07070B; color: #FFFFFF; border-radius: 12px; padding: 24px; border: 1px solid #1E1E28;">
            <div style="border-bottom: 1px solid #272733; padding-bottom: 16px; margin-bottom: 20px;">
              <h2 style="margin: 0; color: #8B5CF6; font-size: 20px;">UX_PERT — New Client Registration</h2>
              <p style="margin: 4px 0 0 0; color: #A1A1AA; font-size: 13px;">Request Reference: ${data.requestId || 'N/A'}</p>
            </div>

            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; color: #A1A1AA; width: 140px;">Client Name:</td>
                <td style="padding: 8px 0; color: #FFFFFF; font-weight: bold;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #A1A1AA;">Company:</td>
                <td style="padding: 8px 0; color: #FFFFFF;">${data.organization || 'Individual'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #A1A1AA;">Email:</td>
                <td style="padding: 8px 0; color: #8B5CF6;"><a href="mailto:${data.email}" style="color: #8B5CF6; text-decoration: none;">${data.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #A1A1AA;">Phone / WhatsApp:</td>
                <td style="padding: 8px 0; color: #FFFFFF;">${data.phone || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #A1A1AA;">City / Location:</td>
                <td style="padding: 8px 0; color: #FFFFFF;">${data.city || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #A1A1AA;">Selected Service(s):</td>
                <td style="padding: 8px 0; color: #C084FC; font-weight: bold;">${data.service || data.services}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #A1A1AA;">Budget Range:</td>
                <td style="padding: 8px 0; color: #34D399; font-weight: bold;">${data.budget || 'Unspecified'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #A1A1AA;">Timeline:</td>
                <td style="padding: 8px 0; color: #FFFFFF;">${data.timeline || 'Flexible'}</td>
              </tr>
            </table>

            <div style="background: #101018; border: 1px solid #272733; border-radius: 8px; padding: 16px; margin-top: 16px;">
              <div style="color: #A1A1AA; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Project Scope & Description:</div>
              <div style="color: #F4F4F5; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.description}</div>
            </div>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #272733; font-size: 12px; color: #71717A; text-align: center;">
              UX_PERT Digital & Media Agency — We Build. We Create. We Grow.
            </div>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      emailSent = true;
    } else {
      console.log('[Netlify Function] SMTP unconfigured. Simulated registration for:', data.name);
      simulated = true;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        requestId: data.requestId,
        message: 'Project registration received successfully.',
        simulated
      })
    };
  } catch (error) {
    console.error('[Netlify Function Error]', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'An error occurred while processing registration.',
        error: error.message
      })
    };
  }
}
