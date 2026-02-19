require("dotenv").config();

const env = {
	port: process.env.PORT || 5000,
	dbUrl: process.env.DATABASE_URL,
	jwtSecret: process.env.JWT_SECRET,
	nodeEnv: process.env.NODE_ENV || "deployment",
};

module.exports = env;
