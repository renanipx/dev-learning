const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { addToken, revokeToken, isTokenActive } = require('./tokenStore');

const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN || '15m';
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';

function generateAccessToken(user) {
  const payload = {
    sub: user.id,
    username: user.username,
    roles: user.roles
  };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
}

function generateRefreshToken(user, jti) {
  const payload = {
    sub: user.id,
    type: 'refresh',
    jti
  };
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
}

// Helper to parse JWT expiry to timestamp (via decoded exp)
function decodeExpToMs(token, secret) {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded.exp ? decoded.exp * 1000 : null;
  } catch {
    return null;
  }
}

function issueTokens(user) {
  const accessToken = generateAccessToken(user);
  const jti = uuidv4();
  const refreshToken = generateRefreshToken(user, jti);
  const expiresAt = decodeExpToMs(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  addToken(jti, user.id, expiresAt);
  return { accessToken, refreshToken };
}

function verifyRefreshToken(refreshToken) {
  const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  if (payload.type !== 'refresh') {
    throw new Error('Invalid token type');
  }
  if (!isTokenActive(payload.jti)) {
    throw new Error('Refresh token is revoked or expired');
  }
  return payload; // { sub, type, jti, iat, exp }
}

function rotateRefreshToken(refreshToken, user) {
  // Verify and revoke old refresh token
  const payload = verifyRefreshToken(refreshToken);
  revokeToken(payload.jti);
  // Issue new tokens
  return issueTokens(user);
}

module.exports = {
  issueTokens,
  verifyRefreshToken,
  rotateRefreshToken
};