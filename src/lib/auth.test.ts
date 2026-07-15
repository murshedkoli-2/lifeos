import { beforeAll, describe, expect, test } from 'vitest';

beforeAll(() => {
  process.env.AUTH_SECRET = 'test-secret-at-least-16-chars-long';
  process.env.APP_PASSWORD = 'correct-horse';
});

// Imported after env is set so getSecret() succeeds.
const { createSessionToken, verifySessionToken, verifyPassword } = await import('./auth');

describe('session tokens', () => {
  test('a freshly created token verifies', () => {
    expect(verifySessionToken(createSessionToken())).toBe(true);
  });

  test('rejects empty, malformed, and null tokens', () => {
    expect(verifySessionToken(undefined)).toBe(false);
    expect(verifySessionToken('')).toBe(false);
    expect(verifySessionToken('not-a-token')).toBe(false);
    expect(verifySessionToken('a.b.c')).toBe(false);
  });

  test('rejects a token with a tampered payload', () => {
    const token = createSessionToken();
    const [, sig] = token.split('.');
    const forged = `${Buffer.from(JSON.stringify({ exp: Date.now() + 10_000 })).toString('base64url')}.${sig}`;
    expect(verifySessionToken(forged)).toBe(false);
  });

  test('rejects an expired token', () => {
    const past = Date.now() - 1000 * 60 * 60 * 24 * 40; // 40 days ago
    const expired = createSessionToken(past);
    expect(verifySessionToken(expired)).toBe(false);
  });
});

describe('password verification', () => {
  test('accepts the correct password', () => {
    expect(verifyPassword('correct-horse')).toBe(true);
  });

  test('rejects wrong passwords and non-strings', () => {
    expect(verifyPassword('wrong')).toBe(false);
    expect(verifyPassword('')).toBe(false);
    expect(verifyPassword(undefined)).toBe(false);
    expect(verifyPassword(12345)).toBe(false);
  });
});
