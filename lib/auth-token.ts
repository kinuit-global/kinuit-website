/**
 * HMAC-SHA256 based token signing for secure session cookies.
 * This implementation uses the Web Crypto API, making it compatible with Next.js Middleware/Edge.
 */

const encoder = new TextEncoder();
const AUTH_SECRET = process.env.AUTH_SECRET || "kinuit-default-secret-key-v1-2026";

async function getSigningKey() {
  const keyBuffer = encoder.encode(AUTH_SECRET);
  return await crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

/**
 * Signs a payload and returns a token in the format: base64(payload).base64(signature)
 */
export async function signToken(payload: Record<string, any>): Promise<string> {
  const dataStr = JSON.stringify({ 
    ...payload, 
    iat: Math.floor(Date.now() / 1000), 
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 hours
  });
  const dataBuffer = encoder.encode(dataStr);
  const key = await getSigningKey();
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, dataBuffer);
  
  const payloadBase64 = btoa(dataStr);
  const signatureBase64 = btoa(String.fromCharCode(...new Uint8Array(signatureBuffer)));
  
  return `${payloadBase64}.${signatureBase64}`;
}

/**
 * Verifies a token and returns the payload if valid, otherwise null.
 */
export async function verifyToken(token: string): Promise<Record<string, any> | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;
    
    const [payloadBase64, signatureBase64] = parts;
    const dataStr = atob(payloadBase64);
    const dataBuffer = encoder.encode(dataStr);
    
    const signatureArray = Uint8Array.from(atob(signatureBase64), c => c.charCodeAt(0));
    const key = await getSigningKey();
    
    const isValid = await crypto.subtle.verify("HMAC", key, signatureArray, dataBuffer);
    if (!isValid) return null;
    
    const payload = JSON.parse(dataStr);
    
    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return null;
    }
    
    return payload;
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
}
