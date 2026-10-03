import { NextResponse } from "next/server";
import { getOtp, deleteOtp } from "@/lib/otp-store";

export async function POST(request: Request) {
  try {
    const { phone, otp } = await request.json();

    if (!phone || !otp) {
      return NextResponse.json({ success: false, error: "Phone and OTP are required" }, { status: 400 });
    }

    // 1. Get the stored OTP
    const storedOtp = await getOtp(phone);

    // 2. Verify OTP
    if (!storedOtp) {
      return NextResponse.json({ success: false, error: "OTP has expired or was not requested" }, { status: 400 });
    }

    // Ensure we are comparing strings
    if (String(storedOtp) !== String(otp)) {
      return NextResponse.json({ success: false, error: "Invalid OTP" }, { status: 400 });
    }

    // 3. OTP is valid, delete it so it can't be reused
    await deleteOtp(phone);

    return NextResponse.json({ success: true, message: "OTP Verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json({ success: false, error: "Failed to verify OTP" }, { status: 500 });
  }
}
