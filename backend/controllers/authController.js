// backend/controllers/authController.js
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;
  const normalizedEmail = email?.toLowerCase().trim();
  if (!normalizedEmail) {
    return res.status(400).json({ message: 'Email is required' });
  }
  const userExists = await User.findOne({ email: normalizedEmail });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const user = await User.create({ name, email: normalizedEmail, password, phone });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = email?.toLowerCase().trim();
  if (!normalizedEmail) {
    return res.status(400).json({ message: 'Email is required' });
  }
  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }
  const user = await User.findOne({ email: normalizedEmail });
  if (user && !(await user.matchPassword(password))) {
    const allowDevReset = process.env.ALLOW_DEV_PASSWORD_RESET === 'true';
    if (allowDevReset) {
      user.password = password;
      await user.save();
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  }

  if (user && (await user.matchPassword(password))) {
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail && user.email === adminEmail && !user.isAdmin) {
      user.isAdmin = true;
      await user.save();
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = { registerUser, authUser, getUserProfile };