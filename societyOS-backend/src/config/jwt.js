const jwt = require("jsonwebtoken");
const env = require("./env");

exports.signAccessToken = (payload) => {
	return jwt.sign(payload, env.jwtSecret, {
		expiresIn: "15m",
	});
};

exports.signRefreshToken = (payload) => {
	return jwt.sign(payload, env.jwtSecret, {
		expiresIn: "7d",
	});
};
