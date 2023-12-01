const express = require("express");
const router = express.Router();
const { registerUser, login, getMe } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// Register a new user
router.post("/register", registerUser);

// Log in a user
router.post("/login", protect, login);
// Get user data

module.exports = router;
