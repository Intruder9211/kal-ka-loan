import { NextResponse } from "next/server";
import { setOtp } from "@/lib/otp-store";

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json({ success: false, error: "Phone number is required" }, { status: 400 });
    }

    // 1. Generate a 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // 2. Store using our fallback-enabled store
    await setOtp(phone, otp);

    // 3. Send REAL SMS via Fast2SMS
    if (process.env.FAST2SMS_API_KEY) {
      const smsResponse = await fetch("https://www.fast2sms.com/dev/bulkV2", {
        method: "POST",
        headers: {
          "authorization": process.env.FAST2SMS_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          route: "otp",
          variables_values: otp,
          numbers: phone
        })
      });
      
      const smsData = await smsResponse.json();
      console.log("Fast2SMS Response:", smsData);
      
      if (!smsResponse.ok || !smsData.return) {
        throw new Error(smsData.message || "Fast2SMS API failed");
      }
    } else {
      console.warn("⚠️ FAST2SMS_API_KEY is not set in .env. OTP was stored but SMS was not sent.");
      console.log(`[DEV MODE] OTP for ${phone} is: ${otp}`);
    }

    return NextResponse.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json({ success: false, error: "Failed to send OTP" }, { status: 500 });
  }
}
