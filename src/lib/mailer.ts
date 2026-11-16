import nodemailer from "nodemailer";
import { 
  getAdminEnquiryTemplate, 
  getCustomerConfirmationTemplate, 
  EmailTemplateData 
} from "@/lib/email-templates";

const NOTIFICATION_EMAIL = "singhmohit101103@gmail.com";

export async function sendContactNotification({
  name,
  email,
  mobile,
  message,
  loanAmount,
  propertyType,
  city,
}: EmailTemplateData) {
  try {
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD;

    // If SMTP credentials exist, dispatch directly via Gmail SMTP
    if (smtpUser && smtpPass) {
      const cleanPass = smtpPass.replace(/\s+/g, '');
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpUser,
          pass: cleanPass,
        },
      });

      const templateData: EmailTemplateData = {
        name,
        email,
        mobile,
        message,
        loanAmount,
        propertyType,
        city,
      };

      // 1. Send Admin Enquiry Notification to singhmohit101103@gmail.com
      const adminHtml = getAdminEnquiryTemplate(templateData);
      await transporter.sendMail({
        from: `"Money Viora Enquiries" <${smtpUser}>`,
        to: NOTIFICATION_EMAIL,
        replyTo: email,
        subject: `New Home Loan Enquiry - ${name}`,
        html: adminHtml,
      });
      console.log(`[Admin Email Dispatched] Delivered to ${NOTIFICATION_EMAIL}`);

      // 2. Send Automated Confirmation Email to Applicant
      if (email && email.includes("@") && !email.includes("example.com")) {
        const customerHtml = getCustomerConfirmationTemplate(templateData);
        await transporter.sendMail({
          from: `"Money Viora" <${smtpUser}>`,
          to: email,
          subject: "Your Home Loan Enquiry Has Been Submitted Successfully! - Money Viora",
          html: customerHtml,
        }).catch(err => console.error("Customer confirmation email error:", err));
        console.log(`[Customer Confirmation Dispatched] Delivered to ${email}`);
      }

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
