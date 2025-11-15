// Simple in-memory refresh token store.
// Keyed by jti (token ID). In production, use a persistent store (DB/Redis).
const store = new Map(); // jti -> { userId, revoked: boolean, expiresAt }

function addToken(jti, userId, expiresAt) {
  store.set(jti, { userId, revoked: false, expiresAt });
}

function revokeToken(jti) {
  const entry = store.get(jti);
  if (entry) {
    entry.revoked = true;
    store.set(jti, entry);
  }
}

function isTokenActive(jti) {
  const entry = store.get(jti);
  if (!entry) return false;
  if (entry.revoked) return false;
  if (entry.expiresAt && Date.now() > entry.expiresAt) return false;
  return true;
}

module.exports = { addToken, revokeToken, isTokenActive };