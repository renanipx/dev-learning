const express = require('express');
const { findUser, findUserById } = require('../auth/users');
const { issueTokens, verifyRefreshToken, rotateRefreshToken } = require('../auth/tokenService');

const router = express.Router();

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  const user = findUser(username);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const tokens = issueTokens(user);
  res.json({
    user: { id: user.id, username: user.username, roles: user.roles },
    ...tokens
  });
});

// POST /api/auth/refresh
router.post('/refresh', (req, res) => {
  const { refreshToken } = req.body || {};
  if (!refreshToken) {
    return res.status(400).json({ message: 'refreshToken is required' });
  }

  try {
    const payload = verifyRefreshToken(refreshToken); // { sub, type, jti }
    const user = findUserById(payload.sub);
    if (!user) return res.status(401).json({ message: 'User not found' });

    const tokens = rotateRefreshToken(refreshToken, user);
    res.json({
      user: { id: user.id, username: user.username, roles: user.roles },
      ...tokens
    });
  } catch (err) {
    res.status(403).json({ message: err.message || 'Invalid refresh token' });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  const { refreshToken } = req.body || {};
  if (!refreshToken) {
    return res.status(400).json({ message: 'refreshToken is required' });
  }
  try {
    const payload = verifyRefreshToken(refreshToken);
    const { revokeToken } = require('../auth/tokenStore');
    revokeToken(payload.jti);
    res.json({ message: 'Logged out (refresh token revoked)' });
  } catch (err) {
    res.status(400).json({ message: err.message || 'Failed to revoke token' });
  }
});

module.exports = router;