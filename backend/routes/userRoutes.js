const express = require("express");
const router = express.Router();
const { registerUser, login, getMe, logout } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// Register a new user
router.post("/register", registerUser);

// Log in a user
router.post("/login", login);
// Get user data
router.get("/me", protect, getMe);
// Log out
router.post("/logout", protect, logout);

module.exports = router;
