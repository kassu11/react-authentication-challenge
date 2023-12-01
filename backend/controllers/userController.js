const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res, next) => {
	console.log("??????");
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		return res.status(400).json({ msg: "Please enter all fields" });
	}
	try {
		const existingUser = await User.findOne({ email: email });
		if (existingUser) {
			return res.status(400).json({ msg: "User already exists" });
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
const loginUser = async (req, res, next) => {
	const { name, password, rememberPassword } = req.body;
	try {
		const user = await User.findOne({ name });
		if (!user) return res.status(404).json({ message: `User ${name} not found.` });

		const correctPassword = await bcrypt.compare(password, user.password);
		if (!correctPassword) return res.status(400).json({ message: "Invalid credentials.", isMatch: false });

		const tokenUser = { userId: user._id, type: "login", name: user.name };

		const accessToken = jwt.sign(tokenUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20s" });
		const refreshToken = jwt.sign({ ...tokenUser, type: "refresh" }, process.env.REFRESH_TOKEN_SECRET);
		await refreshToken.deleteOne({ userId: user._id });
		await refreshToken.create({ userId: user._id, token: refreshToken });

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
const getMe = async (req, res, next) => {};

module.exports = {
	registerUser,
	loginUser,
	getMe,
};
