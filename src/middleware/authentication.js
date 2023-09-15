const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Secret key for JWT
const secretKey = 'your-secret-key'; // Replace with your actual secret key

// Middleware to verify JWT token and authenticate users
exports.authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Authentication failed: No token provided.' });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(401).json({ error: 'Authentication failed: User not found.' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Authentication failed: Invalid token.' });
  }
};
