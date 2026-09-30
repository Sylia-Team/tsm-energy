/**
 * Authentification admin minimale : un mot de passe unique (variable
 * d'environnement) et un cookie de session signé (HMAC-SHA256).
 *
 * Web Crypto est utilisé pour fonctionner à la fois dans le middleware
 * (runtime Edge) et dans les Server Actions (runtime Node).
 */

export const ADMIN_COOKIE_NAME = "admin_session";
export const SESSION_TTL_MS = 1000 * 60 * 60 * 8; // 8 heures

const encoder = new TextEncoder();

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "ADMIN_SESSION_SECRET manquant ou trop court (>= 16 caractères requis).",
    );
  }
  return secret;
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

async function sign(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload),
  );
  return toHex(signature);
}

/** Vérifie le mot de passe fourni contre `ADMIN_PASSWORD`. */
export function verifyPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return false;
  }
  return timingSafeEqual(candidate, expected);
}

/** Crée un jeton de session signé, valable `SESSION_TTL_MS`. */
export async function createSessionToken(): Promise<string> {
  const expiresAt = String(Date.now() + SESSION_TTL_MS);
  const signature = await sign(expiresAt);
  return `${expiresAt}.${signature}`;
}

/** Valide un jeton de session (signature + expiration). */
export async function verifySessionToken(
  token: string | undefined,
): Promise<boolean> {
  if (!token) {
    return false;
  }

  const [payload, signature] = token.split(".");
  if (!payload || !signature) {
    return false;
  }

  let expected: string;
  try {
    expected = await sign(payload);
  } catch {
    return false;
  }

  if (!timingSafeEqual(signature, expected)) {
    return false;
  }

  const expiresAt = Number(payload);
  return Number.isFinite(expiresAt) && Date.now() < expiresAt;
}
