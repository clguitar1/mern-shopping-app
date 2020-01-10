require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWTSecret = process.env.jwtSecret;

function auth(req, res, next) {
  const token = req.header('x-auth-token');

  // check for token
  if (!token)
    return res.status(401).json({ msg: 'Not token. Athorization denied' });

  try {
    // verify token
    const decoded = jwt.verify(token, JWTSecret);
    // add user from payload
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
}

module.exports = auth;
