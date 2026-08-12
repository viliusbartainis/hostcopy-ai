import { createHmac, timingSafeEqual } from 'crypto';

const COOKIE_NAME = 'hostcopy_pro_verified';
const TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days — user needs to revisit the site
// with a success redirect (or we re-verify) periodically to keep this fresh.

function getSecret(): string {
  const secret = process.env.PRO_COOKIE_SECRET;
  if (!secret) {
    throw new Error('PRO_COOKIE_SECRET is not configured on the server.');
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac('sha256', getSecret()).update(payload).digest('hex');
}

export function createProToken(): string {
  const expiry = Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS;
  const payload = String(expiry);
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function verifyProToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;

  const expected = sign(payload);
  const a = Buffer.from(signature, 'hex');
  const b = Buffer.from(expected, 'hex');
  if (a.length !== b.length) return false;
  if (!timingSafeEqual(a, b)) return false;

  const expiry = Number(payload);
  if (!Number.isFinite(expiry)) return false;
  return Date.now() / 1000 < expiry;
}

export { COOKIE_NAME, TOKEN_TTL_SECONDS };
