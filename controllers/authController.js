const AuthService = require('../models/authService');

const login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const admin = await AuthService.authenticate(email, senha);
    const token = AuthService.generateToken(admin);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = { login };