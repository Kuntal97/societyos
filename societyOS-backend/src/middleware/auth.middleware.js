const jwt = require("jsonwebtoken");
const env = require("../config/env");

module.exports = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			return res.status(401).json({
				message: "No token provided",
			});
		}

		const token = authHeader.split(" ")[1];

		if (!token) {
			return res.status(401).json({
				message: "Invalid token format",
			});
		}

		const decoded = jwt.verify(token, env.jwtSecret);

		req.user = decoded; // attach user identity

		next();
	} catch (err) {
		return res.status(401).json({
			message: "Unauthorized",
		});
	}
};
