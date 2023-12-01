const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/refreshToken");

// Refresh access token
const refresh = async (req, res) => {
	const refreshToken = req.body?.token || req.cookies?.__refreshToken__;
	if (!refreshToken) return res.sendStatus(401);
	try {
		const validToken = await RefreshToken.findOne({ token: refreshToken });
		if (!validToken) return res.sendStatus(403);

		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, { iat, ...user }) => {
			if (err) return res.sendStatus(403);
			const tokenUser = { ...user, type: "refresh" };
			const accessToken = jwt.sign(tokenUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20s" });
			res.status(200).json({ accessToken: accessToken, user });
		});
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

module.exports = { refresh };
