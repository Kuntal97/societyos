const env = require("../config/env");

const errorHandler = (err, req, res, next) => {
	console.error(err);

	const statusCode = err.statusCode || 500;

	res.status(statusCode).json({
		success: false,
		message: err.message || "Internal Server Error",
		...(env.nodeEnv === "development" && { stack: err.stack }),
	});
};

module.exports = errorHandler;
