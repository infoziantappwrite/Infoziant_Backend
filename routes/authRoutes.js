const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  changePassword,
  authenticateUser
} = require('../controllers/authController');

const authenticateToken = require('../middleware/authMiddleware');

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", authenticateToken, getUser);
router.post("/change-password", authenticateToken, changePassword);
router.get("/authenticate", authenticateUser);

module.exports = router;
