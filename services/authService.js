const jwt = require('jsonwebtoken');
const db = require('../models/dbModel');

const JWT_SECRET = process.env.JWT_SECRET || 'secret123';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

async function authenticate(username, password) {
  const user = await db.getUserByUsername(username);
  if (!user) return null;
  // For simplicity this example stores plaintext passwords in the local DB.
  // In production, always store hashed passwords and use bcrypt.
  if (user.password !== password) return null;

  const payload = { username: user.username };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return token;
}

module.exports = { authenticate };
