const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register
exports.registerUser = async (req, res) => {
  try {
    const { name, username, password, mobile, email } = req.body;

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = new User({ name, username, mobile, email });
    user.setPassword(password);
    await user.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: { name, username, email, mobile }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || !user.validatePassword(password)) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,         // Railway is HTTPS; must be true when sameSite is None
      sameSite: "None",     // Allows cross-origin cookie usage
      maxAge: 3600000 * 24 * 7, // 7 days
    });

    res.status(200).json({
      message: 'Login successful',
      user: {
        name: user.name,
        username: user.username,
        email: user.email,
        mobile: user.mobile,
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

// Logout
exports.logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "None",
    secure: true,
  });

  res.json({ message: "Logged out successfully" });
};

// Get User Profile (requires auth middleware)
exports.getUser = async (req, res) => {
  try {
    const userData = await User.findById(req.user.id).select("-password");
    if (!userData) {
      return res.status(404).json({ message: "User profile not found" });
    }
    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error: error.message });
  }
};

// Change Password (requires auth middleware)
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const userId = req.user.id;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'New password and confirm password do not match' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.validatePassword(oldPassword)) {
      return res.status(401).json({ message: 'Old password is incorrect' });
    }

    if (oldPassword === newPassword) {
      return res.status(400).json({ message: 'New password must be different from old password' });
    }

    user.setPassword(newPassword);
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

// Check if user is authenticated (cookie-based)
exports.authenticateUser = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ authenticated: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ authenticated: true, user: decoded });
  } catch (err) {
    res.json({ authenticated: false });
  }
};
