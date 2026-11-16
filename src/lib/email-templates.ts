export interface EmailTemplateData {
  name: string;
  email: string;
  mobile?: string;
  loanAmount?: number | string | null;
  propertyType?: string | null;
  city?: string | null;
  message?: string | null;
  referenceNumber?: string;
  timestamp?: string;
}

/**
 * 1. Admin Email Template - New Home Loan Enquiry Notification
 * Recreates the premium brand design from your reference:
 * Dark blue header with brand logo, "New Home Loan Enquiry" title, structured Applicant Details pill,
 * 2-column info layout, alert notice footer, and brand footer with quick action buttons.
 */
export function getAdminEnquiryTemplate(data: EmailTemplateData): string {
  const timestamp = data.timestamp || new Date().toLocaleString("en-IN", { 
    day: "2-digit", 
    month: "short", 
    year: "numeric", 
    hour: "2-digit", 
    minute: "2-digit", 
    hour12: true, 
    timeZone: "Asia/Kolkata" 
  });

  const formattedAmount = data.loanAmount
    ? (typeof data.loanAmount === "number" ? `₹${data.loanAmount.toLocaleString("en-IN")}` : `₹${data.loanAmount}`)
    : "Not specified";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Home Loan Enquiry - Money Viora</title>
</head>
<body style="margin: 0; padding: 24px 12px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <div style="max-width: 580px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08); border: 1px solid #e2e8f0;">
    
    <!-- Top Header -->
    <div style="background: linear-gradient(135deg, #0b1a2d 0%, #112642 100%); padding: 24px 28px; position: relative;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td>
            <div style="display: inline-block; vertical-align: middle;">
              <span style="display: inline-block; width: 32px; height: 32px; vertical-align: middle; margin-right: 10px; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-radius: 8px; text-align: center; line-height: 32px; color: #ffffff; font-weight: 900; font-size: 18px;">M</span>
              <div style="display: inline-block; vertical-align: middle;">
                <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">Money Viora</h1>
                <p style="color: #0df89e; margin: 2px 0 0 0; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Your Financial Partner</p>
              </div>
            </div>
          </td>
          <td style="text-align: right; vertical-align: middle;">
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#334d6e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.4;">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </td>
        </tr>
      </table>
    </div>

    <!-- Main Content -->
    <div style="padding: 32px 28px 24px 28px;">
      <h2 style="color: #0b1a2d; font-size: 24px; font-weight: 800; margin: 0 0 8px 0; letter-spacing: -0.5px;">New Home Loan Enquiry</h2>
      <p style="color: #64748b; font-size: 14px; margin: 0 0 24px 0; line-height: 1.5;">
        A new enquiry has been submitted through your website. Please find the applicant details below:
      </p>

      <!-- Applicant Details Capsule Tag -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 0;">
        <tr>
          <td>
            <div style="display: inline-block; background-color: #0b1a2d; color: #ffffff; font-size: 12px; font-weight: 700; padding: 6px 14px; border-radius: 6px;">
              Applicant Details
            </div>
          </td>
          ${data.referenceNumber ? `
          <td style="text-align: right;">
            <span style="font-family: monospace; font-weight: 800; font-size: 13px; color: #0284c7; background: #e0f2fe; padding: 4px 10px; border-radius: 6px;">
              Ref: ${data.referenceNumber}
            </span>
          </td>` : ""}
        </tr>
      </table>

      <!-- Details Card -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 20px; margin-top: -2px; margin-bottom: 24px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 600; width: 38%;">Name</td>
            <td style="padding: 8px 0; color: #0b1a2d; font-weight: 700;">: ${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email</td>
            <td style="padding: 8px 0; color: #0b1a2d; font-weight: 600;">: <a href="mailto:${data.email}" style="color: #0284c7; text-decoration: none;">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Phone</td>
            <td style="padding: 8px 0; color: #0b1a2d; font-weight: 700;">: ${data.mobile || "Not provided"}</td>
          </tr>
          ${data.loanAmount ? `
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Loan Amount</td>
            <td style="padding: 8px 0; color: #059669; font-weight: 800;">: ${formattedAmount}</td>
          </tr>` : ""}
          ${data.propertyType ? `
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Property Type</td>
            <td style="padding: 8px 0; color: #0b1a2d;">: ${data.propertyType}</td>
          </tr>` : ""}
          ${data.city ? `
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 600;">City</td>
            <td style="padding: 8px 0; color: #0b1a2d;">: ${data.city}</td>
          </tr>` : ""}
          ${data.message ? `
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 600; vertical-align: top;">Message</td>
            <td style="padding: 8px 0; color: #334155; line-height: 1.4;">: ${data.message}</td>
          </tr>` : ""}
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Submission Time</td>
            <td style="padding: 8px 0; color: #64748b; font-size: 13px;">: ${timestamp}</td>
          </tr>
        </table>
      </div>

      <!-- Quick Action Buttons -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          ${data.mobile && data.mobile !== "N/A" ? `
          <td style="padding-right: 8px;">
            <a href="tel:${data.mobile.replace(/[^0-9+]/g, '')}" style="display: block; text-align: center; background-color: #0df89e; color: #0b1a2d; text-decoration: none; font-weight: 800; font-size: 13px; padding: 12px 18px; border-radius: 8px;">
              📞 Call Applicant
            </a>
          </td>` : ""}
          <td>
            <a href="mailto:${data.email}" style="display: block; text-align: center; background-color: #0b1a2d; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 12px 18px; border-radius: 8px;">
              ✉️ Reply via Email
            </a>
          </td>
        </tr>
      </table>

      <!-- Follow-up Notice Pill -->
      <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 12px 16px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="width: 24px; vertical-align: middle;">
              <span style="display: inline-block; width: 18px; height: 18px; background-color: #1d4ed8; color: #ffffff; border-radius: 50%; text-align: center; line-height: 18px; font-size: 12px; font-weight: bold;">i</span>
            </td>
            <td style="font-size: 13px; color: #1e40af; font-weight: 500;">
              Please verify the details and follow up with the client at the earliest.
            </td>
          </tr>
        </table>
      </div>

    </div>

    <!-- Bottom Footer -->
    <div style="background-color: #0b1a2d; padding: 16px 28px; border-top: 3px solid #f59e0b;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td>
            <p style="color: #ffffff; font-weight: 700; font-size: 13px; margin: 0;">Money Viora</p>
            <p style="color: #94a3b8; font-size: 11px; margin: 2px 0 0 0;">Smarter Home Loans. Brighter Future.</p>
          </td>
          <td style="text-align: right;">
            <a href="https://moneyviora.com" style="color: #0df89e; font-size: 11px; text-decoration: none; font-weight: 700;">moneyviora.com</a>
          </td>
        </tr>
      </table>
    </div>

  </div>
</body>
</html>
  `;
}

/**
 * 2. Customer Confirmation Email Template - Enquiry Successfully Submitted
 * Recreates the customer-facing card from your reference:
 * Header with modern house graphic, big green check badge, reference tracking pill,
 * personal greeting, and a bold yellow CTA button to Contact Support.
 */
export function getCustomerConfirmationTemplate(data: EmailTemplateData): string {
  const ref = data.referenceNumber || `MVHL${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Home Loan Enquiry Has Been Submitted Successfully! - Money Viora</title>
</head>
<body style="margin: 0; padding: 24px 12px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <div style="max-width: 580px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08); border: 1px solid #e2e8f0;">
    
    <!-- Top Header with Diagonal Yellow Accent -->
    <div style="background: linear-gradient(135deg, #0b1a2d 0%, #112642 70%, #f59e0b 100%); padding: 24px 28px; position: relative;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td>
            <div style="display: inline-block; vertical-align: middle;">
              <span style="display: inline-block; width: 32px; height: 32px; vertical-align: middle; margin-right: 10px; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-radius: 8px; text-align: center; line-height: 32px; color: #ffffff; font-weight: 900; font-size: 18px;">M</span>
              <div style="display: inline-block; vertical-align: middle;">
                <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">Money Viora</h1>
                <p style="color: #0df89e; margin: 2px 0 0 0; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Your Financial Partner</p>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <!-- Main Content -->
    <div style="padding: 36px 28px 28px 28px; text-align: center;">
      
      <!-- Big Animated Success Green Check Badge -->
      <div style="display: inline-block; width: 68px; height: 68px; background-color: #d1fae5; border: 4px solid #a7f3d0; border-radius: 50%; text-align: center; line-height: 64px; margin-bottom: 20px;">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>

      <h2 style="color: #0b1a2d; font-size: 23px; font-weight: 800; margin: 0 0 16px 0; line-height: 1.3; letter-spacing: -0.5px;">
        Your Home Loan Enquiry<br/>Has Been Submitted Successfully!
      </h2>

      <div style="text-align: left; padding: 0 8px;">
        <p style="color: #0f172a; font-size: 16px; font-weight: 700; margin: 0 0 8px 0;">
          Dear ${data.name},
        </p>
        <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 8px 0;">
          Thank you for choosing Money Viora.
        </p>
        <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 24px 0;">
          We have received your home loan enquiry. Our dedicated loan specialists will review your financial profile and reach out to you within 24 hours to guide you through the lowest interest rates.
        </p>
      </div>

      <!-- Reference Number Pill Box -->
      <div style="background-color: #eff6ff; border: 1px dashed #93c5fd; border-radius: 12px; padding: 16px; margin: 0 8px 24px 8px; text-align: center;">
        <p style="color: #1e40af; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 4px 0;">
          Reference Number
        </p>
        <p style="color: #0b1a2d; font-size: 18px; font-weight: 800; font-family: monospace; letter-spacing: 1px; margin: 0;">
          ${ref}
        </p>
      </div>

      <p style="color: #64748b; font-size: 13px; margin: 0 0 20px 0;">
        If you have any questions, feel free to reach out to us directly:
      </p>

      <!-- Yellow Action Button -->
      <div style="margin-bottom: 28px;">
        <a href="https://moneyviora.com/contact" style="display: inline-block; background-color: #f59e0b; color: #0b1a2d; font-size: 14px; font-weight: 800; padding: 13px 36px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.35);">
          Contact Us
        </a>
      </div>

      <div style="text-align: left; padding: 0 8px; border-top: 1px solid #e2e8f0; pt-4; margin-top: 20px; font-size: 13px; color: #64748b;">
        <p style="margin: 12px 0 2px 0; font-weight: 600; color: #334155;">Best Regards,</p>
        <p style="margin: 0; font-weight: 700; color: #0b1a2d;">Team Money Viora</p>
      </div>

    </div>

    <!-- Bottom Footer with Golden House Silhouette -->
    <div style="background-color: #0b1a2d; padding: 16px 28px; border-top: 3px solid #f59e0b;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td>
            <p style="color: #ffffff; font-weight: 700; font-size: 13px; margin: 0;">Money Viora</p>
            <p style="color: #94a3b8; font-size: 11px; margin: 2px 0 0 0;">Smarter Home Loans. Brighter Future.</p>
          </td>
          <td style="text-align: right;">
            <!-- Golden House SVG icon -->
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <rect x="9" y="13" width="6" height="5"/>
            </svg>
          </td>
        </tr>
      </table>
    </div>

  </div>
</body>
</html>
  `;
}
