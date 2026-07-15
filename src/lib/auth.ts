import { createHmac, timingSafeEqual } from 'crypto';

// Lightweight single-user session auth.
//
// A session is a signed, expiring token stored in an httpOnly cookie:
//   <base64url(payload)>.<base64url(hmac-sha256(payload, AUTH_SECRET))>
// where payload is JSON `{ exp: <unix-ms> }`. No external auth service or
// database table required — this app has exactly one user.

export const SESSION_COOKIE = 'lifeos_session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function fromBase64url(input: string): Buffer {
  return Buffer.from(input.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
}

function getSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error('AUTH_SECRET is not configured (must be at least 16 characters).');
  }
  return secret;
}

function sign(payload: string): string {
  return base64url(createHmac('sha256', getSecret()).update(payload).digest());
}

/**
 * Verify a candidate password against the configured APP_PASSWORD using a
 * length-safe, constant-time comparison.
 */
export function verifyPassword(candidate: unknown): boolean {
  const expected = process.env.APP_PASSWORD;
  if (!expected) {
    throw new Error('APP_PASSWORD is not configured.');
  }
  if (typeof candidate !== 'string' || candidate.length === 0) {
    return false;
  }
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  if (a.length !== b.length) {
    return false;
  }
  return timingSafeEqual(a, b);
}

/** Create a signed session token that expires after SESSION_TTL_MS. */
export function createSessionToken(now: number = Date.now()): string {
  const payload = base64url(JSON.stringify({ exp: now + SESSION_TTL_MS }));
  return `${payload}.${sign(payload)}`;
}

/**
 * Validate a session token's signature and expiry.
 * Returns true only for a well-formed, correctly-signed, unexpired token.
 */
export function verifySessionToken(
  token: string | undefined | null,
  now: number = Date.now()
): boolean {
  if (!token || typeof token !== 'string') {
    return false;
  }
  const [payload, signature] = token.split('.');
  if (!payload || !signature) {
    return false;
  }

  const expectedSig = sign(payload);
  const provided = fromBase64url(signature);
  const expected = fromBase64url(expectedSig);
  if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
    return false;
  }

  try {
    const decoded = JSON.parse(fromBase64url(payload).toString('utf8')) as { exp?: number };
    return typeof decoded.exp === 'number' && decoded.exp > now;
  } catch {
    return false;
  }
}

export const SESSION_MAX_AGE_SECONDS = Math.floor(SESSION_TTL_MS / 1000);
