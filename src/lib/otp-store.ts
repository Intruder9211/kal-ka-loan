// In-memory fallback for OTPs during local development
const otpStore = new Map<string, { otp: string, expiresAt: number }>();

export async function setOtp(phone: string, otp: string) {
  try {
    // Attempt to use Vercel KV if configured
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      const { kv } = await import('@vercel/kv');
      await kv.set(`otp:${phone}`, otp, { ex: 300 });
      return;
    }
  } catch (e) {
    console.warn("KV set failed, falling back to in-memory store", e);
  }
  
  // Fallback to in-memory map
  otpStore.set(phone, {
    otp,
    expiresAt: Date.now() + 300 * 1000 // 5 minutes
  });
}

export async function getOtp(phone: string): Promise<string | null> {
  try {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      const { kv } = await import('@vercel/kv');
      const val = await kv.get(`otp:${phone}`);
      return val ? String(val) : null;
    }
  } catch (e) {
    console.warn("KV get failed, falling back to in-memory store", e);
  }

  // Fallback
  const data = otpStore.get(phone);
  if (!data) return null;
  if (Date.now() > data.expiresAt) {
    otpStore.delete(phone);
    return null;
  }
  return data.otp;
}

export async function deleteOtp(phone: string) {
  try {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      const { kv } = await import('@vercel/kv');
      await kv.del(`otp:${phone}`);
      return;
    }
  } catch (e) {}

  otpStore.delete(phone);
}
