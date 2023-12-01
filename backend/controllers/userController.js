const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const RefreshToken = require("../models/refreshToken");

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res, next) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		return res.status(400).json({ msg: "Please enter all fields" });
	}
	try {
		const existingUser = await User.findOne({ email: email });
		if (existingUser) {
			return res.status(401).json({ msg: "User already exists" });
		}
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		const newUser = new User({
			name,
			email,
			password: hash,
		});
		const createdUser = await newUser.save();
		res.status(201).json(createdUser);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const login = async (req, res) => {
	const { email, password, rememberPassword } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) return res.status(404).json({ message: `User ${email} not found.` });

		const correctPassword = await bcrypt.compare(password, user.password);
		if (!correctPassword) return res.status(400).json({ message: "Invalid credentials.", isMatch: false });

		const tokenUser = { userId: user._id, type: "login", email: user.email };

		const accessToken = jwt.sign(tokenUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20s" });
		const refreshToken = jwt.sign({ ...tokenUser, type: "refresh" }, process.env.REFRESH_TOKEN_SECRET);
		await RefreshToken.deleteOne({ userId: user._id });
		await RefreshToken.create({ userId: user._id, token: refreshToken });

		if (rememberPassword) {
			const today = new Date();
			res.cookie("__refreshToken__", refreshToken, {
				httpOnly: true,
				secure: process.env.MODE !== "dev",
				expires: new Date(today.setDate(today.getDate() + 30)),
			});
		}

		res.status(200).json({ accessToken, refreshToken, user: tokenUser });
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};
// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res, next) => {
	const userId = localStorage.getItem("userId");
	try {
		const currentUser = await User.findById(userId);
		if (!currentUser) {
			return res.status(404).json({ message: "User not found." });
		}
		res.status(200).json(currentUser);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

const logout = async (req, res) => {
	const refreshToken = req.body?.token || req.cookies?.__refreshToken__;
	if (!refreshToken) return res.sendStatus(401);
	try {
		await RefreshToken.deleteOne({ token: refreshToken });
		res.sendStatus(200);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

module.exports = {
	registerUser,
	login,
	getMe,
	logout,
};
