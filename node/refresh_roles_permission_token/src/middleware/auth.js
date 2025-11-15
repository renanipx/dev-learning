const jwt = require('jsonwebtoken');

function verifyAccessToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid access token' });
    }
    req.user = payload; // { sub, username, roles, iat, exp }
    next();
  });
}

module.exports = { verifyAccessToken };