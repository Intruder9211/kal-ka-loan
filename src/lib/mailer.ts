import nodemailer from "nodemailer";

const NOTIFICATION_EMAIL = "singhmohit101103@gmail.com";

export async function sendContactNotification({
  name,
  email,
  mobile,
  message,
}: {
  name: string;
  email: string;
  mobile?: string;
  message?: string;
}) {
  try {
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD;
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 465;

    // If SMTP credentials exist, dispatch directly via SMTP
    if (smtpUser && smtpPass) {
      const cleanPass = smtpPass.replace(/\s+/g, '');
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpUser,
          pass: cleanPass,
        },
      });

      await transporter.sendMail({
        from: `"Money Viora Inquiries" <${smtpUser}>`,
        to: NOTIFICATION_EMAIL,
        replyTo: email,
        subject: `[New Lead/Inquiry] ${name} contacted Money Viora`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 10px;">
            <div style="background-color: #0b1a2d; padding: 16px; text-align: center; border-radius: 8px 8px 0 0;">
              <h2 style="color: #0df89e; margin: 0; font-size: 20px;">New Contact Form Submission</h2>
              <p style="color: #94a3b8; font-size: 13px; margin: 4px 0 0 0;">Money Viora Customer Query</p>
            </div>
            <div style="padding: 20px; background-color: #ffffff;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 10px; font-weight: bold; color: #475569; width: 30%;">Full Name:</td>
                  <td style="padding: 10px; color: #0f172a; font-weight: bold;">${name}</td>
                </tr>
                <tr style="background-color: #f8fafc;">
                  <td style="padding: 10px; font-weight: bold; color: #475569;">Email Address:</td>
                  <td style="padding: 10px; color: #0f172a;"><a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; color: #475569;">Phone Number:</td>
                  <td style="padding: 10px; color: #0f172a;">${mobile || "Not provided"}</td>
                </tr>
                <tr style="background-color: #f8fafc;">
                  <td style="padding: 10px; font-weight: bold; color: #475569; vertical-align: top;">Message:</td>
                  <td style="padding: 10px; color: #334155; line-height: 1.5;">${message || "No message entered"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; color: #475569;">Timestamp:</td>
                  <td style="padding: 10px; color: #64748b;">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</td>
                </tr>
              </table>
            </div>
            <div style="background-color: #f1f5f9; padding: 12px; text-align: center; font-size: 12px; color: #64748b; border-radius: 0 0 8px 8px;">
              Sent automatically from Money Viora Portal to ${NOTIFICATION_EMAIL}
            </div>
          </div>
        `,
      });

      console.log(`[Email Dispatched] Contact form inquiry delivered to ${NOTIFICATION_EMAIL}`);
      return { sent: true };
    } else {
      console.log(`[Contact Form] Lead recorded for ${NOTIFICATION_EMAIL}. (SMTP credentials not yet configured in .env for external relay)`);
      return { sent: false, reason: "SMTP_NOT_CONFIGURED" };
    }
  } catch (error) {
    console.error("[Email Dispatch Error]:", error);
    return { sent: false, error };
  }
}
