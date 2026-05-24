// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  return res.status(401).json({ message: 'Not authorized, no token' });
};

const admin = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized as admin' });
  }

  if (req.user.isAdmin) {
    return next();
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail && req.user.email === adminEmail) {
    req.user.isAdmin = true;
    await req.user.save();
    return next();
  }

  return res.status(401).json({ message: 'Not authorized as admin' });
};

module.exports = { protect, admin };