const authService = require('../services/authService');

async function login(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'username and password required' });

    const token = await authService.authenticate(username, password);
    if (!token) return res.status(401).json({ message: 'invalid credentials' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'internal error' });
  }
}

module.exports = { login };
