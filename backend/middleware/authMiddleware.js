const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
	const authHeader = req.headers?.authorization || req.headers?.Authorization;
	const token = authHeader?.split(" ")[1];
	if (!token) return res.sendStatus(401);

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
};

module.exports = { weakAuthentication: protect };
